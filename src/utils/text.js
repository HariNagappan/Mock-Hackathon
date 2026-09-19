const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Splits `text` into pieces, flagging the ones that match `query` (case-insensitive). */
export function splitByMatch(text, query) {
  const needle = query.trim();
  if (!needle) return [{ text, match: false }];

  // A capture group makes split() keep the matches, always at odd indexes.
  return text
    .split(new RegExp(`(${escapeRegExp(needle)})`, 'gi'))
    .map((part, index) => ({ text: part, match: index % 2 === 1 }))
    .filter((part) => part.text !== '');
}

export const pluralize = (count, singular, plural = `${singular}s`) =>
  `${count} ${count === 1 ? singular : plural}`;
