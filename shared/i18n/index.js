// @flow
import i18n from "i18next";
import backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

export const initI18n = () => {
  const lng =
    "DEFAULT_LANGUAGE" in process.env ? process.env.DEFAULT_LANGUAGE : "en_US";

  i18n
    .use(backend)
    .use(initReactI18next)
    .init({
      backend: {
        // this must match the path defined in routes. It's the path that the
        // frontend UI code will hit to load missing translations.
        loadPath: "/locales/{{lng}}.json",
      },
      interpolation: {
        escapeValue: false,
      },
      react: {
        useSuspense: false,
      },
      lng,
      fallbackLng: lng,
      debug: process.env.NODE_ENV === "development",
      keySeparator: false,
    });

  return i18n;
};

// Note: Updating the available languages? Make sure to also update the
// locales array in app/components/LocaleTime.js to enable translation for timestamps.

export const languageOptions = [
  { label: "English (US)", value: "en_US" },
  { label: "简体中文 (Chinese, Simplified)", value: "zh_CN" },
  { label: "Deutsch (Deutschland)", value: "de_DE" },
  { label: "Español (España)", value: "es_ES" },
  { label: "Français (France)", value: "fr_FR" },
  { label: "Italiano (Italia)", value: "it_IT" },
  { label: "한국어 (Korean)", value: "ko_KR" },
  { label: "Português (Portugal)", value: "pt_PT" },
];

export const languages: string[] = languageOptions.map((i) => i.value);
