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

export const testFormData = (index) => {
  return {
    id: new Date(),
    key: `test ${index}`,
    title: `test title ${index}`,
    body: `test body ${index}`,
    memo: `test memo ${index}`,
    replacements: [
      {
        title: `test replacement title ${index}`,
        keyword: `test replacement keyword ${index}`,
        maxByte: `${index + 20}`,
        defaultValue: `test replacement defaultValue ${index}`
      }
    ],
  }
}

export const mockHomeList = (index) => {
  const templateList = {...mockTemplateList}
  for(let i = 0; i < index; i++) {
    templateList.rows.push(testFormData(i))
  }
  templateList.count = index
  return templateList
}