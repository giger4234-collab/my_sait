# Как бесплатно опубликовать «ОРБИТУ» на GitHub Pages

Проверено по документации GitHub 9 ноября 2026 года.
Проект на компьютере: D:\Projects\my_sait.

Этот вариант размещения предназначен для демонстрационного сайта и портфолио.
GitHub Pages не предназначен для запуска онлайн-бизнеса, магазина или сервиса,
чья основная задача — коммерческие транзакции. Условия:
[Ограничения GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits)

## Что уже подготовлено

- .github/workflows/deploy-pages.yml — автоматическая сборка и публикация.
- Статический экспорт Next.js в out/.
- Автоматический префикс ресурсов для адреса /my_sait/.
- Автоматический canonical и Open Graph после получения адреса от GitHub.
- npm run test:export — проверка ссылок, файлов, шрифтов и регистра имён.
- .gitignore исключает node_modules, .next, out, .env и временные скриншоты.

Схема работы: исходники на компьютере → GitHub → сборка Actions → сайт Pages.
Загружать готовую out/ вручную не требуется.

## 1. Выбери адрес

Предлагаемый вариант: репозиторий my_sait.

| Репозиторий | Адрес |
| --- | --- |
| my_sait | https://ТВОЙ-ЛОГИН.github.io/my_sait/ |
| твой-логин.github.io | https://твой-логин.github.io/ |

ТВОЙ-ЛОГИН — именно имя аккаунта GitHub. Оно может отличаться от Telegram.
Для второго варианта имя репозитория должно точно соответствовать имени
аккаунта и окончанию .github.io. На аккаунт доступен один такой корневой сайт.
Подпапка проекта подходит, если у тебя уже есть основной сайт.

Подготовленный workflow сам получает нужный путь от Pages. Менять исходники
из-за выбора одного из этих адресов не требуется.

## 2. Подготовь аккаунт и GitHub Desktop

1. Зарегистрируйся на https://github.com/ или войди в существующий аккаунт.
2. Подтверди электронную почту.
3. Для этого сценария достаточно GitHub Free.
4. Установи GitHub Desktop для Windows с https://desktop.github.com/download/.
5. Открой программу и войди в свой аккаунт через предложенный вход в браузере.

Бесплатный Pages в GitHub Free требует публичный репозиторий. Исходный код
будет доступен другим людям. Для адреса github.io не нужно покупать домен.
Обычные GitHub-hosted Actions для публичных репозиториев бесплатны.

Источник: [Создание сайта Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)

## 3. Добавь существующую папку

В GitHub Desktop:

1. Открой File → Add local repository.
2. Выбери папку D:\Projects\my_sait.
3. Если программа сообщит, что это ещё не Git-репозиторий, нажми предложенную
   ссылку create a repository here.
4. При создании проверь итоговый путь: D:\Projects\my_sait.
   Если показаны отдельные поля, Name — my_sait, Local path — D:\Projects.
5. Существующие README.md и .gitignore нужно сохранить. Шаблон Git ignore
   и новую лицензию можно не выбирать.
6. Убедись, что программа показывает файлы именно этого сайта.

Не создавай вложенную папку D:\Projects\my_sait\my_sait: тогда в репозитории
окажется лишний уровень, и сборщик не найдёт package.json.

Если в списке Changes видны тысячи файлов из node_modules, проверь путь
репозитория и существование .gitignore в его корне.

Официальная инструкция добавления локального репозитория:
[Добавление локального репозитория](https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-a-repository-from-your-local-computer-to-github-desktop)

## 4. Сохрани файлы в локальную историю

Вверху GitHub Desktop проверь Current branch: должна быть main.
Если программа создала другую основную ветку, переименуй её в main
через меню Branch → Rename. Подготовленный workflow запускается для main.

Если в Changes есть изменения:

1. Просмотри список.
2. В Summary напиши, например: Prepare website for GitHub Pages.
3. Нажми Commit to main.

