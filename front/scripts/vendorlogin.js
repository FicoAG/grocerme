document.getElementById('vendor-btn-signup').addEventListener('click', (event) => {
  const newVendor = {
    vendor_name: document.getElementById("vendor_name").value,
    vendor_email: document.getElementById("vendor_email").value,
    vendor_password: document.getElementById("vendor_password").value
  };
  console.log(newVendor)
  api
    .post("auth/vendor/signup", newVendor, { headers : { token : localStorage.getItem('token') }})
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
    })
    //then redirigir a completar resto de info del perfil
    //then redirigr a panel de control.
    .catch(function (error) {
      console.log(error.response);
    });
})

document.getElementById('vendor-btn-login').addEventListener('click', (event) => {

  const newVendor = {
    vendor_email: document.getElementById("vendor-login_email").value,
    vendor_password: document.getElementById("vendor-login_password").value
  };

  console.log(newVendor)

  api
    .post("auth/vendor/login", newVendor)
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name", response.data.name);
      localStorage.setItem("email", response.data.email);
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error.response);
    });
})