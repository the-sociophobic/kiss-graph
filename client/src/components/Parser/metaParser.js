export default data => {
  const psychic = [
    {
      nickName: "Sasha%20Bashmakov",
      mentalDisorder: 10,
    },
    {
      nickName: "David%20Zharnitsky",
      mentalDisorder: 6,
      iq: "180",
    },
    {
      nickName: "Kirill%20Ermakov",
      mentalDisorder: 6,
      iq: 126,
    },
    {
      nickName: "Nikita%20Baklazhenko",
      mentalDisorder: 5,
      iq: 126,
    },
    {
      nickName: "Tikhon%20Timanov",
      mentalDisorder: 4,
    },
    {
      nickName: "Kristina%20Boyarkina",
      mentalDisorder: 4,
    },
    {
      nickName: "Nastya%20Pavlova",
      mentalDisorder: 5,
    },
    {
      nickName: "Nastya%20IvanovaMonro",
      mentalDisorder: 5,
    },
    {
      nickName: "Anya%20Grin",
      mentalDisorder: 7,
    },
    {
      nickName: "Natalia%20Lebedeva",
      mentalDisorder: 7,
    },
    {
      nickName: "Dmitry%20Larin",
      mentalDisorder: 4,
    },
    {
      nickName: "Elina%20Kulikova",
      mentalDisorder: 3,
    },
    {
      nickName: "Rita%20Popova",
      mentalDisorder: 3,
    },
    {
      nickName: "Alina%20Nesmiyan",
      mentalDisorder: 3,
    },
    {
      nickName: "Arishka%20Bolshakova",
      mentalDisorder: 1,
    },
    {
      nickName: "Varya%20Tuchkova",
      mentalDisorder: 6,
    },
    {
      nickName: "Rita%20Svintsova",
      mentalDisorder: 7,
    },
    {
      nickName: "Lubof%20Safonova",
      mentalDisorder: 7,
    },
    {
      nickName: "Lev%20Vasilyev",
      mentalDisorder: 3,
      iq: 123,
    },
    {
      nickName: "Mark%20Kozharskiy",
      mentalDisorder: 3,
    },
    {
      nickName: "Mks%20Astro",
      mentalDisorder: 2.5,
      iq: 133,
    },
    {
      nickName: "Yana%20Moiseeva",
      mentalDisorder: 2,
      iq: 126,
    },
    {
      nickName: "Polina%20Tavturina",
      mentalDisorder: 3,
    },
    {
      nickName: "Andrey%20Potashev",
      mentalDisorder: 4,
      iq: 121,
    },
    {
      nickName: "Kate%20Sulina",
      mentalDisorder: 2,
    },
    {
      nickName: "Yuliya%20Gracheva",
      mentalDisorder: 2,
    },
    {
      nickName: "Egor%20Vysberg",
      mentalDisorder: 3,
    },
    {
      nickName: "Pyotr%20Grachev",
      mentalDisorder: 5,
    },
    {
      nickName: "Artyom%20Povalyaev",
      mentalDisorder: 3,
    },
    {
      nickName: "Varya%20Vodova",
      mentalDisorder: 2,
    },
    {
      nickName: "Artyom%20Sverbaev",
      mentalDisorder: 3,
    },
    {
      nickName: "Sobaka%20Ilya",
      mentalDisorder: 5,
    },
    {
      nickName: "Vadim%20Zimin",
      mentalDisorder: 3,
      iq: 115,
    },
    {
      nickName: "Kate%20Alexandrova",
      mentalDisorder: 1,
      iq: 121,
    },
    {
      nickName: "Nata%20Naumova",
      mentalDisorder: 3,
    },
    {
      nickName: "Sasha%20Chernyshov",
      mentalDisorder: 1.5,
    },
    {
      nickName: "Anton%20Plevako",
      mentalDisorder: 2,
      iq: 119,
    },
    {
      nickName: "Sergay%20Nikitin",
      mentalDisorder: 2,
      iq: 105,
    },
    {
      nickName: "Kira%20Kastaneda",
      mentalDisorder: 2.5,
      iq: 115,
    },
    {
      nickName: "Natasha%20Kozhevnikova",
      mentalDisorder: 1.5,
    },
    {
      nickName: "Nikita%20Danilchenko",
      mentalDisorder: 2.5,
    },
    {
      nickName: "Kate%20Rusetskaya",
      mentalDisorder: 1.5,
    },
  ]

  return {
    nodes: data.nodes.map(node => {
      const psychoIndex = psychic.map(psycho => psycho.nickName.replace('%20', ' ')).indexOf(node.nickName)
      const edges = data.edges
        .map(edge =>
          edge.node0 === node.nickName ||
          edge.node1 === node.nickName ? 1 : 0
        )
        .reduce((a, b) => a + b)
      
      return {
        name: node.nickName,
        connections: edges,
        mentalDisorder: psychoIndex !== -1 ? psychic[psychoIndex].mentalDisorder : undefined,
        // iq: psychoIndex !== -1 ? psychic[psychoIndex].iq : undefined,
      }
    })
    .sort((a, b) => b.connections - a.connections),
    edges: data.edges
  }
}