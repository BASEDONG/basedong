export type MarketingLanguage = {
  code: string;
  nativeLabel: string;
  searchAliases: string[];
};

export const DEFAULT_LANGUAGE_CODE = "zh-CN";

function lang(
  code: string,
  nativeLabel: string,
  ...searchAliases: string[]
): MarketingLanguage {
  return { code, nativeLabel, searchAliases };
}

export const MARKETING_PINNED_LANGUAGES: MarketingLanguage[] = [
  lang("zh-CN", "简体中文", "简体中文", "Chinese Simplified", "Simplified Chinese"),
  lang("zh-TW", "繁體中文", "繁体中文", "Chinese Traditional", "Traditional Chinese"),
  lang("en", "English", "英语", "英文"),
];

export const MARKETING_OTHER_LANGUAGES: MarketingLanguage[] = [
  lang("af", "Afrikaans", "南非荷兰语"),
  lang("sq", "Shqip", "阿尔巴尼亚语", "Albanian"),
  lang("am", "አማርኛ", "阿姆哈拉语", "Amharic"),
  lang("ar", "العربية", "阿拉伯语", "Arabic"),
  lang("hy", "Հայերեն", "亚美尼亚语", "Armenian"),
  lang("az", "Azərbaycan", "阿塞拜疆语", "Azerbaijani"),
  lang("eu", "Euskara", "巴斯克语", "Basque"),
  lang("be", "Беларуская", "白俄罗斯语", "Belarusian"),
  lang("bn", "বাংলা", "孟加拉语", "Bengali"),
  lang("bs", "Bosanski", "波斯尼亚语", "Bosnian"),
  lang("bg", "Български", "保加利亚语", "Bulgarian"),
  lang("ca", "Català", "加泰罗尼亚语", "Catalan"),
  lang("ceb", "Cebuano", "宿务语"),
  lang("ny", "Chichewa", "齐切瓦语", "Nyanja"),
  lang("co", "Corsu", "科西嘉语", "Corsican"),
  lang("hr", "Hrvatski", "克罗地亚语", "Croatian"),
  lang("cs", "Čeština", "捷克语", "Czech"),
  lang("da", "Dansk", "丹麦语", "Danish"),
  lang("nl", "Nederlands", "荷兰语", "Dutch"),
  lang("eo", "Esperanto", "世界语"),
  lang("et", "Eesti", "爱沙尼亚语", "Estonian"),
  lang("fil", "Filipino", "菲律宾语", "Tagalog"),
  lang("fi", "Suomi", "芬兰语", "Finnish"),
  lang("fr", "Français", "法语", "French"),
  lang("fy", "Frysk", "弗里斯兰语", "Frisian"),
  lang("gl", "Galego", "加利西亚语", "Galician"),
  lang("ka", "ქართული", "格鲁吉亚语", "Georgian"),
  lang("de", "Deutsch", "德语", "German"),
  lang("el", "Ελληνικά", "希腊语", "Greek"),
  lang("gu", "ગુજરાતી", "古吉拉特语", "Gujarati"),
  lang("ht", "Kreyòl ayisyen", "海地克里奥尔语", "Haitian Creole"),
  lang("ha", "Hausa", "豪萨语"),
  lang("haw", "ʻŌlelo Hawaiʻi", "夏威夷语", "Hawaiian"),
  lang("he", "עברית", "希伯来语", "Hebrew"),
  lang("hi", "हिन्दी", "印地语", "Hindi"),
  lang("hmn", "Hmoob", "苗语", "Hmong"),
  lang("hu", "Magyar", "匈牙利语", "Hungarian"),
  lang("is", "Íslenska", "冰岛语", "Icelandic"),
  lang("ig", "Igbo", "伊博语"),
  lang("id", "Bahasa Indonesia", "印尼语", "Indonesian"),
  lang("ga", "Gaeilge", "爱尔兰语", "Irish"),
  lang("it", "Italiano", "意大利语", "Italian"),
  lang("ja", "日本語", "日语", "Japanese", "日本"),
  lang("jv", "Basa Jawa", "爪哇语", "Javanese"),
  lang("kn", "ಕನ್ನಡ", "卡纳达语", "Kannada"),
  lang("kk", "Қазақ тілі", "哈萨克语", "Kazakh"),
  lang("km", "ភាសាខ្មែរ", "高棉语", "Khmer"),
  lang("rw", "Ikinyarwanda", "卢旺达语", "Kinyarwanda"),
  lang("ko", "한국어", "韩语", "Korean", "朝鲜语"),
  lang("ku", "Kurdî", "库尔德语", "Kurdish"),
  lang("ky", "Кыргызча", "吉尔吉斯语", "Kyrgyz"),
  lang("lo", "ລາວ", "老挝语", "Lao"),
  lang("la", "Latina", "拉丁语", "Latin"),
  lang("lv", "Latviešu", "拉脱维亚语", "Latvian"),
  lang("lt", "Lietuvių", "立陶宛语", "Lithuanian"),
  lang("lb", "Lëtzebuergesch", "卢森堡语", "Luxembourgish"),
  lang("mk", "Македонски", "马其顿语", "Macedonian"),
  lang("mg", "Malagasy", "马达加斯加语"),
  lang("ms", "Bahasa Melayu", "马来语", "Malay"),
  lang("ml", "മലയാളം", "马拉雅拉姆语", "Malayalam"),
  lang("mt", "Malti", "马耳他语", "Maltese"),
  lang("mi", "Te Reo Māori", "毛利语", "Maori"),
  lang("mr", "मराठी", "马拉地语", "Marathi"),
  lang("mn", "Монгол", "蒙古语", "Mongolian"),
  lang("my", "မြန်မာ", "缅甸语", "Burmese", "Myanmar"),
  lang("ne", "नेपाली", "尼泊尔语", "Nepali"),
  lang("no", "Norsk", "挪威语", "Norwegian"),
  lang("or", "ଓଡ଼ିଆ", "奥迪亚语", "Odia", "Oriya"),
  lang("ps", "پښتو", "普什图语", "Pashto"),
  lang("fa", "فارسی", "波斯语", "Persian", "Farsi"),
  lang("pl", "Polski", "波兰语", "Polish"),
  lang("pt", "Português", "葡萄牙语", "Portuguese"),
  lang("pa", "ਪੰਜਾਬੀ", "旁遮普语", "Punjabi"),
  lang("ro", "Română", "罗马尼亚语", "Romanian"),
  lang("ru", "Русский", "俄语", "Russian"),
  lang("sm", "Gagana Samoa", "萨摩亚语", "Samoan"),
  lang("gd", "Gàidhlig", "苏格兰盖尔语", "Scottish Gaelic"),
  lang("sr", "Српски", "塞尔维亚语", "Serbian"),
  lang("st", "Sesotho", "塞索托语", "Southern Sotho"),
  lang("sn", "ChiShona", "修纳语", "Shona"),
  lang("sd", "سنڌي", "信德语", "Sindhi"),
  lang("si", "සිංහල", "僧伽罗语", "Sinhala"),
  lang("sk", "Slovenčina", "斯洛伐克语", "Slovak"),
  lang("sl", "Slovenščina", "斯洛文尼亚语", "Slovenian"),
  lang("so", "Soomaali", "索马里语", "Somali"),
  lang("es", "Español", "西班牙语", "Spanish"),
  lang("su", "Basa Sunda", "巽他语", "Sundanese"),
  lang("sw", "Kiswahili", "斯瓦希里语", "Swahili"),
  lang("sv", "Svenska", "瑞典语", "Swedish"),
  lang("tg", "Тоҷикӣ", "塔吉克语", "Tajik"),
  lang("ta", "தமிழ்", "泰米尔语", "Tamil"),
  lang("tt", "Татар", "鞑靼语", "Tatar"),
  lang("te", "తెలుగు", "泰卢固语", "Telugu"),
  lang("th", "ไทย", "泰语", "Thai"),
  lang("tr", "Türkçe", "土耳其语", "Turkish"),
  lang("tk", "Türkmen", "土库曼语", "Turkmen"),
  lang("uk", "Українська", "乌克兰语", "Ukrainian"),
  lang("ur", "اردو", "乌尔都语", "Urdu"),
  lang("ug", "ئۇيغۇرچە", "维吾尔语", "Uyghur"),
  lang("uz", "Oʻzbek", "乌兹别克语", "Uzbek"),
  lang("vi", "Tiếng Việt", "越南语", "Vietnamese"),
  lang("cy", "Cymraeg", "威尔士语", "Welsh"),
  lang("xh", "isiXhosa", "科萨语", "Xhosa"),
  lang("yi", "ייִדיש", "意第绪语", "Yiddish"),
  lang("yo", "Yorùbá", "约鲁巴语", "Yoruba"),
  lang("zu", "isiZulu", "祖鲁语", "Zulu"),
];

export const MARKETING_LANGUAGES: MarketingLanguage[] = [
  ...MARKETING_PINNED_LANGUAGES,
  ...MARKETING_OTHER_LANGUAGES,
];

export function matchesLanguageSearch(
  item: MarketingLanguage,
  query: string,
): boolean {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return true;
  if (item.nativeLabel.toLowerCase().includes(normalized)) return true;
  return item.searchAliases.some((alias) =>
    alias.toLowerCase().includes(normalized),
  );
}
