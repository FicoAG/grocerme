document.getElementById('vendor-finder-btn').addEventListener('click', (event) => {
    const params = {
        postal: document.getElementById("post-code").value
    }
    api
    .get(`/vendors/postal/${params.postal}`)
    .then((data) => {
        let output = document.getElementById('display-categories')
        let categories = Object.getOwnPropertyNames(data.data).sort();
        let html = '<ul>';
        categories.forEach( cat => {
           html += `<li>`
           html += `<h1 class="caregory"><a href="#">${cat}</h1>`
           html += `</li>`
        })

       html += `</ul>`;
       output.innerHTML = html
    
    })
    .then(() => {
        let categories = document.getElementsByClassName('category').innerHTML;
        console.log(categories)
    })    
    
})
