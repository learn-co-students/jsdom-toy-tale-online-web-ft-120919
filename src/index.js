let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  getToys()
})

const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
const getToyCollection = () => document.querySelector("#toy-collection")
addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
});

let toys = []

function getToys() {
  fetch("http://localhost:3000/toys")
  .then(function(r) {
    return r.json()
  })
  .then(function(toyData) {
    toys = toyData
    renderToys(toyData)
    const getLikeBtn = () => document.querySelector(".like-btn")
    getLikeBtn().addEventListener("click", (e) => {
      console.log(e)
    })
  })
}

function renderToys(toyData) {
  toyData.forEach(toy => render(toy))
}
function template(toy) {
  return `
    <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes} likes</p>
      <button class="like-btn" id=${toy.id}>Like <3</button>
    </div>
  `
}

function render(toy) {
  getToyCollection().innerHTML += template(toy)
}

toyForm.addEventListener("submit", (e) => {
  e.preventDefault()
  const toyAttributes = document.querySelector(".add-toy-form")
  const toyName = toyAttributes.name.value
  const toyImage = toyAttributes.image.value
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      "name": toyName,
      "image": toyImage,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then(toy => {
    toys.push(toy)
    render(toy)
  })
})
