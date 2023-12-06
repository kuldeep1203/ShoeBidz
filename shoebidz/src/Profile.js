import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [address, setAddress] = useState('');
  const [userDataExists, setUserDataExists] = useState(false);

  useEffect(() => {
    // Check if the user is logged in
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // User is signed in
        setUser(authUser);
        // Fetch existing user data from Firebase
        const userRef = firebase.database().ref(`users/${authUser.uid}`);
        userRef.once('value', (snapshot) => {
          const userData = snapshot.val();
          if (userData) {
            // User data exists
            setUserDataExists(true);
            setName(userData.name);
            setAge(userData.age);
            setEmail(userData.email);
            setNumber(userData.number);
            setAddress(userData.address);
          } else {
            // User data doesn't exist
            setUserDataExists(false);
          }
        });
      } else {
        // User is signed out
        setUser(null);
        navigate('/'); // Redirect to the home page or authentication page
      }
    });

    return () => {
      // Cleanup subscription on component unmount
      unsubscribe();
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Push or update data to Firebase
    const usersRef = firebase.database().ref(`users/${user.uid}`);
    await usersRef.set({
      name,
      age,
      email: user.email,
      number,
      address,
    });

    // Redirect to the home page or any other route
    navigate('/');
  };

  if (user) {
    return (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="profile-container p-4">
          <h2 className="profile-heading">Profile Page</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Age:</label>
              <input
                type="number"
                className="form-control"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="text"
                className="form-control"
                value={email}
                readOnly
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Number:</label>
              <input
                type="tel"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address:</label>
              <textarea
                className="form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-danger">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    );
  }

  // User is not signed in, you can redirect or render a login form
  return <div>Please sign in to view your profile.</div>;
};

export default Profile;
