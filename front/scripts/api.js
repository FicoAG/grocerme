function API() {
  // TODO: Protect routes that you don't want users to go unless authenticated
  //
  // if (!localStorage.getItem('token')
  //   && window.location.pathname !== '/index.'
  // {
  //   console.log('user not authenticated')
  // }

  this.base_api = axios.create({
    baseURL: "http://localhost:2222/api/",
    timeout: 1000
  });

  this.user_signup = newUser => {
    this.base_api
      .post("auth/user/signup", newUser)
      .then(response => {
        if (response.data.error) {
          console.log("error in the req")
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.username);
          localStorage.setItem("email", response.data.email);
          window.location.assign('index.html') //TODO REDIRECCIONAR A COMPLETAR PERFIL
        }
      })
      .catch(error => {
        alert(error.response.data.error.message)
      });
  };

  this.user_login = userLogin => {
    this.base_api
      .post("auth/user/login", userLogin)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error)
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.username);
          localStorage.setItem("email", response.data.email);
          window.location.assign('index.html') //TODO REDIRECCIONAR A COMPLETAR PERFIL
        }
      })
      .catch(error => { console.log(error.response) });
  };

  this.vendor_signup = newVendor => {
    this.base_api
      .post("auth/vendor/signup", newVendor)
      .then(response => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("name", response.data.vendorname);
        localStorage.setItem("email", response.data.email);
        window.location.assign('index.html') //TODO REDIRECCIONAR A COMPLETAR PERFIL
      })
      .catch(error => { console.log(error.response) });
  };

  this.vendor_login = vendorLogin => {
    this.base_api
      .post("auth/vendor/login", vendorLogin)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error)
        } else {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("name", response.data.vendorname);
          localStorage.setItem("email", response.data.email);
          window.location.assign('index.html') //TODO REDIRECCIONAR A COMPLETAR PERFIL
        }
      })
      .catch(error => { console.log(error.response) });
  };

  this.vendorsCatByZip = postal => {
    console.log({postal})
    return this.base_api
      .get(`/vendors/category/${postal}`)
      .then(response => response.data)
      .catch(error => { console.log(error.response) });
  }
}
const api = new API();


// .post("auth/vendor/signup", newVendor, { headers: { token: localStorage.getItem('token') } })
