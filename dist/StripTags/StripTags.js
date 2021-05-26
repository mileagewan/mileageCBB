var cheerio = require('cheerio');
module.exports = function (str, tags) {
    var $ = cheerio.load(str, { decodeEntities: false });
    if (!tags || tags.length === 0) {
        return str;
    }
    tags = !Array.isArray(tags) ? [tags] : tags;
    var len = tags.length;
    while (len--) {
        $(tags[len]).remove();
    }
    return $.html();
};
