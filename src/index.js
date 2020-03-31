document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  let addToy = false;
  let divCollect = document.getElementById('toy-collection');

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
      toyForm.addEventListener('submit', event => {
        event.preventDefault()
        submitToy(event.target)
      })
    } else {
      toyForm.style.display = "none";
    }
  });

  function getToys() {
    return fetch('http://localhost:3000/toys')
      .then(resp => resp.json())
      .then(toys => {
        toys.forEach(toy => {
          renderToys(toy)
        })
      })
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
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = "Like <3"
    btn.addEventListener('click', (e) => {
      console.log(e.target.dataset);
      likes(e)
    })
  
    let divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h2, img, p, btn)
    divCollect.append(divCard)
  }

  function submitToy(toy_data) {
    let toyInfo = {
      name: toy_data.name.value,
      image: toy_data.image.value,
      likes: 0
    }

    let configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(toyInfo)
    }

    return fetch("http://localhost:3000/toys", configObj)
      .then(resp => resp.json())
      .then(toy => renderToys(toy))
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
        e.target.previousElementSibling.innerText = `${more} likes`;
      }))
  }

  getToys()
});
