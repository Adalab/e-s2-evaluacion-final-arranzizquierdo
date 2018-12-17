'use strict';

const buttonEl = document.querySelector('.button__search');
const inputEl = document.querySelector('.input__name');
const listResultEl = document.querySelector('.list__result');


function handlePrintResult() {
    fetch(`http://api.tvmaze.com/search/shows?q=${inputEl.value}`)
        .then(response => response.json())
        .then(data => {

            let imgFilm;
            let nameFilm;
            let itemFilm;
            // let containerFilm;

            for (let i = 0; i < data.length; i++) {

                // containerFilm = document.createElement('div');
                // containerFilm.classList.add('container__film');

                itemFilm = document.createElement('li');
                itemFilm.classList.add('item__list');

                imgFilm = document.createElement('img');
                if (data[i].show.image === null) {
                    imgFilm.src = "https://via.placeholder.com/210x295/cccccc/666666/?text=TV";
                } else {
                    let srcImage = data[i].show.image.medium;
                    imgFilm.src = srcImage;
                };

                nameFilm = document.createElement('h2');
                const textName = document.createTextNode(data[i].show.name);
                nameFilm.appendChild(textName);

                itemFilm.appendChild(imgFilm);
                itemFilm.appendChild(nameFilm);

                // containerFilm.appendChild(itemFilm);

                listResultEl.appendChild(itemFilm);
            }
        })
}

function handleClickFavorite (event) {
    const click = event.target;
    const parentElement = click.parentElement;
    parentElement.classList.toggle('favorite');
    const arrFavorites = document.querySelectorAll('.favorite');
    console.log(arrFavorites);
    localStorage.setItem('favorites', JSON.stringify(arrFavorites));
}

buttonEl.addEventListener('click', handlePrintResult);
listResultEl.addEventListener('click', handleClickFavorite);

