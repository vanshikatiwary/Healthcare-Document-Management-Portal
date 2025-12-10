import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Patients from "./pages/Patients";
import Appointments from "./pages/Appointments";

export default function App() {
  return (
    <BrowserRouter>
      <Sidebar />
      <Topbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/patients" element={<Patients />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}
