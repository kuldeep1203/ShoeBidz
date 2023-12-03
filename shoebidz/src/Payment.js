import React from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';

function Payment() {
    const [{basket, user},dispatch] = useStateValue();
    const getTotal = () => {
      return basket?.reduce((total, item) => total + item.price, 0);
    };
  return (
    <div className='payment'>
      <div className='payment_container'>
        <h1>
            Checkout(<Link to = '/checkout'>{basket?.length} items</Link>)
        </h1>
        {/* Payment Section - delivery address */}
        <div className='payment_section'>
            <div className='payment_title'>
                <h3>Delivery Adress</h3>
            </div>
            <div className='payment_address'>
                <p>{user?.email}</p>
                <p>Kothrud</p>
                <p>Pune</p>
            </div>
        </div>
        {/* Payment Section - Review Items */}
        <div className='payment_section'>
        <div className='payment_title'>
                <h3>Review items and Delivery</h3>
            </div>
            <div className='payment_items'>
            {basket.map(item => (
            <CheckoutProduct
              id={item.id}
              title={item.title}
              image={item.image}
              price={item.price}
              rating={item.rating}
            />
          ))}
            </div>
        </div>
        {/* Payment Section - payment method */}
        <div className='payment_section'>
        <div className='payment_title'>
                <h3 className='Total_payment'>Total Amount: ${getTotal().toFixed(2)}</h3>
        </div>
        <div className='payment_details'>
            {getTotal() > 0 && (
                <Link to ='/invoice'>
                  <button className="pay_button">Pay</button>
                </Link>
                
            )}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Payment