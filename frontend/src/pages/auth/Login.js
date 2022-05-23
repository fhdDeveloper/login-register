import { useNavigate } from "react-router-dom";
import { LoginForm } from "../../sections/authentication/login";
import "../../styles/login.css";

export default function Login() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (token) {
    return navigate("/dashboard/admin");
  }

  return (
    <div className="login-Page">
      <div className="container">
        <LoginForm />
      </div>
    </div>

  );
}
