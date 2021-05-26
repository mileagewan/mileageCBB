const cheerio: any = require('cheerio');

module.exports = (str: string, tags: any) => {
  const $ = cheerio.load(str, { decodeEntities: false });

  if (!tags || tags.length === 0) {
    return str;
  }

  tags = !Array.isArray(tags) ? [tags] : tags;
  let len = tags.length;

  while (len--) {
    $(tags[len]).remove();
  }

  return $.html();
};
