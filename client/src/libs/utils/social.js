const socialLinks = {
  tg: {link: "t.me",},
  vk: {link: "vk.com",},
  vk2: {link: "vk.com",},
  inst: {link: "instagram.com",},
  inst2: {link: "instagram.com",},
  twit: {link: "twitter.com",},
  yt: {link: "www.youtube.com",},
  fb: {link: "www.facebook.com",},
  fb2: {link: "www.facebook.com",},
  steam: {link: "steamcommunity.com",},
  behance: {link: "behance.net",},
  dribbble: {link: "dribbble.com",},
  discord: {link: "discordapp.com", disabled: true},
  soundcloud: {link: "soundcloud.com"},
  twitch: {link: "twitch.tv"},
  ticktok: {link: "tiktok.com"}, //REDO THIS SHIT: It's tiktok
  skype: {link: "skype.com", disabled: true},
  linkedin: {link: "linkedin.com"},
  phone: {link: "", disabled: true},
  // tg: {link: "t.me", disabled: true},
  // vk: {link: "vk.com", disabled: true},
  // vk2: {link: "vk.com", disabled: true},
  // inst: {link: "instagram.com", disabled: true},
  // inst2: {link: "instagram.com", disabled: true},
  // twit: {link: "twitter.com", disabled: true},
  // yt: {link: "www.youtube.com", disabled: true},
  // fb: {link: "www.facebook.com", disabled: true},
  // fb2: {link: "www.facebook.com", disabled: true},
  // steam: {link: "steamcommunity.com", disabled: true},
  // behance: {link: "behance.net", disabled: true},
  // dribbble: {link: "dribbble.com", disabled: true},
  // discord: {link: "discordapp.com", disabled: true},
  // soundcloud: {link: "soundcloud.com", disabled: true},
  // ticktok: {link: "tiktok.com", disabled: true},
  // skype: {link: "skype.com", disabled: true},
  // linkedin: {link: "linkedin.com", disabled: true},
  // phone: {link: "", disabled: true},
}

const parseLinks = social => social &&
  Object.keys(social)
    .filter(key => !socialLinks[key].disabled)
    .map(key => socialLinks[key] && (socialLinks[key].link + (key !== "ticktok" ? "/" : "/@") + social[key]))

export {
  socialLinks,
  parseLinks,
}