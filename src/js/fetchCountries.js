const BASE_URL = 'https://restcountries.eu/rest/v2/name';

function fetchCountries(countryName) {
  return fetch(`${BASE_URL}/${countryName}`).then(response => response.json());
}

export default { fetchCountries }; 


// function  fetchCountries(countryName) {
//   return fetch(`${BASE_URL}/${countryName}`).then(response => {
//     if (response.ok) {
//       return response.json();
//     }

//     throw new Error();
//   });
// }
