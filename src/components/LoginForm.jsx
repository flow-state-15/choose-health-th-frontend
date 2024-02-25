import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { postAuth } from "../services";

export default function LoginForm({ setUser }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formType, setFormType] = useState("login");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (error) return;
    if (formType === "signup" && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const result = await postAuth(formType, { email, password });
    console.log("result: ", result)
    if (result.user) {
      setUser(result.user);
      navigate("/");
    } else {
      setEmail("");
      setPassword("");
      setError(result.error);
    }
  };

  const handleChangeFormType = () => {
    setFormType(formType === "login" ? "signup" : "login");
    if (error) setError("");
  };

  useEffect(() => {
    if (formType === 'signup' && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    } else if (email || password || confirmPassword) {
      setError("");
      return;
    }
  }, [email, password, confirmPassword]);

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} padding={7}>
        <Box>
          {formType === "login" ? (
            <Typography variant="h5">Login</Typography>
          ) : (
            <Typography variant="h5">Sign Up</Typography>
          )}
          {error && (
            <Typography variant="body1" color="red">
              {error}
            </Typography>
          )}
        </Box>
        <label htmlFor="email">
          <Typography variant="body1">Email</Typography>
        </label>
        <input
          name="email"
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">
          <Typography variant="body1">Password</Typography>
        </label>
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {formType === "signup" && (
          <>
            <label htmlFor="confirmPassword">
              <Typography variant="body1">Confirm Password</Typography>
            </label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </>
        )}
        <Button type="submit" variant="contained">
          Submit
        </Button>
        {formType === "login" ? (
          <Typography
            variant="caption"
            color="blue"
            onClick={handleChangeFormType}
            sx={{ cursor: "pointer" }}
          >
            Don&apos;t have an account? Sign up.
          </Typography>
        ) : (
          <Typography
            variant="caption"
            color="blue"
            onClick={handleChangeFormType}
            sx={{ cursor: "pointer" }}
          >
            Already have an account? Login.
          </Typography>
        )}
      </Stack>
    </form>
  );
}
