import React, {Component} from 'react';
import Input from '../../../../components/Input'
import Textarea from '../../../../components/Input/Textarea'

class Index extends Component {

    static defaultProps = {
        key: "",
        title: "",
        body: "",
        memo: "",
    }

    render() {
        return (
            <div>
                <div className={`mb-3`}>
                    <Input value={this.props.key}
                           readOnly={true}
                           label={`템플릿 키`}/>
                </div>
                <div className={`mb-3`}>
                    <Input value={this.props.title}
                           readOnly={true}
                           label={`템플릿 제목`}/>
                </div>
                <div className={`mb-3`}>
                    <Textarea value={this.props.body}
                              readOnly={true}
                              rows={15}
                              label={`템플릿 내용`}/>
                </div>
                <div className={`mb-3`}>
                    <Input value={this.props.memo}
                           readOnly={true}
                           label={`템플릿 메모`}/>
                </div>
            </div>
        );
    }
}

export default Index;