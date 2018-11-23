export const mockTemplateForm = {
  key: '',
  title: '',
  body: '',
  memo: '',
  replacements: [],
  isLoading: false,
  error: null
}

export const testTemplateForm = {
  key: 'test1',
  title: 'test title',
  body: 'test body',
  memo: 'test memo',
  replacements: [],
  isLoading: false,
  error: null
}

export const mockTemplateList = {
  rows: [],
  count: 0,
  isLoading: false,
  error: null
}

export const mockError = { 
  message: 'test error' 
}

export const mockReplacement = {
  title: "",
  keyword: "",
  maxByte: "",
  defaultValue: ""
}

export const mockEdit = {
  target: {
    name: 'title',
    value: 'test edit template or replacements'
  }
}

export const mockInputEvent = (inputName = "", inputValue = "") => {
  return {
    target: {
      name: inputName,
      value: inputValue ? inputValue : `test input ${inputName}`
    }
  }
}
