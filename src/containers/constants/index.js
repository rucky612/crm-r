export const sgsgColor = {
  white: "#fff",
  black: "#000",
  primary: "#5867dd",
  success: "#34bfa3",
  warning: "#ffb822",
  danger: "#f4516c",
  metal: "#c4c5c6",
  info: "#36a3f7",
  brand: "#716aca",
  focus: "#9816f4",
  gray: "#ced4da",
  textGray: "#444"
}

export const sgsgSize = {
  large: "1.15rem 1.65rem",
  medium: ".75rem 1.15rem",
  small: ".4rem .8rem"
}

export const sgsgButtonSize = {
  large: "1.25rem 1.65rem",
  medium: ".85rem 1.15rem",
  small: ".5rem .8rem"
}

export const switchColor = (state, defaultColor = sgsgColor.gray) => {
  switch (state) {
    case "info":
      return sgsgColor.info
    case "primary":
      return sgsgColor.primary
    case "success":
      return sgsgColor.success
    case "danger":
      return sgsgColor.danger
    case "warning":
      return sgsgColor.warning
    case "brand":
      return sgsgColor.brand
    case "focus": 
      return sgsgColor.focus
    case "metal":
      return sgsgColor.metal
    default:
      return defaultColor
  }
}

export const backgroundColor = (state, outline = false) => {
  if(!outline) {
    return switchColor(state, sgsgColor.white)
  } else {
    return sgsgColor.white
  }
}

export const textColor = (state, outline = false) => {
  if(!outline) {
    return state ? sgsgColor.white : sgsgColor.black
  } else {
    return switchColor(state)
  }
}

export const switchSize = (size) => {
  switch (size) {
    case "large":
      return sgsgSize.large
    case "small":
      return sgsgSize.small
    default:
      return sgsgSize.medium
  }
}

export const switchButtonSize = size => {
  switch (size) {
    case "large":
      return sgsgButtonSize.large
    case "small":
      return sgsgButtonSize.small
    default:
      return sgsgButtonSize.medium
  }
}
