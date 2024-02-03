
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material"
import Header from "./Header"
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css"
import agent from "../api/agent";
import Loading from "./Loading";
import { getCookie } from "../utils/util";
import { useAppDispatch } from "../store/store";
import { setBasket } from "../../features/basket/basketSlice";

function App() {

  const dispatch = useAppDispatch();
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const buyerIdCookie = getCookie("buyerId");
    if (!buyerIdCookie) setLoading(false);

    agent.requests
      .get("basket")
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
      
  }, [dispatch])

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
