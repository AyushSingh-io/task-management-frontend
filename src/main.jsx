import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./app.css"
import { Provider } from 'react-redux'
import store from './store/store.js'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import {Protected} from './components/index.js'
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
  EditProject
} from "./pages/index.js"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: (
          <Protected authentication>
            <DashBoard />
          </Protected>
        )
      },

      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        )
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <Signup />
          </Protected>
        )
      },
      {
        path: "/profile",
        element: (
          <Protected authentication>
            <Profile />
          </Protected>
        )
      },
      {
        path: "/projects",
        element: (
          <Protected authentication >
            <Projects />
          </Protected>
        )
      },
      {
        path: "/projects/:projectId",
        element: (
          <Protected authentication >
            <ProjectDetails />
          </Protected>
        )
      },
      {
        path: "/my-tasks",
        element: (
          <Protected authentication >
            <MyTasks />
          </Protected>
        )
      },
      {
        path: "/task-details",
        element: (
          <Protected authentication >
            <TaskDetails />
          </Protected>
        )
      },
      {
        path: "/project/create",
        element: (
          <Protected authentication >
            <AddProject />
          </Protected>
        )
      },
      {
        path: "/projects/:projectId/edit",
        element: (
          <Protected authentication >
            <EditProject />
          </Protected>
        )
      },

    ]
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
