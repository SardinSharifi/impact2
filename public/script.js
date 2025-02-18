document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  fetch('/projects/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: query })
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    const resultsSection = document.getElementById('results-section');
    const resultsList = document.getElementById('results-list');
    const errorSection = document.getElementById('error-section');

    if (data.error) {
      errorSection.textContent = data.error;
      errorSection.style.display = 'block';
      resultsSection.style.display = 'none';
    } else {
      resultsList.innerHTML = '';
      if (data.journals.length > 0) {
        data.journals.forEach(journal => {
          const listItem = document.createElement('li');

          // ایجاد تگ a برای کلیک کردن
          const journalLink = document.createElement('a');
          journalLink.href = `/journal/${journal.id}`;  // مسیر به صفحه مشخصات ژورنال
          journalLink.textContent = `${journal.title} (ISSN: ${journal.issn})`;

          // اضافه کردن لینک به لیست آیتم‌ها
          listItem.appendChild(journalLink);
          resultsList.appendChild(listItem);
        });
      } else {
        resultsList.innerHTML = '<li>هیچ نتیجه‌ای یافت نشد.</li>';
      }

      if (data.lists.length > 0) {
        const listsSection = document.getElementById('lists-section');
        const listsList = document.getElementById('lists-list');
        listsList.innerHTML = '';
        data.lists.forEach(list => {
          const listItem = document.createElement('li');
          listItem.textContent = `${list.name} (${list.type})`;
          listsList.appendChild(listItem);
        });
        listsSection.style.display = 'block';
      } else {
        listsSection.style.display = 'none';
      }

      resultsSection.style.display = 'block';
    }
  })
  .catch(error => {
    console.error('خطا در پردازش درخواست:', error);
  });
});
