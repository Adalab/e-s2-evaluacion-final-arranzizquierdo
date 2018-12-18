'use strict';

const buttonEl = document.querySelector('.button__search');
const inputEl = document.querySelector('.input__name');
const listResultEl = document.querySelector('.list__result');


function handlePrintResult() {

  //Texto mientras carga la página
  listResultEl.innerHTML = 'Cargando resultados...';

  fetch(`http://api.tvmaze.com/search/shows?q=${inputEl.value}`)
    .then(response => response.json())
    .then(data => {

      //Vacio la ul para pintar los resultados
      listResultEl.innerHTML = '';

      //Si no hay resultados:
      if (data.length === 0) {
        listResultEl.innerHTML = 'Resultado no encontrado. Intentalo de nuevo';
      }

      //Si hay resultados:

      //Creo un array con las key de LS y lo recorro para obtener los ids de las peliculas
      let arrLs = [];
      for (let i = 0; i < localStorage.length; i++) {
        let idFav = localStorage.key(i);
        arrLs.push(idFav);
      }

      //Pinto el resultado 
      let imgFilm;
      let nameFilm;
      let itemFilm;

      for (let i = 0; i < data.length; i++) {
        //Creo los li
        itemFilm = document.createElement('li');
        itemFilm.classList.add('item__list');

        const idFilm = data[i].show.id;
        const idFilmNum = idFilm.toString();

        itemFilm.setAttribute('id', idFilm);

        if (arrLs.includes(idFilmNum)) {
          itemFilm.classList.add('favorite');
        }

        //Creo las imágenes
        imgFilm = document.createElement('img');
        if (data[i].show.image === null) {
          imgFilm.src = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        } else {
          let srcImage = data[i].show.image.medium;
          imgFilm.src = srcImage;
        }

        //Creo los títulos
        nameFilm = document.createElement('h2');
        nameFilm.classList.add('name__film');
        const textName = document.createTextNode(data[i].show.name);
        nameFilm.appendChild(textName);

        //Añado a los li las imágenes y los títulos
        itemFilm.appendChild(imgFilm);
        itemFilm.appendChild(nameFilm);

        //Añado los li a la lista
        listResultEl.appendChild(itemFilm);
      }
    });
}

//Marcar como favorita cuando se hace click
function handleClickFavorite(event) {
  const click = event.target;
  const parentElement = click.parentElement;
  const idFilm = parentElement.id;

  if (parentElement.classList.contains('item__list')) {
    parentElement.classList.toggle('favorite');
  } else if (click.classList.contains('item__list')) {
    click.classList.toggle('favorite');
  }

  //Añadir al LS si está marcada como favorita
  if (parentElement.classList.contains('favorite')) {
    localStorage.setItem(`${idFilm}`, JSON.stringify(idFilm));
  } else {
    localStorage.removeItem(`${idFilm}`);
  }
}

listResultEl.addEventListener('click', handleClickFavorite);
buttonEl.addEventListener('click', handlePrintResult);