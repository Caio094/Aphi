// src/app/characters/[id]/page.js
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation'; // Alteração aqui

export default function CharacterDetail() {
  const { id } = useParams(); // Pegando o parâmetro id da URL
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
        const data = await res.json();
        setCharacter(data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar o personagem:', error);
      }
    };

    if (id) {
      fetchCharacter();
    }
  }, [id]);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <h1>{character.name}</h1>
      <img src={character.image} alt={character.name} width={200} />
      <p>Status: {character.status}</p>
      <p>Espécie: {character.species}</p>
      <p>Gênero: {character.gender}</p>
      <p>Origem: {character.origin.name}</p>
    </div>
  );
}
