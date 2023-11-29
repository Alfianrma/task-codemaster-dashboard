import { Route, Routes } from 'react-router-dom';
import CheckAuth from './CheckAuth';
import ProtectedRoute from './ProtectedRoute';
import UnderConstruction from '../components/UnderConstruction';
import AdminLayout from '../layouts/AdminLayouts';
import SignIn from '../pages/signin/SignIn';
import Students from '../pages/student/Students';
import Payment from '../pages/payment/Payment';
import Course from '../pages/course/Course';
import Dashboard from '../pages/dashboard/Dashboard';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CheckAuth />} />
      <Route path="*" element={<UnderConstruction />} />
      <Route
        path="signin"
        element={
          <CheckAuth>
            <SignIn />
          </CheckAuth>
        }
      />
      <Route
        path="admin/*"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="*" element={<UnderConstruction />} />
        <Route path="course" element={<Course />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="payment" element={<Payment />} />
        <Route path="report" element={<UnderConstruction />} />
        <Route path="settings" element={<UnderConstruction />} />
      </Route>
    </Routes>
  );
};
