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

    if (!element.previousSibling.classList) return;

    if (element.previousSibling.classList.contains("redbox") || element.previousSibling.classList.contains("greenbox")) {
        element.previousSibling.style.animation = "slide-left 0.5s";
        return;
    }
}

function fillAnswerWithListValue(text) {
    document.getElementById("guess").value = text
}

export function fillDropdownList(list) {

    if (list.length == 0) {
        document.getElementById("playerNameDropdown").classList.add("hidden");
        return;
    }

    document.getElementById("playerNameList").innerHTML = ""

    list
    .then((value) => {

        document.getElementById("playerNameDropdown").classList.remove("hidden");

        for (let name of value) {
            let newListItem = document.createElement("li")
            newListItem.classList.add("playerNameListItem")
            document.getElementById("playerNameList").appendChild(newListItem);
            newListItem.innerText = name
            newListItem.addEventListener("click", (e) => {
                fillAnswerWithListValue(e.target.innerText);
                document.getElementById("playerNameDropdown").classList.add("hidden")
                document.getElementById("playerNameList").innerHTML = "";
            })
        }
    })
}

export function getRelevantPlayerNames(text) {
    console.log("this is the input text ---->", text);

    if (text == "") {
        return []
    }
    
    let playerNamesList = []
    const lowerCaseText = text.toLowerCase()

    return playerNames
    .then((value) => {
        // console.log("this is the decoded value ---->", JSON.parse(value));
        const parsedList = JSON.parse(value)
        for (let p of parsedList) {
            const pLowerCase = p.toLowerCase().replaceAll('"', "").replaceAll("[", "").replaceAll("]", "")
            if (pLowerCase.startsWith(lowerCaseText)) {
                playerNamesList.push(p.replaceAll('"',"").replaceAll("[", "").replaceAll("]", ""))
            }
        }
        // console.log("list of relevant player names ---->", playerNamesList);
        return playerNamesList;
    })
}
