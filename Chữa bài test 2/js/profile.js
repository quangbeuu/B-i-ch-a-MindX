const urlSearchParams = new URLSearchParams(window.location.search);
const characterId = urlSearchParams.get("id");

console.log(characterId)

function capitalize(s = "") {
    if (s === "") return "";
    return s[0].toUpperCase() + s.slice(1);
}

async function getCharacterById(id) {
    try {
        const response = await fetch('https://tobitheme.net/api/characters.json');
        const responseJSON = await response.json();
        console.log(responseJSON.data);
        for (let item of responseJSON.data) {
            if (item.id == id) {
                displayCharacter(item);
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function displayCharacter(character) {
    const characterHTML = `
        <div class="characters__profile">
            <div class="characters__profileInfo">
                <h2>${character.name}</h2>
                <p class="gender"><b>Gender</b>: ${capitalize(character.gender)}</p>
                <p class="dob"><b>Dob</b>: ${character.dateOfBirth || character.yearOfBirth}</p>
                <p class="ancestry"><b>Ancestry</b>: ${capitalize(character.ancestry)}</p>
                <p class="eyeColour"><b>Eye Color</b>: ${capitalize(character.eyeColour)}</p>
                <p class="hairColour"><b>Hair Color</b>: ${capitalize(character.hairColour)}</p>
                <p class="house"><b>House</b>: ${capitalize(character.house)}</p>
            </div>
            <img src="${character.image}"></img>
        </div>
    `;

    document
        .getElementById("characters")
        .insertAdjacentHTML("beforeend", characterHTML);
}

getCharacterById(characterId);