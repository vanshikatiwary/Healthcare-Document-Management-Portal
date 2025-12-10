import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  return (
    <div className="ml-72 pt-28 px-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Total Patients" value="2" icon="🧑‍⚕️" />
        <StatsCard title="Documents Uploaded" value="2" icon="📄" />
        <StatsCard title="Appointments Today" value="10" icon="📅" />
      </div>

      <div className="mt-10 bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-xl font-semibold text-blue-800">Recent Activity</h2>

        <ul className="mt-4 space-y-4 text-gray-700">
          <li>📄 A new document was uploaded 10 mins ago.</li>
          <li>🧑‍⚕️ New patient registered.</li>
          <li>📅 Appointment booked for tomorrow.</li>
        </ul>
      </div>
    </div>
  );
}
