let addToy = false; //in createToy function branch

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  //Fetch Andy's toys: make a GET request to server
  //With response data, make a <div class="card"> for each toy
  //Add it to the toy-collection <div>
  fetch("http://localhost:3000/toys").then(function(response) {
    return response.json();
  })
  .then(function(object){
    toyCollection = document.getElementById("toy-collection");
    for (const key in object) {
      let toyObj = object[key];
      createToy(toyObj);
    }//for each key in returned JSON object
  })//end callback function for fetch() get request to toy database

  function createToy(toyObj) {
    //Create new div with class 'card'
    let newDiv = document.createElement('div');
    newDiv.className = 'card';
    toyCollection.appendChild(newDiv);

    //Add toy's name to the card
    let toyName = document.createElement('h2');
    toyName.innerHTML = toyObj["name"];
    newDiv.appendChild(toyName);

    //Add toy's image to the card
    let toyImg = document.createElement('img');
    toyImg.className = 'toy-avatar';
    toyImg.src = toyObj["image"];
    newDiv.appendChild(toyImg);

    //Add # of likes to the card
    let numLikes = document.createElement('p');
    numLikes.innerText = `${toyObj["likes"]} likes`;
    numLikes.className = 'num-likes';
    newDiv.appendChild(numLikes);

    //Add a like button to the card
    let likeButton = document.createElement('button');
    likeButton.class = 'like-btn';
    likeButton.innerText = "Like <3";
    newDiv.appendChild(likeButton);
    likeButton.addEventListener('click', updateLikes);
  }//function createToy

  //When submit button of form with class 'add-toy-form' is clicked (or when that form is submitted...)
  //Send a fetch() post request
  //The toy should "conditionally render" to the page
  const addToyForm = document.getElementsByClassName('add-toy-form')[0];
  addToyForm.addEventListener('submit', newToyFromForm);

  function newToyFromForm(event) {
    event.preventDefault();
    //send post request via fetch
    
    let formData = {
      name: event.target.name.value,
      image: event.target.image.value,
      likes: 0
    };

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    return fetch("http://localhost:3000/toys", configObj).then(function(response) {
      return response.json();
    })
    .then(function(object) {
      createToy(object);
    })
  }//function newToyFromForm

  function updateLikes(event) {
    event.preventDefault();
    console.log(event);
    //let toyId = //Need to figure out this id and replace it with 1 in the fetch URL!!
    //Each time a card is created, attach an id to it (from the server)??

    let formData = {
      likes: parseInt(event.target.parentElement.getElementsByClassName('num-likes')[0].innerText[0]) + 1
    };

    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };

    return fetch("http://localhost:3000/toys/1", configObj).then(function(response) {
      return response.json();
    })
    .then(function(object) {
      //console.log(object["likes"]);
      event.target.parentElement.getElementsByClassName('num-likes')[0].innerText = `${object["likes"]} likes`;
    })

  }//function updateLikes

});//event listener DOMContentLoaded


