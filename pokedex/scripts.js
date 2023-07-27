const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector(".pokemon-image");

const form = document.querySelector(".form");
const input = document.querySelector(".buscar");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let pokemonAtual = 1;

//função responsável por resgatar os dados da API
async function fetchPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const response = await fetch(url);
    if (response.status === 200) {
        const data = await response.json();
        return data;
    }
}

//Função responsável por exibir o pokemon na pokedex
async function renderPokemon(pokemon) {
    pokemonName.innerText = "Carregando...";
    pokemonNumber.innerText = "";

    //Buscando pokemon na função fetchPokemon()
    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        pokemonImage.style.display = "block";
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']
        ['front_default'];
        
        pokemonAtual = data.id;
        input.value = "";
        input.focus();
    }
    else {
        pokemonName.innerText = "Não encontrado";
        pokemonNumber.innerText = "";
        pokemonImage.style.display = "none";
    }
}


//Evento de envio do formulário
form.addEventListener("submit", (e) => {
    e.preventDefault();
    renderPokemon(input.value.toLowerCase()); 

});

//Evento de click no botão anterior

btnPrev.addEventListener('click', () => {
    if (pokemonAtual > 1) {
        pokemonAtual--;
        renderPokemon(pokemonAtual);
    }
});

//Evento de click no botão next

btnNext.addEventListener('click', () => {
    pokemonAtual++;
    renderPokemon(pokemonAtual);
});


renderPokemon(pokemonAtual);