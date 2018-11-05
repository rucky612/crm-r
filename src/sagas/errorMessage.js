export default function (error) {
    let msg = "";
    if(error.response !== undefined) {
        if(error.response.data.hasOwnProperty("rows")) {
            error.response.data.rows.forEach(item => {
                msg += `- Check your ${item.param}.`
            })
        } else if(error.response.data.hasOwnProperty("row")) {
            msg = `- Error fail ${error.response.data.row.code}`
        }
    }
    const errorMsg = `${error.message}${msg}`
    return errorMsg
}