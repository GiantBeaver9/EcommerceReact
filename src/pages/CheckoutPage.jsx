import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import { useCartContext } from '../context/cart_context'
import { useUserContext } from '../context/user_context'
import { formatPrice } from '../utils/helpers'
import { Link, useNavigate } from 'react-router-dom'

const CheckoutPage = () => {
  const { cart, total_amount, shipping_fee, clearCart } = useCartContext()
  const { myUser } = useUserContext()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Thank you for your order! (Stripe integration coming soon)')
    clearCart()
    navigate('/')
  }

  return (
    <main>
      <PageHero title='checkout' />
      <Wrapper className='page'>
        {cart.length < 1 ? (
          <div className='empty'>
            <h2>your cart is empty</h2>
            <Link to='/products' className='btn'>
              go shopping
            </Link>
          </div>
        ) : (
          <div className='section-center'>
            <article className='checkout-summary'>
              <h4>order summary</h4>
              <hr />
              <h5>
                <span>subtotal :</span>
                <span>{formatPrice(total_amount)}</span>
              </h5>
              <p>
                <span>shipping fee :</span>
                <span>{formatPrice(shipping_fee)}</span>
              </p>
              <hr />
              <h4>
                <span>order total :</span>
                <span>{formatPrice(total_amount + shipping_fee)}</span>
              </h4>
            </article>
            <form onSubmit={handleSubmit} className='checkout-form'>
              <h4>payment details</h4>
              <p>
                Logged in as <strong>{myUser?.name}</strong>
              </p>
              <div className='form-group'>
                <label htmlFor='card'>Card Number</label>
                <input
                  type='text'
                  id='card'
                  placeholder='4242 4242 4242 4242'
                  required
                />
              </div>
              <div className='form-row'>
                <div className='form-group'>
                  <label htmlFor='expiry'>Expiry</label>
                  <input
                    type='text'
                    id='expiry'
                    placeholder='MM/YY'
                    required
                  />
                </div>
                <div className='form-group'>
                  <label htmlFor='cvc'>CVC</label>
                  <input type='text' id='cvc' placeholder='123' required />
                </div>
              </div>
              <button type='submit' className='btn submit-btn'>
                pay {formatPrice(total_amount + shipping_fee)}
              </button>
            </form>
          </div>
        )}
      </Wrapper>
    </main>
  )
}

const Wrapper = styled.div`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
  .section-center {
    display: grid;
    gap: 2rem;
    padding: 3rem 0;
  }
  .checkout-summary {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
    h5,
    p,
    h4 {
      display: grid;
      grid-template-columns: 200px 1fr;
    }
    p {
      text-transform: capitalize;
    }
  }
  .checkout-form {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  .form-group {
    margin-bottom: 1rem;
    label {
      display: block;
      margin-bottom: 0.25rem;
      text-transform: capitalize;
      font-weight: 600;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid var(--clr-grey-8);
      border-radius: var(--radius);
      font-size: 1rem;
    }
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .submit-btn {
    width: 100%;
    margin-top: 1rem;
    font-size: 1rem;
    padding: 0.75rem;
  }
  @media (min-width: 992px) {
    .section-center {
      grid-template-columns: 1fr 1fr;
    }
  }
`
export default CheckoutPage
