const equalsDict = {
  а: 'a',
  б: 'b',
  в: 'v',
  г: 'g',
  д: 'd',
  е: 'e',
  ё: 'yo',
  ж: 'zh',
  з: 'z',
  и: 'i',
  й: 'j',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ы: 'y',
  ъ: 'ie',
  ь: 'ie',
  э: 'e',
  ю: 'iu',
  я: 'ia',
  ' ': '_',
};

class Text {
  static transliterate(text) {
    const transliterateText = text.split('').map((letter) => {
      const lttr = letter.toLowerCase();
      if (lttr in equalsDict) {
        return equalsDict[lttr];
      }
      return lttr;
    });
    return transliterateText.join('');
  }
}

module.exports = Text;
