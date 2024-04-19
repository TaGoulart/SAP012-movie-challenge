// routes.js


// Objeto que mapeia as rotas para as funções correspondentes
const routes = {
    '/': HomePage,
    '/movie/:id': MovieDetailsPage
};

// Função para atualizar o conteúdo da página com base na rota atual
function updateContent() {
    const path = window.location.pathname;
    const routeHandler = routes[path];
    if (routeHandler) {
        routeHandler();
    } else {
        notFoundPage();
    }
}

// Ouvinte de eventos para manipular a navegação do usuário
document.addEventListener('DOMContentLoaded', updateContent);
window.addEventListener('popstate', updateContent);
document.addEventListener('click', event => {
    const target = event.target;
    if (target.tagName === 'A') {
        event.preventDefault();
        const href = target.getAttribute('href');
        window.history.pushState({}, '', href);
        updateContent();
    }
});

export { updateContent };


// Funções para as rotas
//function HomePage() {
    // Lógica para exibir a página inicial
//}

//function MovieDetailsPage() {
    // Lógica para exibir os detalhes de um filme
//}

//function notFoundPage() {
    // Lógica para exibir uma página de "Rota não encontrada"
//}
