// REDO THIS SHIT: DELETE ALL NAMES Unknown 2 etc

const maleNameList = [
  ["Maxim", "Max"],
  ["Vasya", "Vasily", "Vasiliy"],
  "Valera",
  ["Evgeny", "Evgeniy"],  //2 gender name
  "Igor",
  ["Alexander", "Alexandr"],  //2 gender name
  ["Roma", "Roman"],
  ["Mikhail", "Mihail", "Misha", "Michael"],
  ["Vitya", "Viktor"],
  "German",
  ["Denis", "Den", "Dekhiar", "Dehiar", "Dekhiyar", "Dekhyyar"],
  ["Tema", "Tyoma", "Artyom", "Artem", "Artyomka", "Artemka", "Artemy"],
  ["Lesha", "Lyosha", "Alexey", "Alexei"],
  ["Filip", "Filipp", "Fil"],
  ["Dmitriy", "Dmitry", "Dima"],
  ["Danya", "Daniil", "Danyil"],
  ["Danil", "Danila"],
  "Ruslan",
  ["Nikita", "Nikitos", "Nick"],
  "Oleg",
  "Egor",
  ["Kirill", "Kiril"],
  "Anton",
  ["Senya", "Arseny", "Arseniy", "Arsenii", "Arseni"],
  ["Arsenty", "Arsentiy", "Arsentii", "Arsenti"],
  ["Ivan", "Vanya", "Vano"],
  "Vyacheslav", //2 gender name
  ["Gosha", "Georgy", "Georgiy", "Georgii", "Zhorzh"],
  ["Grisha", "Grigory", "Grigoriy", "Grigorii", "Grigori"],
  "Grigor",
  ["Seryozha", "Serezha", "Sergey", "Sergy", "Sergay", "Sirgey", "Sirgay", "Sirgy"],
  ["Volodya", "Vladimir", "Vlad", "Vova", "Vovan"],
  ["Ilia", "Ilya", "Iliya", "Ilias", "Iliyas", "Ilyas"],
  ["Tima", "Timofey", "Timofei"],
  "Timur",
  ["Petya", "Petia", "Petiya", "Pyotr", "Pyotor", "Petr", "Peter", "Petyr", "Petir", "Piter"],
  "Rolan",
  ["Mark", "Marko"],
  ["Andrey", "Andrei", "Andew"],
  ["Senya", "Senia", "Semyon", "Semen"],
  ["Lenya", "Lyonya", "Lenny", "Leonid", "Leonyd"],
  "Aziz",
  "Stas",
  ["Borya", "Boria", "Boris"],
  ["Artur", "Arthur"],
  ["Pasha", "Pavel"],
  ["Edik", "Eduard", "Edward"],
  "Robert",
  ["Vadik", "Vadim"],
  ["Ildar", "Eldar"],
  ["Yuriy", "Yury", "Uriy", "Ury", "Yura", "Ura"],
  "Stefan",
  ["Fedya", "Fedia", "Fedor", "Fyodor"],
  ["David", "Devid"],
  ["Damir", "Damyr"],
  ["Tihon", "Tikhon"],
  ["Leva", "Lyova", "Lev", "Leo"],
  "Martin",
  "Bogdan",
  "Oslab",
  "Savva",
  "Yan",
  "Klim",
  ["Yaroslav", "Yarik", "Slava", "Slavik"],
  ["Konstantin", "Kostya", "Kostia"],
  "Gleb",
  ["Venya", "Venia", "Veniamin", "Venyamin"],
  ["Vitalik", "Vitaly", "Vitaliy", "Vitalii", "Vitali"],
  ["Gena", "Genady", "Genadiy", "Genadii", "Genadi"],

]
const femaleNameList = [
  ["Anastasia", "Anastasiya", "Nastya"],
  ["Olga", "Olya"],
  ["Kristina", "Kris"],
  ["Anna", "Anya"],
  "Alexandra",  //2 gender name
  "Sveta",
  ["Sonya", "Sonia", "Sofia", "Sofya", "Sofiya"],
  ["Polina", "Polya"],
  ["Masha", "Maria", "Mariya"],
  "Maya",
  "Kira",
  ["Lena", "Elena"],
  ["Alyona", "Alena"],
  "Elvira",
  ["Kate", "Katya", "Ekaterina", "Katerina", "Katrin", "Kathrin"],
  ["Nata", "Natasha", "Natalya", "Natalia", "Nataiya"],
  ["Tanya", "Tatyana"],
  "Yana",
  ["Julia", "Juliya", "Julya", "Yulya", "Yuliya", "Yulia", "Uliya", "Ulia", "Ulya"],
  ["Liza", "Lisa", "Elizaveta"],
  ["Diana", "Dayana"],
  "Dina",
  ["Varya", "Varvara"],
  ["Glasha", "Aglaya"],
  ["Dasha", "Darya", "Dariya", "Daria"],
  "Darina",
  "Dariko",
  ["Tonya", "Tonia"],
  ["Vika", "Viktoriya", "Viktorya"],
  ["Arina", "Arisha", "Arishka"],
  ["Evgenia", "Evgeniya", "Evgenya"], //2 gender name
  "Zhanna",
  ["Sima", "Serafima"],
  "Lana",
  ["Nika", "Veronika"],
  "Albina",
  ["Ksusha", "Ksenia", "Kseniya", "Ksenya"],
  ["Rita", "Margarita", "Margo"],
  "Vera",
  ["Ustya", "Ustina"],
  ["Ira", "Irina"],
  ["Emilia", "Emilya", "Emiliya", "Emily"],
  ["Alisa", "Alice"],
  ["Lina", "Alina"],
  "Milana",
  ["Valeriya", "Valeria", "Valerya", "Lera"],
  ["Alesya", "Alesia", "Alesiya"],
  "Karina",
  ["Lyuba", "Luba", "Lyubof", "Lubof", "Lyubov", "Lubov"],
  ["Elya", "Elina"],
  ["Vita", "Vitalia", "Vitaliya"],
  ["Anzhela", "Anzhelika"],
  "Anfisa",
  "Lolita",
  ["Lada", "Vlada", "Vladislava"],
  "Inessa",
  ["Taisiya", "Taisia", "Taisya", "Tasya", "Tasia"],
  "Kalina",
  "Sabrina",
  ["Ronya", "Ronia"],
  ["Liliya", "Lilia", "Lilya"],
  ["Aelitta", "Aelita", "Aellyta", "Aelyta"],
  "Nina",
  ["Sveta", "Svetlana"],
  ["Nadezhda", "Nadya", "Nadia"],
  "Marta"
]

