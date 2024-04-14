// card.js

function Card(filme) {
    const { id, title, release_date, poster_path, vote_average, vote_count } = filme;
    const releaseYear = release_date.split('-')[0];
    const posterPath = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    const rating = vote_average.toFixed(1);

    const section = document.createElement('section');
    section.className = 'cards';
    section.id = id;

    const parte1 = document.createElement('div');
    parte1.className = 'cards__parte1';

    const img = document.createElement('img');
    img.src = posterPath;
    img.alt = 'Capa';
    img.className = 'cards__parte1-capa';

    parte1.appendChild(img);
    section.appendChild(parte1);

    const parte2 = document.createElement('div');
    parte2.className = 'cards__parte2';

    const titulo = document.createElement('h2');
    titulo.className = 'cards__parte2-titulo';
    titulo.textContent = `${title} (${releaseYear})`;

    const details = document.createElement('div');
    details.className = 'cards__parte2-details';

    const ratingDiv = document.createElement('div');
    const ratingImg = document.createElement('img');
    ratingImg.src = 'images/star.jpg';
    ratingImg.alt = 'star';
    ratingImg.className = 'cards__parte2-icon';
    const ratingText = document.createElement('h2');
    ratingText.className = 'cards__parte2-text';
    ratingText.textContent = `${rating} (${vote_count} votes)`;

    ratingDiv.appendChild(ratingImg);
    ratingDiv.appendChild(ratingText);
    details.appendChild(ratingDiv);

    parte2.appendChild(titulo);
    parte2.appendChild(details);
    section.appendChild(parte2);

    // Adicionando evento de clique para navegar para a página de detalhes do filme
    section.addEventListener('click', () => {
        // Atualiza a URL sem recarregar a página para exibir os detalhes do filme
        window.history.pushState({}, '', `/movie/${id}`);
        // Dispara o evento popstate para atualizar o conteúdo da página
        window.dispatchEvent(new Event('popstate'));
    });

    return section;
}

export { Card };
