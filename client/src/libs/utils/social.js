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
    link: "linkedin.com"
  },
  phone: {
    label: "phone",
    link: "",
    disabled: true
  },
  // tg: {
  //   label: "//",
  //   link: "t.me", disabled: true
  // },
  // vk: {
  //   label: "//",
  //   link: "vk.com", disabled: true
  // },
  // vk2: {
  //   label: "//",
  //   link: "vk.com", disabled: true
  // },
  // inst: {
  //   label: "//",
  //   link: "instagram.com", disabled: true
  // },
  // inst2: {
  //   label: "//",
  //   link: "instagram.com", disabled: true
  // },
  // twit: {
  //   label: "//",
  //   link: "twitter.com", disabled: true
  // },
  // yt: {
  //   label: "//",
  //   link: "www.youtube.com", disabled: true
  // },
  // fb: {
  //   label: "//",
  //   link: "www.facebook.com", disabled: true
  // },
  // fb2: {
  //   label: "//",
  //   link: "www.facebook.com", disabled: true
  // },
  // steam: {
  //   label: "//",
  //   link: "steamcommunity.com", disabled: true
  // },
  // behance: {
  //   label: "//",
  //   link: "behance.net", disabled: true
  // },
  // dribbble: {
  //   label: "//",
  //   link: "dribbble.com", disabled: true
  // },
  // discord: {
  //   label: "//",
  //   link: "discordapp.com", disabled: true
  // },
  // soundcloud: {
  //   label: "//",
  //   link: "soundcloud.com", disabled: true
  // },
  // ticktok: {
  //   label: "//",
  //   link: "tiktok.com", disabled: true
  // },
  // skype: {
  //   label: "//",
  //   link: "skype.com", disabled: true
  // },
  // linkedin: {
  //   label: "//",
  //   link: "linkedin.com", disabled: true
  // },
  // phone: {
  //   label: "//",
  //   link: "", disabled: true
  // },
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