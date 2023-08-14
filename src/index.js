import { fetchBreeds, fetchCatByBreed } from './cat';

const refs = {
  bteedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  divCatInfo: document.querySelector('.cat-info'),
};

refs.bteedSelect.addEventListener('change', getInfoCat);

fetchBreeds()
  .then(data => {
    createOption(data);
    refs.bteedSelect.classList.remove('is-hidden');
  })
  .catch(error => {
    refs.error.classList.remove('is-hidden');
  })
  .finally(() => {
    refs.loader.classList.add('is-hidden');
  });

function createOption(breeds) {
  const option = breeds
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  refs.bteedSelect.innerHTML = option;
}

function getInfoCat(e) {
  refs.divCatInfo.innerHTML = '';
  const breedId = e.target.value;
  refs.loader.classList.remove('is-hidden');
  refs.error.classList.add('is-hidden');

  console.log(breedId);
  fetchCatByBreed(breedId)
    .then(createCatMarkup)
    .catch(error => {
      refs.error.classList.remove('is-hidden');
    })
    .finally(() => {
      refs.loader.classList.add('is-hidden');
    });
}

function createCatMarkup(catInfo) {
  const { url } = catInfo[0];
  const { name, description, temperament } = catInfo[0].breeds[0];

  const markup = `
    <img src="${url}" alt="Cat img" width="300">
    <div>
      <h1>${name}</h1>
      <p>${description}</p>
      <p><b>Temperament: </b>${temperament}</p>
    </div>`;

  refs.divCatInfo.innerHTML = markup;
}