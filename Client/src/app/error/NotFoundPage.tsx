import { Button, Container, Divider, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom"

export default function NotFoundPage() {

  return (
    <Container component={Paper} sx={{p: 2}}>
        <Typography gutterBottom variant="h3" color="warning">Looks like we are lost!</Typography>
        <Divider sx={{mb: 2}}/>
        <Button component={Link} to="/">Go to home page</Button>
    </Container>
  )
}
