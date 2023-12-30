import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const getUserFromLocalStorage = localStorage.getItem("user");
    if (null !== getUserFromLocalStorage) {
      console.log("getUserFromLocalStorage : ", getUserFromLocalStorage);
      navigate("/");
      return;
    }
  }, [navigate]);

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Vérifie que le mail de l'utilisateur n'est pas déjà dans la base de donnée
    try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const value = await response.json();
        if( value.message === "Email already exists"){
          setMessage("Email already exists");
          return value;
        }
        window.location.href = "/LoginPage";
        return;
      } catch (error) {
        console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center mt-32">
        <Link to="/LoginPage" className="text-3xl mb-4 hover:text-gray-300">
          Login with email
        </Link>
        <form
          className="formsLogin mt-5 max-w-md mx-auto w-96"
          onSubmit={handleSubmit}
        >
            {message && <div className="text-red-500">{message}</div>}
          {/*firstName*/}
          <div className="flex flex-col mb-4">
            <label className="">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="border-2 border-black py-1 rounded-md"
            />
          </div>
          {/*lastName*/}
          <div className="flex flex-col mb-4">
            <label className="">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="border-2 border-black py-1 rounded-md"
            />
          </div>
          {/*Email*/}
          <div className="flex flex-col mb-4">
            <label className="">E-mail</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="border-2 border-black py-1 rounded-md"
            />
          </div>
          {/*Password*/}
          <div className="flex flex-col mb-4">
            <label className="">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="border-2 border-black py-1 rounded-md"
            />
          </div>
          <button type="submit" className="bg-black text-white p-2 rounded-md">
            Register
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;
