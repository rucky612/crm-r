export default function(name, value) {
  switch (name) {
    case "key":
      return typeof value === "string" && value.length !== 0
    case "title":
      return typeof value === "string" && value.length !== 0
    case "body":
      return typeof value === "string" && value.length !== 0
    default:
      return true
  }
}