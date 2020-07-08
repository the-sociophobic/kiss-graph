import _ from 'lodash'


// REDO THIS SHIT: DELETE ALL NAMES Unknown 2 etc

const maleNameList = [
  ["Maxim", "Max"],
  ["Vasya", "Vasily", "Vasiliy"],
  "Valera",
  ["Evgeny", "Evgeniy"],  //2 gender name
  "Igor",
  ["Alexander", "Alexandr", "Aleksander", "Aleksandr", "Alek", "Alik", "Sanya", "Sanyok", "Sanek"],  //2 gender name
  ["Roma", "Roman"],
  ["Mikhail", "Mihail", "Misha", "Michael"],
  ["Vitya", "Viktor"],
  "German",
  ["Denis", "Den", "Dekhiar", "Dehiar", "Dekhiyar", "Dekhyyar"],
  ["Tema", "Tyoma", "Artyom", "Artem", "Artyomka", "Artemka", "Artemy"],
  ["Lesha", "Lyosha", "Alexey", "Alexei", "Aleksey", "Aleksei"],
  ["Filip", "Filipp", "Fil", "Fill"],
  ["Dmitriy", "Dmitry", "Dima"],
  ["Danya", "Daniil", "Danyil", "Danik"],
  ["Danil", "Danila"],
  "Ruslan",
  ["Nikita", "Nikitos", "Nick"],
  "Oleg",
  "Egor",
  ["Kirill", "Kiril"],
  "Anton",
  ["Senya", "Arseny", "Arseniy", "Arsenii", "Arseni"],
  ["Arsenty", "Arsentiy", "Arsentii", "Arsenti"],
  ["Ivan", "Vanya", "Vano", "Ioan", "Ioann"],
  ["Vyacheslav", "Vyacheslev"], //2 gender name
  ["Gosha", "Georgy", "Georgiy", "Georgii", "Zhorzh"],
  ["Grisha", "Grigory", "Grigoriy", "Grigorii", "Grigori", "Zhora"],
  "Grigor",
  ["Seryozha", "Serezha", "Sergey", "Sergy", "Sergay", "Sirgey", "Sirgay", "Sirgy"],
  ["Volodya", "Vladimir", "Vlad", "Vova", "Vovan", "Vladislav", "Vladyslav"],
  ["Ilia", "Ilya", "Iliya", "Ilias", "Iliyas", "Ilyas"],
  ["Tima", "Timofey", "Timofei"],
  "Timur",
  ["Petya", "Petia", "Petiya", "Pyotr", "Pyotor", "Petr", "Peter", "Petyr", "Petir", "Piter"],
  "Rolan",
  ["Mark", "Marko"],
  ["Andrey", "Andrei", "Andew"],
  ["Senya", "Senia", "Semyon", "Semen", "Sema", "Syoma"],
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
  ["Fedya", "Fedia", "Fedor", "Fyodor", "Fydor"],
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
  "Mariush",
  ["Sebastyan", "Sebastian"],
  "Matteo",
  "Federico",
  "Matt",
  "Joel",
  ["Tarik", "Turik"],
  "Vsevolod",
  "Moatssem",
  ["Tommy", "Tomas", "Tom", "Tomasz"],
  "Csaba",
  "Darie",
  "Braulio",
  ["Ron", "Rony", "Ronny"],
  "Felix",
  ["Stepa", "Styopa", "Stepan"],
  "Matteus",
  "Amir",
  "Rostislav",
  "Givi",
  ["Serafim", "Seraphim"],
  ["Kolya", "Kolia", "Nikolay", "Nikolai"],
  ["Esconder", "Eskonder"],
  "Rodion",
  "Radik",
  "Azat",
  "Emil",
  "Oliver",
  ["Natan", "Nathan"],
  "Gera",
  "Avvakum",
  ["Matvey", "Matvei", "Matviy"],
  "Karim",
  "Jack",
  "Ilnar",
  "Stanislav",
  "Patrick",
  "Donatas",
  "Marat",
  "Yasha",
  "Ilshat",
  "Svyatoslav",
  str => str.endsWith("slav"),
  ["Dyonisy", "Dyonisiy", "Dionisy", "Dionisiy"],
  "Papa",
  "Makar",
  "Elon",
  ["Johnny", "John"],
  "Anzol",
  "Ares",
  "Ostap",
  "Valentin",
  ["Ilarion", "Illarion"],
  "Rudolph",
  
]
const femaleNameList = [
  ["Anastasia", "Anastasiya", "Nastya"],
  ["Olga", "Olya"],
  ["Kristina", "Kris"],
  ["Anna", "Anya", "Anisya", "Anysya", "Anisia", "Anysia"],
  ["Alexandra", "Aleksandra"],  //2 gender name
  "Sveta",
  ["Sonya", "Sonia", "Sofia", "Sophia", "Sofya", "Sofiya"],
  ["Polina", "Polya"],
  ["Masha", "Maria", "Mariya", "Mary", "Mari", "Marusya", "Maryana", "Mariana"],
  "Maya",
  ["Kira", "‎Keira"],
  ["Lena", "Elena"],
  ["Alyona", "Alena"],
  "Elvira",
  ["Kate", "Katya", "Ekaterina", "Katerina", "Katrin", "Kathrin"],
  ["Nata", "Natasha", "Natalya", "Natalia", "Nataliya"],
  ["Tanya", "Tatyana"],
  "Yana",
  ["Julia", "Juliya", "Julya", "Yulya", "Yuliya", "Yulia", "Yuliana", "Uliya", "Ulia", "Ulya"],
  ["Liza", "Lisa", "Elizaveta"],
  ["Diana", "Dayana"],
  "Dina",
  ["Varya", "Varvara"],
  ["Glasha", "Aglaya"],
  ["Dasha", "Darya", "Dariya", "Daria"],
  "Darina",
  "Dariko",
  ["Tonya", "Tonia", "Antonina"],
  ["Vika", "Viktoriya", "Viktorya", "Viktoria"],
  ["Arina", "Arisha", "Arishka"],
  ["Evgenia", "Evgeniya", "Evgenya"], //2 gender name
  "Zhanna",
  ["Sima", "Serafima", "Seraphima"],
  "Lana",
  ["Nika", "Veronika"],
  "Albina",
  ["Ksusha", "Ksenia", "Kseniya", "Ksenya"],
  ["Rita", "Margarita", "Margo"],
  "Vera",
  ["Ustya", "Ustina"],
  ["Ira", "Irina", "Iren"],
  ["Emilia", "Emilya", "Emiliya", "Emily"],
  ["Alisa", "Alice"],
  ["Lina", "Alina", "Angelina"],
  "Milana",
  ["Valeriya", "Valeria", "Valerya", "Lera"],
  ["Alesya", "Alesia", "Alesiya"],
  "Karina",
  ["Lyuba", "Luba", "Lyubof", "Lubof", "Lyubov", "Lubov"],
  ["Elya", "Elina"],
  ["Vita", "Vitalia", "Vitaliya"],
  ["Anzhela", "Anzhelika", "Angela", "Anjela"],
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
  "Marta",
  ["Patricia", "Patrycia"],
  ["Izabela", "Isabela"],
  "Vasilisa",
  "Fekla",
  ["Liana", "Lyana", "Lianna", "Lyanna", "Lia", "Liya", "Lya"],
  ["Galya", "Galia", "Galina"],
  "Marina",
  "Almira",
  "Nikol",
  "Anisia",
  "Yanita",
  ["Eva", "Eve"],
  "Yulana",
  ["Anita", "Anyta"],
  ["Pelageya", "Pelagea", "Pelageiya", "Pelageia"],
  ["Rebecca", "Becca", "Beca", "Bekka", "Beka"],
  "Inna",
  "Larisa",
  "Amanda",
  ["Safira", "Saphira"],
  "Karolina",
  ["Kamila", "Kamilla"],
  ["Elsa", "Elza"],
  "Samira",
  "Sabina",
  ["Asya", "Asia"],
  ["Agrippina", "Agripina"],
  "Mila",
  ["Luda", "Lyuda", "Ludmila", "Lyudmila"],
  "Alevtina",
  "Oksana",
  "Linda",
  "Roza",
  ["Katalina", "Catalina"],
  ["Stasya", "Stasia"],
  "Malvina",
  ["Melanya", "Melania", "Melaniya"],
  "Mama",
  ["Yaroslava", "Jaroslava"],
  ["Stoya", "Stoia"],
  "Snezhanna",
  "Ayla",
  "Marfa",
  "Vesta",
  "Ksantoria",
  "Regina",
  "Sara",
  ["Adel", "Adelina"],
  "Vasilina",
]