const changeFromNameList = async (store, inputNameList, gender) => {
  let nameList = []

  inputNameList.forEach(name => {
    if (Array.isArray(name))
      name.forEach(subName => nameList.push(subName))
    else
      nameList.push(name)
  })

  console.log(nameList)
  var changedNamesNumber = 0

  for (const index in nameList) {
    const name = nameList[index]
    const res = store.search({name: name})
      .filter(person => person.name.split(" ")[0].toLowerCase() === name.toLowerCase())
    
    for (const index2 in res) {
      const person = res[index2]
      if (!person.hasOwnProperty("gender")) {
        const resolvedName = await store.push({
          ...person,
          gender: gender
        })
        console.log(++changedNamesNumber + " " + resolvedName.name + " " + resolvedName.gender)
      }
    }
  }
  // console.log(changedNamesNumber)
}

const changeGender = store => {
  changeFromNameList(store, maleNameList, "m") //1/04/2020 478 or 420 names + 7 + 19 + 5 + 10 + 3 + 21 + 12
  changeFromNameList(store, femaleNameList, "f") //1/04/2020 579 names + 11 + 12 + 8 + 6 + 8 + 19
}

export default changeGender

const calcGay = nodes => nodes.map(node => {
  const genderDetermined = node => node.gender === "m" || node.gender === "f"

  if (genderDetermined(node) &&
    node.mates.length > 0 && node.mates
      .map(mate => genderDetermined(mate))
      .reduce((a, b) => a && b))
  {
    let gay

    if (node.gender === "m")
      gay = node.mates.filter(mate => mate.gender === "m")
    else
      gay = node.mates.filter(mate => mate.gender === "f")
    
    gay = Math.round(gay.length / node.mates.length * 1000) / 10
    return ({
      ...node,
      gay: gay
    })
  }

  return node
})

export { calcGay }