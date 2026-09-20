import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./app.css"
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Protected } from './components/index.js'
import {
  Login,
  MyTasks,
  Profile,
  ProjectDetails,
  Projects,
  Signup,
  TaskDetails,
  DashBoard,
  AddProject,
  EditProject,
  AddTask,
  EditTask,
  ChangePassword,
  EditProfile,
  ProjectMembers
} from "./pages/index.js"

import { Toaster } from 'sonner'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </StrictMode>,
)
