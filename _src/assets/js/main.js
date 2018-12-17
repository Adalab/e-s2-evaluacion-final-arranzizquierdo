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

            for (let i = 0; i < data.length; i++) {
                itemFilm = document.createElement('li');
                itemFilm.classList.add('item__list');
                itemFilm.setAttribute('id', data[i].show.id);

                imgFilm = document.createElement('img');
                if (data[i].show.image === null) {
                    imgFilm.src = "https://via.placeholder.com/210x295/cccccc/666666/?text=TV";
                } else {
                    let srcImage = data[i].show.image.medium;
                    imgFilm.src = srcImage;
                };

                nameFilm = document.createElement('h2');
                nameFilm.classList.add('name__film');
                const textName = document.createTextNode(data[i].show.name);
                nameFilm.appendChild(textName);

                itemFilm.appendChild(imgFilm);
                itemFilm.appendChild(nameFilm);

                listResultEl.appendChild(itemFilm);
            }
        })
}


function handleClickFavorite(event) {
    const click = event.target;
    const parentElement = click.parentElement;
    parentElement.classList.toggle('favorite');
    const idFilm = parentElement.id;   

    if (parentElement.classList.contains('favorite')){
        localStorage.setItem(`${idFilm}`, JSON.stringify(idFilm));
        const favoriteLS = JSON.parse(localStorage.getItem(`${idFilm}`));
        console.log (favoriteLS);
    }
};
listResultEl.addEventListener('click', handleClickFavorite);
buttonEl.addEventListener('click', handlePrintResult);



