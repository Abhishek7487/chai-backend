import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import User from "./User";

function RequireAuth() {
  const navigate = useNavigate();
  const { user } = useAuth();
  return user ? (
    <User />
  ) : (
    <div>
      <p>Please Login</p>
      <button onClick={() => navigate("/login")}>Login</button>
    </div>
  );
}

export default RequireAuth;
