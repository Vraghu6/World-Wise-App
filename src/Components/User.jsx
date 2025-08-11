import { useNavigate } from "react-router-dom";
// import { useAuth } from "../Contexts/FakeAuth";
import styles from "./User.module.css";

function User() {
  const navigate = useNavigate();
  // const { user, logout } = useAuth();
  // eslint-disable-next-line no-undef
  const avatar = "https://i.pravatar.cc/100?u=zz";

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  function handleLogout() {
    // logout(); // fakeAuth logout
    localStorage.removeItem("user");
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={avatar} alt={user?.name || user?.email || "User"} />
      <span>Welcome, {user?.name || user?.email || "User"} 👋</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default User;
