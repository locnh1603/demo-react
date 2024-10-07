import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, Navigate, RouterProvider} from 'react-router-dom';
import Layout from './routes/layout.tsx';
import ErrorPage from './routes/error.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate replace to="/users" />
  },
  {
    path: '/users',
    errorElement: <ErrorPage></ErrorPage>,
    lazy: async() => {
      const Users = await import('./routes/users.tsx');
      return {
        Component: Users.default
      }
    }
  }, {
    path: '/tasks/:userId',
    errorElement: <ErrorPage></ErrorPage>,
    lazy: async() => {
      const Tasks = await import('./routes/tasks.tsx');
      return {
        Component: Tasks.default
      }
    }
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </StrictMode>,
)
