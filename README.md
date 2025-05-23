# Mesto: интерактивная страница с валидацией форм и инфраструктурой Webpack

## Описание проекта

Mesto — это интерактивная страница, где пользователи могут:
- Добавлять, удалять и "лайкать" карточки с изображениями
- Редактировать профиль
- Просматривать галерею мест

**Ключевые особенности:**
- Валидация форм с использованием HTML5 атрибутов и JavaScript
- Модальные окна с плавными анимациями
- Закрытие модальных окон по клику на оверлей или нажатию Esc
- Инфраструктура сборки с помощью Webpack

## Функциональность

###  Валидация форм
- **Форма "Редактировать профиль":**
  - Проверка длины имени (2-40 символов)
  - Проверка описания (2-200 символов)
  
- **Форма "Новое место":**
  - Проверка названия (2-30 символов)
  - Валидация URL изображения
  
- Лайв-валидация полей ввода
- Блокировка кнопки отправки при наличии ошибок

###  Работа с карточками
- Добавление новых карточек (по Enter или кнопке)
- Удаление карточек
- Возможность ставить лайки
- 6 предустановленных карточек, создаваемых через JavaScript

###  Модальные окна
- Плавные анимации открытия/закрытия
- Закрытие:
  - По клику на оверлей
  - По нажатию Esc
- Полная адаптивность на всех разрешениях экрана

###  Доступность
- Состояние `:hover` для интерактивных элементов
- Корректные `alt`-атрибуты для изображений

##  Технологии

**Основной стек:**
- ![HTML5] HTML5 с семантической разметкой
- ![CSS3] CSS3 с Flexbox и Grid Layout
- ![JavaScript] JavaScript (ES6+)

**Webpack:**
- Сборка в один HTML, CSS и JS файл
- Минификация и транспиляция JS (Babel)
- Обработка CSS с автопрефиксером
- Обработка изображений и шрифтов
- Dev Server с hot reload
