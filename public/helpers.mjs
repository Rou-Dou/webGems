import { playerNames } from "./script.mjs";

export function decodeReadableStream(stream) {

    let reader = stream.body.getReader();   

    if (reader.locked) {
        reader.releaseLock()

        reader = stream.body.getReader();
    }

    let result = []

    return reader.read()
    .then(function readStream({done, value}) {

        if (done) {
            console.log("Reading Stream Complete");
            reader.releaseLock();
            return result[0];
        }

        result.push(value)

        // console.log("unfinished reader ---->", value)

        return reader.read().then(readStream);
    })
}

export function decodeuint8String(string) {
    return new TextDecoder().decode(string)
}

export function addAnimation(element) {

    if (!element.previousSibling) return;

    if (element.previousSibling.classList.contains("redbox") || element.previousSibling.classList.contains("greenbox")) {
        element.previousSibling.style.animation = "slide-left 0.5s";
        return;
    }
}

function fillAnswerWithListValue(text) {
    document.getElementById("guess").value = text
}

export function fillDropdownList(list) {
    let playerList = document.getElementById("playerNameList");

    console.log("the list --->", list)

    if (list.length == 0) {
        console.log("list length = 0");
        document.getElementById("playerNameDropdown").classList.add("hidden");
        clearChildren(playerList);
        return;
    }

    clearChildren(playerList);

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
    }
}

export function getRelevantPlayerNames(text) {
    console.log("this is the input text ---->", text);

    if (text == "") {
        return new Promise((resolve, reject) => {
            resolve([]);
        })
    }
    
    let playerNamesList = []
    const lowerCaseText = text.toLowerCase()

    return playerNames
    .then((value) => {
        const parsedList = JSON.parse(value)
        for (let p of parsedList) {
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

export function loadPlayer(session, playerIndex) {
    const playerInfoList = document.querySelectorAll(".playerInfoListItemContent")

    document.querySelector(".playerPicture").src = session.playersInfo[playerIndex].headshot

    for (let listItem of playerInfoList) {
        listItem.innerText = session.playersInfo[playerIndex][listItem.id]
    }

    return;
}