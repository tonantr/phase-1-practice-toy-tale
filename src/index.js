let addToy = false;

function createCardElements(toy) {

  const card = document.createElement('div');
  card.classList.add('card')

  const h2 = document.createElement('h2');
  h2.textContent = toy.name;

  const img = document.createElement('img');
  img.src = toy.image;
  img.classList.add('toy-avatar');

  const p = document.createElement('p');
  p.textContent = `${toy.likes} likes`;

  const btn = document.createElement('button');
  btn.addEventListener('click', () => {
    p.textContent = `${toy.likes += 1} likes`
    updateLike(toy.id, toy.likes)
  })
  btn.classList.add('like-btn')
  btn.id = toy.id;
  btn.textContent = 'Like ❤️'


  card.append(h2, img, p, btn);
  document.querySelector('#toy-collection').appendChild(card);

};

function addToys(data) {

  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      ...data,
      'likes': 0 
    })
  })
  .then(res => res.json())
  .then(data => createCardElements(data))

};

function updateLike(id, newNum) {
  fetch(`http://localhost:3000/toys/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      'likes': newNum
    })
  })
  .then(res => res.json())
  .then(data => createCardElements(data))
}

document.addEventListener("DOMContentLoaded", () => {
  fetch('http://localhost:3000/toys')
    .then(res => res.json())
    .then(data => data.forEach(element => createCardElements(element)))

  const form = document.querySelector('.add-toy-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(event.target))
    addToys(formData)
  });

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
  });






