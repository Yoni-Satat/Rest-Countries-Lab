let countries = [];

const app = function () {
  const url = 'https://restcountries.eu/rest/v2/all';

  const button = document.querySelector('#show-countries');
  button.addEventListener('click', function(thing) {
    makeRequest(url, requestComplete);
  });

  const select = document.querySelector('select');
  select.addEventListener('change', function() {
    //
    const selectedIndex = this.value;
    countryInfo(countries[selectedIndex]);
  });
}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  // call open to get the url (kind of like a prepare stage):
  request.open('GET', url);
  // sending the request message:
  request.send();
  request.addEventListener('load', callback);
}

const requestComplete = function() {
  if(this.status !== 200) return;
  // console.log(this); to check that the status is 200!
  const jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  // console.log(countries);
  populateList(countries);
}

const populateList = function(countries) {
  const select = document.querySelector('select');
  countries.forEach(function(country, index) {
    const option = document.createElement('option');
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);
  });
}

const countryInfo = function(country) {
  const ul = document.querySelector('ul');

  ul.innerHTML = '';

  const name = document.createElement('li');
  name.innerText = country.name;
  const capital = document.createElement('li');
  capital.innerText = country.capital;
  const population = document.createElement('li');
  population.innerText = country.population;
  ul.appendChild(name);
  ul.appendChild(capital);
  ul.appendChild(population);
}







document.addEventListener('DOMContentLoaded', app);
