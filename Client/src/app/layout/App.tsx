
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Header from "./Header"
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"
import { useStoreContext } from "../context/StoreProvider";
import agent from "../api/agent";
import Loading from "./Loading";
import { getCookie } from "../utils/util";

function App() {

  const {setBasket} = useStoreContext();
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const buyerIdCookie = getCookie("buyerId");
    if (!buyerIdCookie) setLoading(false);

    agent.requests
      .get("basket")
      .then(response => setBasket(response))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
      
  }, [setBasket])

  function handleDarkModeChange(_: React.ChangeEvent, checked: boolean) {
    setDarkMode(checked);
  }
  
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    }
  });

  if (loading) return <Loading/>

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
