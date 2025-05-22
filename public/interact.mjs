import { url, makeGuess, token, SessionInfo} from "./script.mjs"; // vars
import { decodeReadableStream } from "./helpers.mjs";
import { decodeuint8String } from "./helpers.mjs";
import { addAnimation } from "./helpers.mjs"; 
import { getRelevantPlayerNames } from "./helpers.mjs";
import { fillDropdownList } from "./helpers.mjs";
import { clearChildren } from "./helpers.mjs"; 
import { loadPlayer } from "./helpers.mjs";

const submitButton = document.getElementById("submitButton");

document.addEventListener("keydown", (e) => {
    console.log(e.key)

    const listItems = document.querySelectorAll(".playerNameListItem")

    if (document.getElementById("playerNameDropdown").classList.contains("hidden")) {
        return;
    }

    const dropdownContainer = document.getElementById("playerNameDropdown")
    const dropdownElement = document.getElementById("playerNameList")

    if (e.key === "Enter") {
        submitButton.click();
        dropdownContainer.classList.add("hidden");
    }

    else if (e.key === "ArrowDown") {
        for (let item of listItems) { 

            if (item.classList.contains("listItemHover") && item != dropdownElement.lastChild) {
                item.classList.remove("listItemHover");
                item.nextSibling.classList.add("listItemHover");
                document.getElementById("guess").value = item.nextSibling.innerText
                return;
            }
        }
        listItems[0].classList.add("listItemHover")
    }

    else if (e.key === "ArrowUp") {
        for (let item of listItems) {
            if (item.classList.contains("listItemHover") && item != dropdownElement.firstChild) {
                item.classList.remove("listItemHover");
                item.previousSibling.classList.add("listItemHover");
                document.getElementById("guess").value = item.previousSibling.innerText
                return;
            }
        }
        listItems[0].classList.add("listItemHover");
    }
});
submitButton.addEventListener('click', (e) =>{

    console.log(token)
    let userText = document.getElementById("guess");
    const guess = userText.value;
    userText.value = ""; // reset the input text box for next input

    const response = fetch(`${url}${makeGuess}/${token}/${guess}`);
    
    response
    .then((value)=> {
        return decodeReadableStream(value)
    })
    .then((value) => {
        const parsedValue = JSON.parse(decodeuint8String(value))
        const pitchResults = parsedValue.status.strikes

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
            const currentPlayer = document.querySelector(".playerPicture").src
            const returnedPlayer = session.playersInfo[parsedValue.status.curPlayer].headshot
            if (returnedPlayer != currentPlayer) {
                loadPlayer(session, parsedValue.status.curPlayer);
            }
        })

    });
});

document.getElementById("guess").addEventListener("input", async (e) => {

    await getRelevantPlayerNames(e.target.value)
    .then((list) => {
        fillDropdownList(list);
    })
})