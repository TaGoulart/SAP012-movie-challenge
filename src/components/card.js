// card.js

function Card(filme) {
    const { title, release_date, poster_path, vote_average, vote_count, overview } = filme;
    const releaseYear = release_date.split('-')[0];
    const posterPath = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    const rating = vote_average.toFixed(1);

    const section = document.createElement('section');
    section.className = 'cards';

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

    // Adicionando evento de clique para alternar a visibilidade do resumo
    img.addEventListener('click', () => toggleResumo(section, overview)); // Passe o resumo do filme para a função toggleResumo

    // Adicionando evento de mouseover para mostrar o resumo quando o mouse estiver sobre o poster
    img.addEventListener('mouseover', () => showResumo(section, overview));

    // Adicionando evento de mouseout para ocultar o resumo quando o mouse sair do poster
    img.addEventListener('mouseout', () => hideResumo(section));

    const parte3 = document.createElement('div');
    parte3.className = 'cards__parte3';

    const texto = document.createElement('p');
    texto.className = 'cards__parte3-texto';
    parte3.appendChild(texto);
    section.appendChild(parte3);

    return section;
}

function toggleResumo(section, overview) {
    const parte3 = section.querySelector('.cards__parte3-texto');
    parte3.textContent = overview; // Define o conteúdo do resumo com o valor de overview
    parte3.style.display = parte3.style.display === 'none' || parte3.style.display === '' ? 'block' : 'none';
}

function showResumo(section, overview) {
    const parte3 = section.querySelector('.cards__parte3-texto');
    parte3.textContent = overview; // Define o conteúdo do resumo com o valor de overview
    parte3.style.display = 'block';
}

function hideResumo(section) {
    const parte3 = section.querySelector('.cards__parte3-texto');
    parte3.style.display = 'none';
}

export { Card };
