import type { TargetLocale } from "@/lib/locale";
import { pickTargetCatalog } from "@/lib/pick-catalog";

export type LocaleUiCopy = {
  /** Shown beside Console Locale entries in the language switcher. */
  consoleLocaleSwitcherHint: string;
  /** Persistent Marketing banner when a Console Locale is active. */
  consoleLocaleMarketingBanner: string;
};

const zhCN: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "仅控制台",
  consoleLocaleMarketingBanner:
    "您选择的语言目前仅支持控制台；官网内容暂以简体中文显示。",
};

const en: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "Console only",
  consoleLocaleMarketingBanner:
    "Your selected language is available in the Console only; marketing pages are shown in Simplified Chinese for now.",
};

const zhTW: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "僅控制台",
  consoleLocaleMarketingBanner:
    "您選擇的語言目前僅支援控制台；官網內容暫以簡體中文顯示。",
};

const fr: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "Console uniquement",
  consoleLocaleMarketingBanner:
    "La langue sélectionnée n'est disponible que dans la console ; le site marketing s'affiche en chinois simplifié pour l'instant.",
};

const ru: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "Только консоль",
  consoleLocaleMarketingBanner:
    "Выбранный язык доступен только в консоли; маркетинговый сайт пока отображается на упрощённом китайском.",
};

const ja: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "コンソールのみ",
  consoleLocaleMarketingBanner:
    "選択した言語はコンソールのみ対応です。マーケティングサイトは当面简体中文で表示されます。",
};

const vi: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "Chỉ console",
  consoleLocaleMarketingBanner:
    "Ngôn ngữ bạn chọn hiện chỉ có trên Console; trang marketing tạm hiển thị bằng tiếng Trung giản thể.",
};

const ko: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "콘솔만",
  consoleLocaleMarketingBanner:
    "선택한 언어는 콘솔에서만 사용할 수 있습니다. 마케팅 사이트는 현재 간체 중국어로 표시됩니다.",
};

const de: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "Nur Konsole",
  consoleLocaleMarketingBanner:
    "Die gewählte Sprache ist derzeit nur in der Konsole verfügbar; Marketing-Seiten werden vorläufig auf Vereinfachtem Chinesisch angezeigt.",
};

const es: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "Solo consola",
  consoleLocaleMarketingBanner:
    "El idioma seleccionado solo está disponible en la consola; las páginas de marketing se muestran en chino simplificado por ahora.",
};

const ptBR: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "Só console",
  consoleLocaleMarketingBanner:
    "O idioma selecionado está disponível apenas no console; as páginas de marketing são exibidas em chinês simplificado por enquanto.",
};

const ar: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "لوحة التحكم فقط",
  consoleLocaleMarketingBanner:
    "اللغة المحددة متاحة في لوحة التحكم فقط؛ تُعرض صفحات التسويق بالصينية المبسطة مؤقتًا.",
};

const hi: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "केवल कंसोल",
  consoleLocaleMarketingBanner:
    "आपकी चुनी भाषा अभी केवल कंसोल में उपलब्ध है; मार्केटिंग पेज फिलहाल सरलीकृत चीनी में दिखाए जाते हैं।",
};

const id: LocaleUiCopy = {
  consoleLocaleSwitcherHint: "Console saja",
  consoleLocaleMarketingBanner:
    "Bahasa yang dipilih saat ini hanya tersedia di Console; halaman marketing ditampilkan dalam Bahasa Tionghoa Sederhana untuk sementara.",
};

const LOCALE_UI_COPY: Record<TargetLocale, LocaleUiCopy> = {
  "zh-CN": zhCN,
  en,
  "zh-TW": zhTW,
  fr,
  ru,
  ja,
  vi,
  ko,
  de,
  es,
  "pt-BR": ptBR,
  ar,
  hi,
  id,
};

export function getLocaleUiCopy(locale: string): LocaleUiCopy {
  return pickTargetCatalog(locale, LOCALE_UI_COPY);
}
