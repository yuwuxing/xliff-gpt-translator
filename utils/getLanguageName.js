/**
 * The function takes a language code and returns the corresponding language name using ISO 639-1 or
 * LCID.
 * @param code - The parameter "code" is a string representing a language code. It can be either an ISO
 * 639-1 language code or an LCID (Locale Identifier) code. The function "getLanguageName" takes this
 * code as input and returns the corresponding language name.
 * @returns The function `getLanguageName` returns the name of a language given its ISO 639-1 code or
 * LCID (language code identifier). If the input code is a valid ISO 639-1 code, the function returns
 * the name of the language using the `iso6391.getName` method. If the input code is not a valid ISO
 * 639-1 code, the function splits the
 */
const iso6391 = require('iso-639-1');

function getLanguageName(code) {
  if (iso6391.validate(code)) {
    return iso6391.getName(code);
  } else {
    const [language, script] = code.split('-');
    const languageName = iso6391.getName(language);
    return languageName;
  }
}

module.exports = getLanguageName;