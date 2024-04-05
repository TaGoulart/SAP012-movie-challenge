const App = () => {
  const el = document.createElement('div');
  el.className = 'App';

  el.innerHTML = `
    <header class="cabecalho">
      <h1 class="cabecalho__titulo">Filmes de Ficção Científica</h1>
      <div class="cabecalho__pesquisa">
        <input type="text" class="cabecalho__pesquisa-input" placeholder="Digite algum filme para pesquisar..." />
        <span class="cabecalho__pesquisa-lupa">
          <img src="img/search-icon.svg" alt="" />
        </span>
      </div>
    </header>
    <section id="filmes">
    </section>
    <section class="card__lista-va">
    </section>
  `;

  const ElementoParaInserirFilmes = el.querySelector('#filmes');

  function fetchTodosFilmesFiccaoCientifica() {
    const apiKey = 'e703ec6632fe30aea479ecd3ce27b30f';
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&with_genres=878&per_page=20`;

    return fetch(url)
      .then(response => response.json())
      .then(data => data.results)
      .catch(error => {
        console.error('Ocorreu um erro ao obter os filmes de ficção científica:', error);
        return []; // Retorna uma lista vazia em caso de erro
      });
  }

  function InserirFilmesNaTela(filmes) {
    ElementoParaInserirFilmes.innerHTML = '';
    filmes.forEach(movie => {
      const movieId = movie.id; //extrai o ID do filme do obj
      const title = movie.title;
      const releaseYear = movie.release_date.split('-')[0];
      const posterPath = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
      const rating = movie.vote_average.toFixed(1);
      const overview = movie.overview;

      // Criação dos elementos para inserção dos filmes
      const section = document.createElement('section');
      section.className = 'cards';
      section.dataset.movieId = movieId;

      const parte1 = document.createElement('div');
      parte1.className = 'cards__parte1';

      const img = document.createElement('img');
      img.src = posterPath;
      img.alt = 'Capa';
      img.className = 'cards__parte1-capa';

      parte1.appendChild(img);
      section.appendChild(parte1);

      // Continuação da criação dos elementos para inserção dos filmes
      const parte2 = document.createElement('div');
      parte2.className = 'cards__parte2';

      const titulo = document.createElement('h2');
      titulo.className = 'cards__parte2-titulo';
      titulo.textContent = `${title} (${releaseYear}) - Rating: ${rating}`;

      const details = document.createElement('div');
      details.className = 'cards__parte2-details';

      const ratingDiv = document.createElement('div');
      const ratingImg = document.createElement('img');
      ratingImg.src = 'images/star.jpg';
      ratingImg.alt = 'star';
      ratingImg.className = 'cards__parte2-icon';
      const ratingText = document.createElement('h2');
      ratingText.className = 'cards__parte2-text';
      ratingText.textContent = rating;

      ratingDiv.appendChild(ratingImg);
      ratingDiv.appendChild(ratingText);
      details.appendChild(ratingDiv);

      parte2.appendChild(titulo);
      parte2.appendChild(details);
      section.appendChild(parte2);

      const parte3 = document.createElement('div');
      parte3.className = 'cards__parte3';

      const texto = document.createElement('p');
      texto.className = 'cards__parte3-texto';
      texto.textContent = overview;

      parte3.appendChild(texto);
      section.appendChild(parte3);

      ElementoParaInserirFilmes.appendChild(section);
    });
  }

  // Chame a função fetchTodosFilmesFiccaoCientifica() 
  fetchTodosFilmesFiccaoCientifica()
    .then(filmes => InserirFilmesNaTela(filmes))
    .catch(error => console.error('Ocorreu um erro:', error));

  const home = el.querySelector('.cabecalho__titulo');
  home.addEventListener('click', () => {
    fetchTodosFilmesFiccaoCientifica()
      .then(filmes => InserirFilmesNaTela(filmes))
      .catch(error => console.error('Ocorreu um erro:', error));
  });

  return el;
};

export { App };
