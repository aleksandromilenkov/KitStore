import {
  Box,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
} from "@mui/material";
import Navbar from "./Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useAppSelector } from "../store/store"
function App() {
  const darkMode = useAppSelector(state=>state.ui.darkMode);
  const paletteType = darkMode ? "dark" : "light";
  const theme = createTheme({
    typography: {
      fontFamily: "Roboto, sans-serif",
      h6: {
        fontWeight: 600,
        letterSpacing: "0.05em",
      },
    },
    palette: {
      mode: paletteType,
      ...(paletteType === "light"
        ? {
            // Light mode palette
            primary: {
              main: "#1976d2",
            },
            secondary: {
              main: "#00bcd4",
            },
            background: {
              default: "#f4f9fd",
              paper: "#ffffff",
            },
          }
        : {
            // Dark mode palette
            primary: {
              main: "#90caf9",
            },
            secondary: {
              main: "#80cbc4",
            },
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
    },
  });
  
  return (
    <ThemeProvider theme={theme}>
      <ScrollRestoration/>
      <CssBaseline />
      <Navbar/>
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode
            ? "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
            : "linear-gradient(135deg, #e0f7fa, #ffffff, #e3f2fd)",
          pt: 12,
        }}
      >
        <Container maxWidth="xl">
          <Outlet/>
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
