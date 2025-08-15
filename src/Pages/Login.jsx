import { useNavigate } from "react-router-dom";
import PageNav from "../Components/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import Button from "../Components/Button";
import axios from "../axiosInstance";
import { useCities } from "../Contexts/CitiesContext"; // import useCities

export default function Login() {
  const { setUser } = useCities();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", {
        email,
        password,
      });
      // console.log(response);
      const { token, user } = response.data;
      // console.log(user);
      const userWithToken = { ...user, token };
      localStorage.setItem("user", JSON.stringify(userWithToken));
      // localStorage.setItem("token", token);
      // console.log(token);
      setUser(userWithToken);
      navigate("/app");
    } catch (err) {
      alert("Login failed " + (err.response?.data || err.message));
    }

    // if (email && password) login(email, password);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) navigate("/app", { replace: true });
  }, [navigate]);

  return (
    <main className={styles.login}>
      <PageNav />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button type="primary">Login</Button>
        </div>
      </form>
    </main>
  );
}
