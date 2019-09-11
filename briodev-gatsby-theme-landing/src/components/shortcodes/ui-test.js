import React from 'react'
import styled from '@emotion/styled'

export default (props) => {

  const text = props.boxText
  const textColor = props.textColor

  const BoxStyle = styled.div`
  margin: 1em auto;
  background: blue;
  color: ${textColor ? textColor : 'white' };
  text-align: center;
  padding: 1em;
  font-size: 2em;
`

  return (

      <BoxStyle>
        {text}
      </BoxStyle>
  )
}
