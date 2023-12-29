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
        this.levelShow.src = this.url
    }

    set_level(level) {
        this.level = level
        if (this.level > 9) {
            this.level = 9
        }
        this.url = "../icons/favicons/" + this.level + ".png"
        this.favicon.href = this.url
        this.levelShow.src = this.url
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
    clear_level() {
        localStorage.clear("Level")
        this.level = 1
        this.already_clicked = []
    }
}
lvlManager = new Level
//lvlManager.clear_level()


document.addEventListener(
    "scroll", 
    (event) => {
        tri = document.getElementById("up_triangle").style
        box = document.getElementById("flip_box").style
        if (window.scrollY > 2450) {
            tri.opacity = "1"
            box.transform = "rotateX(0deg)"
        } else {
            tri.opacity = "0"
            box.transform = "rotateX(120deg)"
        }
    }
)

document.addEventListener(
    "scroll", 
    (event) => {
        icon = document.getElementById("GameIconFooter")
        if (window.scrollY > 2650) {
            icon.play
            removeEventListener(this)
        } 
    }
)


levelUp = (where) => {
    if (!lvlManager.get_ac().includes(where)) {
        lvlManager.set_ac(where)
        lvlManager.set_level(lvlManager.get_level() + 1)
        
        elms = document.getElementsByClassName("levelUp")
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
load_patch_notes = () => {
    window.location.href="./patchNotes.html"
}
load_credits = () => {
    window.location.href="./credits.html"
}
load_shop = () => {
    window.location.href="./ashop.html"
}
load_about = () => {
    document.documentElement.scrollTop = 850
}
load_FAQ = () => {
    document.documentElement.scrollTop = 1950
}

change_dwn_img = (cond) => {
    img = document.getElementById("dwn_button_img")
    img.src = cond ? "../assets/shop_ui_buy_button_active.png" : "../assets/shop_ui_buy_button.png"
}

intent_dwn_text = () => {
    text = document.getElementById("dwn_button_text").style
    text.top = "-36px"
    setTimeout(() => {
        text.top = "-40px"
    }, 800)
}
/** 
c = 0
cc = true
setInterval(() => {
    elms = document.getElementsByClassName("question")
        if (cc) {
            for (let i = 0; i < elms.length; i++) {
                c++
                elms[i].style.boxShadow = "0px " + c + "px 0px 10px"
            }
            if (c > 60) {
                cc = false
            }
        } else {
            c--
            for (let i = 0; i < elms.length; i++) {
                elms[i].style.boxShadow = "0px " + c + "px 0px 10px"
            }
            if (c < 5) {
                cc = true
            }
        }
}, 10)
*/

openUp = (elm) => {
    elm.style.height = "100%"
}