import debounce from 'lodash.debounce';
import fetchAPI from './fetchCountries.js';
import listOfContriesTpl from '../templates/list-of-countries.hbs';
import countryCardTpl from '../templates/country-markup.hbs';

import { tooManyCountries, noResult } from './notify.js';

const formRef = document.querySelector('#search-form');
const inputRef = document.querySelector('.input-search');
const cardContainer = document.querySelector('.js-card-container');

inputRef.addEventListener('input', debounce(onSearch, 500),
);
formRef.addEventListener('submit', event => {
  event.preventDefault();
});

function onSearch(event) {
  const queryValue = event.target.value;

  if (!queryValue) {
    clearMarkup();
    return;
  }

  fetchAPI.fetchCountries(queryValue)
    .then(checkingNumberOfCountries)
    .catch(onFetchError);
}

function checkingNumberOfCountries(data) {
 if (data.length > 10) {
    tooManyCountries();
    clearMarkup();
  } else if (data.length >= 2  && data.length <= 10) {
    clearMarkup();
    renderMarkup(listOfContriesTpl, data);
  } else if (data.length === 1) {
    clearMarkup();
    renderMarkup(countryCardTpl, data);
  } else {
    clearMarkup();
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

function onFetchError(error) {
  clearMarkup();

  console.log(error);
}