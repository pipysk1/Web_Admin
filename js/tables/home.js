var token = localStorage.getItem('token');



if (localStorage.getItem("token") === null) {
    window.location.href = "login.html";
    localStorage.removeItem("token");

}
const url = 'https://hieuhmph12287-lab5.herokuapp.com/';



var charactersList = document.getElementById('charactersList');
var searchBar = document.getElementById('searchBar');
var hpCharacters = [];

searchBar.addEventListener('keyup', (e) => {
    var searchString = e.target.value.toLowerCase();

    var filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.gender.toLowerCase().includes(searchString)

        );
    });
    displayCharacters(filteredCharacters);
});

async function loadCharacters() {
    try {
        var res = await fetch(url + 'products/getProducts' + '?token=' + token);
        hpCharacters = await res.json();
        displayCharacters(hpCharacters);
    } catch (err) {
        console.error(err);
    }
};



function displayCharacters(characters) {
    const htmlString = characters
        .map((character) => {
            return `
        <li class="character">
            <h5>${character.name}</h5>
            <p> ${character.gender}</p>
            <img src="${character.src}"></img>
        </li>
    `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};




loadCharacters();