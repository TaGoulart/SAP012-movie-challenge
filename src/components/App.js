// components/App.js

import { fetchTodosFilmesFiccaoCientifica } from '../lib/api.js';
import { Card } from './card.js';

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
