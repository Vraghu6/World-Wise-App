import { useState } from "react";
import axios from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import styles from "./Signup.module.css";
import Button from "../Components/Button";
import PageNav from "../Components/PageNav";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", {
        email,
        password,
        name,
      });
      alert("Registration successful!");
      navigate("/");
    } catch (err) {
      alert("Signup failed: " + err.response?.data || err.message);
    }
  };

  return (
    <div className={styles.login}>
      <PageNav />
      <form className={styles.form} onSubmit={handleSignup}>
        <div className={styles.row}>
          <label>Name</label>
          <input
            type="name"
            placeholder="Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.row}>
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.row}>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* <button type="submit">Register</button> */}
        <div>
          <Button type="primary">Sign Up</Button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
