const API_KEY =
  'live_sTRoaNfp1eu3Tgvn6FPfKlBDoUdI2QL7QfvzmQS5lCgquGtxBKyqd7OBAh3TwUmI';

const API_URL = 'https://api.thecatapi.com/v1/';

function fetchBreeds() {
  return fetch(`${API_URL}breeds?api_key=${API_KEY}`).then(response => {
    return response.json();
  });
}

function fetchCatByBreed(breedId) {
  return fetch(
    `${API_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`
  ).then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };