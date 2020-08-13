import React from 'react';
import {
  Link
} from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { useAuthDataContext } from "../hooks/auth-provider";

const AppBar = () => {
  const history = useHistory();
  const { onLogout }  = useAuthDataContext();

  const logout = () => {
    onLogout();
    history.push('/login');
  }
  return (
    <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Sign up</Link>
            </li>
          </ul>
        </nav>
        <button onClick={logout}>Log OUT</button>
    </div>
  )
}

export default AppBar;