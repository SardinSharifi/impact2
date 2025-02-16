document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  console.log('در حال ارسال درخواست برای جستجو:', query);  // نمایش مقدار query در کنسول

  fetch('/projects/search', {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: query })
  })
  .then(response => {
    if (!response.ok) {
      console.log('خطا در دریافت پاسخ:', response.statusText);  // نمایش خطا در صورت بروز مشکل
      throw new Error('خطا در دریافت اطلاعات');
    }
    return response.json();
  })
  .then(data => {
    console.log('نتیجه دریافت شده:', data);  // نمایش داده‌های دریافتی از سرور
    const resultsSection = document.getElementById('results-section');
    const resultsList = document.getElementById('results-list');
    if (resultsList) {
      resultsList.innerHTML = '';
      if (data.journals && data.journals.length > 0) {
        data.journals.forEach(journal => {
          const listItem = document.createElement('li');
          const link = document.createElement('a');
          link.href = `/journal/${journal.id}`;
          link.textContent = `${journal.title} (ISSN: ${journal.issn})`;
          listItem.appendChild(link);
          resultsList.appendChild(listItem);
        });
        resultsSection.classList.remove('hidden');
      } else {
        resultsList.innerHTML = '<li>هیچ نتیجه‌ای یافت نشد.</li>';
        resultsSection.classList.remove('hidden');
      }
    }
  })
  .catch(error => {
    console.error('خطا در پردازش درخواست:', error);  // نمایش خطا در کنسول
    const resultsSection = document.getElementById('results-section');
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = `<li>${error.message}</li>`;
    resultsSection.classList.remove('hidden');
  });
});
