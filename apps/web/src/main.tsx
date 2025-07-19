import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './dashboard.tsx'
import CallPage from './call.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/app" element={<App />} />
      <Route path="/call" element={<CallPage />} />
      <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />
      <Route path="/dashboard/:page" element={<DashboardLayout />}>
      </Route>
    </Routes>
  </BrowserRouter>
)