const changeFromNameList = async (store, inputNameList, gender) => {
  let nameList = []

  inputNameList.forEach(name => {
    if (Array.isArray(name))
      name.forEach(subName => nameList.push(subName))
    else
      nameList.push(name)
  })

  var changedNamesNumber = 0

  for (const index in nameList) {
    const nameOrFn = nameList[index]
    let res

    if (typeof nameOrFn === "string") {
      res = store.search({name: nameOrFn})
        .filter(person => 
          person.name.split(" ")[0].toLowerCase() === nameOrFn.toLowerCase()
        )
    } else
      res = store.get().nodes
        .filter(node => nameOrFn(node.name.split(" ")[0].toLowerCase()))
  
    for (const index2 in res) {
      const person = res[index2]
      if (!person.hasOwnProperty("gender")) {
        const resolvedName = await store.push({
          ...person,
          gender: gender
        }, false)
        console.log(++changedNamesNumber + " " + resolvedName.name + " " + resolvedName.gender)
      }
    }        
  }
}

const changeGender = store => {
  changeFromNameList(store, maleNameList, "m") //1/04/2020 478 or 420 names + 7 + 19 + 5 + 10 + 3 + 21 + 12
  changeFromNameList(store, femaleNameList, "f") //1/04/2020 579 names + 11 + 12 + 8 + 6 + 8 + 19
  // changeFromNameList(store, [
  //   ["Anita", "Anyta"],
  //   ["Pelageya", "Pelagea", "Pelageiya", "Pelageia"],
  // ], "f")
}

