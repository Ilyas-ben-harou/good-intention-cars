import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminLogin from "./components/admin/Login";
import AdminRegister from "./components/admin/Register";
import AdminProtectedRoute from "./components/admin/ProtectedRoute";
import ListCars from "./views/cars/ListCars";
import CreateCar from "./views/cars/CreateCar";
import DetailCar from "./views/cars/DetailCar";
import UpdateCar from "./views/cars/UpdateCar";
import ListReservations from "./views/reservations/ListReservations";
import CreateReservation from "./views/reservations/CreateReservation";
import DetailReservation from "./views/reservations/DetailReservation";
import UpdateReservation from "./views/reservations/UpdateReservation";
import Users from "./views/users/Users";
import DetailUser from "./views/users/DetailUser";
import Dashboard from "./components/client/accueill/Dashboard";
import ParcAuto from "./components/client/parcAuto/ParcAuto";
import CarDetail from "./components/client/detailCar/CarDetail";
import RentCar from "./components/client/rentCar/RentCar";
import AboutUs from "./components/client/aboutUs/AboutAs";
import OurConditions from "./components/client/terms&conditions/OurConditions";
import Contact from "./components/client/contact/Contact";
import ClinetProtectedRoute from "./components/client/ProtectedRoute";
import DashboardAdmin from "./components/admin/Dashboard";
import ListAssurance from "./views/assurance/ListAssurance";
import UpdateAssurance from "./views/assurance/UpdateAssurance";
import DetailAssurance from "./views/assurance/DetailAssurance";
import CreateAssurance from "./views/assurance/CreateAssurance";
import ListVisits from "./views/visits/ListVisits";
import CreateVisit from "./views/visits/CreateVisit";
import UpdateVisit from "./views/visits/UpdateVisit";
import DetailVisit from "./views/visits/DetailVisit";
import ForgotPassword from "./components/admin/ForgotPassword";
import ResetPassword from "./components/admin/ResetPassword";
import ErrorPage from "./components/admin/ErrorPage";



const router = createBrowserRouter([
    // Public Admin Routes
    
    // Public Admin Routes
    {
        path: "/admin/login",
        element: <AdminLogin />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/admin/register",
        element: <AdminRegister />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/admin/forgot-password",
        element: <ForgotPassword />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/admin/reset-password/:token/:email",
        element: <ResetPassword />,
        errorElement: <ErrorPage />,
    },
    // Protected Admin Routes
    {
        path: "/admin",
        element: <AdminProtectedRoute />,  // Protects all nested routes
        children: [
            {
                path: "dashboard",
                element: <DashboardAdmin />,
            },
            {
                path: "cars",
                element: <ListCars />,
            },
            {
                path: "cars/create-car",
                element: <CreateCar />,
            },
            {
                path: "cars/:id",
                element: <DetailCar />,
            },
            {
                path: "cars/edit/:id",
                element: <UpdateCar />,
            },
            {
                path: "assurances",
                element: <ListAssurance />,
            },
            {
                path: "assurances/:id",
                element: <DetailAssurance />,
            },
            {
                path: "assurances/edit/:id",
                element: <UpdateAssurance />,
            },
            {
                path: "assurances/create",
                element: <CreateAssurance />,
            },
            {
                path: 'reservations',
                element: <ListReservations />
            },
            {
                path: 'reservations/create-reservation',
                element: <CreateReservation />
            },
            {
                path: 'reservations/:id',
                element: <DetailReservation />
            },
            {
                path: 'reservations/edit/:id',
                element: <UpdateReservation />
            },
            {
                path: "technical-visits",
                element: <ListVisits />,
            },
            {
                path: "technical-visits/create/:id",
                element: <CreateVisit />,
            },
            {
                path: "technical-visits/create",
                element: <CreateVisit />,
            },
            {
                path: "technical-visits/edit/:id",
                element: <UpdateVisit />,
            },
            {
                path: "technical-visits/:id",
                element: <DetailVisit />,
            },
            {
                path: "users",
                element: <Users />,
            },
            {
                path: "users/:id",
                element: <DetailUser />,
            },

        ],
    },
    {
        path: "/",
        element: <ClinetProtectedRoute />,  // Protects all nested routes
        children: [
            {
                path: "",
                element: <Dashboard />,
            },
            {
                path: "/parc-auto",
                element: <ParcAuto />,
            },
            {
                path: "/car/:id",
                element: <CarDetail />,
            },
            {
                path: "/rent-car/:id",
                element: <RentCar />,
            },
            {
                path: "/about-us",
                element: <AboutUs />,
            },
            {
                path: "/terms&conditions",
                element: <OurConditions />,
            },
            {
                path: "/contact",
                element: <Contact />,
            },
        ],
    },
]);

export default router;
