import React, { useEffect, useState } from 'react';
import Header from './Header';
import users from '../database/users.json';

const MyAccount = () => {
  const [myinformation, setMyinformation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = parseInt(localStorage.getItem('token'));
        console.log("storedToken : ", storedToken)

        if (!storedToken) {
          window.location.replace('/LoginPage');
        } else {
          const user = users.find((user) => user.id === storedToken);
          console.log(users.find((user) => user.id === 1))
          if (user) {
            console.log("user:", user);
            setMyinformation(user);
          } else {
            console.log("User not found in the users list.");
          }
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run the effect only once

  console.log("myinformation:", myinformation);

  return (
    <div className="MyAccount">
      <Header />
      {myinformation && (
        <div>
          <h2>User Information:</h2>
          <p>id: {myinformation.id}</p>
          <p>email: {myinformation.email}</p>
          {/* Add other user information as needed */}
        </div>
      )}
    </div>
  );
};

export default MyAccount;
