import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function ProfileMenu({ user, setUser }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
    handleClose();
  };

  return (
    <Box
      sx={{
        padding: 4,
        position: "relative",
      }}
    >
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <PersonIcon fontSize="large" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          left: "-2%",
        }}
      >
        {user && (
          <MenuItem>
            <Typography variant="body2">{user.email}</Typography>
          </MenuItem>
        )}
        {user && (
          <MenuItem
            onClick={() => {
              navigate("/dashboard");
              handleClose();
            }}
          >
            Dashboard
          </MenuItem>
        )}
        {user ? (
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        ) : (
          <MenuItem
            onClick={() => {
              navigate("/login");
              handleClose();
            }}
          >
            Login
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
}
