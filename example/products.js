var format = require('string-format');
var bundles = require('../json/bundles.json').bundles;

module.exports = function () {
    var result = '';
    for (var i = 0; i < bundles.length; i++) {
        var bundle = bundles[i];
        var strbundle = format("{title} gives you {data} data, {minutes} minutes, {texts} texts. ", bundle);
        result = result.concat(strbundle);
    }
    return result;
};