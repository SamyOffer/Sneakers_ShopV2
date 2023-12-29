import React from "react";
import { Link } from "react-router-dom";
import { FaXTwitter } from "react-icons/fa6";
import logo2 from "../assets/logo2.png";

const Footer = () => {
  return (
    <div>
      <footer className="flex flex-col items-center p-10 bg-base-200 text-base-content rounded">
        <nav className="grid grid-flow-col gap-4">
          <Link to="/AboutUS">
            <button className="link link-hover">About us</button>
          </Link>
          <Link to="/Contact">
            <button className="link link-hover">Contact</button>
          </Link>
          <Link to="/Terms_of_use">
            <button className="link link-hover">Terms of use</button>
          </Link>
        </nav>
        <nav>
          <div className="grid grid-flow-col gap-4 mt-5 mb-2">
            <button>
              <FaXTwitter size={28}  />
            </button>

            <Link
              to="http://samy-offer.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>
                <img className="w-8" src={logo2} alt="logo2" />
              </button>
            </Link>
          </div>
        </nav>
        <aside>
          <p>
            Copyright © 2023 - All right reserved by SamyOffer Industries Ltd
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Footer;
