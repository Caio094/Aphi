import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <h1 className="text-4xl font-bold mb-6">Bem-vindo a listagem dos peronagens de Rick and Morty </h1>
      <Link href="/characters">
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-md shadow-md hover:bg-gray-200 transition">
          Ver personagens
        </button>
      </Link>
    </div>
  );
}
