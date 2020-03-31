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

  const realForm = toyForm.querySelector('form.add-toy-form')
  realForm.addEventListener('submit', function(event) {
    event.preventDefault()
    let name = realForm.querySelector('input[name="name"]').value
    let image = realForm.querySelector('input[name="image"]').value
    let toy = {
      name: name,
      image: image,
      likes: 0
    }
    makeToy(toy)
  })

  let configObj = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  fetch('http://localhost:3000/toys', configObj)
  .then(function(response){
    return response.json()
  })
  .then(function(object){
    object.forEach(toy => {
      makeToy(toy)
    })
  })
});

function makeToy(toy) {
  const toyBox = document.querySelector('div#toy-collection')

  let divToy = document.createElement('div')
  divToy.class = 'card'
  divToy.id = toy.id
  toyBox.appendChild(divToy)

  let h2Name = document.createElement('h2')
  h2Name.textContent = toy.name
  divToy.appendChild(h2Name)

  let imgToy = document.createElement('img')
  imgToy.src = toy.image
  divToy.appendChild(imgToy)

  let pLikes = document.createElement('p')
  pLikes.innerHTML = `${toy.likes} Likes`
  divToy.appendChild(pLikes)

  let likeButton = document.createElement('button')
  likeButton.class = 'like-btn'
  likeButton.textContent = 'Like <3'
  divToy.appendChild(likeButton)
  likeButton.addEventListener('click', () => {
    toy.likes = toy.likes + 1
    toyLikes(toy)
  })
}

function toyLikes(toy) {
  let configObj = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': toy.likes
    })
  }

  fetch(`http://localhost:3000/toys/${toy.id}`, configObj)
  .then(function(response){
    return response.json()
  })
  .then(function(object){
    let pLikes = document.querySelector(`div#toy-collection div[id="${toy.id}"] p`)
    pLikes.textContent = `${object.likes} Likes`
  })
}