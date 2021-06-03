const BASE_URL = 'https://restcountries.eu/rest/v2/name';

export default function fetchCountries(searchQuery) {
  return fetch(`${BASE_URL}/${searchQuery}`).then(response => response.json());
}

// // async await 
// async function fetchCountries(searchQuery)) {
//   const responce = await fetch(`${BASE_URL}/${searchQuery)}`);
//   return await responce.json());
// }


 
