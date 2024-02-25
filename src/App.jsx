import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import Stack from "@mui/material/Stack";

import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import Home from "./components/Home";
import { restoreUser } from "./services";
import { history } from "./utilities/wrappers";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  if (!history.navigate || !history.location) {
    history.navigate = navigate;
    history.location = location;
  }

  useEffect(() => {
    if (location.pathname === "/login") return;
    restoreUser((data) => {
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(null);
        navigate("/login");
      }
    });
  }, [navigate]);

  return (
    <Stack
      sx={{
        overflowY: "hidden",
        overflowX: "hidden",
        alignItems: "center",
        height: "98vh",
      }}
    >
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home user={user} />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/dashboard" element={<Dashboard user={user} />} />
      </Routes>
    </Stack>
  );
}

export default App;
