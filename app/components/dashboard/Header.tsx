'use client';
export default function Header() {
    return (
        <header className="flex justify-between items-center bg-gray-800 shadow px-6 py-3 mb-5">
            <h1 className="text-lg font-bold text-white">Dashboard</h1>
            <div className="flex items-center gap-4">
                <span className="text-white">Usuario A</span>
                <img src="/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full" />
            </div>
        </header>
    );
}