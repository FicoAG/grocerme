document.getElementById('user-btn-signup') &&
document.getElementById('user-btn-signup').addEventListener('click', (event) => {
  api.user_signup({
    user_name:     document.getElementById("user_name").value,
    user_email:    document.getElementById("user_email").value,
    user_password: document.getElementById("user_password").value
  });
})

document.getElementById('user-btn-login') &&
document.getElementById('user-btn-login').addEventListener('click', (event) => {
  api.user_login({
    user_email:    document.getElementById("login_email").value,
    user_password: document.getElementById("login_password").value
  });
})

document.getElementById('vendor-btn-signup') &&
document.getElementById('vendor-btn-signup').addEventListener('click', (event) => {
  api.vendor_signup({
    vendor_name: document.getElementById("vendor_name").value,
    vendor_email: document.getElementById("vendor_email").value,
    vendor_password: document.getElementById("vendor_password").value
  });
})

document.getElementById('vendor-btn-login') &&
document.getElementById('vendor-btn-login').addEventListener('click', (event) => {
  api.vendor_login({
    vendor_email: document.getElementById("vendor-login_email").value,
    vendor_password: document.getElementById("vendor-login_password").value
  });
})