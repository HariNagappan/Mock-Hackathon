import { splitByMatch } from '../utils/text';

/** Renders `text` with the parts that match the search query wrapped in <mark>. */
export default function HighlightedText({ text, query }) {
  return splitByMatch(text, query).map((part, index) =>
    part.match ? <mark key={index}>{part.text}</mark> : part.text,
  );
}
