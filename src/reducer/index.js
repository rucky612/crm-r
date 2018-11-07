import {combineReducers} from 'redux'
import templateList from './templateList'
import templateForm from './templateForm'
import messageForm from './messageForm'
import messageList from './messageList'
import receiversList from './receiversList'

export default combineReducers({
    templateList,
    templateForm,
    messageForm,
    messageList,
    receiversList
})
