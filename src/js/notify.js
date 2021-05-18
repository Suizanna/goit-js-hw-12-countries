import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { info, error } from '@pnotify/core';

export function noResult() { 
    info({
      title: 'Uh Oh!',
      text: 'This country was not found!',
      delay: 1500,
      closerHover: true,
    });
  }
  
  export function tooManyCountries() {
    error({
      title: 'Uh Oh!',
      text: 'Too many matches found. Please enter a more specific query!',
      delay: 2500,
      closerHover: true,
    });
  }




