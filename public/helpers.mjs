import { playerNames } from "./script.mjs";
import { url } from "./script.mjs"
import { getSession } from "./script.mjs"
import { token } from "./script.mjs"

export function decodeuint8String(string) {
    return new TextDecoder().decode(string);
}

export function addAnimation(element) {

    let prevSibling = element.previousSibling;

    if (!prevSibling) return;

    if (prevSibling.classList.contains("redbox") || prevSibling.classList.contains("greenbox")) {
        prevSibling.style.animation = "slide-left 0.5s";
        return;
    }
}

function fillAnswerWithListValue(text) {
    document.getElementById("guess").value = text;
}

export function fillDropdownList(list) {
    let playerList = document.getElementById("playerNameList");
    clearChildren(playerList);
    
    if (list.length == 0) {
        document.getElementById("playerNameDropdown").classList.add("hidden");
        return;
    }

    document.getElementById("playerNameDropdown").classList.remove("hidden");
    const playerNameList = document.getElementById("playerNameList")

    for (let name of list) {
        let newListItem = document.createElement("li")
        newListItem.classList.add("playerNameListItem")
        newListItem.innerText = name
        playerNameList.appendChild(newListItem);

        newListItem.addEventListener("click", (e) => {
            fillAnswerWithListValue(e.target.innerText);
            document.getElementById("playerNameDropdown").classList.add("hidden")
            clearChildren(playerList);
        })

        newListItem.addEventListener("mouseover", (e) => {
            fillAnswerWithListValue(e.target.innerText);
            e.target.classList.add("listItemHover");
        })

        newListItem.addEventListener("mouseleave", (e) => {
            document.getElementById("guess").innerText = "";
            e.target.classList.remove("listItemHover");
        })
    }
}

export async function getRelevantPlayerNames(text) {
    if (text == "") {
        return new Promise((resolve, reject) => {
            resolve([]);
        })
    }
    
    let playerNamesList = []
    const lowerCaseText = text.toLowerCase()

    return playerNames
    .then((value) => {
        for (let p of value) {
            const pLowerCase = p.toLowerCase()
            if (pLowerCase.startsWith(lowerCaseText)) {
                playerNamesList.push(p)
            }
        }
        return playerNamesList;
    })
}

export function clearChildren (parent) {
    if (!parent.hasChildNodes()) {
        return;
    }

    while (parent.firstChild) {
        parent.removeChild(parent.lastChild);
    }

    return;
}

export function loadPlayer() {
    fetch(`${url}${getSession}/${token}`, {method: "GET"})
    .then((value) => {
        return value.json()
    })
    .then((session) => {
        const playerInfoList = document.querySelectorAll(".playerInfoListItemContent");
        const playerIndex = session.curPlayer;
        console.log("the player index ---->", playerIndex);

        document.querySelector(".playerPicture").src = session.playersInfo[playerIndex].headshot;

        for (let listItem of playerInfoList) {
            listItem.innerText = session.playersInfo[playerIndex][listItem.id]
        }

    })
}

export function childHasClass(parent, className) {
    for (let child of parent){
        if (child.classList.contains(className) && child != parent.lastChild) {
            return {
                found: true,
                childElement: child
            }
        }
    }
    return {
        found: false,
        childElement: null 
    }
}

export function selectListItem(child, className, direction) {
    if (direction === "down") {
        child.classList.remove(className);
        child.nextSibling.classList.add(className);
        fillAnswerWithListValue(child.nextSibling.innerText)
    }

    else if (direction === "up") {

        child.classList.remove(className);
        child.previousSibling.classList.add(className);
        fillAnswerWithListValue(child.previousSibling.innerText)
    }

    return true;
}