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

  fetchToys()

  const formSubmit = document.getElementsByTagName('input')[2]
  formSubmit.addEventListener('click', function(e) {
    e.preventDefault()
    addNewToy()
  })
});

function fetchToys() {
  console.log('attempting to fetch toys from server...')
  return fetch('http://localhost:3000/toys')
    .then(resp => resp.json())
    .then(json => {
      for (let toyJson of json) {
        addToyToDOM(toyJson)
      }
    })
}

function addToyToDOM(toy) {
  //parent div
  const toyCollection = document.getElementById('toy-collection')

  //toy card div
  const toyCard = document.createElement('div')
  toyCard.setAttribute('class', 'card')

  //toy card children
  const toyTitle = document.createElement('h2')
    toyTitle.innerText = toy.name

  const toyAvatar = document.createElement('img')
    toyAvatar.setAttribute('src', toy.image)
    toyAvatar.setAttribute('class', 'toy-avatar')

  const toyLikes = document.createElement('p')
    toyLikes.innerText = `${toy.likes} Likes`

  const toyLikeBtn = document.createElement('button')
    toyLikeBtn.innerText = 'Like <3'
    toyLikeBtn.setAttribute('id', toy.id)
    addLikeListener(toyLikeBtn)


  toyCard.appendChild(toyTitle)
  toyCard.appendChild(toyAvatar)
  toyCard.appendChild(toyLikes)
  toyCard.appendChild(toyLikeBtn)

  toyCollection.appendChild(toyCard)
}

function addNewToy() {
  console.log('adding new toy...')
  const toyName = document.getElementsByTagName('input')[0].value
  const toyImg = document.getElementsByTagName('input')[1].value

  const toyObj = {
    name: toyName,
    image: toyImg
  }

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(toyObj)
  }
  return fetch('http://localhost:3000/toys', config)
    .then(response => response.json())
    .then(json => json)
}

function addLikeListener(element) {
  element.addEventListener('click', function(e) {
    e.preventDefault()
    console.log(e.target)
    addLike(e.target)
  })
}

function addLike(button) {
  const toyId = button.id
  const likes = button.previousSibling
  const numLikes = parseInt(likes.innerText) + 1

  const config = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': numLikes
    })
  }

  return fetch(`http://localhost:3000/toys/${toyId}`, config)
    .then(resp => resp.json())
    .then(json => {
      likes.innerText = `${json.likes} Likes`
    })
}
