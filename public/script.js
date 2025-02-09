document.getElementById('search-form').addEventListener('submit', function(event) {
                      event.preventDefault();
                      const query = document.getElementById('search-input').value.trim();
                      if (!query) return;
                  
                      fetch(`/api/search?query=${encodeURIComponent(query)}`)
                          .then(response => response.json())
                          .then(data => {
                              const resultsSection = document.getElementById('results-section');
                              const resultsList = document.getElementById('results-list');
                              resultsList.innerHTML = '';
                              if (data.length > 0) {
                                  data.forEach(journal => {
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
                          })
                          .catch(error => {
                              console.error('خطا در دریافت اطلاعات:', error);
                          });
                  });
                  