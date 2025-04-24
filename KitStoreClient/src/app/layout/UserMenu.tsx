import { Button, Menu, MenuItem, Fade, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
import { User } from  "../models/user";
import { History, Inventory, Logout, Person, SportsFootball } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../features/account/userSlice";
type Props = {
    user:User
}
const UserMenu = ({user}:Props) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleLogout = ()=>{
        dispatch(setUser(null));
        navigate("/login");
    }
    const roleValues = Array.isArray(user.roles.values)
        ? user.roles.values
        : user.roles?.$values ?? [];
    return (
      <div>
        <Button
          onClick={handleClick}
          size="large"
          sx={{fontSize: "1.1rem"}}
        >
          {user.userName}
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            'aria-labelledby': 'fade-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem component={Link} to="/profile">
            <ListItemIcon>
                <Person/>
            </ListItemIcon>
            <ListItemText>My Profile</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/orders">
            <ListItemIcon>
                <History/>
            </ListItemIcon>
            <ListItemText>My Orders</ListItemText>
          </MenuItem>
          {roleValues.includes("Admin") &&(<>
          <MenuItem component={Link} to="/inventory">
            <ListItemIcon>
                <Inventory/>
            </ListItemIcon>
            <ListItemText>Inventory</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to="/clubs">
            <ListItemIcon>
                <SportsFootball/>
            </ListItemIcon>
            <ListItemText>Clubs</ListItemText>
          </MenuItem>
          </>
          )
          }
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
                <Logout/>
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </div>
    );
}
export default UserMenu