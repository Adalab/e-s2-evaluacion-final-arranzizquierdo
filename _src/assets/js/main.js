'use strict';

const buttonEl = document.querySelector('.button__search');
const inputEl = document.querySelector('.input__name');
const listResultEl = document.querySelector('.list__result');


function handlePrintResult() {

  //Texto mientras carga la página
  listResultEl.innerHTML = 'Cargando resultados...';

  //Convierto la cadena LS en un array
  let dataLS = JSON.parse(localStorage.getItem('favorites'))? JSON.parse(localStorage.getItem('favorites')) : [];

  fetch(`http://api.tvmaze.com/search/shows?q=${inputEl.value}`)
    .then(response => response.json())
    .then(data => {

    //Vacio la ul para pintar los resultados
      listResultEl.innerHTML = '';

      //Si no hay resultados:
      if (data.length === 0){
        listResultEl.innerHTML = 'Resultado no encontrado. Intentalo de nuevo';
      }

      //Si hay resultados:
      let imgFilm;
      let nameFilm;
      let itemFilm;

      for (let i = 0; i < data.length; i++) {
        itemFilm = document.createElement('li');
        itemFilm.classList.add('item__list');
        itemFilm.setAttribute('id', data[i].show.id);
        if ( dataLS.includes (data[i].show.id)){
          itemFilm.classList.add('favorite');
        }

        imgFilm = document.createElement('img');
        if (data[i].show.image === null) {
          imgFilm.src = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        } else {
          let srcImage = data[i].show.image.medium;
          imgFilm.src = srcImage;
        }

        nameFilm = document.createElement('h2');
        nameFilm.classList.add('name__film');
        const textName = document.createTextNode(data[i].show.name);
        nameFilm.appendChild(textName);

        itemFilm.appendChild(imgFilm);
        itemFilm.appendChild(nameFilm);

        listResultEl.appendChild(itemFilm);
      }
    });
}

function handleClickFavorite(event) {
  const click = event.target;
  const parentElement = click.parentElement;

  if (parentElement.classList.contains('item__list')) {
    parentElement.classList.toggle('favorite');
  } else if (click.classList.contains('item__list')) {
    click.classList.toggle('favorite');
  }

  //Creo un array con todos los li con clase favorite
  const arrFavorites = document.querySelectorAll('.favorite');
  console.log('array', arrFavorites);
  //Creo un array vacío en el que voy a guardar los id de los li del anterior array, recorriendo el array
  let arrId = [];
  for (let i=0 ; i<arrFavorites.length ; i++){
    const idFav = parseInt(arrFavorites[i].id);
    console.log('idFav', idFav);
    arrId[i]= idFav;
  }
  console.log(arrId);
  //Guardo en LS el array de los id. Con stringify convierto el array en una cadena
  localStorage.setItem('favorites', JSON.stringify(arrId));

 



  //LocalStorage
  // let favoritesArr = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')) : [];
  // localStorage.setItem('favorites', JSON.stringify(favoritesArr));
  // const idFilm = parentElement.id;

  // if (parentElement.classList.contains('favorite')) {
  //   favoritesArr.push(idFilm);
  //   localStorage.setItem('favorites', JSON.stringify(favoritesArr));
  // } else {
  //   localStorage.removeItem(idFilm);
  //   localStorage.setItem('favorites', JSON.stringify(favoritesArr));
  // }

  // const idFilm = parentElement.id;

  // if (parentElement.classList.contains('favorite')) {
  //   localStorage.setItem(`${idFilm}`, JSON.stringify(idFilm));
  //   // const favoriteLS = JSON.parse(localStorage.getItem(`${idFilm}`));
  //   // console.log(favoriteLS);
  // } else {
  //   localStorage.removeItem(`${idFilm}`);
  // }
}

// function favoriteClassLs () {
//   const arrList = document.querySelectorAll('li');
//   console.log('arrayl list', arrList);
//   for (let i=0; i<arrList.length ; i++){
//     const idLi = arrList[i].id;
//     console.log(localStorage.idLi);
//     if (localStorage.idLi){
//       arrList[i].classList.add('favorite');
//     }
//   }
// }


listResultEl.addEventListener('click', handleClickFavorite);
buttonEl.addEventListener('click', handlePrintResult);
