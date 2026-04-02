export const FLAG_FILE_BY_COUNTRY = {
  "United States": "us.svg",
  Canada: "ca.svg",
  "United Kingdom": "gb.svg",
  Germany: "de.svg",
  France: "fr.svg",
  Spain: "es.svg",
  Italy: "it.svg",
  Netherlands: "nl.svg",
  Sweden: "se.svg",
  Norway: "no.svg",
  Denmark: "dk.svg",
  Australia: "au.svg",
  India: "in.svg",
  Japan: "jp.svg",
  China: "cn.svg",
  Brazil: "br.svg",
  Mexico: "mx.svg",
  "South Africa": "za.svg",
  Nigeria: "ng.svg",
  Kenya: "ke.svg",
  Other: "other.svg",
};

export const DEFAULT_FLAG_FILE = FLAG_FILE_BY_COUNTRY.Other;

export function flagSrc(flagFile) {
  return `/flags/${flagFile}`;
}

export function getFlagAsset({ country, flagFile, alt } = {}) {
  const file =
    flagFile ??
    (country != null && country !== ""
      ? (FLAG_FILE_BY_COUNTRY[country] ?? DEFAULT_FLAG_FILE)
      : DEFAULT_FLAG_FILE);
  const resolvedAlt =
    alt ?? (country != null && country !== "" ? `${country} flag` : "Flag");
  return {
    src: flagSrc(file),
    flagFile: file,
    alt: resolvedAlt,
  };
}
