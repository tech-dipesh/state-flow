import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import Home from './Pages/Home';
import Loader from "./Common/Loader"
import Error from './Common/Error';
const List=lazy(()=>import("./Pages/Task.jsx"))
const Board=lazy(()=>import("./Pages/Board.jsx"))
const Keyboardshortcut=lazy(()=>import("./Pages/keyboard-shortcut.jsx"))
const Chart=lazy(()=>import("./Pages/Chart.jsx"))

let router = createBrowserRouter([
{ 
    path: "/",
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/load",
        element:  <Loader/>
      },
      {
        path: "/list",
        element:  <List/>
      },
      {
        path: "/board",
        element: <Board/>
      },
      {
        path: "/chart",
        element: <Chart/>
      },
      {
        path: "/shortcut",
        element: <Keyboardshortcut/>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<Loader />}>
      <RouterProvider router={router} />
    </Suspense>
  </StrictMode>,
)
