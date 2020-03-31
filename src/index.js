let addToy = false;

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
    // console.log(object);
    // debugger
    toyCollection = document.getElementById("toy-collection");
    for (const key in object) {
      //Create new div with class 'card'
      let newDiv = document.createElement('div');
      newDiv.className = 'card';
      toyCollection.appendChild(newDiv);

      //Add toy's name to the card
      let toyName = document.createElement('h2');
      toyName.innerHTML = object[key]["name"];
      newDiv.appendChild(toyName);

      //Add toy's image to the card
      let toyImg = document.createElement('img');
      toyImg.className = 'toy-avatar';
      toyImg.src = object[key]["image"];
      newDiv.appendChild(toyImg);

      //Add # of likes to the card
      let numLikes = document.createElement('p');
      numLikes.innerText = `${object[key]["likes"]} likes`;
      newDiv.appendChild(numLikes);
    }//for each key in returned JSON object
  })

});//event listener DOMContentLoaded
