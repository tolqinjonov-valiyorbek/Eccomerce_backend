// const cyrillicToLatinMapping = {
//   а: "a",
//   б: "b",
//   в: "v",
//   г: "g",
//   д: "d",
//   е: "e",
//   ё: "yo",
//   ж: "j",
//   з: "z",
//   и: "i",
//   й: "y",
//   к: "k",
//   л: "l",
//   м: "m",
//   н: "n",
//   о: "o",
//   п: "p",
//   р: "r",
//   с: "s",
//   т: "t",
//   у: "u",
//   ф: "f",
//   х: "x",
//   ц: "ts",
//   ч: "ch",
//   ш: "sh",
//   щ: "sh",
//   ъ: "",
//   ы: "y",
//   ь: "",
//   э: "e",
//   ю: "yu",
//   я: "ya",
//   А: "A",
//   Б: "B",
//   В: "V",
//   Г: "G",
//   Д: "D",
//   Е: "E",
//   Ё: "Yo",
//   Ж: "J",
//   З: "Z",
//   И: "I",
//   Й: "Y",
//   К: "K",
//   Л: "L",
//   М: "M",
//   Н: "N",
//   О: "O",
//   П: "P",
//   Р: "R",
//   С: "S",
//   Т: "T",
//   У: "U",
//   Ф: "F",
//   Х: "X",
//   Ц: "Ts",
//   Ч: "Ch",
//   Ш: "Sh",
//   Щ: "Sh",
//   Ъ: "",
//   Ы: "Y",
//   Ь: "",
//   Э: "E",
//   Ю: "Yu",
//   Я: "Ya",
// };

const cyrillicToLatinMapping = {
    а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'yo', ж: 'zh', з: 'z', и: 'i', й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'kh', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'shch', ъ: '', ы: 'y', ь: '', э: 'e', ю: 'yu', я: 'ya',
    А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ё: 'Yo', Ж: 'Zh', З: 'Z', И: 'I', Й: 'Y', К: 'K', Л: 'L', М: 'M', Н: 'N', О: 'O', П: 'P', Р: 'R', С: 'S', Т: 'T', У: 'U', Ф: 'F', Х: 'Kh', Ц: 'Ts', Ч: 'Ch', Ш: 'Sh', Щ: 'Shch', Ъ: '', Ы: 'Y', Ь: '', Э: 'E', Ю: 'Yu', Я: 'Ya'
  };
  
  function transliterateCyrillicToLatin(cyrillicString) {
    return cyrillicString
      .split('')
      .map(cyrillicChar => cyrillicToLatinMapping[cyrillicChar] || cyrillicChar)
      .join('');
  }
  
  module.exports = {
    transliterateCyrillicToLatin
  }