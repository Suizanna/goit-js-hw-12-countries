import debounce from 'lodash.debounce';
import fetchAPI from './fetchCountries.js';
import listOfContriesTpl from '../templates/list-of-countries.hbs';
import countryCardTpl from '../templates/country-markup.hbs';

import { tooManyCountries, noResult } from './notify.js';


const inputRef = document.querySelector('.input-search');
const cardContainer = document.querySelector('.js-card-container');

inputRef.addEventListener('input', debounce(onSearch, 500),);


function onSearch() {
  clearMarkup();

  const query = inputRef.value; //запрос значения импута
  if (!query.trim()) {
    return;
  //или
  // let inputValue = inputRef.value.replace(/[^a-z]/gi, '');
  // let query = '';    
  // query = inputValue;  //const queryValue = event.target.value;
  }
  
  fetchAPI.fetchCountries(query)
    .then(checkingNumberOfCountries)
    .catch(noResult);
}

function checkingNumberOfCountries(data) { 
  if (data.length > 10) {
    tooManyCountries();
  } else if (data.length >= 2  && data.length <= 10) {
    renderMarkup(listOfContriesTpl, data);
  } else if (data.length === 1) {
    renderMarkup(countryCardTpl, data[0]);
  } else {
    noResult();
  }
}

function renderMarkup(template, data) { 
  const markup = template(data);
  cardContainer.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  cardContainer.innerHTML = '';
}


