document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.querySelector('.main');

    // 1. Извлекаем параметры из URL нашей страницы
    const urlParams = new URLSearchParams(window.location.search);
    const folderName = urlParams.get('lib');

    // Если параметр lib не передали (например, зашли напрямую на library.html)
    if (!folderName) {
        mainContent.innerHTML = '<p style="color: red;">Ошибка: Библиотека не выбрана.</p>';
        return;
    }

    // Пути к конфигу и данным конкретной папки
    const configUrl = `pages/${folderName}/config.json`;
    const dataUrl = `pages/${folderName}/data.json`;

    // 2. Сначала загружаем config.json библиотеки
    fetch(configUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Не удалось загрузить конфиг библиотеки "${folderName}"`);
            }
            return response.json();
        })
        .then(config => {
            // Меняем заголовок вкладки браузера
            document.title = config.title || folderName;

            // Создаем заголовок <h1> на самой странице
            const titleEl = document.createElement('h1');
            titleEl.className = 'library-title';
            titleEl.textContent = config.title || folderName;

            mainContent.innerHTML = ''; // Очищаем контейнер
            mainContent.appendChild(titleEl);

            // 3. Теперь загружаем сами данные библиотеки (data.json)
            return fetch(dataUrl);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Не удалось загрузить данные из ${dataUrl}`);
            }
            return response.json();
        })
        .then(booksData => {
            // Контейнер для списка книг/материалов
            const booksContainer = document.createElement('div');
            booksContainer.className = 'books-container';

            // Отрисовываем каждую книгу (структура зависит от формата вашего data.json)
            booksData.forEach(book => {
                const bookCard = document.createElement('div');
                bookCard.className = 'book-card';

                // Пример: если у книги есть title и author
                bookCard.innerHTML = `
                    <h3>${book.title}</h3>
                    <p>Автор: ${book.author || 'Неизвестен'}</p>
                `;

                booksContainer.appendChild(bookCard);
            });

            mainContent.appendChild(booksContainer);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            mainContent.innerHTML += `<p style="color: red;">Ошибка загрузки данных библиотеки.</p>`;
        });
});