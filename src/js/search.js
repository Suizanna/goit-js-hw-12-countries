import debounce from 'lodash.debounce';
import fetchAPI from './fetchCountries.js';
import listOfContriesTpl from '../templates/list-of-countries.hbs';
import countryCardTpl from '../templates/country-markup.hbs';

import { tooManyCountries, noResult } from './notify.js';

const inputRef = document.querySelector('.input-search');
const cardContainer = document.querySelector('.js-card-container');
let countryToSearch = '';

inputRef.addEventListener('input', debounce(onSearch, 500),
);

function onSearch(event) {
  countryToSearch = event.target.value;
  console.log(countryToSearch);

  if (countryToSearch) {
    clearMarkup();
    return;
  }

  fetchAPI.fetchCountries(countryToSearch)
    .then(checkingNumberOfCountries)
    .catch(onFetchError);
}

function checkingNumberOfCountries(countries) {
  if (countries.length > 10) {
    clearMarkup();
    tooManyCountries();
  } else if (countries.length <= 10 && countries.length > 1) {
    clearMarkup();
    renderMarkup(listOfContriesTpl, countries);
  } else if (countries.length === 1) {
    clearMarkup();
    renderMarkup(countryCardTpl, countries[0]);
  } else {
    clearMarkup();
    noResult();
  }
}

function renderMarkup(template, countries) {
  const markup = template(countries);
  cardContainer.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  cardContainer.innerHTML = '';
}

function onFetchError(error) {
  clearMarkup();

  console.log(error);
}