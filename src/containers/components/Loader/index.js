import React, { Component } from 'react'
import styled, { keyframes } from 'styled-components'
import { sgsgColor } from '../../constants'

const spinLoader = keyframes`
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
`
const Loader = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
`
const LoaderContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  border: 16px solid ${sgsgColor.gray};
  border-radius: 50%;
  border-top: 16px solid ${sgsgColor.info};
  width: 120px;
  height: 120px;
  -webkit-animation: ${spinLoader} 2s linear infinite;
  animation: ${spinLoader} 2s linear infinite;
  z-index: 300;
`
const LoaderBg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${sgsgColor.black};
  opacity: 0.4;
`

class Index extends Component {
  render() {
    return (
      <Loader>
        <LoaderContent/>
        <LoaderBg/>
      </Loader>
    )
  }
}

export default Index