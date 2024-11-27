'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Importa o componente Image do Next.js para carregar as imagens

export default function CharactersList() {
  const [characters, setCharacters] = useState([]); // Lista de personagens
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const [totalPages, setTotalPages] = useState(1); // Total de páginas
  const limit = 10; // Itens por página

  // Função para carregar os personagens de uma página
  useEffect(() => {
    fetchCharacters(currentPage);
  }, [currentPage]);

  async function fetchCharacters(page) {
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
      const data = await res.json();
      setCharacters(data.results);
      setTotalPages(data.info.pages); // Total de páginas que a API retorna
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
    }
  }

  // Funções para manipular a navegação entre páginas
  function handleNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function handlePreviousPage() {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Personagens de Rick and Morty</h1>
      
      {/* Grid de personagens */}
      <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', listStyle: 'none' }}>
        {characters.map((character) => (
          <li key={character.id} style={{ padding: '10px' }}>
            <Link href={`/characters/${character.id}`}>
              <div
                style={{
                  border: '2px solid #ddd',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.3s ease',
                }}
              >
                <Image
                  src={character.image}
                  alt={character.name}
                  width={300} // Tamanho da imagem
                  height={400}
                  style={{
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{character.name}</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      {/* Navegação de Páginas */}
      <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            marginRight: '15px',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          }}
        >
          Anterior
        </button>

        <span style={{ margin: '0 10px', fontSize: '16px' }}>
          Página {currentPage} de {totalPages}
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          style={{
            backgroundColor: '#007BFF',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            padding: '10px 20px',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          }}
        >
          Próxima
        </button>
      </div>
    </div>
  );
}
