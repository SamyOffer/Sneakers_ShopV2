import React, { useEffect, useState } from 'react';
import Header from './Header';

const MyAccount = () => {
  const [myinformation, setMyinformation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = JSON.parse(localStorage.getItem('user'));
        console.log("storedToken : ", storedToken);

        if (!storedToken) {
          window.location.replace('/LoginPage');
        } 
        else{
          setMyinformation(storedToken);
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };
    fetchData();

    // requete au server pour avoir toutes les infos de l'utilisateur depuis le user._id

  }, []); // Empty dependency array to run the effect only once

  console.log("myinformation:", myinformation);

  return (
    <div className="MyAccount">
      <Header />
      {myinformation && (
        <div>
          <h2>User Information:</h2>
          <p>id: {myinformation._id}</p>
          <p>email: {myinformation.email}</p>
          {/* Add other user information as needed */}
        </div>
      )}
    </div>
  );
};

export default MyAccount;
