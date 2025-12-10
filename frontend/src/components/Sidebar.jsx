import { Link } from "react-router-dom";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/", icon: "🏠" },
    { name: "Documents", path: "/documents", icon: "📄" },
    { name: "Patients", path: "/patients", icon: "🧑‍⚕️" },
    { name: "Appointments", path: "/appointments", icon: "📅" },
    { name: "Profile", path: "/profile", icon: "👤" }
  ];

  return (
    <div className="w-64 min-h-screen bg-white shadow-xl px-6 pt-12 pb-8 fixed">
      <h2 className="text-2xl font-bold text-blue-600 mb-10">
        🏥 HealthCare Portal
      </h2>

      <nav className="space-y-4">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className="flex items-center gap-3 text-gray-700 text-lg font-medium 
                       hover:text-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 transition"
          >
            <span className="text-2xl">{item.icon}</span> {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
