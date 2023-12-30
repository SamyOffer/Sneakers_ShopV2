import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link } from "react-router-dom"; // Importez Link depuis react-router-dom

const MyAccount = () => {
  const [myinformation, setMyinformation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedToken = JSON.parse(localStorage.getItem("user"));

        if (!storedToken) {
          window.location.replace("/LoginPage");
        } else {
          const response = await fetch("/getOneUserByID", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: storedToken,
            }),
          });
          const data = await response.json();
          setMyinformation(data);
        }
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };
    fetchData();
  }, []); // Empty dependency array to run the effect only once

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.replace("/LoginPage");
  };

  return (
    <div className="MyAccount">
      <Header />

      <div className="flex justify-center mt-8">
        <FaRegCircleUser size={210} className="text-blue-500" />
      </div>

      {myinformation && (
        <div className="mt-8 p-4 border rounded shadow-md ml-20 mr-20">
          <h2 className="text-2xl font-bold mb-4">User Information:</h2>
          <p className="mb-2">
            <span className="font-bold">Email:</span> {myinformation.email}
          </p>
          <p className="mb-2">
            <span className="font-bold">First Name:</span>{" "}
            {myinformation.firstName}
          </p>
          <p className="mb-2">
            <span className="font-bold">Last Name:</span>{" "}
            {myinformation.lastName}
          </p>
          <p>
            {myinformation.shippingAddress.length === 0 ? (
              <span> Vous n'avez pas d'adresse </span>
            ) : (
              <>
                <span className="font-bold">Shipping Address: </span>
                {myinformation.shippingAddress}
              </>
            )}
            <Link
              to={`/EditShippingInfo?shippingAddress=${encodeURIComponent(
                myinformation.shippingAddress
              )}`}
              className=" ml-2 px-2 py-2 text-gray-800 rounded bg-gray-300 hover:bg-gray-400 "
              >
              Edit
            </Link>
          </p>

          {/* Ajoutez le bouton d'édition avec Link */}

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mt-4 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
