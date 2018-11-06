import React, {Component} from 'react';
import Input from '../../../../components/Input'
import Textarea from '../../../../components/Input/Textarea'
import connect from 'react-redux/es/connect/connect'

class Index extends Component {

    static defaultProps = {
        messageForm: {
            row: {
                key: "",
                title: "",
                body: "",
                memo: "",     
            }
        }
    }

    render() {
        return (
            <div>
                <div className={`mb-3`}>
                    <Input value={this.props.messageForm.row.key}
                           readOnly={true}
                           label={`템플릿 키`}/>
                </div>
                <div className={`mb-3`}>
                    <Input value={this.props.messageForm.row.title}
                           readOnly={true}
                           label={`템플릿 제목`}/>
                </div>
                <div className={`mb-3`}>
                    <Textarea value={this.props.messageForm.row.body}
                              readOnly={true}
                              rows={15}
                              label={`템플릿 내용`}/>
                </div>
                <div className={`mb-3`}>
                    <Input value={this.props.messageForm.row.memo}
                           readOnly={true}
                           label={`템플릿 메모`}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    messageForm: state.messageForm,
})

export default connect(
    mapStateToProps,
)(Index)