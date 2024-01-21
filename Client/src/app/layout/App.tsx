
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Header from "./Header"
import { useState } from "react";
import { Outlet } from "react-router-dom";

function App() {

  const [darkMode, setDarkMode] = useState(true);

  function handleDarkModeChange(_: any, checked: boolean) {
    setDarkMode(checked);
  }
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    }
  });


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Header darkMode={darkMode} onChangeDarkMode={handleDarkModeChange}/>
      <Container>
        <Outlet/>
      </Container>
    </ThemeProvider>
  )
}

export default App
