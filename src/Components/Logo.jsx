import { Link } from "react-router-dom";
import styles from "./Logo.module.css";
import { useCities } from "../Contexts/CitiesContext";

function Logo() {
  const { user } = useCities();

  if (user) {
    <img src="/logo.webp" alt="WorldWise Logo" className={styles.logo} />;
  }
  return (
    <Link to="/">
      <img src="/logo.webp" alt="WorldWise Logo" className={styles.logo} />
    </Link>
  );
}

export default Logo;
