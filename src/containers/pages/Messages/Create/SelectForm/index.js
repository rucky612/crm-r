import React, {Component} from 'react';
import Input from '../../../../components/Input'
import Textarea from '../../../../components/Input/Textarea'
import connect from 'react-redux/es/connect/connect'
import Mb3 from '../../../../components/Grid/Margin'

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

    checkNull = (text) => {
      return text === null ? "" : text
    }

    render() {
        const {key, title, body, memo} = this.props.messageForm.row
        return (
            <div>
                <Mb3>
                    <Input value={this.checkNull(key)}
                           readOnly={true}
                           label={`템플릿 키`}/>
                </Mb3>
                <Mb3>
                    <Input value={this.checkNull(title)}
                           readOnly={true}
                           label={`템플릿 제목`}/>
                </Mb3>
                <Mb3>
                    <Textarea value={this.checkNull(body)}
                              readOnly={true}
                              rows={15}
                              label={`템플릿 내용`}/>
                </Mb3>
                <Mb3>
                    <Input value={this.checkNull(memo)}
                           readOnly={true}
                           label={`템플릿 메모`}/>
                </Mb3>
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