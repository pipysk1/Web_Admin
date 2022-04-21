function logOut() {
    window.location.href = "login.html";
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("id_bill");
    localStorage.removeItem("id");
}