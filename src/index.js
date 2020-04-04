let addToy = false;

document.addEventListener("DOMContentLoaded", init);
let alltoys=[];

function init(){
  getToys();
  setupForm();
  //setupLikeBttns();
}
function getToys() {
  // fetch, sends a GET request by default
  const url = 'http://localhost:3000/toys';
  fetch(url)
      .then(getJSON)
      .then(callRenderToys);
}

/*function setupLikeBttns(){
  let likeBttns = document.querySelectorAll(".like-btn");
  likeBttns.forEach( bttn =>{
        bttn.addEventListener("click",addLike );
    }
  );
}*/

function addLike(event){
  let toy_id = event.target.id;
  let toy = findToyById(toy_id);
  const likes = parseInt(toy.likes) + 1;
  const url = `http://localhost:3000/toys/${toy.id}`;
  let params = {
    likes: likes
  };
  fetch(url, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
      .then(getJSON)
      .then(toy => {
        let id = toy.id;
        let card = document.getElementById(id);
        let p = card.firstElementChild.nextElementSibling.nextElementSibling;
        p.innerText = `"${toy.likes}" Likes `;
      })
}

function findToyById(toy_id){
  for (let i=0 ; i< alltoys.length; i++){
    toy = alltoys[i];
    if (toy.id == toy_id) return toy;
  }

}

function setupForm(){
  const form = document.querySelector('form');
  form.addEventListener('submit', createToyFromForm);
  const addBtn = document.querySelector("#new-toy-btn");
  addBtn.addEventListener("click", toggleFormView);
}
function createToyFromForm(e){
  e.preventDefault();
  const name = document.getElementsByName('name')[0].value;
  const image = document.getElementsByName('image')[0].value;
  const url = 'http://localhost:3000/toys';

  let params = {
    name: name,
    image: image,
    likes: 0
  };
  /*post this toy via post request*/
  fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(params)
  })
      .then(getJSON)
      .then(toy => {
        /*put this toy up on web page*/
        render(toy)
      })
}

function getJSON(response) {return response.json();}
function callRenderToys (json) {renderToys(json);}

function renderToys(toys){
  alltoys = toys;
  toys.forEach( toy =>
                  render(toy)
              );
}

function render(toy){
  let toysList = document.getElementById('toy-collection');
  toysList.innerHTML += card(toy);
}


function toggleFormView()  {
  let toyForm = document.querySelector(".container");
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
  } else {
    toyForm.style.display = "none";
  }
}
/*
h2 tag with the toy's name
img tag with the src of the toy's image attribute and the class name "toy-avatar"
p tag with how many likes that toy has
button tag with a class "like-btn"
<div class="card">
    <h2>Woody</h2>
    <img src=toy_image_url class="toy-avatar" />
    <p>4 Likes </p>
    <button class="like-btn">Like <3</button>
</div>
  * */
function card(toy) {
  let toy_info =`
      <div class="card" id="${toy.id}">
        <h2>${toy.name}</h2>
        <img src="${toy.image}" class="toy-avatar" />
        <p>"${toy.likes}" Likes </p>
        <button class="like-btn" id="${toy.id}" onclick="addLike(event)">Like <3</button>
      </div>
    `;
  return toy_info;
}

