import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
//context
import { ApiUrlProvider } from './context/apiContext.jsx'
//error page
import ErrorPage from './pages/errorPage.jsx'
//import public pages
import Layout from './components/Layout.jsx'
import Index from './pages/home.jsx'
import Portfolio from './pages/portfolio.jsx'
import Articles from './pages/articles.jsx'
import About from './pages/about.jsx'
import Contact from './pages/contact.jsx'
//import admin pages
import AdminLogin from './pages/adminLogin.jsx'
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
    element: <Layout />,
    children: [
      { path: "/", element: <Index /> },
      { path: "/about", element: <About /> },
      { path: "/portfolio",element: <Portfolio /> },
      { path: "/portfolio/:slug",element: <ProjectPage /> },
      { path: "/articles", element: <Articles /> },
      { path: "/articles/:slug", element: <ArticlePage /> },
      { path: "/contact", element: <Contact /> },
    ],
    errorElement: <ErrorPage />
  },
  {
    path: "/login", element: <AdminLogin />
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
    errorElement: <ErrorPage />
  }
]);

createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <RouterProvider router ={router}/>
  //</StrictMode>
)