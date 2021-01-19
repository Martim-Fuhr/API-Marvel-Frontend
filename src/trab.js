import axios from 'axios'

export default class App {
	constructor() {
	  this.offset = 0;
	  this.limit = 50;
	  this.apikey = '07f05d67192c439bf8203269fc153fdd';
      this.hash = 'a2110823d4049282bfbe666bd8e79fff';
	  this.ts = '1609890812920';
	  this.characterId = '1011334';
	}
  
	getCharacters() {
	axios.get('http://localhost:3333').then(response => {
		  this.populate(response.data);
		  this.setPagination(response.data);
		})
		.catch(error => console.log(error));
	}

	//codigo #22222222
	getCharacters() {
        const url = `https://gateway.marvel.com/v1/public/characters?apikey=${this.apikey}&hash=${this.hash}&ts=${this.ts}&limit=${this.limit}&offset=${this.offset}`;
        axios.get(url).then(response => {
            this.populate(response.data.data.results);
            this.setPagination(response.data.data.total);
        })
        .catch(error => console.log(error));
    }


  
	getCharacter(characterId) {
	  const url = `https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${this.apikey}&hash=${this.hash}&ts=${this.ts}&limit=10&offset=${this.offset}`;
	}
  
	populate(data) {
	  document.querySelector('.table tbody').innerHTML = '';
  
	  data.forEach(item => {
		const tr = `<tr>
					<td>${item.id}</td>
					<td>${item.name}</td>
					<td><img width="100" src="${item.thumbnail.path}.${item.thumbnail.extension}"></td>
				</tr>`;
		document.querySelector('.table tbody').innerHTML += tr;
	  });
	}
  
	setPagination(totalItems) {
	  const pages = Math.ceil(totalItems / 10);
  
	  document.querySelector('.pagination').innerHTML = '';
  
	  for (let i = 1; i <= pages; i++) {
		const li = `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
		document.querySelector('.pagination').innerHTML += li;
  
		for (const link of document.getElementsByClassName('page-link')) {
		  link.addEventListener('click', event => {
			event.preventDefault();
  
			const { page } = event.target.dataset;
			this.offset = (parseInt(page) - 1) * 10;
			this.getCharacters();
		  });
		}
	  }
	}
  }