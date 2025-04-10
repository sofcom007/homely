import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.jsx'
//import pages
import Index from './pages/home.jsx'
import Portfolio from './pages/portfolio.jsx'
import Articles from './pages/articles.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
//import css
import "./css/general.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/portfolio",
    element: <Portfolio />
  },
  {
    path: "/articles",
    element: <Articles />
  },
  {
    path: "/contact",
    element: <Contact />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>,
)