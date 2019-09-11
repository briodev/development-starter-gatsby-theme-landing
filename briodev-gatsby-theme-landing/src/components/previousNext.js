import React from 'react'
import {Link}from 'gatsby'
import { Styled } from 'theme-ui'
import styled from '@emotion/styled'


const PreviousNext = (props) => {

    const { previous, next } = props
    return (
        <LinkWrapper>
            <LinkItems>
                <div>
                    { previous && 
                        <Styled.a as={Link} to={previous.slug}>
                            <Head>&#11013; &nbsp; Previous</Head>
                            <Title>{previous.title}</Title>
                        </Styled.a>
                    }
                </div>
                <div>
                    { next && 
                        <Styled.a as={Link} to={next.slug}>
                            <Head>Next &nbsp; &#10145;</Head>
                            <Title>{next.title}</Title>
                        </Styled.a>
                    }
                </div>
            </LinkItems>
        </LinkWrapper>
    )
}

export default PreviousNext;

const LinkWrapper = styled.div`
    margin: 3em 10%;
`
const LinkItems = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Head = styled.h3`
    color: #4a5568;
    text-decoration: underline;
    margin: .5em 0;
`

const Title = styled.div`
    text-align: center;
`