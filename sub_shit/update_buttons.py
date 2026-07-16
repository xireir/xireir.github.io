import os
import json

# Теперь BASE_DIR — это корень проекта (на один уровень выше, чем папка sub_shit)
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
BASE_DIR = os.path.dirname(SCRIPT_DIR)  # Поднимаемся на уровень вверх в корень

PAGES_DIR = os.path.join(BASE_DIR, 'pages')
JSON_FILE = os.path.join(BASE_DIR, 'js/foldersButton.json')


def main():
    # 1. Проверяем, существует ли папка pages, если нет — создаем её для удобства
    if not os.path.exists(PAGES_DIR):
        os.makedirs(PAGES_DIR)
        print(f"Папка '{PAGES_DIR}' не существовала и была создана. Добавьте туда папки страниц.")
        # Записываем пустой массив, так как папок еще нет
        with open(JSON_FILE, 'w', encoding='utf-8') as jf:
            json.dump([], jf, ensure_ascii=False, indent=2)
        return

    # 2. Получаем список всех элементов в папке pages и оставляем только директории
    folders = []
    for item in os.listdir(PAGES_DIR):
        item_path = os.path.join(PAGES_DIR, item)
        if os.path.isdir(item_path):
            folders.append(item)
            
    # Сортируем по алфавиту, чтобы кнопки на сайте не прыгали при каждом обновлении
    folders.sort()

    # 3. Записываем список папок в json файл
    try:
        with open(JSON_FILE, 'w', encoding='utf-8') as jf:
            json.dump(folders, jf, ensure_ascii=False, indent=2)
        print(f" Успешно! Файл foldersButton.json обновлен.")
        print(f"Найдено папок ({len(folders)}): {folders}")
    except Exception as e:
        print(f" Произошла ошибка при записи в файл: {e}")

if __name__ == '__main__':
    main()