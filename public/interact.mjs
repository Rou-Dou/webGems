import { url, makeGuess, token} from "./script.mjs"; // vars
import { decodeReadableStream, decodeuint8String, addAnimation, getRelevantPlayerNames, fillDropdownList} from "./helpers.mjs"; //helpers

const submitButton = document.getElementById("submitButton");
let hamburgerMenu = document.getElementById("hamburger");
let  hamburgerDropdown = document.getElementById("dropdown");

hamburgerMenu.addEventListener("click", () => {
    if (hamburgerDropdown.classList.contains("hidden")) {
        hamburgerDropdown.classList.remove("hidden");
    }

    else {
        hamburgerDropdown.classList.add("hidden");
    }
});

submitButton.addEventListener('click', (e) =>{
    console.log(token)
    let userText = document.getElementById("guess");
    const guess = userText.value;
    console.log(userText.value);
    userText.value = "";
    const response = fetch(`${url}${makeGuess}/${token}/${guess}`);
    console.log("response from makeGuess ---->", response);
    response.then((value)=> {
        decodeReadableStream(value)
        .then((value) => {
            const newBox = document.createElement("div");
            newBox.style.animation = "slide-up 0.5s"

            console.log("returned from make guess --->", decodeuint8String(value))

            const responseBool = decodeuint8String(value) == "true";

            console.log("The response boolean ---->", responseBool)

            document.getElementById("strikes").appendChild(newBox)

            if (document.getElementById("strikes").style.display == "") {
                document.getElementById("strikes").style.display = "flex";
            }

            addAnimation(newBox);

            if (responseBool) {

                newBox.classList.add("greenbox")
            }
            else {
                newBox.classList.add("redbox")
            }
        });
    });
});

document.getElementById("guess").addEventListener("input", (e) => {
    console.log(e.target.value)
    const relevantPlayers = getRelevantPlayerNames(e.target.value)
    fillDropdownList(relevantPlayers);
})