const localToken = localStorage.getItem("usertoken")
const email = localStorage.getItem("email")
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('cat');
const postal = urlParams.get('postal');




api.getAllVendorsFilterByCategoryAndPostal(category, postal)
  .then(vendors => {

    let html = `<div id="vendor-list">`;

    vendors.forEach( vendor => {
      html += `<div class="one-vendor"><div id="user-icon"><i class="far fa-user-circle"></i></div><a href="vendor.html?id=${vendor._id}" class="vendor-single">&nbsp&nbsp${vendor.name}&nbsp-&nbsp</a><p>${vendor.brand}</p></div>`
    })

    html += `</div>`;

    document.getElementById('vendors').innerHTML = html;
    document.getElementById('category').innerHTML = category;
    document.getElementById('postal').innerHTML = postal;
  })