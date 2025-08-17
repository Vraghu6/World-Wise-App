import { useEffect } from "react";
import { useAuth } from "../Contexts/FakeAuth";
import { useNavigate } from "react-router-dom";

function ProtectedAuth({ children }) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticated) navigate("/");
    },
    [isAuthenticated, navigate]
  );
  return isAuthenticated ? children : null;
}

export default ProtectedAuth;
