// upload-image.js
import { Octokit } from 'https://cdn.skypack.dev/@octokit/rest';

const octokit = new Octokit();

window.addEventListener('DOMContentLoaded', init);

/** Initialize function, begins all of the JS code in this file */
async function init() {
  console.log('Initializing');
  setFormListener();
  /*
  let result = await octokit.request('GET /orgs/cse110-fa21-group7/actions/secrets/TEST', {
    org: 'org',
    secret_name: 'secret-name',
  });
  console.log(result);
  */
  octokit.rest.repos
      .listForOrg({
        org: 'cse110-fa21-group7',
        type: "public",
      })
      .then(({ data }) => {
        // handle data
        console.log(data);
      });

  octokit.request('GET /orgs/cse110-fa21-group7/actions/secrets/TEST', {
    org: 'cse110-fa21-group7',
    secret_name: 'TEST',
  }).then(({ data }) => {
    // handle data
    console.log(data);
  });

  octokit.request('GET /repos/cse110-fa21-group7/cse110-fa21-group7/actions/secrets/CLIENT_ID', {
    owner: 'cse110-fa21-group7',
    repo: 'cse110-fa21-group7',
    secret_name: 'CLIENT_ID',
  }).then(({ data }) => {
    // handle data
    console.log(data);
  });

  
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
    // <input class="form-control" type="file" id="recipeImage">

    // TODO: Upload Image
    const file = document.getElementById('recipeImage');
    //const.formdata.append()
    //file.files[0];

  });
}