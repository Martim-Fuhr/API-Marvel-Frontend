import axios from 'axios'

export default class App {
	constructor() {
	  this.offset = 0;
	  this.limit = 50;
	  this.apikey = '07f05d67192c439bf8203269fc153fdd';
      this.hash = 'a2110823d4049282bfbe666bd8e79fff';
	  this.ts = '1609890812920';
	  this.characterId = '1011334';
	  this.emptyImage = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
	  this.emptyImage2 = 'http://i.annihil.us/u/prod/marvel/i/mg/f/60/4c002e0305708';
	}
  
	getCharacters() {
	axios.get('http://localhost:3333')
	.then(response => {
		  this.populate(response.data);
		  this.setPagination(response.data);
		})
		.catch(error => console.log(error));
	}

	//codigo #22222222
	getCharacters() {
        let url = `https://gateway.marvel.com/v1/public/characters?apikey=${this.apikey}&hash=${this.hash}&ts=${this.ts}&limit=${this.limit}&offset=${this.offset}`;
        axios.get(url).then(response => {
            this.populate(response.data.data.results);
            this.setPagination(response.data.data.total);
        })
        .catch(error => console.log(error));
    }


	getCharacter(id) {
	  let url = `https://gateway.marvel.com/v1/public/characters/${characterId}?apikey=${this.apikey}&hash=${this.hash}&ts=${this.ts}&limit=10&offset=${this.offset}/${id}`;
		axios.get(url)
		.then(response => { this.loadDetail(response.data.data)})
		.catch(error => console.log(error))
	}


	populate(data) {
		document.getElementById('list').innerHTML = '';
  
	  data.forEach(item => {
		if (item.thumbnail.path === this.emptyImage || item.thumbnail.path === this.emptyImage2) {
			item.image = 'https://upload.wikimedia.org/wikipedia/commons/0/04/MarvelLogo.svg';
		} else {
			item.image = `${item.thumbnail.path}.${item.thumbnail.extension}`
		}

		const coll = `<div class="col-2">
						<div class="card" data-id="${item.id}">
							<img class="card-img-top" width="150" height="150" src="${item.image}">
							<span>${item.name}</span>
						</div>	
					</div>`;
		document.getElementById('list').innerHTML += coll;
	  });

	  for (let card of document.getElementsByClassName('card')) {
		  card.addEventListener('click', (event) => {
			  const id = event.target.parentNode.dataset.id;

			  this.getCharacter(id);
		  })
	  }
	}
  


	setPagination(totalItems, tradePage) {
	  //const pages = Math.ceil(totalItems / 10);
		if (!document.querySelectorAll('.pagination li').length) {

			for (let i = 1; i <= totalItems; i++) {
				const page = `<li class="page-item">
								<a class="page-link" data-page="${i}" href="#">${i}</a>
							  </li>`;
				document.getElementsByClassName('pagination')[0].innerHTML += page;
			}
  
			for (let link of document.getElementsByClassName('page-link')) {
		  		link.addEventListener('click', (event) => {
					event.preventDefault();
				
				//const  { page } = parseInt(event.target.dataset.page);
				const { page } = event.target.dataset;
				this.offset = (parseInt(page) - 1) * 100;
				this.getCharacters(page);
				});
			}
		}

		for (let pageItem of document.querySelectorAll('.page-item')) {
			pageItem.classList.remove('active');
		}
		document.querySelector(`.page-link[data-page="${tradePage}"]`).parentNode.classList.add('active');
	}
	itFilter() {
		document.getElementsByName('search')[0].addEventListener('keyup', (event) => {
			if (event.target.value.trim().length >= 3) {
				this.getCharacter(1, title);
			}
		});
	}


	loadDetail(character) {
		this.pushId();
		console.log(character)
	}

	pushId(page) {
		document.querySelector('.detail').classList.toggle('d-none')
		document.querySelector('.home').classList.toggle('d-none')
	}
}
