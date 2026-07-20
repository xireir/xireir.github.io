document.addEventListener('DOMContentLoaded', () => {
    // Находим наш тег <main>, куда будем добавлять кнопки
    const mainContent = document.querySelector('.main');

    // Путь к файлу со списком папок
    const dataUrl = 'js/foldersButton.json'; 

    // Загружаем список папок из JSON-файла
    fetch(dataUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Сетевая ошибка при попытке загрузить список папок');
        }
        return response.json();
    })
    .then(async (foldersArray) => {
        // Очищаем дефолтный текст
        mainContent.innerHTML = '';

        // Создаем контейнер для кнопок
        const buttonsContainer = document.createElement('div');
        buttonsContainer.className = 'folder-buttons-container';

        // Загружаем конфиги для всех папок параллельно
        const buttonPromises = foldersArray.map(async (folderName) => {
            try {
                // Запрашиваем config.json из конкретной папки
                const configResponse = await fetch(`pages/${folderName}/config.json`);
                
                if (!configResponse.ok) {
                    throw new Error(`Не удалось загрузить конфиг для ${folderName}`);
                }

                const config = await configResponse.json();

                // 1. Создаем кнопку
                const btn = document.createElement('button');
                btn.className = 'folder-btn';

                // 2. Отображаемый текст берем ИЗ КОНФИГА (например, "Фантастика")
                btn.textContent = config.title || folderName;

                // 3. Атрибут data-folder сохраняем как ИМЯ ПАПКИ (например, "scifi")
                btn.dataset.folder = folderName;

                // 4. Вешаем обработчик клика
                btn.addEventListener('click', (event) => {
                    const folder = event.currentTarget.dataset.folder;
                    window.location.href = `library.html?lib=${encodeURIComponent(folder)}`;
                });

                return btn;
            } catch (err) {
                console.error(`Ошибка при обработке папки "${folderName}":`, err);
                return null;
            }
        });

        // Ждем, пока создадутся все кнопки, и фильтруем от ошибок
        const buttons = (await Promise.all(buttonPromises)).filter(btn => btn !== null);

        // Добавляем кнопки в контейнер
        buttons.forEach(btn => buttonsContainer.appendChild(btn));

        // Добавляем контейнер со всеми кнопками на страницу
        mainContent.appendChild(buttonsContainer);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        mainContent.innerHTML = '<p style="color: red;">Не удалось загрузить список папок.</p>';
    });
});