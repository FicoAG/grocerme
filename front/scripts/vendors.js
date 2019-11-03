const localToken = localStorage.getItem("usertoken")
const email = localStorage.getItem("email")
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('cat');
const postal = urlParams.get('postal');




api.getAllVendorsFilterByCategoryAndPostal(category, postal)
  .then(vendors => {

    let html = `<div class="vendor-list">`;

    vendors.forEach( vendor => {
      html += `<a href="vendor.html?id=${vendor._id}" class="vendor-single"> ${vendor.name}</a><p> - ${vendor.brand}</p>`
    })

    html += `</div>`;

    document.getElementById('vendors').innerHTML = html;
    document.getElementById('category').innerHTML = category;
  })