// app.js

import { fetchTodosFilmesFiccaoCientifica } from '../lib/api.js';
import { Card } from './card.js';
import { fetchMovieDetails } from '../lib/api.js';
import { updateContent } from './routes.js'; // Importa a função updateContent do arquivo routes.js

// Função para inicializar o aplicativo
function initializeApp() {
  // Lógica de inicialização do aplicativo, se necessário
}

// Inicializa o aplicativo quando o conteúdo da página for carregado
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  updateContent();
});

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
    
    const lupaImg = document.createElement('img');
    lupaImg.src = 'img/search-icon.svg';
    lupaImg.alt = '';
    
    lupaSpan.appendChild(lupaImg);
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
    
    // Criação da seção para a paginação
    const Paginacao = document.createElement('div');
    Paginacao.className = 'paginacao';

    const botaoAnterior = document.createElement('button');
    botaoAnterior.textContent = 'Anterior';
    botaoAnterior.addEventListener('click', () => carregarFilmesPagina(-1));

    const botaoProximo = document.createElement('button');
    botaoProximo.textContent = 'Próximo';
    botaoProximo.addEventListener('click', () => carregarFilmesPagina(1));

    Paginacao.appendChild(botaoAnterior);
    Paginacao.appendChild(botaoProximo);

    el.appendChild(Paginacao);

    let paginaAtual = 1;

    function carregarFilmesPagina(delta) {
        paginaAtual += delta;
        if (paginaAtual < 1) {
            paginaAtual = 1;
        }
        fetchTodosFilmesFiccaoCientifica(paginaAtual)
            .then(filmes => {
                InserirFilmesNaTela(filmes); // Insere os filmes da próxima página na tela
                // Adiciona eventos de clique aos cartões de filme da próxima página
                filmes.forEach(movie => {
                    adicionarEventoClique(movie.id);
                });
            })
            .catch(error => console.error('Ocorreu um erro:', error));
    }

    function InserirFilmesNaTela(filmes) {
        ElementoParaInserirFilmes.innerHTML = '';
        filmes.forEach(movie => {
            const card = Card(movie, exibirDetalhesFilme); // Passa a função exibirDetalhesFilme para o componente Card
            ElementoParaInserirFilmes.appendChild(card);
        });
    }

    // Função para exibir os detalhes de um filme específico
    async function exibirDetalhesFilme(filmeId) {
        try {
            // Busca os detalhes do filme
            const filme = await fetchMovieDetails(filmeId);

            // Cria os elementos HTML para exibir os detalhes do filme
            const detalhesContainer = document.createElement('div');

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

    function adicionarEventoClique(filmeId) {
        const cartao = document.getElementById(filmeId);
        cartao.addEventListener('click', () => {
            exibirDetalhesFilme(filmeId);
        });
    }

    // Inicialmente carrega a primeira página de filmes
    fetchTodosFilmesFiccaoCientifica(paginaAtual)
        .then(filmes => {
            InserirFilmesNaTela(filmes); // Insere os filmes da primeira página na tela
            // Adiciona eventos de clique aos cartões de filme da primeira página
            filmes.forEach(movie => {
                adicionarEventoClique(movie.id);
            });
        })
        .catch(error => console.error('Ocorreu um erro:', error));

    const home = el.querySelector('.cabecalho__titulo');
    home.addEventListener('click', () => {
        // Quando o título do cabeçalho for clicado, redirecione para a página inicial
        window.history.pushState({}, '', '/');
        updateContent(); // Atualiza o conteúdo da página
    });

    return el;
}

export { App };
