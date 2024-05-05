import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import earth from "../../assets/earth.svg";
import clouds from "../../assets/clouds.svg";
import "./access.css";

const apiIp = process.env.REACT_APP_API_IP;

function LoginBox({ isLogin, switchAccess }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log("Submitted login");
    e.preventDefault();

    if (!formData.email || !formData.password) {
      console.log("Invalid login!");
      window.alert("All fields must be filled!");
      return;
    }

    const apiUrl = `${apiIp}/api/auth/login`;

    axios
      .post(apiUrl, formData)
      .then((response) => {
        const token = response.data.token;
        const expirationTime = jwtDecode(token).exp * 1000;
        console.log("Token expiration time is " + new Date(expirationTime));

        Cookies.set("token", token, {
          expires: new Date(expirationTime),
        });
        localStorage.setItem("displayName", formData.email);
        window.location.href = "/discover";
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("Invalid login :(");
      });
  };

  return (
    <div
      className="loginBox"
      style={{
        opacity: isLogin ? "1" : "0",
        pointerEvents: isLogin ? "auto" : "none",
      }}
    >
      <div className="title">MUNDONGO</div>

      <form onSubmit={handleSubmit}>
        <input
          className="inputField"
          placeholder="Email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="inputField"
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="accessButton loginButton" type="submit">
          Log In
        </button>
      </form>

      <div className="promptWrapper">
        <span className="prompt">Don't have an account yet?</span>
        <a
          className="prompt"
          onClick={switchAccess}
          style={{ color: "var(--promptColor)", fontWeight: "bold" }}
        >
          &nbsp;Sign up.
        </a>
      </div>
    </div>
  );
}

function SignUpBox({ isLogin, switchAccess }) {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    console.log("Submitted signup");
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.displayName) {
      console.log("Invalid signup!");
      window.alert("All fields must be filled!");
      return;
    }

    const apiUrl = `${apiIp}/api/auth/signup`;

    axios
      .post(apiUrl, formData)
      .then((response) => {
        const token = response.data.token;
        const expirationTime = jwtDecode(token).exp * 1000;
        console.log("Token expiration time is " + new Date(expirationTime));

        Cookies.set("token", token, {
          expires: new Date(expirationTime),
        });
        localStorage.setItem("displayName", formData.email);
        window.location.href = "/discover";
      })
      .catch((error) => {
        console.error("Error:", error);
        window.alert("Invalid signup :(");
      });
  };
  return (
    <div
      className="signUpBox"
      style={{
        opacity: isLogin ? "0" : "1",
        pointerEvents: isLogin ? "none" : "auto",
      }}
    >
      <div className="title">MUNDONGO</div>

      <form onSubmit={handleSubmit}>
        <input
          className="inputField"
          placeholder="Username"
          type="text"
          name="displayName"
          autoComplete="username"
          value={formData.displayName}
          onChange={handleChange}
        />

        <input
          className="inputField"
          placeholder="Email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className="inputField"
          placeholder="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
        />

        <button className="accessButton signUpButton" type="submit">
          Sign Up
        </button>
      </form>

      <div className="promptWrapper">
        <span className="prompt">Already have an account?</span>
        <a
          className="prompt"
          onClick={switchAccess}
          style={{ color: "var(--promptColor)", fontWeight: "bold" }}
        >
          &nbsp;Log in.
        </a>
      </div>
    </div>
  );
}

export default function Access() {
  if (Cookies.get("token")) {
    window.location.href = "/discover";
  }

  const [isLogin, setIsLogin] = useState(true);
  function switchAccess() {
    setIsLogin(!isLogin);
    console.log("Set value to " + (isLogin ? "signup" : "login"));
  }

  return (
    <div className="body access">
      <div className="appWrapper">
        <div className="background">
          <Stars />
          <Planet />
        </div>
        <div className="accessWrapper">
          <LoginBox isLogin={isLogin} switchAccess={switchAccess} />
          <SignUpBox isLogin={isLogin} switchAccess={switchAccess} />
        </div>
      </div>
    </div>
  );
}

function Planet() {
  return (
    <div className="planetWrapper">
      <div className="planet">
        <img className="earth" src={earth} alt="Earth" />
        <img className="clouds" src={clouds} alt="Clouds" />
        <div className="planetShadow" />
        <div className="planetBorder" />
      </div>
    </div>
  );
}

function Stars() {
  useEffect(() => {
    createRandomStars();
  }, []);

  const createRandomStars = () => {
    const container = document.querySelector(".starWrapper");
    const starNumber = 100;
    for (let i = 0; i < starNumber; i++) {
      const star = document.createElement("div");
      star.classList.add("star");
      const xOffset = Math.random() * 100;
      const yOffset = Math.random() * 100;
      const animDelay = Math.random() * 5 * (Math.random() / 2);
      const duration = 0.5 + Math.random();
      star.style.left = `${xOffset}%`;
      star.style.top = `${yOffset}%`;
      star.style.animationDelay = `${animDelay}s`;
      star.style.setProperty("--duration", `${duration}s`);
      container.appendChild(star);
    }
  };

  return <div className="starWrapper" />;
}
