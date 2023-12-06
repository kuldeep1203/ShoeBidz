import './App.css';
import React,{useEffect} from 'react';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import {auth} from './firebase';
import {useStateValue} from "./StateProvider";
import Payment from './Payment';
import Profile from './Profile';
import Invoice from './Invoice';
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import FirebaseFirestore from './Profile';

const promise =loadStripe("pk_test_51OJfLTSAUqwPqtXTzzwNw7WzCtq0RMS9OzkVYwd0UIVGuI4thO7vOwxRd2fGIjCXGBbzH8j6E7qqh5FJntm9Pb7200l9fgbI8Q");

function App() {

  const[{}, dispatch] = useStateValue();
  useEffect(() => {
    // will only run once when the app component loads...

    auth.onAuthStateChanged((authUser) => {
      console.log("THE USER IS >>> ", authUser);

      if (authUser) {
        // the user just logged in / the user was logged in

        dispatch({
          type: "SET_USER",
          user: authUser,
        });
      } else {
        // the user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
  }, []);
  return (
    //
   <Router>
      {/* <Link to='/Home'></Link> */}

      <Routes>
      <Route path='/' element={
        <>
          <Header />
          <Home />
        </>
      } />
      
      <Route path='/checkout' element={
        <>
          <Header />
          <Checkout/>
        </>
      } />

      <Route path='/login' element={
        <>
          <Header />
          <Login />
        </>
      } />
      
      <Route path='/payment' element={
        <>
          <Header />
          {/* <Elements stripe={promise}>

          </Elements> */}
          <Elements stripe={promise}>
            <Payment />
          </Elements>
          
        </>
      }/>
      <Route path='/Invoice' element ={
        <>
          <Header/>
          <Invoice/>
        </>
      }
      />
      <Route path='/Profile' element ={
        <>
          <Header/>
          <Profile/>
        </>
      }
      />
      

      {/* <Route path='/login' element={0} /> */}
      {/* <Route path='/checkout' element={<Checkout/>} /> */}
      {/* <Route path='/' element={<Header/>} /> */}
    
      </Routes>
      </Router>
    
    
  );
}

export default App;
