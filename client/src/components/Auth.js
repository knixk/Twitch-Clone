import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

function Auth() {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(false);

  console.log(username);
  console.log(password);

  const handleSubmit = async (endpoint) => {
    console.log(endpoint);

    if (!isLogin && password !== confirmPassword) {
      setError(true);
      return;
    }

    const response = await axios.post(`http://localhost:8000/${endpoint}`, {
      username,
      password,
    });

    console.log("I am res" + response);

    setCookie("Name", response.data.username);
    setCookie("HashedPassword", response.data.hashedPassword);
    setCookie("UserId", response.data.userId);
    setCookie("AuthToken", response.data.token);

    window.location.reload();
  };

  return (
    <div className="auth-container">
      <div className="auth-container-box">
        <div className="auth-container-form">
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {!isLogin && (
            <input
              type="password"
              name="password-check"
              id="password-check"
              placeholder="confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}
          {error && <p>* Make sure passwords match *</p>}
          <button
            className="standard-button"
            onClick={() => handleSubmit(isLogin ? "login" : "signup")}
          >
            Go!
          </button>
        </div>
        <div className="auth-options">
          <button
            onClick={() => setIsLogin(false)}
            style={{ backgroundColor: !isLogin ? "#151a1f" : "#070a0d" }}
          >
            Sign up
          </button>
          <button
            onClick={() => setIsLogin(true)}
            style={{ backgroundColor: isLogin ? "#151a1f" : "#070a0d" }}
          >
            Login in
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth;
