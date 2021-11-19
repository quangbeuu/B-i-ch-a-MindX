const charactersList = document.getElementById("characters");
const searchBar = document.getElementById("searchBar");
let hpCharacters = [];

searchBar.addEventListener("keyup", (e) => {
    // e.target trả về thẻ đang có event
    const searchString = e.target.value.toLowerCase();

    const filteredCharacters = hpCharacters.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) ||
            character.house.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});

const loadCharacters = async() => {
    try {
        const res = await fetch(
            "https://tobitheme.net/api/characters.json"
        );
        const responseJSON = await res.json();
        // .json để lấy dữ liệu về từ API 
        hpCharacters = responseJSON.data;
        displayCharacters(responseJSON.data);
        console.log(responseJSON.data);
    } catch(err) {
        console.error(err);
        console.log('Loi ket noi');
    }
};

// Try catch giúp xử lý những lỗi phát sinh ra và làm 
// cho chương trinh vẫn chạy được 


// characters chính là cái responseJSON.data
const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
              <div class="characters__item">
                  <h2><a href="profile.html?id=${character.id}">${character.name}</a></h2>
                  <p>House: ${character.house}</p>
                  <img src="${character.image}"></img>
              </div>
          `;
        })
        .join("");
    charactersList.innerHTML = htmlString;
};

loadCharacters();