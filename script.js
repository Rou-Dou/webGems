document.getElementById("hamburger").addEventListener("click", () => {
    if (document.getElementById("dropdown").classList.contains("hidden")) {
        document.getElementById("dropdown").classList.remove("hidden")
    }

    else {
        document.getElementById("dropdown").classList.add("hidden")
    }
})