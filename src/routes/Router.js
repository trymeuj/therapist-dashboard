import { lazy } from "react";
import { Navigate } from "react-router-dom";
import LoginForm from "../views/ui/Cards";
import SignupForm from "../views/ui/Signup.js";
import ProtectedRoute from "../protectedRoute.js";
import GeneralTherapistProfile from "../views/ui/therapistProf.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

const Starter = lazy(() => import("../views/Starter.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const TherapistProfile = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));
const ProfilePage  = lazy(() => import("../views/ui/ProfilePage.js"));
const AllTherapists = lazy(() => import("../views/ui/Alltherapists.js"));
const AllPatients = lazy(() => import("../views/ui/Allpatients.js"));
const AllTechniques = lazy(() => import("../views/ui/Alltechniques.js"));
const Contributions = lazy(() => import("../views/ui/Contributions.js"));
const Feedetail = lazy(() => import("../views/ui/Feedetail.js"));
/*****Routes******/

const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: '', element: <Navigate to="starter" /> },
      { path: 'starter', element: <ProtectedRoute element={Starter} /> },
      { path: 'patients', element: <ProtectedRoute element={Starter} /> },
      { path: 'about', element: <ProtectedRoute element={About} /> },
      { path: 'exercises', element: <ProtectedRoute element={Alerts} /> },
      { path: 'timetable', element: <ProtectedRoute element={Badges} /> },
      { path: 'profile', element: <ProtectedRoute element={TherapistProfile} /> },
      { path: 'login', element: <LoginForm /> },
      { path: 'grid', element: <ProtectedRoute element={Grid} /> },
      { path: 'table', element: <ProtectedRoute element={Tables} /> },
      { path: 'forms', element: <ProtectedRoute element={Forms} /> },
      { path: 'breadcrumbs', element: <ProtectedRoute element={Breadcrumbs} /> },
      { path: 'userprofile/:id', element: <ProtectedRoute element={ProfilePage} /> },
      { path: 'therapist/:id', element: <ProtectedRoute element={GeneralTherapistProfile} /> },
      { path: 'signup', element: <SignupForm /> },
      { path: 'alltherapists', element: <ProtectedRoute element={AllTherapists} /> },
      { path: 'allpatients', element: <ProtectedRoute element={AllPatients} /> },
      { path: 'alltechniques', element: <ProtectedRoute element={AllTechniques} /> },
      { path: 'contributions', element: <ProtectedRoute element={Contributions} /> },
      { path: 'feedetail', element: <ProtectedRoute element={Feedetail} /> },
    ],
  },
];

export default ThemeRoutes;
