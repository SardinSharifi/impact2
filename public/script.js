document.getElementById('search-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const query = document.getElementById('search-input').value.trim();
  if (!query) return;

  fetch('/search', {  
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: query })
  })
  .then(response => response.json()) // این باید داخل fetch باشد
  .then(data => {
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
    console.error('خطا در دریافت اطلاعات:', error);
  });
});
