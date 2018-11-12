const checkReceiver = (receiver, maxBytes) => {
    let boolean = true
    const row = {}
    Object.keys(receiver).filter(key => {
        if (key === "phoneNum") {
            row[key] = maxByteInvalid(receiver[key], boolean)
            return false
        }
        return true
    }).forEach((key, index) => {
        row[key] = replacementValid(receiver[key], maxBytes[index], boolean)
    })

    Object.values(row).forEach(value => {
      if(value !== "success") boolean = false
    })
    return {row, boolean}
}

export const maxByteInvalid = (value, boolean) => {
    if (value.length <= 11 && value.length >= 10) {
        return "success"
    } else {
        return "danger"
    }
}

export const replacementValid = (value, maxByte, boolean) => {
    if (value.length === 0) {
        return "danger"
    } else if (Buffer.byteLength(value, 'utf8') < maxByte) {
        return "success"
    } else {
        return "danger"
    }
}

export default checkReceiver