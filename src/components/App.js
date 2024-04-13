// components/App.js

import { fetchTodosFilmesFiccaoCientifica } from '../lib/api.js';
import { Card } from './card.js';

const App = () => {
    const el = document.createElement('div');
    el.className = 'App';

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
    
    const filmesSection = document.createElement('section');
    filmesSection.id = 'filmes';
    
    const listaVaSection = document.createElement('section');
    listaVaSection.className = 'card__lista-va';
    
    el.appendChild(header);
    el.appendChild(filmesSection);
    el.appendChild(listaVaSection);

    const ElementoParaInserirFilmes = el.querySelector('#filmes');

    function InserirFilmesNaTela(filmes) {
        ElementoParaInserirFilmes.innerHTML = '';
        filmes.forEach(movie => {
            const card = Card(movie);
            ElementoParaInserirFilmes.appendChild(card);
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
}

export { App };
