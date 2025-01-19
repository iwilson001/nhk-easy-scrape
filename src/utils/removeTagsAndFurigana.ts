/**
 * Given a string of HTML, return the kanji characters found in the text. Strip out any furigana.
 * @param html should look like: `<ruby>漢字<rt>かんじ</rt></ruby>`
 * @returns kanji characters found in the text
 */
export const removeTagsAndFurigana = (html: string | null): string => {
  if (html === null) throw new Error('No HTML provided');
  if (typeof html !== 'string') throw new Error('HTML must be a string');

  if (html.length === 0) return '';
  if (!html.includes('<ruby>')) return html;

  const cleanHtml = html
    .replaceAll(/[\n\s]+/g, '')
    .split(/<\/?ruby>/g)
    .filter(Boolean)
    .map((str) => {
      const rtIndex = str.indexOf('<rt>');

      return rtIndex === -1 ? str : str.substring(0, rtIndex);
    });

  return cleanHtml.join('');
};
