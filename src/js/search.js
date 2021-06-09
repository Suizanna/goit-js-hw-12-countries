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
    // console.log(e.target.value);

    if (e.target.value.trim() !== '') { 
    fetchCountries(e.target.value.trim()).then(data => {
        console.log(data);

        // if (e.target.value.trim() !== '') { 
        //     fetchCountries(e.target.value.trim()).then(renderCountries);
        //     }
        // и renderCountries это функция для  if (data.length > 1)

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

//вариант 2
// refs.input.addEventListener('input', debounce((e) => {
//     console.log(e.target.value);
//     fetchCountries(e.target.value.trim()).then(renderCountries); 
//   }, 500)
//   )

//   function renderCountries(countries) {
//     if (countries.length > 10) {
//         tooManyCountries();
//         return;
//     };
//     if (countries.length <= 10 && countries.length >= 2) {
//       refs.list.innerHTML =  listOfContriesTpl(countries);
//       return;
//     };
//     if (countries.length === 1) {
//       refs.list.innerHTML = createCountryMarkup(countries[0]);
//       return;
//     }
//   }

