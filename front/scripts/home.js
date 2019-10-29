document.getElementById('vendor-finder-btn').addEventListener('click', (event) => {
    const params = {
        postal: document.getElementById("post-code").value
    }
    api
    .get(`/vendors/postal/${params.postal}`)
    .then(response => response.data)
    .then(vendors => {
        const htmls = vendors.map
    })
})