document.getElementById('vendor-finder-btn').addEventListener('click', (event) => {
  api.vendorsCatByZip(document.getElementById("post-code").value)
    .then((categories) => {
      let output = document.getElementById('display-categories')
      let html = '<ul>';
      categories.forEach(cat => {
        html += `<li>`
        html += `<h1 class="category"><a href="#">${cat}</h1>`
        html += `</li>`
      })

      html += `</ul>`;
      output.innerHTML = html
    })
})

