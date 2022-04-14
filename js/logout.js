function logOut() {
    window.location.href = "login.html";
    localStorage.removeItem("token");
}