import { useEffect, useState } from 'react'
import authService from "./services/authService.js"
import { useDispatch } from 'react-redux';
import { login, logout } from "./store/authSlice.js"
import { Header, Footer } from "./components/index.js"
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function App() {
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
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

  return loader ? <h1>Loading...</h1> :
    <>

      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />

    </>
}

export default App
