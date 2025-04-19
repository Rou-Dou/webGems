let hamburgerMenu = document.getElementById("hamburger");
let hamburgerDropdown = document.getElementById("dropdown");
let playerName = document.getElementById("PlayerName");
const url = "http://192.168.1.166:8080"
const getPlayer = "/getplayer"
const submitButton = document.getElementById("submitButton");

hamburgerMenu.addEventListener("click", () => {
    if (hamburgerDropdown.classList.contains("hidden")) {
        hamburgerDropdown.classList.remove("hidden");
    }

    else {
        hamburgerDropdown.classList.add("hidden");
    }
});

window.onload = ((e) => {
    let response = fetch(`${url}${getPlayer}`);
    response.then((value) => {
        const reader = value.body.getReader()
        return new ReadableStream({
            start(controller) {
                return pump();
                function pump() {
                    return reader.read().then(({done, value}) => {
                        if(done) {
                            controller.close();
                            return;
                        }
                        controller.enqueue(value);
                        return pump();
                    });
                }
            },
        });
    })
    .then((stream) => new Response(stream))
    .then((response) => {
        console.log("a response: ", response);
        playerName.innerText = response
    })
});

submitButton.addEventListener('click', (e) =>{
    let userText = document.getElementById("guess");
    const guess = userText.innerText
    console.log(userText)
    userText.innerText = "";
});
