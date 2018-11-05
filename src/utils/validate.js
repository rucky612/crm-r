export const validate = {
  template: (name, value) => {
    switch (name) {
      case 'key':
      case 'title':
      case 'body':
        return typeof value === 'string' && value.length !== 0
      default:
        return true
    }
  },
  replacement: (name, value) => {
    switch (name) {
      case 'title':
      case 'keyword':
        return typeof value === 'string' && value.length !== 0
      case 'maxByte':
        return typeof value === 'number' && value !== 0
      default:
        return true
    }
  }
}