Commit сохраняет версию на твоём компьютере. Отправка на GitHub будет
следующим действием. Если начальная версия уже закоммичена и список пуст,
повторный пустой commit не нужен.

## 5. Опубликуй репозиторий

1. Нажми Publish repository.
2. Name: my_sait, если ты выбрал адрес с подпапкой.
3. Description можно заполнить кратко, например: Interactive 3D web studio.
4. Сними галочку Keep this code private — для бесплатного Pages нужен Public.
5. Выбери свой личный аккаунт.
6. Нажми Publish repository.
7. Открой Repository → View on GitHub.

Теперь на GitHub в корне должны быть:

- package.json и package-lock.json;
- next.config.ts;
- папки src, public, scripts;
- .github/workflows/deploy-pages.yml.

Папки node_modules, .next и out не должны загружаться: они создаются при сборке.
Файл .github/workflows/deploy-pages.yml должен оказаться в репозитории вместе
с остальными исходниками.

Справка: [Публикация проекта через GitHub Desktop](https://docs.github.com/en/desktop/adding-and-cloning-repositories/adding-an-existing-project-to-github-using-github-desktop)

## 6. Включи Pages

На странице репозитория в браузере:

1. Открой Settings.
2. В левом меню выбери Pages.
3. В Build and deployment найди Source.
4. Выбери GitHub Actions.
5. Поле Custom domain оставь пустым для бесплатного адреса github.io.

Исходники проекта TypeScript/React нужно сначала собрать; готовый workflow
выполняет это автоматически и передаёт на хостинг содержимое out/.

Инструкция: [Автоматическая публикация Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)

## 7. Запусти первую публикацию

1. Открой вкладку Actions.
2. Слева выбери Deploy website to GitHub Pages.
3. Нажми Run workflow.
4. Выбери ветку main и подтверди запуск.
5. Открой появившийся запуск и дождись зелёного результата.

Будут две задачи:

- build — установка зависимостей, сборка, TypeScript и проверка экспорта;
- deploy — размещение проверенной сборки на Pages.

Первый автоматический запуск после Publish repository может упасть, если
Pages ещё не был включён. После шага 6 запусти workflow заново. Файл сайта
из-за этого переделывать не нужно.

Workflow использует штатный GITHUB_TOKEN. Создавать Personal Access Token,
добавлять Secrets или вставлять ключи в код для этого сценария не требуется.

Если Actions отключены в настройках аккаунта или организации, запуск должен
разрешить владелец этих настроек. В обычном личном репозитории Actions доступны.

## 8. Открой сайт и проверь HTTPS

После успешного deploy:

1. Вернись в Settings → Pages.
2. Нажми Visit site или открой адрес, показанный GitHub.
3. Проверь первый экран, прокрутку, меню, выбор планет и Telegram.
4. Открой тот же адрес на телефоне.
5. Проверь, что используется https://.

У доменов github.io HTTPS предоставляется GitHub. В Pages также есть настройка
Enforce HTTPS. Изменения могут появляться не мгновенно; GitHub указывает,
что публикация после отправки изменений может занять до 10 минут.

Адрес https://github.com/ЛОГИН/my_sait — это код.
Адрес https://ЛОГИН.github.io/my_sait/ — это готовый сайт.

Справка:
[HTTPS для GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)

## 9. Как обновлять сайт дальше

1. Измени нужные файлы в D:\Projects\my_sait.
2. Сохрани их.
3. Открой GitHub Desktop и посмотри Changes.
4. Напиши краткое описание изменения.
5. Нажми Commit to main.
6. Нажми Push origin.
7. Дождись успешного запуска Actions.

Сайт обновится автоматически. Держать свой компьютер включённым для работы
сайта после публикации не требуется.

Что где редактировать:

| Что | Файл |
| --- | --- |
| Название, меню и контакт в шапке | src/components/SiteHeader.tsx |
| Первый экран | src/sections/Hero.tsx |
| Студия, процесс, финальный Telegram | src/sections/JourneySections.tsx |
| Планеты | src/content/site.ts |
| Общие цвета | src/app/globals.css |
| Абстрактная 3D-геометрия | src/scene/OrbitalSculpture.tsx |
| Заголовок вкладки и описание сайта | src/app/layout.tsx |

## 10. Локальная проверка перед обновлением

Если ты меняешь код, полезно проверить его до отправки.

Открой PowerShell и выполни:

    Set-Location 'D:\Projects\my_sait'
    npm.cmd ci
    npm.cmd run build
    npm.cmd run typecheck
    npm.cmd run test:export
    npm.cmd run preview

Открой адрес, напечатанный сервером. Обычно это http://127.0.0.1:3000/.
npm.cmd ci нужен после изменений зависимостей или на новом компьютере.
Для остановки запущенного в этом терминале сервера нажми Ctrl+C.

Если порт 3000 уже занят, используй другой:

    $env:PORT = '3002'
    npm.cmd run preview

Предпросмотр будет на http://127.0.0.1:3002/.

Для проверки именно подпапки GitHub Pages можно перед сборкой задать:

    $env:NEXT_PUBLIC_BASE_PATH = '/my_sait'
    npm.cmd run build
    npm.cmd run test:export
    npm.cmd run preview

Тогда локальный адрес закончится на /my_sait/.
На GitHub задавать эту переменную вручную не нужно — workflow получает
значение из настроек Pages.

Для возврата к обычному локальному адресу:

    Remove-Item Env:NEXT_PUBLIC_BASE_PATH -ErrorAction SilentlyContinue
    Remove-Item Env:NEXT_PUBLIC_SITE_URL -ErrorAction SilentlyContinue
    npm.cmd run build
    npm.cmd run preview

Эти команды удаляют переменные только из текущего сеанса PowerShell.

## Если что-то не получилось

| Симптом | Что проверить |
| --- | --- |
| На сайте 404 | Успешны ли build и deploy; Source = GitHub Actions; правильно ли указан логин и путь /my_sait/. |
| Отображается README вместо сайта | Проверь источник публикации и запуск подготовленного workflow. |
| Первый запуск упал на настройке Pages | Сначала включи Pages по шагу 6, затем повтори запуск. |
| Workflow не виден в Actions | Проверь наличие .github/workflows/deploy-pages.yml в ветке main и отправку последних файлов. |
| Завис на ожидании разрешения deploy | Посмотри environment github-pages: в аккаунте могли быть настроены дополнительные правила подтверждения. |
| Сайт открылся без стилей или текстур | Проверь, что опубликована последняя сборка через наш workflow; он задаёт basePath автоматически. Не переименовывай файлы внутри out/. |
| npm ci сообщает несовпадение lock-файла | Выполни npm.cmd install после изменения зависимостей и закоммить package.json вместе с package-lock.json. |
| Показывается старая версия | Сверь последний commit и зелёный запуск Actions; обнови страницу Ctrl+F5 и дай публикации несколько минут. |
| На телефоне виден постер | Нажми «Включить 3D». При системном уменьшении движения и недоступном WebGL статичный режим предусмотрен. |
| Репозиторий Public, а package.json содержит private: true | Это разные настройки: поле в package.json относится к публикации npm-пакета и не мешает Pages. |

При ошибке открой красный запуск Actions и первый упавший шаг. Его текст
указывает на причину точнее, чем общий значок красного крестика.

## Ограничения бесплатного варианта

Публичный исходный код, условия использования GitHub Pages и установленные
лимиты. В документации указаны максимум 1 ГБ для опубликованного сайта и мягкий
лимит 100 ГБ трафика в месяц. Текущая сборка занимает примерно 2,14 МиБ.
Формы, оплата и серверные API в этой версии отсутствуют.

Для использования платного собственного домена потребуется отдельно получить
этот домен; бесплатный адрес github.io работает самостоятельно.

Публичная публикация в аккаунт владельца в рамках подготовки не выполнялась.
Описанные действия с аккаунтом, репозиторием и Pages владелец выполняет сам.
