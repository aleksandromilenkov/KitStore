import {
    DarkMode,
    LightMode,
    ShoppingCart,
  } from "@mui/icons-material";
import { AppBar, Toolbar, Box, Typography, IconButton, List, ListItem, Badge, LinearProgress, Theme } from "@mui/material"
import { NavLink } from "react-router-dom"
import { toggleDarkMode } from "./uiSlice"
import { useAppDispatch, useAppSelector } from "../store/store";
const midLinks = [
    {
      title: "Catalog",
      path: "/catalog",
    },
    {
      title: "About",
      path: "/about",
    },
  ];
  const rightLinks = [
    {
      title: "login",
      path: "/login",
    },
    {
      title: "register",
      path: "/register",
    },
  ];
  const navStyles = (theme: Theme) => ({
    color: theme.palette.mode === "light" ? "#1a1a1a" : "#ffffff",
    typography: "h6",
    textDecoration: "none",
    "&:hover": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.primary.main
          : theme.palette.secondary.light,
    },
    "&.active": {
      color: theme.palette.mode === "light" ? theme.palette.warning.dark : theme.palette.warning.main,
      textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
    },
  });
  
  
const Navbar = () => {
    const {isLoading, darkMode} = useAppSelector(state=> state.ui);
    const dispatch = useAppDispatch();
  return (
    <AppBar
        position="fixed"
        sx={{
            bgcolor: (theme) =>
            theme.palette.mode === "light" ? "#ff6f61" : "#1e1e2f", // totally different
            color: (theme) =>
            theme.palette.mode === "light" ? "#ffffff" : "#f5f5f5",
            boxShadow: 4,
        }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems:'center' }}>
        <Box sx={{ display: "flex", alignItems:'center'}}>
          <Typography component={NavLink} to="/" variant="h6" sx={navStyles}>
            KIT-STORE
          </Typography>
          <IconButton onClick={()=> dispatch(toggleDarkMode())} color="warning">
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: "yellow" }} />}
          </IconButton>
              </Box>
          <List sx={{ display: "flex" }}>
            {midLinks.map(({ title, path }, idx) => (
                <ListItem component={NavLink} to={path} key={idx} sx={(theme) => navStyles(theme)}>
                    {title.toUpperCase()}
                </ListItem>
            ))}
          </List>
        <Box sx={{ display: "flex", alignItems:'center' }}>
          <IconButton size="large" sx={{ color: "inherit" }} component={NavLink} to='cart'>
            <Badge badgeContent={0} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>
          
          {/* { user 
            ? (
              <Box display="flex">
                <Box display="flex" alignContent="center" justifyContent="center">
            <img src={user?.pictureUrl || "https://t4.ftcdn.net/jpg/03/32/59/65/240_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg"} alt="profile image"style={{height:50, borderRadius:"50px"}}/>
                </Box>
            <UserMenu user={user}/>
              </Box>
          )
            : (<List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }, idx) => (
              <ListItem component={NavLink} to={path} key={idx} sx={navStyles}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>)
          } */}
          <List sx={{ display: "flex" }}>
            {rightLinks.map(({ title, path }, idx) => (
              <ListItem component={NavLink} to={path} key={idx} sx={(theme) => navStyles(theme)}>
              {title.toUpperCase()}
            </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
      {isLoading && (
        <Box sx={{width:'100%'}}>
            <LinearProgress color="secondary"/>
        </Box>
      )}
    </AppBar>
  )
}
export default Navbar