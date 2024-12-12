# «Большое путешествие»
Современный сервис для настоящих путешественников. Сервис помогает детально спланировать маршрут поездки, рассчитать стоимость путешествия и получить информацию о достопримечательностях. Минималистичный интерфейс не даст повода отвлечься и сфокусирует внимание на планировании путешествия.

В сервисе реализована регистрация и авторизация по access и refresh токенам с разделением на роли, CRUD операции, подключена google reCAPTCHA v3

- Сервис [доступен по адресу][site].
- [Админка сервиса][system]. Тестовая учётка "example@example.com:testtest"
- Описание [endpoint'ов swagger][swagger].
- MongoDB [admin interface][mongo-express]. Тестовая учётка "admin:pass"

[site]: https://simplemanx9.metrosg.ru/
[system]: https://simplemanx9.metrosg.ru/system
[swagger]: https://simplemanx9.metrosg.ru/swagger
[progit]: http://git-scm.com/book
[mongo-express]: http://simplemanx9.metrosg.ru/mongo-express

## Стек
- База данных - MongoDB+Mongoose
- Backend-приложение - Express.js+Swagger
- Frontend-приложение - React+TypeScript+Redux
- UI vanilla CSS
- Docker+Docker Compose
- NodeJS 18+
- Nginx Proxy Manager

## Локальный запуск

- Установить Docker и Docker Compose. Это необязательно. Но так комфортнее. Можно всё на хосте развернуть
- Перейти в директорию проекта и выполнить команду для запуска контейнеров с пустой базой данных

```
docker-compose -f docker-compose-development.yml up -d
```

В случае успеха будет запущен контейнер с пустой базой данных и контейнер UI для управления базами. UI доступен по адрусу http://localhost:8081/mongo-express

- Установить Volta [Getting Started][volta] для управления версиями Node.js. Так комфортнее. Установить Node.js выше 18 версии

[volta]: https://docs.volta.sh/guide/getting-started

## Backend установка
- Перейти в директорию backend

`cd backend`
- Установить зависимости

`npm install` or `npm i`

- Запуск локального сервера для разработки на Linux

```
npm start
```

- Запуск локального сервера для разработки на Windows

```
npm run start:alt
```

API сервер запуститься на хосте на порту http://localhost:9000 по умолчнию. Порт можно изменить в файле backend/.env

- build проекта на Linux

```
npm run build
```

- build проекта на Windows

```
npm run build:alt
```

## Frontend установка

- Перейдите в директорию

`cd frontend`

- Установите зависимости

`npm install` or `npm i`

- Запуск локального сервера для разработки

```
npm run dev
```

Frontend приложение будет доступно на хосте на порту http://localhost:5173 по умолчнию. Порт можно изменить в файле frontend/.env

- build проекта

```
npm run build
```

[//]: # (- Запуск линтеров)

[//]: # ()
[//]: # (```)

[//]: # (npm run lint)

[//]: # (```)

## Preview проекта
![big-trip@1x.webp](frontend/public/preview/big-trip%401x.webp)


[//]: # (## Публикация)

[//]: # ()
[//]: # (- Для примера сервер на Debian 12. На сервер установить Docker и Docker-Compose)

[//]: # ()
[//]: # (Запустить контейнер с Nginx Proxy Manager)

[//]: # ()
[//]: # (```)

[//]: # (docker-compose -f docker-compose-npm.yml up -d)

[//]: # (```)

[//]: # ()
[//]: # (На хосте будет доступен Nginx Proxy Manager, на порту 81 будет доступна его админка)

[//]: # ()
[//]: # (- Запустить контейнеры с базой, api, frontend приложениями)

[//]: # ()
[//]: # (```)

[//]: # (docker-compose -f docker-compose-prod.yml up -d)

[//]: # (```)

[//]: # ()
[//]: # (- В админке Nginx Proxy Manager добавить правила для проксирования приложений)

[//]: # (1, 2, 3, ...)