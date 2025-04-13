import { Box, Button, Typography } from "@mui/material"
import { Link } from "react-router-dom"

const HomePage = () => {
  return (
    <Box maxWidth="xl" mx="auto" px={4} position="relative">
      <Box display="flex" height={"100vh"} flexDirection="column" alignItems="center" justifyContent="center" position="relative">
        <img src="/images/hero1.png" alt="hero image kits"
         style={{
          position:"absolute",
          inset: 0,
          width:"100%",
          height:"100%",
          objectFit:"cover",
          borderRadius:'16px',
          zIndex:0
          }}/>
          <Box display="flex" flexDirection="column" p={8} alignItems="center" position="relative" borderRadius={4}>
            <Typography
              variant="h1"
              color="white"
              fontWeight="bold"
              textAlign="center"
              my={3}
              sx={{
                textShadow: "7px 7px 8px rgba(0,0,0,0.8)",
              }}
            >
              Welcome to KitStore!
            </Typography>
            <Button
            variant="contained"
            size="large"
            component={Link}
            to="/catalog"
            sx={{
              mt:8,
              backgroundImage: "linear-gradient(to right, #2563eb, #06b6d4",
              fontWeight:"bold",
              color:"white",
              borderRadius:"16px",
              px:8,
              py:2,
              border:"2px solid transparent"
            }}
            >
              Go To Shop
            </Button>
          </Box>
      </Box>
    </Box>
  )
}
export default HomePage