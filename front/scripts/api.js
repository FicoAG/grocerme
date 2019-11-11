function API() {
  this.base_api = axios.create({
    baseURL: "http://localhost:2222/api/",
    timeout: 1000
  });

  // Sign up & login
  this.user_signup = newUser => {
    return this.base_api
      .post("auth/user/signup", newUser)
      .then(response => {
        if (response.data.error) {
          console.log("error in the req")
        } else {
          localStorage.setItem("usertoken", response.data.token);
          localStorage.setItem("name", response.data.username);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("userId", response.data._id);
          window.location.assign('index.html') //TODO REDIRECCIONAR A COMPLETAR PERFIL
        }
      })
      .catch(error => {
        alert(error.response.data.error.message)
      });
  };

  this.user_login = userLogin => {
    return this.base_api
      .post("auth/user/login", userLogin)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error)
        } else {
          localStorage.setItem("usertoken", response.data.token);
          localStorage.setItem("name", response.data.username);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("userId", response.data._id);
          localStorage.setItem("zipcode", response.data.zipcode);
          window.location.assign('index.html') //TODO REDIRECCIONAR A COMPLETAR PERFIL
        }
      })
      .catch(error => { console.log(error.response) });
  };

  this.vendor_signup = newVendor => {
    return this.base_api
      .post("auth/vendor/signup", newVendor)
      .then(response => {
        localStorage.setItem("vendortoken", response.data.token);
        localStorage.setItem("name", response.data.vendorname);
        localStorage.setItem("email", response.data.email);
        localStorage.setItem("vendorId", response.data._id);
        window.location.assign('index.html') //TODO REDIRECCIONAR A COMPLETAR PERFIL
      })
      .catch(error => { console.log(error.response) });
  };

  this.vendor_login = vendorLogin => {
    return this.base_api
      .post("auth/vendor/login", vendorLogin)
      .then(response => {
        if (response.data.error) {
          alert(response.data.error)
        } else {
          localStorage.setItem("vendortoken", response.data.token);
          localStorage.setItem("name", response.data.vendorname);
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("vendorId", response.data._id);
          window.location.assign('index.html') //TODO REDIRECCIONAR A COMPLETAR PERFIL
        }
      })
      .catch(error => { console.log(error.response) });
  };

  // vendors find and show methods
  this.vendorsCatByZip = postal => {
    return this.base_api
      .get(`/vendors/category/${postal}`)
      .then(response => response.data)
      .catch(error => { console.log(error.response) });
  }

  this.getAllVendorsFilterByCategoryAndPostal = (category, postal) => {
    return this.base_api
      .get(`/vendors?category=${category}&postal=${postal}`)
      .then(response => response.data)
      .catch(error => { console.log(error.response) });
  }

  this.getVendorById = (id) => {
    return this.base_api
      .get(`vendors/${id}`)
      .then(response => response.data)
      .catch(error => { console.log(error.response) });
  }

  this.getVendorByIdAuth = (id) => {
    return this.base_api
      .get(`vendors/check/${id}`)
      .then(response => console.log(response.data))
      .catch(error => { console.log(error.response) });
  }

  this.follow = (vendorId, userToken) => {
    return this.base_api
      .get(`vendors/${vendorId}/follow`, { headers: { token: userToken}}   )
  }

  this.unfollow = (vendorId, userToken) => {
    return this.base_api
      .get(`vendors/${vendorId}/unfollow`, { headers: { token: userToken } })
  }
}
const api = new API();