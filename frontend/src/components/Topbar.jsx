export default function Topbar() {
    return (
      <header className="w-full bg-white shadow-sm py-3 px-8 flex justify-end items-center fixed z-20">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-gray-700">Vanshika</span>
          <img
            src="https://ui-avatars.com/api/?name=Vanshika&background=0D8ABC&color=fff"
            className="w-10 h-10 rounded-full shadow"
          />
        </div>
      </header>
    );
  }
  