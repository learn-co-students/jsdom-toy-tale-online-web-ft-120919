let addToy = false;
let divCollect = document.querySelector("#toy-collection")
const toyForm = document.querySelector('.container')
const addBtn = document.querySelector('#new-toy-btn')
const toyURL = "http://localhost:3000/toys"


function getToys() {
return fetch(toyURL)
  .then(resp => resp.json())
}

function postToy() {
  fetch(toyURL, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({
    "name": toy_data.name.value,
    "image": toy_data.image.value,
    "likes": 0
  })
 })
 .then(resp => resp.json())
 .then((obj_toy) => {
  let new_toy = renderToys(obj_toy)
  divCollect.append(new_toy)
 })
}

function likes(e) {
  e.preventDefault()
  let more = parseInt(e.target.previousElementSibling.innerText) + 1
  
  fetch(`http://localhost:3000/toys/${e.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": more
    })
  })
  .then(resp => resp.json())
  .then((like_obj => {
    e.target.previousElementSibling.innerText = `${more} likes`
  }))
}

function renderToys(toy) {
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  
  let img = document.createElement('img')
  img.setAttribute('src', toy.image)
  img.setAttribute('class', 'toy-avatar')

  let p = document.createElement('p')
  p.innerText = `${toy.likes} likes`

  let btn = document.createElement('button')
  btn.setAttribute('class', "like-btn")
  btn.setAttribute('id', toy.id)
  btn.innerText = "like"
  btn.addEventListener('click', (e) => {
    console.log(e.target.dataset);
    likes(e)
  })

  let divCard = document.createElement('div')
  divCard.setAttribute('class', 'card')
  divCard.append(h2, img, p, btn)
  divCollect.append(divCard)

}

addBtn.addEventListener('click', () => {
  addToy = !addToy
  if (addToy) {
    toyForm.getElementsByClassName.display = 'block'
    toyForm.addEventListener('submit', e => {
      e.preventDefault()
      postToy(e.target)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

getToys().then(toys => {
  toys.forEach(toy => {
    renderToys(toy)
  }) 
})