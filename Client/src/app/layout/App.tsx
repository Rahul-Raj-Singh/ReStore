
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Header from "./Header"
import Catalog from "../../features/catalog/Catalog";
import { useState } from "react";

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
        <Catalog/>
      </Container>
    </ThemeProvider>
  )
}

export default App
