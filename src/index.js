let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  const collectionDiv = document.getElementById("toy-collection")
  const addToyForm = document.querySelector(".add-toy-form")

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });

  fetch('http://localhost:3000/toys')
    .then(response => response.json())
    .then(addToysToIndex)

  function addToysToIndex(toy) {
    if (Array.isArray(toy)) {
      toy.forEach(toy => {
        let toysDivCard = `
        <div class="card">
        <h2>${toy.name}</h2>
        <img src=${toy.image} class="toy-avatar" />
        <p>${toy.likes}</p>
        <button class="like-btn"> Like <3</button>
        </div>
        `
        collectionDiv.innerHTML += toysDivCard
        let likeBtn = document.querySelector(".like-btn")
        likeBtn.addEventListener('click', e => showLikes(e, toy))
      })
    } else {
      let divCard = `
      <div class="card">
      <h2>${toy.name}</h2>
      <img src=${toy.image} class="toy-avatar" />
      <p>${toy.likes}</p>
      <button class="like-btn"> Like <3</button>
      </div>
      `
      collectionDiv.innerHTML += divCard
      let likeBtn = document.querySeletor(".like-btn")
      likeBtn.addEventListener('click', e => showLikes(e, toy))
    }
  }

  addToyForm.addEventListener("submit", e => {
    e.preventDefault()
    addNewToy(e)
    createToyForm.reset
  })

  function addNewToy(e) {
    let newToy = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }
    createToy(newToy)
  }

  function createToy(toy) {
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(toy)
    })
      .then(response => response.json())
      .then(addToysToIndex(toy))

  }

  const showLikes = (e, toy) => {
    let num = parseInt(e.target.parentElement.children[2].innerText)
    e.target.parentElement.children[2].innerText = num + 1
    likeToy(toy)
  }

  const likeToy = toy => {
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({ likes: toy.likes++ })
    }).then(resp => resp.json())
  }


});
