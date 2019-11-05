const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const userId = window.localStorage.getItem('userId')
const userToken = window.localStorage.getItem('usertoken')
console.log("userId")
console.log(id)
api.getVendorById(id)
.then(vendor => {
  let html = `<div class="vendor-list">`;
  html += `<div><h1>${vendor.name}</h1></div>`
  html += `<div><h1>-----------</h1></div>`
  html += `<div><h1>${vendor.category}</h1></div>`
  html += `<div><h1>${vendor.brand}</h1></div>`
  html += `<div><h1>-----------</h1></div>`
  html += `<table>`
  html += `<tr><th>Mon.: ${vendor.mon.zone[0]}</th> <th>${vendor.mon.zone[1]}</th></tr>`
  html += `<tr><th>Tue.: ${vendor.tue.zone[0]}</th> <th> ${vendor.tue.zone[1]}</th></tr>`
  html += `<tr><th>Wed.: ${vendor.wed.zone[0]}</th> <th> ${vendor.wed.zone[1]}</th></tr>`
  html += `<tr><th>Thu.: ${vendor.thu.zone[0]}</th> <th> ${vendor.thu.zone[1]}</th></tr>`
  html += `<tr><th>Fri.: ${vendor.fri.zone[0]}</th> <th> ${vendor.fri.zone[1]}</th></tr>`
  html += `<tr><th>Sat.: ${vendor.sat.zone[0]}</th> <th> ${vendor.sat.zone[1]}</th></tr>`
  html += `<tr><th>Sun.: ${vendor.sun.zone[0]}</th> <th> ${vendor.sun.zone[1]}</th></tr>`
  html += `<table>`
  html += `</div>`;
  console.log(userId);
  console.log(vendor.mon.usersSubscribed)
  if(
  vendor.mon.usersSubscribed.includes(userId) ||
  vendor.tue.usersSubscribed.includes(userId) ||
  vendor.wed.usersSubscribed.includes(userId) ||
  vendor.thu.usersSubscribed.includes(userId) ||
  vendor.fri.usersSubscribed.includes(userId) ||
  vendor.sat.usersSubscribed.includes(userId) ||
  vendor.sun.usersSubscribed.includes(userId)
  ) { html += `<button id="follow-btn">unfollow</button>` } else { html += `<button id="follow-btn">follow</button>`}

  document.getElementById('vendor').innerHTML = html;
  document.getElementById('follow-btn').addEventListener('click', (event)=>{
    const todo = document.getElementById("follow-btn").innerText
    const token = userToken;

    if (todo === 'follow'){
      api.follow(id, token)
      .then(response => {
        document.getElementById("follow-btn").innerHTML = 'unfollow';
      })
    }else{
      api.unfollow(id, token)
      .then(response => {
        document.getElementById("follow-btn").innerHTML = 'follow';

      })

    }

  })
})



document.getElementById('vendor').innerHTML = html;



// document.getElementById('follow-btn').addEventListener('click', (event) => {
// })
// })

// function followMe(id) {

//   const todo = document.getElementById("follow-btn").innerHTML
//   console.log("casa")
//   console.log(todo)
// }
