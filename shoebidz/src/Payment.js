import React from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider'
import CheckoutProduct from './CheckoutProduct';
import { Link } from 'react-router-dom';
import { CardElement,useStripe,useElements } from '@stripe/react-stripe-js';
import  { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import firebase from 'firebase/compat/app';
function Payment() {
    const [{basket, user},dispatch] = useStateValue();
    const[u,setUser]=useState(null);
    const stripe =useStripe()
    const elements=useElements();
    const [userName, setUserName] = useState('');
    const [userAddress, setUserAddress] = useState('');
    useEffect(() => {
      const fetchUserData = async () => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            setUser(authUser);
    
            // Fetch user data from the Firebase Realtime Database
            const userRef = firebase.database().ref(`users/${authUser.uid}`);
            userRef.once('value', (snapshot) => {
              const userData = snapshot.val();
              if (userData) {
                // User data exists
                setUserName(userData.name);
                
                setUserAddress(userData.address);
              } else {
                // User data doesn't exist
                // You can handle this case based on your requirements
              }
            });
          } else {
            // User is signed out
            setUser(null);
            // You can handle this case based on your requirements
          }
        });
        return () => {
          // Cleanup subscription on component unmount
          unsubscribe();
        };
      };
    
      fetchUserData();
    }, []);
    const dynamicBackgroundColor = 'white';
    const getTotal = () => {
      return basket?.reduce((total, item) => total + item.price, 0);
    };
  return (
    <div className='payment' style={{ backgroundColor: dynamicBackgroundColor }}>
      <div className='payment_container'>
        <h1>
            Checkout(<Link to = '/checkout'>{basket?.length} items</Link>)
        </h1>
        {/* Payment Section - delivery address */}
        <div className='payment_section'>
            <div className='payment_title'>
                <h3>Delivery Address</h3>
            </div>
            <div className='payment_address'>
                <p>{user?.email}</p>
                <p>{userAddress}</p>
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
                <h3 className='Total_payment'>Total Amount: <h3>${getTotal().toFixed(2)}</h3></h3>
                <h3>Payment Method</h3>
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