let addToy = false;
const toysUrl = 'http://localhost:3000/toys'

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
});

function increaseLikes(event) {
  // debugger
  const eventID = event.target.dataset.id
  const likesNumber = parseInt(event.target.previousElementSibling.innerText)
    
  let configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": likesNumber + 1
    })
    }
    fetch(`http://localhost:3000/toys/${eventID}`, configObj)
    .then(response=>response.json())
    .then(json=>{renderLikes(json)
    }
    )
}

function renderLikes(json) {
  const ptags = document.querySelectorAll('p')
  for (let i=0; i<ptags.length; i++) {
    if (parseInt(ptags[i].nextElementSibling.dataset.id) === json.id) {
      ptags[i].innerText = `${json.likes} Likes`
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchToys();
  const addToyForm = document.querySelector('.add-toy-form');
  addToyForm.addEventListener('submit', (e) => {
    e.preventDefault()
    let name = e.srcElement.name.value; 
    let image = e.srcElement.image.value;
    let formData = {
      name: name,
      image: image,
      likes: 0
    };
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
      }
      return fetch(toysUrl, configObj)
      .then(function(response) {
        return response.json();
      })
      .then(function(object) { 
         console.log(object);
      })
      .then(renderToy(name, image))
      .then(toggleNewFormButton())
      .then(clearNewToyForm())      
    })
});

function toggleNewFormButton() {
  const toyForm = document.querySelector(".container");
  addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
}

function clearNewToyForm() {
  const nameAndImageElem = document.querySelectorAll(".input-text")
  for (let i=0; i<nameAndImageElem.length; i++) {
    nameAndImageElem[i].value = ""
  }
}

function submitToy(name, image) {
  let formData = {
    name: name,
    image: image
  };
  
  let configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify(formData)
    }.then(fetchToys()); 
  

  return fetch(toysUrl, configObj)
  .then(function(response) {
    return response.json();
  })
  .then(function(object) {
      
    console.log(object);
  })
};


function fetchToys() {
  return fetch(toysUrl)
  .then(resp => resp.json())
  .then(json =>{
      renderToys(json)
  });
}

function renderToys(json) {
  const toyDivId = document.querySelector('#toy-collection')
  json.forEach(toy => {
    const divToAdd = document.createElement('div');
    divToAdd.classList.add("card");
    toyDivId.appendChild(divToAdd)
    const h2 = document.createElement('h2')
    h2.innerText = toy.name
    divToAdd.appendChild(h2)
    const img = document.createElement('img')
    img.src = toy.image
    img.classList.add('toy-avatar')
    divToAdd.appendChild(img)
    const p = document.createElement('p')
    p.innerText = `${toy.likes} Likes`
    divToAdd.appendChild(p)
    const button = document.createElement('button')
    button.classList.add('like-btn')
    button.innerText = 'Like'
    button.addEventListener('click', increaseLikes)
    button.dataset.id = toy.id
    divToAdd.appendChild(button)
  })
}

function renderToy(name, imgUrl) {
  const toyDivId = document.querySelector('#toy-collection')
  const divToAdd = document.createElement('div');
  divToAdd.classList.add("card");
  toyDivId.appendChild(divToAdd)
  const h2 = document.createElement('h2')
  h2.innerText = name
  divToAdd.appendChild(h2)
  const img = document.createElement('img')
  img.src = imgUrl
  img.classList.add('toy-avatar')
  divToAdd.appendChild(img)
  const p = document.createElement('p')
  p.innerText = '0 Likes'
  divToAdd.appendChild(p)
  const button = document.createElement('button')
  button.classList.add('like-btn')
  button.innerText = 'Like'
  button.addEventListener('click', increaseLikes)
  // button.dataset.id = id
  divToAdd.appendChild(button)
}

// cannot like new toy before refreshing