'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CharactersList() {
  const [characters, setCharacters] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  async function fetchCharacters(page) {
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await res.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages);
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
    }
  }

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Personagens de Rick and Morty</h1>
      <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {characters.map((character) => (
          <li key={character.id} className="border rounded-lg p-4 hover:shadow-lg">
            <Link href={`/characters/${character.id}`}>
              <img src={character.image} alt={character.name} className="w-full rounded-md" />
              <h2 className="mt-2 text-lg font-semibold">{character.name}</h2>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
