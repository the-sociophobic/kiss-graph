const socialLinks = {
  tg: {
    label: "tg",
    link: "t.me",
  },
  vk: {
    label: "vk",
    link: "vk.com",
  },
  vk2: {
    label: "vk",
    link: "vk.com",
  },
  inst: {
    label: "inst",
    link: "instagram.com",
  },
  inst2: {
    label: "inst",
    link: "instagram.com",
  },
  yt: {
    label: "yt",
    link: "www.youtube.com",
  },
  yt2: {
    label: "yt",
    link: "www.youtube.com",
  },
  clubhouse: {
    label: "clubhouse",
    link: "www.joinclubhouse.com",
    noLink: userName => `clubhouse: @${userName}`,
  },
  twit: {
    label: "twit",
    link: "twitter.com",
  },
  twit2: {
    label: "twit",
    link: "twitter.com",
  },
  fb: {
    label: "fb",
    link: "www.facebook.com",
  },
  fb2: {
    label: "fb",
    link: "www.facebook.com",
  },
  steam: {
    label: "steam",
    link: "steamcommunity.com",
  },
  behance: {
    label: "behance",
    link: "behance.net",
  },
  dribbble: {
    label: "dribbble",
    link: "dribbble.com",
  },
  discord: {
    label: "discord",
    link: "discordapp.com",
    // disabled: true
    noLink: userName => `discord: @${userName}`
  },
  soundcloud: {
    label: "soundcloud",
    link: "soundcloud.com"
  },
  twitch: {
    label: "twitch",
    link: "twitch.tv"
  },
  ticktok: {
    label: "tiktok",
    link: "tiktok.com"
  }, //REDO THIS SHIT: It's tiktok
  tiktok2: {
    label: "tiktok",
    link: "tiktok.com"
  },
  tiktok3: {
    label: "tiktok",
    link: "tiktok.com"
  },
  skype: {
    label: "skype",
    link: "skype.com",
    disabled: true
  },
  linkedin: {
    label: "linkedin",
    link: "linkedin.com/in"
  },
  phone: {
    label: "phone",
    link: "",
    disabled: true
  },
  github: {
    label: 'gh',
    link: 'github.com',
  },
  spotify: {
    label: 'spotify',
    link: 'open.spotify.com/user',
  },
}

const parseLinks = social => social &&
  Object.keys(social)
    .filter(key => !socialLinks[key].disabled)
    .map(key => socialLinks[key] && ({
      url: (socialLinks[key].link + (key !== "ticktok" && !key.includes("ticktok") ? "/" : "/@") + social[key]),
      userName: social[key],
      label: socialLinks[key].label,
      noLink: socialLinks[key].noLink?.(social[key]),
    }))
      

export {
  socialLinks,
  parseLinks,
}