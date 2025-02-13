// import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import Navbar from './components/shared/Navbar'
// import Login from './components/auth/Login'
// import Signup from './components/auth/Signup'
// import Home from './components/Home'
// import Jobs from './components/Jobs'
// import Browse from './components/Browse'
// import Profile from './components/Profile'
// import JobDescription from './components/JobDescription'
// import Companies from './components/admin/Companies'
// import CompanyCreate from './components/admin/CompanyCreate'
// import CompanySetup from './components/admin/CompanySetup'
// import AdminJobs from "./components/admin/AdminJobs";
// import PostJob from './components/admin/PostJob'
// import Applicants from './components/admin/Applicants'
// import ProtectedRoute from './components/admin/ProtectedRoute'
// import EmployerDashboard from './components/admin/EmployerDashboard'
// import Education from './components/ui/Education'
// import Adminjobedits from './components/admin/Adminjobedits'
// import Savedjobs from './components/Savedjobs'


// const appRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />
//   },
//   {
//     path: '/login',
//     element: <Login />
//   },
//   {
//     path: '/signup',
//     element: <Signup />
//   },
//   {
//     path: "/jobs",
//     element: <Jobs />
//   },
//   {
//     path: "/savedjobs",
//     element: <Savedjobs />
//   },
//   {
//     path: "/description/:id",
//     element: <JobDescription />
//   },
//   {
//     path: "/browse",
//     element: <Browse />
//   },
//   {
//     path: "/profile",
//     element: <Profile />
//   },
//   {
//     path: "/educationlisting",
//     element: <Education />
//   },
//   // admin ke liye yha se start hoga
//   {
//     path: "/admin/companies",
//     element: <ProtectedRoute><Companies /></ProtectedRoute>
//   },
//   {
//     path: "/admin/companies/create",
//     element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
//   },
//   {
//     path: "/admin/companies/:id",
//     element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobs",
//     element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobs/create",
//     element: <ProtectedRoute><PostJob /></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobedit/:id",
//     element: <ProtectedRoute><Adminjobedits/></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobs/:id/applicants",
//     element: <ProtectedRoute><Applicants /></ProtectedRoute>
//   },
//   {
//     path: "/admin/EmployerDashboard",
//     element: <ProtectedRoute><EmployerDashboard /></ProtectedRoute>
//   },

// ])
// function App() {

//   return (
//     <div>
//       <RouterProvider router={appRouter} />
//     </div>
//   )
// }

// export default App\



import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/shared/Navbar'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from "./components/admin/AdminJobs";
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import EmployerDashboard from './components/admin/EmployerDashboard'
import Education from './components/ui/Education'
import Adminjobedits from './components/admin/Adminjobedits'
import Savedjobs from './components/Savedjobs'
import Hrstats from './components/hrstats/Hrstats'
import Naveducation from './components/Navigation_indus_education/Naveducation'
import Navindustry from './components/Navigation_indus_education/navindustry'
// import VerifyOtp from './components/auth/Verifyotp'


const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/savedjobs",
    element: <Savedjobs />
  },
  {
    path: "/description/:id",
    element: <JobDescription />
  },
  {
    path: "/browse",
    element: <Browse />
  },
  {
    path: "/profile",
    element: <Profile />
  },

  {
    path: "/educationlisting/:id",
    element: <Education />
  },
  {
    path: "/naveducationlisting/:id",
    element: <Naveducation />
  },
  {
    path: "/navindustrylisting/:id",
    element: <Navindustry />
  },
  // {
  //   path: "/industrylisting/:id",
  //   element: <Displayindustrylis />
  // },

  {
    path: "/hrstats",
    element: <Hrstats />
  },
  {
    path: "/educationlisting",
    element: <Education />
  },
  // {
  //   path: "/verifyotp",
  //   element: <VerifyOtp />
  // },
  // admin ke liye yha se start hoga
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobedit/:id",
    element: <ProtectedRoute><Adminjobedits /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
  {
    path: "/admin/EmployerDashboard",
    element: <ProtectedRoute><EmployerDashboard /></ProtectedRoute>
  },

])
function App() {

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
