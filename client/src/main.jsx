import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import App from './App.jsx'
//import public pages
import Layout from './components/Layout.jsx'
import Index from './pages/home.jsx'
import Portfolio from './pages/portfolio.jsx'
import Articles from './pages/articles.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
//import admin pages
import AdminLayout from './pages/adminLayout.jsx'
import AdminDashboard from './pages/adminDashboard.jsx'
import AdminProjects from './pages/adminProjects.jsx'
import AdminArticles from './pages/adminArticles.jsx'
import AdminAwards from './pages/adminAwards.jsx'
import AdminStaff from './pages/adminStaff.jsx'
import AdminUsers from './pages/adminUsers.jsx'
import ProjectPage from './pages/projectPage.jsx'
import ArticlePage from './pages/articlePage.jsx'
//import css
import "./css/general.css"

const router = createBrowserRouter([
  {
    element: <Layout />, // <-- here
    children: [
      { path: "/", element: <Index /> },
      { path: "/about", element: <About /> },
      { path: "/portfolio",element: <Portfolio /> },
      { path: "/portfolio/:id",element: <ProjectPage /> },
      { path: "/articles", element: <Articles /> },
      { path: "/articles/:id", element: <ArticlePage /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
  {
    path: "/the-under-belly",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminDashboard /> },
      { path: "projects", element: <AdminProjects /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "awards", element: <AdminAwards /> },
      { path: "staff", element: <AdminStaff /> },
      { path: "users", element: <AdminUsers /> },
    ],
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router ={router}/>
  </StrictMode>,
)