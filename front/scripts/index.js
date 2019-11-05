document.getElementById('vendor-finder-btn').addEventListener('click', (event) => {
  const postal = document.getElementById("post-code").value;
  api.vendorsCatByZip(postal)
    .then((categories) => {
      let output = document.getElementById('display-categories')
      let html =``
      let img = ""
      const images = ['images/bake.jpg', 'images/frost.jpg', 'images/fruits.jpg', 'images/water.jpg']
      categories.forEach(cat => {
        if (cat === "Bakery") { img = images[0] }
        if (cat === "Frosted") { img = images[1] }
        if (cat === "Fruits") { img = images[2] }
        if (cat === "Water"){ img = images[3]}
        html += `<div class="cat-div" style="background-image:url(${img})">`
        html += `<div><a href="vendors.html?cat=${cat}&postal=${postal}">${cat} </a></div>`
        html += `</div>`

      })
      output.innerHTML = html
    })
})

