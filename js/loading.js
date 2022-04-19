
const loader = document.querySelector("#loading");
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some tim
}

function hideLoading() {
    loader.classList.remove("display");
}