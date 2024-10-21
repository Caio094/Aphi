'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); // API JSONPlaceholder tem 100 posts
  const limit = 10; // Itens por página

  useEffect(() => {
    fetchPosts(currentPage);
  }, [currentPage]);

  async function fetchPosts(page) {
    try {
      const res = await fetch(`https://rickandmortyapi.com/api/posts?_page=${page}&_limit=${limit}`);
      const data = await res.json();
      setPosts(data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  }

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
    <div>
      <h1>Posts Paginados</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Anterior
        </button>
        <span style={{ margin: '0 10px' }}>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
    </div>
  );
}
