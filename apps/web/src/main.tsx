import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './dashboard.tsx'
import CallPage from './call.tsx'
import Home from './home.tsx'
import Project from './project.tsx'
import CreateProject from './createProject.tsx'
import Schedule from './schedule.tsx'
import CreateSchedule from './createSchedule.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/app" element={<App />} />
      <Route path="/call" element={<CallPage />} />
      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<Navigate to="home" replace />} />
        <Route path="home" element={<Home />} />
        <Route path="project" element={<Project />} />
        <Route path="project/create/:projectId" element={<CreateProject />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="schedule/create" element={<CreateSchedule />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
