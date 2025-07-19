import { buildApiUrl } from './config';

export interface Language {
  id: string;
  name: string;
  flag: string;
  api: string;
  article: string;
  getApiUrl: () => string; // 动态获取API URL的方法
}

export const LANGUAGES: Language[] = [
  {
    id: "en",
    name: "English",
    flag: "https://hatscripts.github.io/circle-flags/flags/us.svg",
    api: "https://en.wikipedia.org/w/api.php?",
    article: "https://en.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("en")
  },
  {
    id: "ar",
    name: "العربية",
    flag: "https://hatscripts.github.io/circle-flags/flags/sa.svg",
    api: "https://ar.wikipedia.org/w/api.php?",
    article: "https://ar.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("ar")
  },
  {
    id: "bn",
    name: "বাংলা",
    flag: "https://hatscripts.github.io/circle-flags/flags/bd.svg",
    api: "https://bn.wikipedia.org/w/api.php?",
    article: "https://bn.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("bn")
  },
  {
    id: "ca",
    name: "Català",
    flag: "https://hatscripts.github.io/circle-flags/flags/es-ct.svg",
    api: "https://ca.wikipedia.org/w/api.php?",
    article: "https://ca.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("ca")
  },
  {
    id: "cs",
    name: "Čeština",
    flag: "https://hatscripts.github.io/circle-flags/flags/cz.svg",
    api: "https://cs.wikipedia.org/w/api.php?",
    article: "https://cs.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("cs")
  },
  {
    id: "de",
    name: "Deutsch",
    flag: "https://hatscripts.github.io/circle-flags/flags/de.svg",
    api: "https://de.wikipedia.org/w/api.php?",
    article: "https://de.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("de")
  },
  {
    id: "eo",
    name: "Esperanto",
    flag: "https://upload.wikimedia.org/wikipedia/commons/2/20/Verda_stelo_%28unukolora%29.svg",
    api: "https://eo.wikipedia.org/w/api.php?",
    article: "https://eo.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("eo")
  },
  {
    id: "es",
    name: "Español",
    flag: "https://hatscripts.github.io/circle-flags/flags/es.svg",
    api: "https://es.wikipedia.org/w/api.php?",
    article: "https://es.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("es")
  },
  {
    id: "eu",
    name: "Euskara",
    flag: "https://hatscripts.github.io/circle-flags/flags/es-pv.svg",
    api: "https://eu.wikipedia.org/w/api.php?",
    article: "https://eu.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("eu")
  },
  {
    id: "fa",
    name: "فارسی",
    flag: "https://hatscripts.github.io/circle-flags/flags/ir.svg",
    api: "https://fa.wikipedia.org/w/api.php?",
    article: "https://fa.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("fa")
  },
  {
    id: "fi",
    name: "Suomi",
    flag: "https://hatscripts.github.io/circle-flags/flags/fi.svg",
    api: "https://fi.wikipedia.org/w/api.php?",
    article: "https://fi.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("fi")
  },
  {
    id: "fr",
    name: "Français",
    flag: "https://hatscripts.github.io/circle-flags/flags/fr.svg",
    api: "https://fr.wikipedia.org/w/api.php?",
    article: "https://fr.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("fr")
  },
  {
    id: "el",
    name: "Ελληνικά",
    flag: "https://hatscripts.github.io/circle-flags/flags/gr.svg",
    api: "https://el.wikipedia.org/w/api.php?",
    article: "https://el.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("el")
  },
  {
    id: "gan-hans",
    name: "赣语（简体）",
    flag: "https://hatscripts.github.io/circle-flags/flags/cn.svg",
    api: "https://gan.wikipedia.org/w/api.php?",
    article: "https://gan.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("gan")
  },
  {
    id: "gan-hant",
    name: "贛語（繁體）",
    flag: "https://hatscripts.github.io/circle-flags/flags/cn.svg",
    api: "https://gan.wikipedia.org/w/api.php?",
    article: "https://gan.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("gan")
  },
  {
    id: "he",
    name: "עברית",
    flag: "https://hatscripts.github.io/circle-flags/flags/il.svg",
    api: "https://he.wikipedia.org/w/api.php?",
    article: "https://he.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("he")
  },
  {
    id: "hi",
    name: "हिन्दी",
    flag: "https://hatscripts.github.io/circle-flags/flags/in.svg",
    api: "https://hi.wikipedia.org/w/api.php?",
    article: "https://hi.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("hi")
  },
  {
    id: "hr",
    name: "Hrvatski",
    flag: "https://hatscripts.github.io/circle-flags/flags/hr.svg",
    api: "https://hr.wikipedia.org/w/api.php?",
    article: "https://hr.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("hr")
  },
  {
    id: "hu",
    name: "Magyar",
    flag: "https://hatscripts.github.io/circle-flags/flags/hu.svg",
    api: "https://hu.wikipedia.org/w/api.php?",
    article: "https://hu.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("hu")
  },
  {
    id: "id",
    name: "Indonesian",
    flag: "https://hatscripts.github.io/circle-flags/flags/id.svg",
    api: "https://id.wikipedia.org/w/api.php?",
    article: "https://id.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("id")
  },
  {
    id: "it",
    name: "Italiano",
    flag: "https://hatscripts.github.io/circle-flags/flags/it.svg",
    api: "https://it.wikipedia.org/w/api.php?",
    article: "https://it.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("it")
  },
  {
    id: "ja",
    name: "日本語",
    flag: "https://hatscripts.github.io/circle-flags/flags/jp.svg",
    api: "https://ja.wikipedia.org/w/api.php?",
    article: "https://ja.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("ja")
  },
  {
    id: "ko",
    name: "한국어",
    flag: "https://hatscripts.github.io/circle-flags/flags/kr.svg",
    api: "https://ko.wikipedia.org/w/api.php?",
    article: "https://ko.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("ko")
  },
  {
    id: "ml",
    name: "മലയാളം",
    flag: "https://hatscripts.github.io/circle-flags/flags/in.svg",
    api: "https://ml.wikipedia.org/w/api.php?",
    article: "https://ml.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("ml")
  },
  {
    id: "nl",
    name: "Nederlands",
    flag: "https://hatscripts.github.io/circle-flags/flags/nl.svg",
    api: "https://nl.wikipedia.org/w/api.php?",
    article: "https://nl.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("nl")
  },
  {
    id: "pl",
    name: "Polski",
    flag: "https://hatscripts.github.io/circle-flags/flags/pl.svg",
    api: "https://pl.wikipedia.org/w/api.php?",
    article: "https://pl.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("pl")
  },
  {
    id: "pt",
    name: "Português",
    flag: "https://hatscripts.github.io/circle-flags/flags/br.svg",
    api: "https://pt.wikipedia.org/w/api.php?",
    article: "https://pt.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("pt")
  },
  {
    id: "ro",
    name: "Română",
    flag: "https://hatscripts.github.io/circle-flags/flags/ro.svg",
    api: "https://ro.wikipedia.org/w/api.php?",
    article: "https://ro.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("ro")
  },
  {
    id: "ru",
    name: "Русский",
    flag: "https://hatscripts.github.io/circle-flags/flags/ru.svg",
    api: "https://ru.wikipedia.org/w/api.php?",
    article: "https://ru.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("ru")
  },
  {
    id: "sk",
    name: "Slovenčina",
    flag: "https://hatscripts.github.io/circle-flags/flags/sk.svg",
    api: "https://sk.wikipedia.org/w/api.php?",
    article: "https://sk.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("sk")
  },
  {
    id: "sr",
    name: "Српски / Srpski",
    flag: "https://hatscripts.github.io/circle-flags/flags/rs.svg",
    api: "https://sr.wikipedia.org/w/api.php?",
    article: "https://sr.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("sr")
  },
  {
    id: "sv",
    name: "Svenska",
    flag: "https://hatscripts.github.io/circle-flags/flags/se.svg",
    api: "https://sv.wikipedia.org/w/api.php?",
    article: "https://sv.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("sv")
  },
  {
    id: "te",
    name: "తెలుగు",
    flag: "https://hatscripts.github.io/circle-flags/flags/in.svg",
    api: "https://te.wikipedia.org/w/api.php?",
    article: "https://te.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("te")
  },
  {
    id: "th",
    name: "ไทย",
    flag: "https://hatscripts.github.io/circle-flags/flags/th.svg",
    api: "https://th.wikipedia.org/w/api.php?",
    article: "https://th.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("th")
  },
  {
    id: "tr",
    name: "Türkçe",
    flag: "https://hatscripts.github.io/circle-flags/flags/tr.svg",
    api: "https://tr.wikipedia.org/w/api.php?",
    article: "https://tr.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("tr")
  },
  {
    id: "uk",
    name: "Українська",
    flag: "https://hatscripts.github.io/circle-flags/flags/ua.svg",
    api: "https://uk.wikipedia.org/w/api.php?",
    article: "https://uk.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("uk")
  },
  {
    id: "ur",
    name: "اردو",
    flag: "https://hatscripts.github.io/circle-flags/flags/pk.svg",
    api: "https://ur.wikipedia.org/w/api.php?",
    article: "https://ur.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("ur")
  },
  {
    id: "vi",
    name: "Tiếng Việt",
    flag: "https://hatscripts.github.io/circle-flags/flags/vn.svg",
    api: "https://vi.wikipedia.org/w/api.php?",
    article: "https://vi.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("vi")
  },
  {
    id: "wuu-hans",
    name: "吴语（简体）",
    flag: "https://hatscripts.github.io/circle-flags/flags/cn.svg",
    api: "https://wuu.wikipedia.org/w/api.php?",
    article: "https://wuu.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("wuu")
  },
  {
    id: "wuu-hant",
    name: "吳語（繁體）",
    flag: "https://hatscripts.github.io/circle-flags/flags/cn.svg",
    api: "https://wuu.wikipedia.org/w/api.php?",
    article: "https://wuu.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("wuu")
  },
  {
    id: "yue-hant",
    name: "粵語（繁體）",
    flag: "https://hatscripts.github.io/circle-flags/flags/hk.svg",
    api: "https://zh-yue.wikipedia.org/w/api.php?",
    article: "https://zh-yue.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("zh-yue")
  },
  {
    id: "zh-cn",
    name: "中文（中国大陆）",
    flag: "https://hatscripts.github.io/circle-flags/flags/cn.svg",
    api: "https://zh.wikipedia.org/w/api.php?",
    article: "https://zh.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("zh")
  },
  {
    id: "zh-hk",
    name: "中文（香港）",
    flag: "https://hatscripts.github.io/circle-flags/flags/hk.svg",
    api: "https://zh.wikipedia.org/w/api.php?",
    article: "https://zh.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("zh")
  },
  {
    id: "zh-mo",
    name: "中文（澳門）",
    flag: "https://hatscripts.github.io/circle-flags/flags/mo.svg",
    api: "https://zh.wikipedia.org/w/api.php?",
    article: "https://zh.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("zh")
  },
  {
    id: "zh-my",
    name: "中文（马来西亚）",
    flag: "https://hatscripts.github.io/circle-flags/flags/my.svg",
    api: "https://zh.wikipedia.org/w/api.php?",
    article: "https://zh.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("zh")
  },
  {
    id: "zh-sg",
    name: "中文（新加坡）",
    flag: "https://hatscripts.github.io/circle-flags/flags/sg.svg",
    api: "https://zh.wikipedia.org/w/api.php?",
    article: "https://zh.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("zh")
  },
  {
    id: "zh-tw",
    name: "中文（臺灣）",
    flag: "https://hatscripts.github.io/circle-flags/flags/tw.svg",
    api: "https://zh.wikipedia.org/w/api.php?",
    article: "https://zh.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("zh")
  },
  {
    id: "ks",
    name: "कॉशुर / کٲشُر",
    flag: "https://hatscripts.github.io/circle-flags/flags/in.svg",
    api: "https://ks.wikipedia.org/w/api.php?",
    article: "https://ks.wikipedia.org/wiki/",
    getApiUrl: () => buildApiUrl("ks")
  },
];
