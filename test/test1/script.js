class Scroll {
    constructor() {
        this.oldScrollY = window.scrollY
        this.scrollDir = null

        document.addEventListener("scroll", (event) => {
            if(this.oldScrollY < window.scrollY){
                this.scrollDir = true
            } else {
                this.scrollDir = false
            }
            this.oldScrollY = window.scrollY;
        }); 
    };
    getScrollDir() {
        /** 
        * returns true if scroll direction is down and false if scroll direction is up
        */
        return this.scrollDir
    }
};
const scrollObj = new Scroll()

// main scroll animasjon -------------------------------------------------
document.addEventListener("scroll", (event) => {
    cutDown = style => {
        return parseInt(style.slice(0, -2))
    }
    
    let elm 
    let style

    if (scrollObj.getScrollDir())
        // --------------------------------------------------------------
        elm = document.querySelector(".name")
        style = getComputedStyle(elm)
        if (cutDown(style.top) < 20) // num = text placement in y-axis
            elm.style.top = cutDown(style.top) + 3 + "px"
        if (cutDown(style.fontSize) >= 100) // num = text size
            elm.style.fontSize = cutDown(style.fontSize) - 2 + "px"
        // --------------------------------------------------------------

        // --------------------------------------------------------------
        elm = document.querySelector(".banner")
        style = getComputedStyle(elm) 
        if (cutDown(style.width) < 1050) // num = banner width
            elm.style.width = cutDown(style.width) + 22 + "px"
        if (cutDown(style.height) < 750) // num = banner height
            elm.style.height = cutDown(style.height) + 12 + "px"
        // --------------------------------------------------------------
}); 
