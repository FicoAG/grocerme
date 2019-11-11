const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
const userId = window.localStorage.getItem('userId')
const userToken = window.localStorage.getItem('usertoken')
const userZipcode = window.localStorage.getItem('zipcode')

api.getVendorById(id)
.then(vendor => {
  let html = `<div id="vendor-list">`;
  html += `<table id="time-table">`
  html += `<tr>`
  html += `<th>Monday</th>`
  html += `<th>Tuesday</th>`
  html += `<th>Wednesday</th>`
  html += `<th>Tursday</th>`
  html += `<th>Friday</th>`
  html += `<th>Saturday</th>`
  html += `<th>Sunday</th>`
  html += `</tr>`
  html += `<tr>`
  html += `<td>${vendor.mon.zone[0]}</td>`
  html += `<td>${vendor.tue.zone[0]}</td>`
  html += `<td>${vendor.wed.zone[0]}</td>`
  html += `<td>${vendor.thu.zone[0]}</td>`
  html += `<td>${vendor.fri.zone[0]}</td>`
  html += `<td>${vendor.sat.zone[0]}</td>`
  html += `<td>${vendor.sun.zone[0]}</td>`
  html += `</tr>`
  html += `<tr>`
  html += `<td>${vendor.mon.zone[1]}</td>`
  html += `<td>${vendor.tue.zone[1]}</td>`
  html += `<td>${vendor.wed.zone[1]}</td>`
  html += `<td>${vendor.thu.zone[1]}</td>`
  html += `<td>${vendor.fri.zone[1]}</td>`
  html += `<td>${vendor.sat.zone[1]}</td>`
  html += `<td>${vendor.sun.zone[1]}</td>`
  html += `</tr>`
  html += `</table>`
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
  document.getElementById('vendor-name').innerHTML = vendor.name;
  document.getElementById('company').innerHTML = vendor.brand;
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
