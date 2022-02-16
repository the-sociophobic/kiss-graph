const fixStringForMarkdownV2 = (string: string) =>
  string
    .replace(/\_/g, "\\_")
    .replace(/\*/g, "\\*")
    .replace(/\[/g, "\\[")
    .replace(/\]/g, "\\]")
    .replace(/\`/g, "\\`")


export default fixStringForMarkdownV2