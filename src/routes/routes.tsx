import { Routes, Route, Navigate } from 'react-router-dom';
import GeneralList from '../pages/GeneralList';
import UserList from '../pages/UserList';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<GeneralList />} />
      
      <Route path="/my-books" element={<UserList />} />
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
