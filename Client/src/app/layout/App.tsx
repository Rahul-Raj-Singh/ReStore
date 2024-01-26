
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Header from "./Header"
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"

function App() {

  const [darkMode, setDarkMode] = useState(true);

  function handleDarkModeChange(_: React.ChangeEvent, checked: boolean) {
    setDarkMode(checked);
  }
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    }
  });


  return (
    <ThemeProvider theme={theme}>
      <ToastContainer hideProgressBar position="bottom-right" theme="colored"/>
      <CssBaseline/>
      <Header darkMode={darkMode} onChangeDarkMode={handleDarkModeChange}/>
      <Container>
        <Outlet/>
      </Container>
    </ThemeProvider>
  )
}

export default App
