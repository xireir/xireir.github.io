document.addEventListener('DOMContentLoaded', () => {
    // Находим наш тег <main>, куда будем добавлять кнопки
    const mainContent = document.querySelector('.main');

    // Путь к файлу с данными (измените, если положите в другое место)
    const dataUrl = 'js/foldersButton.json'; 

    // Загружаем данные из JSON-файла
    fetch(dataUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Сетевая ошибка при попытке загрузить список папок');
            }
            return response.json();
        })
        .then(foldersArray => {
            // Очищаем дефолтный текст "Main Content", если он там есть
            mainContent.innerHTML = '';

            // Создаем контейнер для кнопок (чтобы их было удобно стилизовать в CSS)
            const buttonsContainer = document.createElement('div');
            buttonsContainer.className = 'folder-buttons-container';

            // Проходим циклом по массиву папок
            foldersArray.forEach(folderName => {
                // 1. Создаем элемент кнопки
                const btn = document.createElement('button');
                
                // 2. Добавляем класс для стилизации в CSS
                btn.className = 'folder-btn';
                
                // 3. Записываем внутрь название папки
                btn.textContent = folderName;

                // 4. Вешаем событие клика (сюда потом добавите логику открытия папки)
                btn.addEventListener('click', () => {
                    console.log(`Вы нажали на папку: ${folderName}`);
                    // Здесь будет логика, например: openFolder(folderName);
                });

                // 5. Закидываем кнопку в контейнер
                buttonsContainer.appendChild(btn);
            });

            // Добавляем контейнер со всеми кнопками на страницу в тег <main>
            mainContent.appendChild(buttonsContainer);
        })
        .catch(error => {
            console.error('Ошибка:', error);
            mainContent.innerHTML = '<p style="color: red;">Не удалось загрузить список папок.</p>';
        });
});