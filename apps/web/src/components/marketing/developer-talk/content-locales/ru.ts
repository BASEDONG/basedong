import type { TalkStrings } from "../content-types";

const categoryLabels = {
  全部: "Все",
  技术实践: "Техническая практика",
  平台活动: "События платформы",
  用户故事: "Истории пользователей",
  用户测评: "Обзоры пользователей",
} as const;

const tagLabels = {
  技术实践: "Техническая практика",
  平台活动: "События платформы",
  用户故事: "Истории пользователей",
  用户测评: "Обзоры пользователей",
  市场活动: "Маркетинговые события",
} as const;

const articles = {
  b56thjrf4dfpzg1wynejke5j: {
    title: "OPC Наньчуань: смелые эксперименты «супер‑индивида» | Developer Talk",
    excerpt:
      "Эра ИИ вдохновляет идею «супер‑индивида», многие пробуют модель OPC (компания из одного человека)—Наньчуань среди них. Основатель «Handmade Chuan Studio» выпустил десятки AI‑продуктов, не гонясь за хайпом. basedong беседует с ним о шансах, барьерах и радости solo‑бизнеса.",
  },
  qc68kpityh6nwvth6yv1zaei: {
    title: "OpenCode быстро: 190 тыс. звёзд, агент управляет браузером",
    excerpt:
      "С Claude Code или Codex подключение сторонних моделей утомляет: роутеры, переменные, настройки.\nOpenCode даёт готовое решение: выберите провайдера (включая basedong), введите ключ—готово.",
  },
  e3okr78ulcbd36ggdxswgbpy: {
    title: "Codex быстро: 5 млн+ WAU, сотни моделей",
    excerpt:
      "На презентации GPT-5.6 OpenAI объявила слияние desktop Codex с новым ChatGPT, сохранив бренд, CLI, IDE‑расширения и облако; в тот же день вышел Codex CLI 0.144.1.",
  },
  crkywf0secr2axnazev9ay0f: {
    title: "31K звёзд: «человек» вместо «креветки»—OpenHuman",
    excerpt:
      "После ажиотажа «креветок» пришёл персональный помощник OpenHuman. Как настроить API basedong в OpenHuman.",
  },
  rtlosvhg5hy6p112rlrigoo7: {
    title: "basedong MaaS: подарки ко второму годовщине",
    excerpt:
      "Пополнение счёта с купонами до 1000 ¥ в честь двух лет basedong MaaS. Спасибо, что с нами!",
  },
  hiwf5yfr6b790jmog9a6xlsb: {
    title: "Harness Engineering и оттачивание Skills | Developer Talk",
    excerpt:
      "Developer Talk с Jigege, бывшим PM и AI‑разработчиком: проект Book2Skills и путь к ясной практике Harness Engineering.",
  },
  ecqutah37y0fsgn53j7gfus4: {
    title: "BYOK: 100+ AI‑инструментов, 100+ моделей напрямую",
    excerpt:
      "Почти сотня приложений уже интегрирована с basedong через BYOK. Получите API‑ключ и подключите лучшие модели к любимым инструментам.",
  },
  edmojkiwvenrby4mzq5kizl9: {
    title: "От художника к «креветкам»: 25 лет заметок | Developer Talk",
    excerpt:
      "Янь Бо прошёл путь от художника к AI‑практику за 25 лет. ИИ для него—усилитель способностей; ценность зависит от человека.",
  },
  zc516s5lixvrjuvo6soc81mz: {
    title: "4 часа в день на «омаровую» команду | Developer Talk",
    excerpt:
      "Пэн Чao, CTO OneOneTalk, каждый день «растит» AI‑команду 1+6 «креветок» для кода, новостей и WeChat—его история практики.",
  },
  jt2by9g3v7aa6dgjotmrcfoh: {
    title: "Не только «омары»: Claude Code уже в WeChat",
    excerpt:
      "WeChat ClawBot упрощает OpenClaw и соединяет любых агентов. Подключить Claude Code к ClawBot почти так же просто, как связать двух «омаров».",
  },
  pkivkufhheggmeskcfhh8kh9: {
    title: "Meetup «омаров»: первая встреча сообщества",
    excerpt:
      "OpenClaw установлен—как им пользоваться? 21 марта, 14:00–16:30, научный парк Цинхua, Пекин—первая встреча «креветочников».",
  },
  wd6etweavt2nfbydjsx1a6z8: {
    title: "Заметки: приложение стало add-on OpenClaw | Developer Talk",
    excerpt:
      "Партнёр basedong WiseFlow эволюционирует с 2024 года. Чжао Чжэмин о перестройке архитектуры после OpenClaw.",
  },
  a58mvaz20e3bw6qhx8joewaw: {
    title: "Вырастить «омара»: пошаговый гид OpenClaw",
    excerpt:
      "Подробная установка OpenClaw для Windows и Mac. Широкие права—запускайте в изолированной среде.",
  },
  wzj6xzbdvzsytjnqno7fxyp1: {
    title: "1 млрд токенов/день: четыре урока AI‑практика | Developer Talk",
    excerpt:
      "Cowork, OpenClaw и другие агенты сжигают токены. Сюй Кэцянь (~1 млрд/день) делится четырьмя выводами.",
  },
  wln8c6grxkh11brde838wfxd: {
    title: "От cloud native к AI: путь перехода | Developer Talk",
    excerpt:
      "Хайли, амбassador LangChain и автор книг, делится тремя практичными стратегиями миграции опыта в AI.",
  },
  o8zq301umaf89v5bcxyltbav: {
    title: "basedong × Next AI Draw.io: 20K stars, диаграмма из фразы",
    excerpt:
      "Next AI Draw.io делает диаграммы естественно; интеграция с basedong усиливает модельные возможности.",
  },
  od7wj9rr23p95uhihmhrombp: {
    title: "Программа «Реферальный амбassador» basedong",
    excerpt:
      "Акция «пригласи друга» стала программой амбassador: приглашайте друзей и получайте универсальные купоны.",
  },
  zx3caanoshbvxbudsq5x1nbz: {
    title: "Обзор пользователя | DeepSeek-OCR—пробовали?",
    excerpt:
      "Старший разработчик тестирует DeepSeek-OCR на промышленных CAD‑чертежах.",
  },
  nddw0hghm23vbkfcz4y99glc: {
    title: "История | Easy: AI‑книги для дочери",
    excerpt:
      "basedong собирает реальные истории AI‑строителей, чтобы знания и опыт распространялись.",
  },
  evdjqa744e2bim1wwcrzwix2: {
    title: "Gemini-CLI с DeepSeek через basedong",
    excerpt:
      "Форк DeepSeek на базе open Gemini-CLI и API basedong—удобная CLI‑альтернатива для локальных разработчиков.",
  },
  swbnccchf5esxedxq01s4vr5: {
    title: "[Завершено] Первый год basedong: два сюрприза",
    excerpt:
      "К первой годовщине basedong запускаем две программы благодарности сообществу.",
  },
} as const;

export const ru: TalkStrings = {
  pageTitle: "Developer Talk",
  heroLogoAlt: "Developer Talk",
  pageSubtitle: "Реальная практика и инсайты от разработчиков",
  shareCtaLabel: "Поделитесь практикой",
  submitCtaTitle: "Пришлите историю — пусть больше пользователей увидят ваш опыт",
  submitCtaLabel: "Отправить",
  featuredReadMore: "Подробнее",
  categoryLabels,
  tagLabels,
  articles,
};
