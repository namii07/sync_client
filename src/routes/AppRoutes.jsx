import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Pages
import Home from "../pages/Feed/Home";
import PostDetails from "../pages/Feed/PostDetails";
import Profile from "../pages/Profile/Profile";
import EditProfile from "../pages/Profile/EditProfile";
import Explore from "../pages/Explore/Explore";
import Chat from "../pages/Messages/Chat";
import NotificationsPage from "../pages/Notifications/Notifications";
import Settings from "../pages/Settings/Settings";
import Login from "../pages/Auth/Login";
import SignUp from "../pages/Auth/SignUp";
import ErrorPage from "../pages/Error/ErrorPage";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" replace />;
};

const AppRoutes = () => (
  <Routes>
    {/* Auth */}
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />

    {/* Main App */}
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path="/post/:id"
      element={
        <ProtectedRoute>
          <PostDetails />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile/:id"
      element={
        <ProtectedRoute>
          <Profile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/profile/:id/edit"
      element={
        <ProtectedRoute>
          <EditProfile />
        </ProtectedRoute>
      }
    />
    <Route
      path="/explore"
      element={
        <ProtectedRoute>
          <Explore />
        </ProtectedRoute>
      }
    />
    <Route
      path="/chat"
      element={
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      }
    />
    <Route
      path="/notifications"
      element={
        <ProtectedRoute>
          <NotificationsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/settings"
      element={
        <ProtectedRoute>
          <Settings />
        </ProtectedRoute>
      }
    />
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);

export default AppRoutes;
