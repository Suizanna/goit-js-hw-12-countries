import fetchCountrie from './fetchCountries.js';
import debounce from 'lodash.debounce';
import listOfContriesTpl from '../templates/list.hbs';
import createCountryMarkup from '../templates/country-markup.hbs';
import { tooManyCountries, noResult } from './notify.js';

const ref = {
    input: document.querySelector('.input-search'),
    list: document.querySelector('.country-list'),
}

ref.input.addEventListener('input', debounce(onSearch, 500),);

function onSearch(e) {
    event.preventDefault();
    if (e.target.value.trim() !== '') { 
    fetchCountrie(e.target.value.trim()).then(data => {
        console.log(data);
        if (data.length > 1  && data.length < 11) {
        ref.list.innerHTML = listOfContriesTpl(data);
        return;
        }
        if(data.length === 1) {
            ref.list.innerHTML = createCountryMarkup(data[0]);
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
//   fetchCountrie(value.trim()).then(responce => console.log(responce));
// }
// }
