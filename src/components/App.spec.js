// App.spec.js
import { App } from './App.js';
import { buscarFilmesPorClassificacao } from './App.js'; // Importa a função correta

describe('App', () => {
  it('should render without crashing', () => {
    const el = App(); // Renderiza o componente App
    const isHTMLElement = el instanceof HTMLElement; // Verifica se o resultado é um elemento HTML

    // Verifica se o resultado é um elemento HTML
    expect(isHTMLElement).toBe(true);
  });
});

describe('buscarFilmesPorClassificacao', () => {
  it('should return sorted movies by popularity in ascending order', async () => {
    // Arrange
    const ordenacao = 'popularity.asc';
    
    // Act
    const filmesOrdenados = await buscarFilmesPorClassificacao(ordenacao); // Chama a função correta

    // Assert
    expect(filmesOrdenados).toBeInstanceOf(Array); // Verifica se o resultado é um array de filmes
    
    // Verifica se os filmes estão ordenados corretamente por popularidade ascendente
    for (let i = 0; i < filmesOrdenados.length - 1; i++) {
      expect(filmesOrdenados[i].popularity).toBeLessThanOrEqual(filmesOrdenados[i + 1].popularity);
    }
  });

  // Você pode adicionar mais testes para outras condições, como ordenação por popularidade descendente
});

