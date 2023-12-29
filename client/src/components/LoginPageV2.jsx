import Header from "./Header";
import Footer from "./Footer";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory

const LoginPageV2 = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  const [message, setMessage] = useState("");

  useEffect(() => {
    const getUserFromLocalStorage = localStorage.getItem("user");
    if (null !== getUserFromLocalStorage) {
      console.log("getUserFromLocalStorage : ", getUserFromLocalStorage);
      navigate("/");
      return;
    }
  }, []);

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
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }), // Include the data in the body
      });
      console.log("response:", response);
      // le user existe déjà
      const value = await response.json();
      if (value.message === "User not found") {
        setMessage("User not found");
        return value;
      }
      if (value.message === "Invalid password") {
        setMessage("Invalid password");
        return value;
      } else {
        console.log("value:", value);
        localStorage.setItem("user", JSON.stringify(await value[0])); // je récupère depuis un tableau car c'est comme ça que c'est renvoyé
        console.log("user:", value[0]);
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center mt-32">
        <Link to="/RegisterPage" className="text-3xl mb-4 hover:text-gray-300">
          Register with email
        </Link>
        <div className="flex flex-row items-center justify-center">
          Register with your informations to create an account !
        </div>
        <form
          className="formsLogin mt-5 max-w-md mx-auto w-96"
          onSubmit={handleSubmit}
        >
          {message && <div className="text-red-500">{message}</div>}
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
            Login
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPageV2;
