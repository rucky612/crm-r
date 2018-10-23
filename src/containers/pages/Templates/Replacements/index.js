import React, { Component } from 'react'
import Table from '../../../components/Table'
import Alerts from  '../../../components/Alerts'
import Modal from '../../../components/Modal'
import Input from '../../../components/Input'

export const columns =[
  {
    title: "제목",
    dataIndex: "title"
  },
  {
    title: "키워드",
    dataIndex: "keyword"
  },
  {
    title: "최대 Byte",
    dataIndex: "maxByte"
  },
  {
    title: "기본값",
    dataIndex: "defaultValue"
  },
  {
    title: "삭제",
    render: () => <button className={`btn btn-danger`}>삭제</button>
  }
]

const rowSelection = {
  onChange: () => {
    console.log('dfdf')
  }
}

class Index extends Component {
  constructor(props) {
    super(props)

    this.state ={
      visible: false,
      replacements: {

      },
      selectedRows: [

      ]
    }
  }

  onSelectRow = () => {

  }

  createReplacements = () => {

  }

  toggleModal = () => {
    this.setState({
      ...this.state,
      visible: !this.state.visible
    })
  }

  render() {
    return (
      <section className={`sgsg-templates__replacements`}>
        <header>
          <h5>템플릿 변환자</h5>
        </header>
        <section className={`sgsg-replacements__section`}>

          <Alerts state={"warning"}
                 strong={"경고! "}
                 plain={"변환자를 입력하세요."}/>
          <Table rowSelection={rowSelection}
                 // dataSource={}
                 columns={columns}/>

          <button onClick={() => {
                  this.createReplacements();
                  this.toggleModal(); }}
                  className={`btn btn-info btn-block`}>변환자 추가</button>
          <Modal visible={this.state.visible}
                 title={"변환자 생성"}
                 okText={"생성"}
                 cancelText={"취소"}
                 onOk={this.toggleModal}
                 onCancel={this.toggleModal}>
            <Input/>
          </Modal>

        </section>
        <footer className={`sgsg-replacements__footer`}>
          <button className={`btn btn-primary float-right`}>생성</button>
          <button className={`btn btn-secondary sgsg-m-5--right float-right`}>초기화</button>
        </footer>
      </section>
    )
  }
}

export default Index