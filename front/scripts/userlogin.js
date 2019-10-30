document.getElementById('user-btn-signup').addEventListener('click', (event) => {
  const newUser = {
    user_name:     document.getElementById("user_name").value,
    user_email:    document.getElementById("user_email").value,
    user_password:      document.getElementById("user_password").value
  };
  console.log(newUser)
  api
    .post("auth/user/signup", newUser)
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name",  response.data.name);
      localStorage.setItem("email", response.data.email);
    })
    // .then() redirigir a nuevo forumlario para terminar de completar info del usuario
    // y una vez finalizado ir al home filtrado por el código postal del usuario.
    .catch(function (error) {
      console.log(error.response);
    });
})

document.getElementById('user-btn-login').addEventListener('click', (event) => {

  const newUser = {
    user_email:    document.getElementById("login_email").value,
    user_password: document.getElementById("login_password").value
  };

  console.log(newUser)

  api
    .post("auth/user/login", newUser)
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name",  response.data.name);
      localStorage.setItem("email", response.data.email);
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error.response);
    });
})