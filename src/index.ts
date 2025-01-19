import * as cheerio from 'cheerio';
import { removeTagsAndFurigana } from './utils/index.js';

const URL = process.argv[2];

const res = await fetch(URL);
const html = await res.text();

const $ = cheerio.load(html);

const articleTitle = $('.article-title').html();
const cleanArticleTitle = removeTagsAndFurigana(articleTitle);
console.log(cleanArticleTitle);

const articleDate = $('.article-date').text();
console.log(articleDate);

const paragraphsElement = $('.article-body').html();
const paragraphInnerData = paragraphsElement
  ?.replaceAll(/[\n\s]+/g, '')
  ?.split(/<\/?p>/g)
  .filter(Boolean);

const spansRemoved = paragraphInnerData?.map((p) => p?.split(/<span[^>]*>|<\/span>/g));
const cleanParagraphs = spansRemoved?.map((p) => p?.map(removeTagsAndFurigana).join('')).join('\n\n');
console.log(cleanParagraphs);
