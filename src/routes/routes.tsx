import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "@/components/PrivateRoute/PrivateRoute";
import { Loader } from "@/components/Loader/Loader";
import React, { Suspense } from "react";
// import { AdminPanelPage } from "@/pages/AdminPanelPage/AdminPanelPage";
import { CookieBanner } from "@/components/CookieBanner/CookieBanner";

const HomePage = React.lazy(() =>
  import("@/pages/HomePage/HomePage").then((module) => ({
    default: module.HomePage,
  }))
);

const AdminPanelPage = React.lazy(() =>
  import("@pages/AdminPanelPage/AdminPanelPage").then((module) => ({
    default: module.AdminPanelPage,
  }))
);

const LoginPage = React.lazy(() =>
  import("@/pages/LoginPage/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);

export const PublicRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin-panel"
          element={
            <PrivateRoute>
              <AdminPanelPage />
            </PrivateRoute>
          }
        />
      </Routes>

      <CookieBanner />
    </Suspense>
  );
};
