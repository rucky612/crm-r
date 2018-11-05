import React, {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import connect from 'react-redux/es/connect/connect'
import Create from './Create'
import Home from './Home'

class Index extends Component {

    renderHead = () => {
        const path = this.props.location.pathname
        if (path.includes("/templates/home")) {
            return <h3>템플릿 내역</h3>
        } else if(path === '/templates/create') {
            return <h3>템플릿 생성</h3>
        } else if(path.includes("/templates/modify")) {
            return <h3>템플릿 수정</h3>
        }
    }

    render() {
        return (
            <article className={`sgsg-page`}>
                <header className={`sgsg-page__header`}>
                    {this.renderHead()}
                </header>
                <div className={`sgsg-page__section`}>
                    <Switch>
                        <Route path="/templates/create" component={Create}/>
                        <Route path="/templates/modify/:id" component={Create}/>
                        <Route path="/templates/home" component={Home}/>
                        <Redirect to={"/templates/home"}/>
                    </Switch>
                </div>
            </article>
        )
    }
}

const mapStateToProps = (state) => ({
    templateForm: state.templateForm
})

export default connect(
    mapStateToProps,
)(Index)