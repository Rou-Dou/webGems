import { url, makeGuess, token} from "./script.mjs"; // vars
import { decodeReadableStream, decodeuint8String } from "./helpers.mjs"; //helpers

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
        .then(({done, value}) => {
            console.log("This is the data ---->", decodeuint8String(value));
        });
    });
});