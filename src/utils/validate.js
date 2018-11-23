let finalPass = true

export const templateValidate = (template) => {
  finalPass = true
  const errorData = {
    // key: validateKey(template.key),
    title: validateTitle(template.title),
    body: validateBody(template.body, template.replacements),
    // memo: validateMemo(template.memo),memo
    replacements: template.replacements.map(item => validateReplacement(item, template.replacements))
  }
  return { errorData, finalPass }
}

function errorMessage(boolean, str) {
  if (!boolean) {
    finalPass = boolean
  }
  if (boolean === 'warning') {
    return {
      boolean: false,
      color: boolean,
      msg: `${str}`
    }
  }
  return {
    boolean,
    color: boolean ? 'success' : 'danger',
    msg: boolean ? 'success' : `${str}`
  }
}

export const validateKey = (key) => {
  const boolean = typeof key === 'string' && key.length !== 0
  return errorMessage(boolean, '템플릿 키는 필수 입력입니다.')
}

export const validateTitle = (title) => {
  const boolean = typeof title === 'string' && title.length !== 0
  return errorMessage(boolean, '템플릿 제목은 필수 입력입니다..')
}

export const validateMemo = (memo) => {
  const boolean = typeof memo === 'string' && memo.length !== 0
  return errorMessage(boolean, '템플릿 메모는 필수 입력입니다..')
}

export const validateBody = (body, replacements) => {
  if (typeof body !== 'string' || body.length === 0) {
    return errorMessage(false, '내용은 필수 입력입니다.')
  } else if (!replacements.every(item => body.includes(`:${item.keyword}:`))) {
    return errorMessage('warning', '내용에는 등록한 키워드를 전부 사용해야 합니다.')
  } else {
    return errorMessage(true)
  }
}

export const validateReplacement = (replacement, replacements) => {
  return {
    title: validateRepalcementTitle(replacement.title),
    keyword: validateReplacementKeyword(replacement.keyword, replacements),
    maxByte: validateReplacementMaxByte(replacement.maxByte)
    // defaultValue: validateRepalcementDefaultValue(replacement.defaultValue, replacement.maxByte)
  }
}

export const validateRepalcementTitle = (title) => {
  if (title === null) return errorMessage(false, '제목은 필수 입력입니다.')
  const boolean = typeof title === 'string' && title.length !== 0
  return errorMessage(boolean, '제목은 필수 입력입니다.')
}

export const validateRepalcementDefaultValue = (defaultValue, maxByte) => {
  if (defaultValue === null) return errorMessage(false, '기본값은 필수 입력입니다.')
  if (typeof defaultValue !== 'string' || defaultValue.length === 0) {
    return errorMessage(false, '기본값은 필수 입력입니다.')
  } else if (Buffer.byteLength(defaultValue, 'utf8') > maxByte) {
    return errorMessage(false, '기본값은 최대 Byte보다 작은 값이어야 합니다..')
  } else {
    return errorMessage(true)
  }
}

export const validateReplacementKeyword = (keyword, replacements) => {
  if (keyword === null) return errorMessage(false, '키워드는 필수 입력입니다.')
  if (typeof keyword !== 'string' || keyword.length === 0) {
    return errorMessage(false, '키워드는 필수 입력입니다')
  } else {
    return errorMessage(true)
  }
}

export const validateReplacementMaxByte = (maxByte) => {
  if (maxByte === null) return errorMessage(false, '최대바이트는 필수 입력입니다.')
  if (maxByte.length === 0) {
    return errorMessage(false, '최대 바이트는 필수 입력입니다')
  } else if (new RegExp(/[^0-9]/g).test(Number(maxByte))) {
    return errorMessage(false, '최대 바이트는 필수 입력입니다')
  } else if (Number(maxByte).length <= 20) {
    return errorMessage(false, '키워드는 최대 20자리까지 가능합니다.')
  } else {
    return errorMessage(true)
  }
}

export default templateValidate



