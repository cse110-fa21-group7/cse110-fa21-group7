// upload-image.js
const recipe = {};
const formdata = new FormData();

window.addEventListener('DOMContentLoaded', init);

/** Initialize function, begins all of the JS code in this file */
async function init() {
  console.log('Initializing');
  setFormListener();
}


/**
 * Set up form listener
 */
function setFormListener() {
  const form = document.getElementById('recipeForm');

  form.addEventListener('submit', function(event) {
    // Stop form submission
    event.preventDefault();
    console.log('Submit button clicked');
    console.log(recipe);
    // <input class="form-control" type="file" id="recipeImage">

    // TODO: Upload Image
    // const file = document.getElementById('recipeImage');
    //const.formdata.append()
    //file.files[0];

  });

  const file = document.getElementById('recipeImage');

  file.addEventListener('change', (e) => {
    formdata = new FormData();
    formdata.append('image', e.target.files[0]);
    
    // console.log(file);
    fetch('https://api.imgur.com/3/image/', {
      method:'post',
      headers: {
        Authorization:'Client-ID 1b99956c57a5642'
      },
      body: formdata,
    }).then((data) => data.json()).then((data) => {
      console.log(data);
      let divImg = document.getElementById('img-spot');
      let childImgs = divImg.getElementsByTagName('img');
      let img;
      if (childImgs.length == 0) {
        img = document.createElement('img');
        divImg.append(img);
      } else {
        img = childImgs[0];
      }
      console.log(data.data.link)
      img.src = data.data.link;
      img.height = '200'
      img.referrerPolicy = 'no-referrer';
      recipe['img-url'] = data.data.link; 
    })
  })
}