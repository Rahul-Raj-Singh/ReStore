import { Button, ButtonGroup, Container, Typography } from "@mui/material";
import agent from "../../app/api/agent";

export default function AboutPage() {
  return (
    <Container>
      <Typography variant="h2" gutterBottom>Error Testing</Typography>
      <ButtonGroup>
        <Button variant="contained" onClick={() => agent.requests.get("errortest/bad-request")}>Test 400 Error</Button>
        <Button variant="contained" onClick={() => agent.requests.get("errortest/not-authenticated")}>Test 401 Error</Button>
        <Button variant="contained" onClick={() => agent.requests.get("errortest/not-found")}>Test 404 Error</Button>
        <Button variant="contained" onClick={() => agent.requests.get("errortest/server-error")}>Test 500 Error</Button>
        <Button variant="contained" onClick={() => agent.requests.get("errortest/validation-error")}>Test Validation Error</Button>
      </ButtonGroup>
    </Container>
  )
}
