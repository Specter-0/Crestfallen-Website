class Level {
    constructor() {
        if ((this.level = this.get_level_localstorage()) == null) {
            this.level = 1
        } 
        else if (this.level > 9) {
            this.level = 1
        } 
        if ((this.already_clicked = this.get_ac_localstorage()) == null) {
            this.already_clicked = []
        } 
        this.favicon = document.getElementById('favicon')
        this.levelShow = document.getElementById("level_show")
        this.url = "../icons/favicons/" + this.level + ".png"
        this.favicon.href = this.url
    }

    set_level(level) {
        this.level = level
        if (this.level > 9) {
            this.level = 9
        }
        this.url = "../icons/favicons/" + this.level + ".png"
        this.favicon.href = this.url
        this.set_localstorage()
    }
    set_ac(item) {
        this.already_clicked.push(item)
    }
    get_level() {
        return this.level
    }
    get_ac() {
        return this.already_clicked
    }
    get_href() {
        return this.favicon.href
    }

    set_localstorage() {
        localStorage.setItem("Level", this.level)
        localStorage.setItem("already_clicked", this.already_clicked)
    }
    get_level_localstorage() { 
        return localStorage.getItem("Level")
    }
    get_ac_localstorage() { // ac = already_clicked
        return localStorage.getItem("already_clicked")
    }
}
const lvlManager = new Level


levelUp = (where) => {
    if (!lvlManager.get_ac().includes(where)) {
        lvlManager.set_ac(where)
        lvlManager.set_level(lvlManager.get_level() + 1)
        
        let elms = document.getElementsByClassName("levelUp")
        for (let i = 0; i < elms.length; i++) {
            console.log(elms[i].getAttribute("data"))
            if (elms[i].getAttribute("data") == where) {
                elms[i].style.cursor = "default"
                c = 1
                if (where != "Specter"){
                    intr = setInterval(() => {
                        console.log(elms[i].style.width, c)
                        c++
                        elms[i].style.width = c + "%"
                    }, 20)
                    setTimeout(() => {
                        clearInterval(intr)
                        elms[i].style.visibility = "hidden"
                        elms[i].style.width = "1px"
                    }, 300)
                }
            }
        }
    } 
}

to_top = () => {
    document.documentElement.scrollTop = 0
}

load_index = () => {
    if (window.location.href == "http://127.0.0.1:5500/app/index.html") {
        to_top()
    } else {
        window.location.href="./index.html"
    }
}
load_about = () => {
    document.documentElement.scrollTop = 850
}
load_FAQ = () => {
    document.documentElement.scrollTop = 1950
}

openUp = (elm) => {
    if (elm.style.height != "100%") {
        elm.parentNode.style.width = "1600px"
        elm.style.height = "100%"
    } else {
        elm.parentNode.style.width = "1200px"
        set_height()
    }
}

set_height = () => {
    let elms = document.getElementsByClassName("notes-h1")
    for (let i = 0; i < elms.length; i++) {
        elms[i].parentNode.style.height = elms[i].offsetHeight + 10 + "px"
    }
}; set_height()


let build = []
let buildName = null

check_mode = (select, parent) => {
    collection = parent.getElementsByTagName("input")
    for (let i = 0; i < collection.length; i++) {
        if (collection[i].name == "Title") { 
            buildName = collection[i].value
            continue
        }
        collection[i].remove()
    }
    create_input = (type) => {
        const input = document.createElement("input")
        input.type = type == "text" ? "text" : "file"
       
        if (type == "Image" || type == "Video") {
            input.oninput = function() {add_note_elm(this, type)}
            parent.appendChild(input)
        } else {
            input.placeholder = "Text"
            const submit = document.createElement("input")
            submit.value = "Submit"
            submit.type = "button"
            submit.onclick = function() {add_note_elm(input, type)}
            parent.appendChild(input)
            parent.appendChild(submit)
        }
    }
    switch(select.value) {
        case "Line":
            create_input("text")
            break
        case "Image":
            create_input("Image")
            break
        case "Video":
            create_input("Video")
            break
    }
}

show_create_note = () => {
    let elm = document.getElementById("createNoteDiv")
    elm.style.visibility = elm.style.visibility == "hidden" ? elm.style.visibility = "visible" : elm.style.visibility = "hidden"
}; show_create_note()

add_note_elm = (input, type) => {
    const para = document.createElement("p")
    const node = document.createTextNode(input.value)
    para.appendChild(node)
    const div = document.getElementById("toBeAdded")
    div.appendChild(para)
    
    build.push([input.value, type])
    
    input.value = ''
}

build_note = () => {
    let ul = document.getElementById("ul-contain")
    let li = document.createElement("li")
    let h1 = document.createElement("h1")
    let div = document.createElement("div")

    li.onclick = function() {openUp(this)}
    h1.classList.add("notes-h1")
    div.classList.add("content")

    for (let i = 0; i < build.length; i++) {
        console.log(build[i][0], build[i][1])
        if (build[i][1] == "text") {
            p = document.createElement("p")
            p.appendChild(document.createTextNode(build[i][0]))
            div.appendChild(p)
        }
        else if (build[i][1] == "Image") {
            image = document.createElement("image")
            image.width = "400px"
            image.src = build[i][0]
            image.alt = build[i][0]
            div.appendChild(image)
        } else { // aka Video
            video = document.createElement("video")
            video.width = "400px"
            video.src = build[i][0]
            video.alt = build[i][0]
            div.appendChild(video)
        }
    }

    h1.appendChild(document.createTextNode(buildName))
    li.appendChild(h1);
    li.appendChild(div);
    ul.appendChild(li);
    console.log(build)
    build = []
    show_create_note()
}