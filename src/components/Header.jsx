import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

import logo from "../assets/icons/infinity_logo_transparent.png";
import { Typography } from "@mui/material";
import ProfileMenu from "./ProfileMenu";

export default function Header({ user, setUser }) {
  return (
    <>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid cornflowerblue",
          width: "100vw",
        }}
      >
        <Link to="/" style={{ padding: "0 1rem" }}>
          <img src={logo} alt="logo" style={{ width: "71px", height: "50px" }} />
        </Link>
        <Typography variant="h4" color="cornflowerblue">
          Welcome to Choose Health
        </Typography>
        <Box>
          <ProfileMenu user={user} setUser={setUser} />
        </Box>
      </Stack>
    </>
  );
}
