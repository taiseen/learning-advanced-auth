import RedirectAuthenticatedUser from "./routes/RedirectAuthenticatedUser";
import EmailVerificationPage from "./pages/EmailVerificationPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import RegistrationPage from "./pages/RegistrationPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardPage from "./pages/DashboardPage";
import BgShape from "./components/BgShape";
import LoginPage from "./pages/LoginPage";

import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { route } from "./routes";



const App = () => {

  const { isCheckingAuth, checkAuth } = useAuthStore();


  useEffect(() => { checkAuth() }, [checkAuth]);


  if (isCheckingAuth) return <LoadingSpinner />;


  return (
    <div className='backgroundStyle'>

      <BgShape />


      <Routes>

        <Route
          path={route.root}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />


        <Route
          path={route.register}
          element={
            <RedirectAuthenticatedUser>
              <RegistrationPage />
            </RedirectAuthenticatedUser>
          }
        />


        <Route
          path={route.login}
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />


        <Route
          path={route.emailVerification}
          element={
            <RedirectAuthenticatedUser>
              <EmailVerificationPage />
            </RedirectAuthenticatedUser>
          }
        />


        <Route
          path={route.forgotPassword}
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />


        <Route
          path={route.resetPassword}
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />


        <Route
          //* catch all routes 
          path={route.pageNotFound}
          element={<Navigate to={route.root} replace />}
        />


      </Routes>

      <Toaster />

    </div >
  )
}

export default App;