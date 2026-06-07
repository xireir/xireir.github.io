document.addEventListener("DOMContentLoaded", () => {
  // Путь изменен: теперь смотрим внутрь папки js
  fetch('/js/titles.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Сетевая ошибка при загрузке заголовков');
      }
      return response.json();
    })
    .then(titles => {
      if (titles && titles.length > 0) {
        const randomIndex = Math.floor(Math.random() * titles.length);
        document.getElementById('dynamic-title').textContent = titles[randomIndex];
      }
    })
    .catch(error => {
      console.error('Ошибка:', error);
      document.getElementById('dynamic-title').textContent = "Библиотека Xireir's";
    });
});
