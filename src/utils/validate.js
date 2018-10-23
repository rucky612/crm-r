export const validate = {
  template: (name, value) => {
    switch (name) {
      case "key":
      case "title":
      case "body":
        return typeof value === "string" && value.length !== 0
      default:
        return true
    }
  },
  replacement: (replacement) => {
    const children = {}
    Object.keys(replacement).forEach((target) => {
      switch (target) {
        case "title":
        case "keyword":
          return children[target] = typeof replacement[target] === "string" && replacement[target].length !== 0
        case "maxByte":
          return children[target] = typeof Number(replacement[target]) === "number" && replacement[target] !== 0
        default:
          return children[target] = true
      }
    })
    const validation = Object.values(children).reduce((pre, cur) => {
      return pre && cur
    })
    return {
      children,
      validation
    }
  }
}