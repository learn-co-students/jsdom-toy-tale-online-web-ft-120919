let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const toyCollection = document.querySelector("#toy-collection");
  const toysURL = "http://localhost:3000/toys";
  
  function loadToys() {
    fetch(toysURL)
      .then(resp => resp.json())
      .then(json => json.forEach(toy => displayToy(toy)));
  }

  function displayToy(toy) {
    const card = document.createElement("div");
    card.classList.add("card");
    toyCollection.append(card);

    const heading = document.createElement("h2");
    const toyName = document.createTextNode(toy.name);
    heading.appendChild(toyName);
    card.appendChild(heading);

    const toyImg = document.createElement("img");
    toyImg.src = toy.image;
    card.appendChild(toyImg);
  }

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    } 
  });


  const submitBtn = document.querySelector("#new-toy-submit");
  submitBtn.addEventListener("click", () => {
    event.preventDefault();
    const inputName = document.querySelector("#new-toy-name").value;
    const inputImg = document.querySelector("#new-toy-img").value;
    createToy(inputName, inputImg);
  })

  function createToy(name, img) {
    let newToyData = {
      name: name,
      image: img
    }

    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(newToyData)
    }
    
    //  sends object containing user input as json string to db
    //  receives response confirming db save and calls displaytoy to add to dom
    
    return fetch(toysURL, configObj)
      .then(resp => resp.json())
      .then(json => displayToy(json));
  }
  loadToys();
});
