import { Container, Typography, Box, Card, CardContent } from "@mui/material";

const AboutPage = () => {
  return (
    <Container maxWidth="md" sx={{ pb: "10px" }}>
      <Box textAlign="center" my={4}>
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          About Us
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Your go-to destination for authentic football kits worldwide.
        </Typography>
      </Box>

      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Who We Are
          </Typography>
          <Typography variant="body1" color="textSecondary">
            At KitStore, we live and breathe football. We bring you the latest
            official home, away, and third kits from your favorite clubs and
            national teams. From iconic classics to this season’s fresh drops,
            we make sure every fan finds their perfect fit.
          </Typography>
        </CardContent>
      </Card>

      <Card sx={{ mb: 4, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="body1" color="textSecondary">
            We aim to unite fans around the world through the love of the game.
            Our mission is to provide high-quality, 100% authentic football kits
            that celebrate the passion, pride, and history of football culture.
            Whether you’re in the stands, on the pitch, or at home—we’ve got
            the gear that lets you rep your team with pride.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AboutPage;
