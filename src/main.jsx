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
  EditProfile
} from "./pages/index.js"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
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
        path: "/profile/edit",
        element: (
          <Protected authentication>
            <EditProfile />
          </Protected>
        )
      },
      {
        path: "/profile/change-password",
        element: (
          <Protected authentication>
            <ChangePassword />
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
        path: "/projects/:projectId/tasks/:taskId",
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

      {
        path: "/projects/:projectId/tasks/create",
        element: (
          <Protected authentication >
            <AddTask />
          </Protected>
        )
      },

      {
        path: "/projects/:projectId/tasks/:taskId/edit",
        element: (
          <Protected authentication >
            <EditTask />
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
