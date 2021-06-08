import fetchCountries from './fetchCountries.js';
import debounce from 'lodash.debounce';
import listOfContriesTpl from '../templates/list.hbs';
import createCountryMarkup from '../templates/country-markup.hbs';
import { tooManyCountries, noResult } from './notify.js';

const refs = {
    input: document.querySelector('.input-search'),
    list: document.querySelector('.country-list'),
}

refs.input.addEventListener('input', debounce(onSearch, 500),);

function onSearch(e) {
  
    if (e.target.value.trim() !== '') { 
    fetchCountries(e.target.value.trim()).then(data => {
        console.log(data);
        if (data.length > 1  && data.length < 11) {
        refs.list.innerHTML = listOfContriesTpl(data);
        return;
        }
        if(data.length === 1) {
            refs.list.innerHTML = createCountryMarkup(data[0]);
            return;
        }
        if (data.length > 10) {
            tooManyCountries();
            return;
        }
        if (data.status === 404) {
            error({
                text: 'Введите корректный запрос',
                type: 'error',
                delay: 2000,
            })
            return;
        }
    });
}
}
//деструктур
// function onSearch({ target: {value} }) {
//     if (value.trim() !== '') { 
//   fetchCountries(value.trim()).then(responce => console.log(responce));
// }
// }
