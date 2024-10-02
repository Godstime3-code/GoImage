let imageInput = document.querySelector('#js-image');
let loaderEl = document.querySelector('.loader');
const API_KEY = 'vFvM0sXY2xE1b0EgsVaPPVUiUpuPyTAmr3PnXn8CpPyiHLw5gpiKyfVZ';
const API_URL  = "https://api.pexels.com/v1/search";


async function searchImages(query){
    try{

        if(imageInput.value === ''){
            return;
        }

        loaderEl.style.visibility = 'visible';
        const response = await fetch(`${API_URL}?query=${query}&per_page=25`, {
            method : 'GET',
            headers: {
                authorization: API_KEY
            }
        });
    
        if(!response.ok){
            throw new Error('Error Fetching Data');
        }
    
        const data  = await response.json();
        
        displayImages(data.photos);
    }catch(error){
       console.error(error)
    }
    
}

function displayImages(photos) {
    const gallery = document.getElementById('image-gallery');
    gallery.innerHTML = '';

    photos.forEach(photo => {
        const imgElement = document.createElement('img');
        imgElement.src = photo.src.medium; 
        imgElement.alt = photo.alt
        gallery.appendChild(imgElement);
    });
    
    loaderEl.style.visibility = 'hidden'
}

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('js-image').value;
    searchImages(query);
    imageInput.value = ''
});