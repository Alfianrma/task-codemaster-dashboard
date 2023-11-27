import { Route, Routes } from 'react-router-dom';
import CheckAuth from './CheckAuth';
import UnderConstruction from '../components/UnderConstruction';
import AdminLayout from '../layouts/AdminLayouts';
import SignIn from '../pages/signin/SignIn';

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
      <Route path="admin/*" element={<AdminLayout />}>
        <Route path="*" element={<UnderConstruction />} />
        <Route path="course" element={<UnderConstruction />} />
        <Route path="dashboard" element={<UnderConstruction />} />
        <Route path="students" element={<UnderConstruction />} />
        <Route path="payment" element={<UnderConstruction />} />
        <Route path="report" element={<UnderConstruction />} />
        <Route path="settings" element={<UnderConstruction />} />
      </Route>
    </Routes>
  );
};
