document.getElementById('vendor-finder-btn').addEventListener('click', (event) => {
  const postal = document.getElementById("post-code").value;
  api.vendorsCatByZip(postal)
    .then((categories) => {
      let output = document.getElementById('display-categories')
      let html = '<ul>';
      categories.forEach(cat => {
        html += `<li>`
        html += `<h1 class="category">
                    <a href="vendors.html?cat=${cat}&postal=${postal}">${cat} </a>

                  </h1>`
        html += `</li>`
      })

      html += `</ul>`;
      output.innerHTML = html
    })
})

