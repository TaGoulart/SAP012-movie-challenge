// lib/api.js

// Função para buscar todos os filmes de ficção científica
async function fetchTodosFilmesFiccaoCientifica(page = 1) {
    const apiKey = 'e703ec6632fe30aea479ecd3ce27b30f';
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}&with_genres=878`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Ocorreu um erro ao obter os filmes de ficção científica:', error);
        return []; // Retorna uma lista vazia em caso de erro
    }
}

// Função para buscar detalhes de um filme específico
async function fetchMovieDetails(filmeId) {
    const apiKey = 'e703ec6632fe30aea479ecd3ce27b30f';
    const url = `https://api.themoviedb.org/3/movie/${filmeId}?api_key=${apiKey}&language=pt-BR`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch movie details');
        }
        return await response.json();
    } catch (error) {
        console.error('Ocorreu um erro ao obter os detalhes do filme:', error);
        return {}; // Retorna um objeto vazio em caso de erro
    }
}

export { fetchTodosFilmesFiccaoCientifica, fetchMovieDetails };
