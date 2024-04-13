// components/App.js

import { fetchTodosFilmesFiccaoCientifica } from '../lib/api.js';
import { Card } from './card.js';

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

    //uma referência ao elemento onde os filmes serão inseridos na tela.
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
            .then(filmes => InserirFilmesNaTela(filmes))
            .catch(error => console.error('Ocorreu um erro:', error));
    }

    function InserirFilmesNaTela(filmes) {
        ElementoParaInserirFilmes.innerHTML = '';
        filmes.forEach(movie => {
            const card = Card(movie);
            ElementoParaInserirFilmes.appendChild(card);
        });
    }

    // Inicialmente carrega a primeira página de filmes
    fetchTodosFilmesFiccaoCientifica(paginaAtual)
        .then(filmes => InserirFilmesNaTela(filmes))
        .catch(error => console.error('Ocorreu um erro:', error));

    const home = el.querySelector('.cabecalho__titulo');
    home.addEventListener('click', () => {
        fetchTodosFilmesFiccaoCientifica(paginaAtual)
            .then(filmes => InserirFilmesNaTela(filmes))
            .catch(error => console.error('Ocorreu um erro:', error));
    });

    

    return el;
}

export { App };
