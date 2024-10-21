async function getCharacter(id) {
    const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
    if (!res.ok) throw new Error('Erro ao buscar personagem');
    return res.json();
  }
  
  export default async function CharacterDetails({ params }) {
    const { id } = params;
    const character = await getCharacter(id);
  
    return (
      <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
        <h1 className="text-2xl font-bold mb-4">{character.name}</h1>
        <img src={character.image} alt={character.name} className="w-full rounded-md mb-4" />
        <p><strong>Status:</strong> {character.status}</p>
        <p><strong>Espécie:</strong> {character.species}</p>
        <p><strong>Gênero:</strong> {character.gender}</p>
        <a href="/characters" className="mt-4 inline-block text-blue-600 hover:underline">
          Voltar para a lista
        </a>
      </div>
    );
  }
  