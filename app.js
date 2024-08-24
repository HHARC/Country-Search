"use strict";

const btnSearch = document.querySelector(".btn-search");
const searchBar = document.querySelector(".search-bar");
const countriesContainer = document.querySelector(".countries");

// Function to fetch and display country data
const fetchCountryData = function (countryName) {
  if (!countryName) return;

  const request = new XMLHttpRequest();
  request.open("GET", `https://restcountries.com/v3.1/name/${countryName}`);
  request.send();

  request.addEventListener("load", function () {
    const data = JSON.parse(this.responseText);

    if (data.status === 404) {
      countriesContainer.innerHTML = `<p>Country not found. Please try again.</p>`;
      countriesContainer.style.opacity = 1;
      return;
    }

    // Clear previous results
    countriesContainer.innerHTML = "";

    data.forEach((country) => {
      const html = `
        <article class="country">
          <img class="country__img" src="${country.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${country.name.common}</h3>
            <h4 class="country__region">${country.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +country.population / 1000000
            ).toFixed(1)} million people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(country.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(country.currencies)[0].name
            }</p>
          </div>
        </article>
      `;
      countriesContainer.insertAdjacentHTML("beforeend", html);
    });

    countriesContainer.style.opacity = 1;
  });
};

// Event listener for the search button click
btnSearch.addEventListener("click", function () {
  const countryName = searchBar.value.trim();
  fetchCountryData(countryName);
});

// Event listener for pressing "Enter" in the search bar
searchBar.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const countryName = searchBar.value.trim();
    fetchCountryData(countryName);
  }
});
