# Ресурсы и происхождение

## Абстрактный постер

public/assets/images/abstract-studio.webp — оригинальная художественная
генерация через встроенный ImageGen для этого проекта, затем уменьшение и WebP
через установленный sharp. Исходная PNG-генерация сохранена в каталоге Codex.
Промпт: public/assets/images/abstract-studio.webp.json.
Постер служит запасным вариантом; основной объём создаётся в реальном времени.

## Геометрия и свет

src/scene/OrbitalSculpture.tsx — параметрические формы, написанные для «ОРБИТЫ».
TorusKnotGeometry, TorusGeometry, CapsuleGeometry и SphereGeometry из Three.js.
RoomEnvironment/PMREMGenerator создают студийное окружение.
Three.js распространяется по MIT. Модели и изображения Lusion не используются.

## Шрифт

Manrope variable, локальное размещение:
public/assets/fonts/Manrope-Variable.ttf.
Источник: https://github.com/google/fonts/tree/main/ofl/manrope
Лицензия SIL Open Font License 1.1, полный текст в public/assets/fonts/OFL.txt.
Шрифт включает кириллицу; внешняя загрузка шрифтов в браузере не требуется.

## Текстуры атласа

Автор Solar System Scope / INOVE:
https://www.solarsystemscope.com/textures/
Лицензия Creative Commons Attribution 4.0:
https://creativecommons.org/licenses/by/4.0/

Текстуры основаны в том числе на данных NASA и являются обработанными
картами, а не текущими фотографиями. В футере сохранены автор, лицензия
и указание преобразования в WebP.

| Файл | Размер |
| --- | --- |
| earth.webp | 87 600 байт |
| mars.webp | 61 926 байт |
| saturn.webp | 9 728 байт |

## Источники атласа

- https://science.nasa.gov/earth/facts/
- https://science.nasa.gov/mars/facts/
- https://science.nasa.gov/saturn/facts/

Сведения и округлённые показатели перенесены из существующей версии.
Новая научная проверка и новые научные утверждения в этот редизайн не входили.

## Референс

https://lusion.co/ — ориентир композиции, крупной графики и цифрового повествования.
Исходники, изображения, логотип и тексты референса не копируются.
