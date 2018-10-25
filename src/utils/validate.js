let finalPass = true

export const templateValidate = (template) => {
  finalPass = true
  const errorData = {
    key: validateKey(template.key),
    title: validateTitle(template.title),
    body: validateBody(template.body, template.replacements),
    replacements: template.replacements.map(item => validateReplacement(item))
  }
  return { errorData, finalPass }
}

function errorMessage(boolean, str) {
  if(!boolean) finalPass = boolean
  return {
    boolean,
    stateColor: boolean ? "success" :"danger",
    message: boolean ? "success" :`${str}`
  }
}

export const validateKey = (key) => {
  const boolean = typeof key === 'string' && key.length !== 0
  return errorMessage(boolean, "템플릿 키는 필수 입력입니다.")
}

export const validateTitle = (title) => {
  const boolean = typeof title === 'string' && title.length !== 0
  return errorMessage(boolean, "템플릿 제목은 필수 입력입니다..")
}

export const validateBody = (body, replacements) => {
  if(typeof body !== 'string' || body.length === 0) {
    return errorMessage(false, "내용은 필수 입력입니다.")
  } else if(!replacements.every(item => body.includes(item.keyword))) {
    return errorMessage(false, "내용에는 등록한 키워드를 전부 사용해야 합니다.")
  } else {
    return errorMessage(true)
  }
}

export const validateReplacement = (replacement) => {
  return {
    title: validateRepalcementTitle(replacement.title),
    keyword: validateReplacementKeyword(replacement.keyword),
    maxByte: validateReplacementMaxByte(replacement.maxByte)
  }
}

export const validateRepalcementTitle = (title) => {
  const boolean = typeof title === 'string' && title.length !== 0
  return errorMessage(boolean, "제목은 필수 입력입니다.")
}

export const validateReplacementKeyword = (keyword, replacements) => {
  if(typeof keyword !== 'string' || keyword.length === 0) {
    return errorMessage(false, "키워드는 필수 입력입니다")
  } else if(replacements.some((item) => item === keyword)) {
    return errorMessage(false, "키워드 이름은 중복이 안 됩니다.")
  } else {
    return errorMessage(true)
  }
}

export const validateReplacementMaxByte = (maxByte) => {
  if(new RegExp(/[^0-9]/g).test(maxByte)) {
    return errorMessage(false, "최대 바이트는 필수 입력입니다")
  } else if(maxByte.length <= 20) {
    return errorMessage(false, "키워드는 최대 20자리까지 가능합니다.")
  } else {
    return errorMessage(true)
  }
}

export default templateValidate


