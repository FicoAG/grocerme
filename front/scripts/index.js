(function authenticated () {
  if (localStorage.getItem('token')) {
    console.log('user authenticated')
  } else {
    console.log('user not authenticated')
  }
})()

const api = axios.create({
  baseURL: "http://localhost:5000/api/",
  timeout: 1000
});

document.getElementById('btn-signup').addEventListener('click', (event) => {
  const newUser = {
    user_name:     document.getElementById("user_name").value,
    user_email:    document.getElementById("user_email").value,
    user_password: document.getElementById("user_password").value
  };

  api
    .post("auth/signup", newUser)
    .then(function (response) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("name",  response.data.name);
      localStorage.setItem("email", response.data.email);
    })
    .catch(function (error) {
      console.log(error.response);
    });
})

document.getElementById('btn-login').addEventListener('click', (event) => {
  console.log('loggggiinnnnn')

  const newUser = {
    user_email:    document.getElementById("login_email").value,
    user_password: document.getElementById("login_password").value
  };

  api
    .post("auth/login", newUser)
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

document.getElementById('btn-api').addEventListener('click', (event) => {
  api
    .get("whoami", { headers: { token: localStorage.getItem("token") }})
    .then(function (response) {
      console.log(response.data)
    })
    .catch(function (error) {
      console.log(error.response);
    });
})
