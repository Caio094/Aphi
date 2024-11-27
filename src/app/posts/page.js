'use client'; // Adicione esta linha no início

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PostsList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10); // API JSONPlaceholder tem 100 posts
  const limit = 10; // Itens por página

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(`https://rickandmortyapi.com/api/posts?_page=${currentPage}&_limit=${limit}`);
      const data = await res.json();
      setPosts(data);
    }

    fetchPosts();
  }, [currentPage]);

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

      <div>
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>{currentPage} de {totalPages}</span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
    </div>
  );
}
