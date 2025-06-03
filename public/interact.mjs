import { url } from "./script.mjs";
import { makeGuess } from "./script.mjs";
import { token } from "./script.mjs";
import { playerNames } from "./script.mjs";
import { addAnimation } from "./helpers.mjs"; 
import { getRelevantPlayerNames } from "./helpers.mjs";
import { fillDropdownList } from "./helpers.mjs";
import { clearChildren } from "./helpers.mjs"; 
import { loadPlayer } from "./helpers.mjs";
import { childHasClass } from "./helpers.mjs";
import { selectListItem } from "./helpers.mjs";
import { disableElements } from "./helpers.mjs";

const submitButton = document.getElementById("submitButton");

document.addEventListener("keydown", (e) => {

    const dropdownElement = document.getElementById("playerNameList")
    const dropdownContainer = document.getElementById("playerNameDropdown")
    const listItems = dropdownElement.children
    let itemSelected = false
    let childHasClassResult;

    switch (e.key) {

    case "Enter":
        if (dropdownContainer.classList.contains("hidden")) {
            submitButton.click();
        }
        else dropdownContainer.classList.add("hidden");

        break;

    case "ArrowDown": 
        
        if (dropdownContainer.classList.contains("hidden")) {
            break;
        }

        childHasClassResult = childHasClass(listItems, "listItemHover");
        if (childHasClassResult.found && childHasClassResult.childElement != dropdownElement.lastChild) {
            itemSelected = selectListItem(childHasClassResult.childElement, "listItemHover", "down")
            break;
        }
        if (!itemSelected && !dropdownElement.lastChild.classList.contains("listItemHover")) {
            listItems[0].classList.add("listItemHover");
            document.getElementById("guess").value = listItems[0].innerText;
        }

        break;

    case "ArrowUp": 
        if (dropdownContainer.classList.contains("hidden")) {
            break;
        }
        
        childHasClassResult = childHasClass(listItems, "listItemHover");
        if (childHasClassResult.found && childHasClassResult.childElement != dropdownElement.firstChild) {
            itemSelected = selectListItem(childHasClassResult.childElement, "listItemHover", "up")
            break;
        }

        if (!itemSelected && !dropdownElement.firstChild.classList.contains("listItemHover")) {
            listItems[0].classList.add("listItemHover");
            document.getElementById("guess").value = listItems[0].innerText;
        }
        break;
    }
});

submitButton.addEventListener('click', (e) =>{
    
    let userText = document.getElementById("guess");
    const guess = userText.value;
    userText.value = ""; // reset the input text box for next input

    if (guess.trim() == "" || !playerNames.then((value) => value.includes(guess))) {
        return;
    }

    fetch(`${url}${makeGuess}/${token}/${guess}`)
    .then((value)=> {
        return value.json()
    })
    .then((sessionInfo) => {
        console.log('returned sessio info', sessionInfo);

        const currentPlayer = document.querySelector(".playerPicture").src;
        const returnedPlayer = sessionInfo.status.playersInfo[sessionInfo.status.curPlayer].headshot;
        if (returnedPlayer != currentPlayer) {
            disableElements(document.getElementById("guessContainer").children);
            disableElements(document.getElementById("buttonRow").children);
            if (!document.getElementById("nextPlayerButton")) {
                const newButton = document.createElement("button");
                newButton.id = "nextPlayerButton";
                newButton.type = "button";
                newButton.innerHTML = "Next Player";
                document.getElementById("submitButton").parentElement.appendChild(newButton);
                newButton.addEventListener("click", loadPlayer);
            
            }
            const newBox = document.createElement("div");
            newBox.style.animation = "slide-up 0.5s";

            if (sessionInfo.guessResult) {
                newBox.classList.add("greenbox");
            }
            else {
                newBox.classList.add('redbox');
            }
            addAnimation(newBox);
            document.getElementById("strikes").appendChild(newBox);

        }

        else if (!sessionInfo.status.active) {
            disableElements(document.getElementById("guessContainer").children)
            disableElements(document.getElementById("buttonRow").children);
            const newBox = document.createElement("div");
            newBox.style.animation = "slide-up 0.5s";

            if (sessionInfo.guessResult) {
                newBox.classList.add("greenbox");
            }
            else {
                newBox.classList.add('redbox');
            }
            addAnimation(newBox);
            document.getElementById("strikes").appendChild(newBox);
        }

        else {

            clearChildren(document.getElementById("strikes"));

            const pitchResults = sessionInfo.status.strikes;

            pitchResults.forEach(result => {
                const newBox = document.createElement("div");
                newBox.style.animation = "slide-up 0.5s";
    
                if (!result) {

                    newBox.classList.add("greenbox");
                }
                else {
                    newBox.classList.add("redbox");
                }

                addAnimation(newBox);
                document.getElementById("strikes").appendChild(newBox);
            })
        }


        if (document.getElementById("strikes").style.display == "") {
            document.getElementById("strikes").style.display = "flex";
        }
    })
});

document.getElementById("guess").addEventListener("input", async (e) => {

    await getRelevantPlayerNames(e.target.value)
    .then((list) => {
        fillDropdownList(list);
    })
})