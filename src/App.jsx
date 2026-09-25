import { useEffect, useState } from 'react'
import authService from "./services/authService.js"
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from "./store/authSlice.js"
import { Header, Footer } from "./components/index.js"
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';



function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const theme = useSelector((state) => state.theme.theme)

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData.data));
        }
        else {
          dispatch(logout())
        }
      })
      .catch((error) => {
        console.log(error)
        navigate("/login")
      })
      .finally(() => {
        setLoader(false)
      })

  }, [dispatch])

  useEffect(() => {
    document.documentElement.classList.toggle("dark" , theme  === "dark");
    localStorage.setItem("theme" , theme);

  }, [theme])

  return loader ? <h1>Loading...</h1> :
    <>

      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />

      <Toaster
      richColors 
      closeButton
      theme={theme}
      />

    </>
}

export default App
