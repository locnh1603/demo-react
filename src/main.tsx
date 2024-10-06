import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Tasks from './routes/tasks.tsx';
import Layout from './routes/layout.tsx';
import ErrorPage from './routes/error.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Tasks></Tasks>,
    errorElement: <ErrorPage></ErrorPage>
  }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </StrictMode>,
)
