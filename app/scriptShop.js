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

//import items from './shopItems.json' assert { type: 'json' }

class Item {
    constructor(name, icon, description, cost) {
        this.name = name
        this.icon = icon
        this.description = description
        this.cost = cost
        if ((this.bought = localStorage.getItem(this.name + "bought")) != null) {
            this.bougth = false
            localStorage.setItem(this.name + "bought", this.bougth)
        }
    }
}

class Doc {
    constructor() {
        this.shop = document.getElementById("shop")
        this.card = this.shop.querySelector('.card')
        this.card_imgs = this.card.getElementsByClassName('icons')
        this.dscr = this.shop.querySelector('.dscr')
        this.dscr_li = this.dscr.getElementsByTagName('li')
        this.parents_li = []
    }
}
const doc = new Doc

set_items = () => {
    fetch("./shopItems.json")
        .then(response => response.json())
        .then(json => json["items"])
        .then(items => {
            for (i = 0; i < 3; i++) {
                let index = Math.floor(Math.random() * items.length)
                const item = new Item(items[index][0], "../icons/items/" + items[index][0] + ".png", items[index][1], items[index][2])
            
                doc.card_imgs[i].src = item.icon
                doc.card_imgs[i].alt = item.name

                doc.dscr_li[i].getElementsByTagName('h1')[0].style.fontSize = item.name.length >= 22 ? "18px" : item.name.length >= 16 ? "22px" : "26px"
                doc.dscr_li[i].getElementsByTagName('h1')[0].textContent = item.name
                doc.dscr_li[i].getElementsByTagName('p')[0].style.fontSize = item.description.length >= 100 ? "17px" : item.description.length >= 120 ? "15px" : "20px"
                doc.dscr_li[i].getElementsByTagName('p')[0].textContent = item.description
                doc.dscr_li[i].getElementsByTagName('h2')[0].textContent = item.cost
            }
        })
}; set_items()

refresh = () => {
    for (i = 0; i < doc.parents_li.length; i++) {
        doc.parents_li[i].style.visibility = "visible"
    }
    for (i = 0; i < 3; i++) {
        doc.card.getElementsByTagName("li")[i].style.visibility = "visible"
        doc.dscr.getElementsByTagName("li")[i].style.visibility = "visible"
    }
}

change_dwn_img = (cond, parent) => {
    collection = parent.getElementsByTagName("img")
    img = collection[0]
    img.src = cond ? "../assets/shop_ui_buy_button_active.png" : "../assets/shop_ui_buy_button.png"
}

intent_dwn_text = (parent) => {
    doc.parents_li.push(parent)
    text = parent.getElementsByTagName("h1")[0]
    text.style.top = "2px"
    setTimeout(() => {
        text.style.top = "0px"
    }, 600)

    doc.card.getElementsByTagName("li")[parseInt(text.getAttribute("data"))].style.visibility = "hidden"
    doc.dscr.getElementsByTagName("li")[parseInt(text.getAttribute("data"))].style.visibility = "hidden"
    parent.style.visibility = "hidden"
}



