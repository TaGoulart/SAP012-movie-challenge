import { fetchTodosFilmesFiccaoCientifica } from '../lib/api.js';
import { Card } from './card.js';
import { fetchMovieDetails } from '../lib/api.js';
//import { updateContent } from './routes.js'; // Importa a função updateContent do arquivo routes.js

const App = () => {
  const el = document.createElement('div');
  el.className = 'App';

  // Criação da estrutura do cabeçalho
  const header = document.createElement('header');
  header.className = 'cabecalho';

  const titulo = document.createElement('h1');
  titulo.className = 'cabecalho__titulo';
  titulo.textContent = 'Filmes de Ficção Científica';

  const pesquisaDiv = document.createElement('div');
  pesquisaDiv.className = 'cabecalho__pesquisa';

  const inputPesquisa = document.createElement('input');
  inputPesquisa.type = 'text';
  inputPesquisa.className = 'cabecalho__pesquisa-input';
  inputPesquisa.placeholder = 'Digite algum filme para pesquisar...';

  const lupaSpan = document.createElement('span');
  lupaSpan.className = 'cabecalho__pesquisa-lupa';

  pesquisaDiv.appendChild(inputPesquisa);
  pesquisaDiv.appendChild(lupaSpan);
  header.appendChild(titulo);
  header.appendChild(pesquisaDiv);

  // Criação da seção para exibir os filmes
  const filmesSection = document.createElement('section');
  filmesSection.id = 'filmes';

  const listaVaSection = document.createElement('section');
  listaVaSection.className = 'card__lista-va';

  el.appendChild(header);
  el.appendChild(filmesSection);
  el.appendChild(listaVaSection);

  // Uma referência ao elemento onde os filmes serão inseridos na tela
  const ElementoParaInserirFilmes = el.querySelector('#filmes');

  function InserirFilmesNaTela(filmes) {
    console.log('Filmes recebidos para inserir na tela:', filmes); // Adiciona um log para verificar os filmes recebidos
    ElementoParaInserirFilmes.innerHTML = '';
    filmes.forEach(movie => {
      const card = Card(movie, exibirDetalhesFilme); // Passa a função exibirDetalhesFilme para o componente Card
      card.dataset.movieId = movie.id; // Adiciona o ID do filme como um atributo de dados
      ElementoParaInserirFilmes.appendChild(card);
    });
  }


  
  // Função para exibir os detalhes de um filme específico
  async function exibirDetalhesFilme(filmeId, filmesSection) {
    try {
      // Busca os detalhes do filme
      const filme = await fetchMovieDetails(filmeId);

      // Cria os elementos HTML para exibir os detalhes do filme
      const detalhesContainer = document.createElement('div');
      //estou criando o titulo
      const titulo = document.createElement('h1');
      titulo.textContent = filme.title;

      const sinopse = document.createElement('p');
      sinopse.textContent = filme.overview;

      // Adiciona a imagem do poster, se disponível
      if (filme.poster_path) {
        const posterImg = document.createElement('img');
        posterImg.src = `https://image.tmdb.org/t/p/w500/${filme.poster_path}`;
        posterImg.alt = 'Poster';
        posterImg.classList.add('poster-img'); // Adiciona a classe poster-img
        detalhesContainer.appendChild(posterImg);
      }

      // Adiciona os elementos à página
      detalhesContainer.appendChild(titulo);
      detalhesContainer.appendChild(sinopse);

      // Limpa o conteúdo atual e adiciona os detalhes do filme
      filmesSection.innerHTML = '';
      filmesSection.appendChild(detalhesContainer);
     
    } catch (error) {
      console.error('Ocorreu um erro ao buscar os detalhes do filme:', error);
      // Exibe uma mensagem de erro na página
      filmesSection.innerHTML = "<p>Ocorreu um erro ao buscar os detalhes do filme.</p>";
    }
  }



function adicionarEventoClique() {
  ElementoParaInserirFilmes.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (card) {
      const filmeId = card.dataset.movieId; // Recupera o ID do filme do atributo de dados
      window.location.hash = `#/movie/${filmeId}`;
    }
  });
}

// Configura o evento hashchange
window.addEventListener('hashchange', () => {
  // Extrai o filme ID da parte de hash da URL
  const filmeId = window.location.hash.replace('#/movie/', '');
  if (filmeId) {
      // Se houver um ID de filme, exibe os detalhes do filme
      exibirDetalhesFilme(filmeId, ElementoParaInserirFilmes);
  } else {
      // Caso contrário, carrega a lista de filmes
      fetchTodosFilmesFiccaoCientifica()
          .then(filmes => InserirFilmesNaTela(filmes))
          .catch(error => console.error('Ocorreu um erro:', error));
  }
});

// Executa o código ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
  // Inicialmente verifica se há um ID de filme na parte de hash da URL
  const filmeId = window.location.hash.replace('#/movie/', '');
  if (filmeId) {
      // Se houver um ID de filme, exibe os detalhes do filme
      exibirDetalhesFilme(filmeId, ElementoParaInserirFilmes);
  } else {
      // Caso contrário, carrega a lista de filmes
      fetchTodosFilmesFiccaoCientifica()
          .then(filmes => InserirFilmesNaTela(filmes))
          .catch(error => console.error('Ocorreu um erro:', error));
  }
});





  const apiKey = 'e703ec6632fe30aea479ecd3ce27b30f';
  const baseUrl = 'https://api.themoviedb.org/3';
  const defaultLanguage = 'en-US';
  const defaultGenres = '878'; // Ficção científica
  
  // Função para buscar filmes por classificação (rating) e opção de ordenação
  async function buscarFilmesPorClassificacao(ordenacao) {
    try {
      const url = `${baseUrl}/discover/movie?api_key=${apiKey}&language=${defaultLanguage}&sort_by=${ordenacao}&include_adult=false&include_video=false&with_genres=${defaultGenres}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch sorted movies');
      }
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Ocorreu um erro ao obter os filmes ordenados:', error);
      throw error;
    }
  }
  
  // Função para criar a lista suspensa de opções de ordenação
  function criarListaOrdenacao() {
    const ordenacoes = [
      { value: 'padrao', label: 'Padrão' },
      { value: 'popularity.asc', label: 'Popularidade Ascendente' },
      { value: 'popularity.desc', label: 'Popularidade Descendente' }
    ];
    const selectOrdenacao = document.createElement('select');
    selectOrdenacao.id = 'ordenacao';
    ordenacoes.forEach(opcao => {
      const option = document.createElement('option');
      option.value = opcao.value;
      option.textContent = opcao.label;
      selectOrdenacao.appendChild(option);
    });
    selectOrdenacao.addEventListener('change', async (event) => {
      const ordenacao = event.target.value;
      if (ordenacao !== 'padrao') {
        try {
          const filmesOrdenados = await buscarFilmesPorClassificacao(ordenacao);
          InserirFilmesNaTela(filmesOrdenados);
        } catch (error) {
          console.error('Ocorreu um erro ao buscar os filmes ordenados:', error);
        }
      }
    });
    return selectOrdenacao;
  }
  
  // Adiciona a lista suspensa ao cabeçalho
  header.appendChild(criarListaOrdenacao());

  // Inicialmente carrega a primeira página de filmes
  fetchTodosFilmesFiccaoCientifica()
    .then(filmes => {
      InserirFilmesNaTela(filmes); // Insere os filmes da primeira página na tela
      // Adiciona eventos de clique aos cartões de filme da primeira página
      filmes.forEach(movie => {
        adicionarEventoClique(movie.id);
      });
    })
    .catch(error => console.error('Ocorreu um erro:', error));

  return el;
};

export { App };
