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
import ViewProject from './viewProject.tsx'
import Auth from './auth.tsx'
import Settings from './settings.tsx'

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
          <Route path="project/view/:projectId/:projectName" element={<ViewProject />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="schedule/create/:sessionId" element={<CreateSchedule />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path='auth' element={<Auth />} />
      </Routes>
    </BrowserRouter>
)
