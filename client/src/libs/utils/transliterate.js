const chars = {
  'а': 'a',
  'б': 'b',
  'в': 'v',
  'г': 'g',
  'д': 'd',
  'е': 'e',
  'ё': 'e',
  'ж': 'zh',
  'з': 'z',
  'и': 'i',
  'к': 'k',
  'л': 'l',
  'м': 'm',
  'н': 'n',
  'о': 'o',
  'п': 'p',
  'р': 'r',
  'с': 's',
  'т': 't',
  'у': 'u',
  'ф': 'f',
  'х': 'kh',
  'ц': 'ts',
  'ч': 'ch',
  'ш': 'sh',
  'щ': 'sch',
  'ъ': '',
  'ы': 'y',
  'ь': '',
  'э': 'e',
  'ю': 'yu',
  'я': 'yf',
}

const replaceCyrillic = string =>
  string.split('')
  .map(char => chars[char] || char)
  .join('')

//TODO юля
const transliterate = string =>
  replaceCyrillic(
    string
      .toLowerCase()
      .replace('ье', 'ye')
      .replace('ия', 'ia')
      .replace('ья', 'ia')
      .replace('ий', 'y')
      .replace('ё', 'е')
  )

export default transliterate