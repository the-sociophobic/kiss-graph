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
  ticktok: {link: "ticktok.com", disabled: true},
  skype: {link: "skype.com", disabled: true},
  linkedin: {link: "linkedin.com"},
  phone: {link: "", disabled: true},
}

const parseLinks = social => social &&
  Object.keys(social)
    .filter(key => !socialLinks[key].disabled)
    .map(key => socialLinks[key] && (socialLinks[key].link + "/" + social[key]))

export {
  socialLinks,
  parseLinks,
}