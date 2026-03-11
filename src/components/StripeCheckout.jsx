import React from 'react'
import styled from 'styled-components'

const StripeCheckout = () => {
  return (
    <Wrapper>
      <p>Stripe checkout integration - configure with your Stripe keys</p>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`

export default StripeCheckout
