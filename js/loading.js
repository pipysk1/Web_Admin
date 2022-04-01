
const loader = document.querySelector("#loading");
function displayLoading() {
    loader.classList.add("display");
    // to stop loading after some time
    setTimeout(() => {
        loader.classList.remove("display");
    }, 5000);
}

function hideLoading() {
    loader.classList.remove("display");
}