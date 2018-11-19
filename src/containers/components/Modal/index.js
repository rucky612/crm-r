import React, { Component } from 'react'
import { sgsgColor } from '../../constants'
import Button from '../Button'
import styled from 'styled-components'
import { Icon } from 'antd'

const ModalBg = styled.div`
  position: fixed;
  display: ${props => props.visible ? `block` : `none`};
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1040;
  background-color: ${sgsgColor.black};
  opacity: 0.3;
`

const Modal = styled.div`
  position: fixed;
  display: ${props => props.visible ? `block` : `none`};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1050;
  transition: opacity 0.15s linear;
  & .modal-content {
    position: relative;
    max-width: 500px;
    margin: 1.75rem auto;
    background-color: ${sgsgColor.white};
    border: 0;
    border-radius: 4px;
    & .modal-title {
      display: inline-block;
    }
    & .modal-header, & .modal-body, & .modal-footer {
      padding: 25px;
      border-bottom: 1px solid ${sgsgColor.gray}
    }
    & .modal-footer {
      text-align: right;
    }
  }
`

const ModalCloseBtn = styled(Button)`
  position: relative;
  top: 1rem;
  left: -.5rem;
  border: 0;
  float: right;
  color: ${sgsgColor.textGray}
  &:hover {
    background-color: ${sgsgColor.white}
    color: ${sgsgColor.black}
  } 
`

class Index extends Component {

  static defaultProps = {
    cancelText: 'Cancel',
    okText: 'Ok',
    onCancel: () => {
    },
    onOk: () => {
    },
    title: 'Modal Title',
    visible: false
  }

  render() {
    const { title, onCancel, onOk, cancelText, okText, visible } = this.props
    return (
      <div>
        <ModalBg visible={visible}/>
        <Modal visible={visible}>
          <div className="modal-content">
            <ModalCloseBtn onClick={onCancel}
                      size={'small'}
            >
              <Icon type="close"/>
            </ModalCloseBtn>
            <div className="modal-header">
              <h3 className="modal-title">{title}</h3>
            </div>
            <div className="modal-body">
              {this.props.children}
            </div>
            <div className="modal-footer">
              <Button color={'metal'}
                      text={cancelText}
                      size={'small'}
                      onClick={onCancel}
              />
              <Button color={'info'}
                      text={okText}
                      size={'small'}
                      onClick={onOk}
              />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default Index