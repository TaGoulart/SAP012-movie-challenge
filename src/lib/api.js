// lib/api.js

// Função para buscar todos os filmes de ficção científica
async function fetchTodosFilmesFiccaoCientifica(page = 1) {
    const apiKey = 'e703ec6632fe30aea479ecd3ce27b30f';
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=${page}&with_genres=878`;

    return fetch(url)
        .then(response => response.json())
        .then(data => data.results)
        .catch(error => {
            console.error('Ocorreu um erro ao obter os filmes de ficção científica:', error);
            return []; // Retorna uma lista vazia em caso de erro
        });
}

export { fetchTodosFilmesFiccaoCientifica };
