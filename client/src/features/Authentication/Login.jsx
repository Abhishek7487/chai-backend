import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../../context/AuthProvider";

const StyledLogin = styled.section`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .singInForm {
    width: 40%;
    background-color: var(--color-secondary);
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 4.8rem;
    border-radius: 1rem;

    form {
      display: flex;
      flex-direction: column;
      gap: 3rem;
      border-bottom: 2px solid var(--color-primary);
      padding-bottom: 2rem;

      div {
        display: flex;
        flex-direction: column;

        input {
          font-size: 1.8rem;
          padding: 0.8rem 1.4rem;
          background-color: var(--color-secondary);
          color: #fff;
          box-shadow: 0 0 5px var(--color-primary);
          border: none;
          margin-top: 1rem;
          border-radius: 0.4rem;
        }

        input:active,
        input:focus {
          outline: none;
          box-shadow: 0 0 5px var(--color-blue);
        }
      }

      .btnLogin {
        text-align: center;
        padding: 0.8rem 1.4rem;
        font-size: 1.8rem;
        background-color: var(--color-blue);
        border: none;
        border-radius: 0.4rem;
        color: #fff;
      }
      .btnLogin:hover {
        opacity: 0.9;
      }
    }
  }

  .signup {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.8rem;

    p:last-child {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    loginUser({ email, password });
    navigate("/home");
    setEmail("");
    setPassword("");
  }

  return (
    <StyledLogin>
      <div className="singInForm">
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="btnLogin" type="submit">
            Login
          </button>
        </form>
        <div className="signup">
          <p>{"Don't have an account?"}</p>
          <p onClick={() => navigate("/register")}>Register</p>
        </div>
      </div>
    </StyledLogin>
  );
}

export default Login;
