export default function StatsCard({ title, value, icon }) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 flex items-center gap-6 hover:shadow-xl transition">
        <div className="text-4xl">{icon}</div>
        <div>
          <p className="text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-blue-700">{value}</p>
        </div>
      </div>
    );
  }
  