export default changeGender

const genderDetermined = node => node.gender === "m" || node.gender === "f"

const calcGay = nodes => nodes.map(node => {
  if (node.mates && genderDetermined(node) &&
    node.mates.length > 0 && node.mates
      .map(mate => genderDetermined(mate))
      .reduce((a, b) => a && b))
  {
    let potentialPartners, attractiveness, bmi

    if (node.gender === "m") {
      potentialPartners = node.mates.filter(mate => mate.gender === "f").length
      attractiveness = {am: potentialPartners}
      if (node.weight && node.height)
        bmi = {bmim: (node.weight / ((node.height / 100) ** 2)).toFixed(1)}
    } else {
      potentialPartners = node.mates.filter(mate => mate.gender === "m").length
      attractiveness = {af: potentialPartners}
      if (node.weight && node.height)
        bmi = {bmif: (node.weight / ((node.height / 100) ** 2)).toFixed(1)}
    }    
    const gayPartners = node.mates.length - potentialPartners

    if (gayPartners > 0 && node.mates.length > 4)
      return ({
        ...node,
        ...attractiveness,
        ...bmi,
        gay: Math.round(gayPartners / node.mates.length * 1000) / 10,
      })
    return ({
      ...node,
      ...attractiveness,
      ...bmi,
    })
  }

  return node
})


export {
  genderDetermined,
  calcGay,
}