// components/card.js

function Card(filme) {
    const { id, title, release_date, poster_path, vote_average, overview } = filme;
    const movieId = id;
    const releaseYear = release_date.split('-')[0];
    const posterPath = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    const rating = vote_average.toFixed(1);

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

    return section;
}

export { Card };
