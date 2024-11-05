
let userData = [];

async function loadUserData() {
  try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      userData = await response.json();
      displayCards(userData);
  } catch (error) {
      console.error('Chyba při načítání dat:', error);
  }
}


class Vizitka {
    constructor({ name, email, phone, website, company }) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.website = website;
        this.company = company.name;
        this.avatar = `https://robohash.org/${Math.random()}`; 
    }

    render() {
        return `
            <div class="card">
                <img src="${this.avatar}" alt="Avatar">
                <div class="details">
                    <h3>${this.name}</h3>
                    <p><strong>Firma:</strong> ${this.company}</p>
                    <p><strong>Telefon:</strong> ${this.phone}</p>
                    <p><strong>Email:</strong> ${this.email}</p>
                    <p><strong>Web:</strong> <a href="http://${this.website}" target="_blank">${this.website}</a></p>
                </div>
            </div>
        `;
    }
}


function displayCards(filteredData) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = '';
    filteredData.forEach(user => {
        const card = new Vizitka(user);
        container.innerHTML += card.render();
    });
}

document.getElementById('search').addEventListener('input', (event) => {
    const searchValue = event.target.value.toLowerCase();
    const filteredData = userData.filter(user => user.name.toLowerCase().includes(searchValue));
    displayCards(filteredData);
});

loadUserData();

