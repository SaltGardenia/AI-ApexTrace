"use client";

import * as React from "react";
import { dict, type DictKey } from "./translations";
import type { Bilingual, Lang } from "./types";
import { useLangContext } from "./provider";

function interpolate(template: string, params?: Record<string, string | number>) {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, k) =>
    k in params ? String(params[k]) : `{${k}}`,
  );
}

export function useI18n() {
  const { lang, setLang, toggle } = useLangContext();

  const t = React.useCallback(
    (key: DictKey, params?: Record<string, string | number>) =>
      interpolate(dict[key][lang], params),
    [lang],
  );

  const pick = React.useCallback(
    (b?: Bilingual) => (b ? b[lang] : ""),
    [lang],
  );

  return { lang, setLang, toggle, t, pick } as const;
}

export type { Lang, Bilingual } from "./types";
