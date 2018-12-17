'use strict';

const buttonEl = document.querySelector('.button__search');
const inputEl = document.querySelector('.input__name');
const listResultEl = document.querySelector('.list__result');


function handlePrintResult() {
  fetch(`http://api.tvmaze.com/search/shows?q=${inputEl.value}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        let imgFilm;
        let nameFilm;
        let itemFilm;
        let containerFilm;
        
        for (let i = 0; i < data.length; i++) {

                containerFilm = document.createElement('div');
                containerFilm.classList.add('container__film');

                itemFilm = document.createElement('li');
                itemFilm.classList.add('item__list');

                imgFilm = document.createElement('img');
                imgFilm.src = data[i].show.image.medium;

                nameFilm = document.createElement('h2');
                const textName = document.createTextNode(data[i].show.name);
                nameFilm.appendChild(textName);

                itemFilm.appendChild(imgFilm);
                itemFilm.appendChild(nameFilm);

                containerFilm.appendChild(itemFilm);

                listResultEl.appendChild(containerFilm);
            }  
})
}

buttonEl.addEventListener('click', handlePrintResult);