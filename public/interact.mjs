import { url, makeGuess, token, SessionInfo} from "./script.mjs"; // vars
import { decodeReadableStream, decodeuint8String, addAnimation, getRelevantPlayerNames, fillDropdownList, clearChildren, loadPlayer} from "./helpers.mjs"; //helpers

const submitButton = document.getElementById("submitButton");

submitButton.addEventListener('click', (e) =>{
    console.log(token)
    let userText = document.getElementById("guess");
    const guess = userText.value;
    console.log(userText.value);
    userText.value = "";
    const response = fetch(`${url}${makeGuess}/${token}/${guess}`);
    response
    .then((value)=> {
        return decodeReadableStream(value)
    })
    .then((value) => {
        console.log("decoded stream from makeGuess ---->", value)
        const parsedUint8 = decodeuint8String(value)
        const parsedString = JSON.parse(parsedUint8);
        console.log("session status object ---->", parsedString);

        const responseBool = parsedString.guessResult == true;

        console.log("The response boolean ---->", responseBool)

        const pitchResults = parsedString.status.strikes

        clearChildren(document.getElementById("strikes"))

        pitchResults.forEach(result => {
            const newBox = document.createElement("div");
            newBox.style.animation = "slide-up 0.5s"
 
            if (!result) {

                newBox.classList.add("greenbox")
            }
            else {
                newBox.classList.add("redbox")
            }

            document.getElementById("strikes").appendChild(newBox)
            addAnimation(newBox);
        })


        if (document.getElementById("strikes").style.display == "") {
            document.getElementById("strikes").style.display = "flex";
        }   

        SessionInfo
        .then((session) => {
            if (session.playersInfo[parsedString.status.curPlayer].headshot != document.querySelector(".playerPicture").src) {
                loadPlayer(session, parsedString.status.curPlayer);
            }
        })

    });
});

document.getElementById("guess").addEventListener("input", (e) => {

    getRelevantPlayerNames(e.target.value)
    .then((list) => {
        fillDropdownList(list);
    })
})