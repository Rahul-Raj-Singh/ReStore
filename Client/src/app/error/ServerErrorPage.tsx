import { Container, Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom"

export default function ServerErrorPage() {
    const {state} = useLocation();

  return (
    <Container component={Paper}>
        <Typography gutterBottom variant="h3">Server Error</Typography>
        <Divider sx={{mb: 2}}/>
        <Typography>
            {state?.error ? state.error : null}
        </Typography>
    </Container>
  )
}
