const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');


api.getVendorById(id)
.then(vendor => {
  let html = `<div class="vendor-list">`;
  html += `<div><h1>${vendor.name}</h1></div>`
  html += `<div><h1>-----------</h1></div>`
  html += `<div><h1>${vendor.category}</h1></div>`
  html += `<div><h1>${vendor.brand}</h1></div>`
  html += `<div><h1>-----------</h1></div>`
  html += `<div>Monday: ${vendor.mon.zone}</div>`
  html += `<div>Tuesday: ${vendor.tue.zone}</div>`
  html += `<div>Wednesday: ${vendor.wed.zone}</div>`
  html += `<div>Thursday: ${vendor.thu.zone}</div>`
  html += `<div>Friday: ${vendor.fri.zone}</div>`
  html += `<div>Saturday: ${vendor.sat.zone}</div>`
  html += `<div>Sunday: ${vendor.sun.zone}</div>`

  html += `</div>`;
  console.log('this is vendor');
  console.log(vendor)

  document.getElementById('vendor').innerHTML = html;


})
