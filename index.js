// TODO
// Make color save in cookies. Make default color changeable?
// Make Settings Menu
// Add barriers that kill you?
// AI snake branch (just moves randomly) (maybe different difficulty (how often it moves))
// Timed Mode <---- !!!!!!!!!

window.isVaildColor = (strColor) => {
    const s = new Option().style;
    s.color = strColor;
    return s.color !== '';
}

var elementtochange1 = document.getElementById("snuke1color")
var texttochange1 = document.getElementById("snuke1colortext")

setInterval(()=>{
    if (isVaildColor(elementtochange1.value)) {
        elementtochange1.style.color = elementtochange1.value
        texttochange1.style.color = elementtochange1.value
    }
    if (elementtochange1.style.color.includes("light") || elementtochange1.style.color == "white") {
        elementtochange1.style.backgroundColor = "black"
        texttochange1.style.color = elementtochange1.value
    }
    else {
        elementtochange1.style.backgroundColor = "white"
        texttochange1.style.color = elementtochange1.value
    }
}, 1)

var elementtochange2 = document.getElementById("snuke2color")
var texttochange2 = document.getElementById("snuke2colortext")

setInterval(()=>{
    if (isVaildColor(elementtochange2.value)) {
        elementtochange2.style.color = elementtochange2.value
        texttochange2.style.color = elementtochange2.value
    }
    if (elementtochange2.style.color.includes("light") || elementtochange2.style.color == "white") {
        elementtochange2.style.backgroundColor = "black"
        texttochange2.style.color = elementtochange2.value
    }
    else {
        elementtochange2.style.backgroundColor = "white"
        texttochange2.style.color = elementtochange2.value
    }
}, 1)

var deathscreen = document.getElementById("deathscreen");

document.getElementById("deathscreen").style.display="none";

var snuke1color = document.getElementById("snuke1color");
var snuke1colorbutton = document.getElementById("snuke1button");

var snuke2color = document.getElementById("snuke2color");
var snuke2colorbutton = document.getElementById("snuke2button") ;

window.snuke1defaultcolor = 'lightgreen';
window.snuke2defaultcolor = 'lightblue';

window.snuke1currentcolor = 'lightgreen';
window.snuke2currentcolor = 'lightblue';

// yoinked from https://www.w3schools.com/js/js_cookies.asp
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

// yoinked from https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var timedmode = false;
window.timedmode = false;
document.getElementById("toggletimedmode").onclick = ()=>{
    if (timedmode) {
        document.getElementById("toggletimedmode").style.color = "red";
        timedmode = false;
        window.timedmode = false;
    }
    else {
        document.getElementById("toggletimedmode").style.color = "green";
        timedmode = true;
        window.timedmode = true;
    }

}
class CanvasManager {
    constructor (Canvas, updateCallBack, clearOnUpdate, paused, updateSpeed, fillStyle) {
        this.canvas = Canvas
        this.ctx = Canvas.getContext("2d");
        this.updatecallback = updateCallBack;
        this.clearonupdate = clearOnUpdate;
        this.paused = paused
        this.updatespeed = updateSpeed;
        this.fillstyle = fillStyle
    }

    worldUpdate() {
        if (!this.paused) {
            if (this.clearonupdate) {
                this.ctx.fillStyle = this.fillstyle
                this.ctx.clearRect(0, 0, innerWidth, innerHeight)
                this.ctx.fillRect(0, 0, innerWidth, innerHeight);
                
            }

            for (let i=0; i < this.updatecallback.length; i++) {
                this.updatecallback[i](this.ctx)
            }
        }
    }

    startUpdate() {
        setInterval(this.worldUpdate.bind(this), this.updatespeed);
    }

    addCallBack (func) {
        this.updatecallback.push(func)
    }

    fullScreenCanvas() {
        this.canvas.height = window.innerHeight
        this.canvas.width = window.innerWidth
    }

    removeCallBack(index) {
        this.updatecallback = this.updatecallback.filter(element => element != this.updatecallback[index])
    }

    static createCanvasWithManager(className, id, updateCallBack, clearOnUpdate, paused, updateSpeed, fillStyle) {
        let canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        canvas.width = innerWidth
        canvas.height = innerHeight
        canvas.id = id
        canvas.className = className
        return new CanvasManager(canvas, updateCallBack, clearOnUpdate, paused, updateSpeed, fillStyle)
    }

    static createPlainCanvas(className, id) {
        let canvas = document.createElement('canvas')
        document.body.appendChild(canvas)
        canvas.width = innerWidth
        canvas.height = innerHeight
        canvas.id = id
        canvas.className = className
    }
}

class CanvasImage {
    constructor (src, width, height, x, y) {
        this.image = new Image(width, height);
        this.image.src = src;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
    }

    changeImage (src) {
        this.image.src = src
    }

    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    drawxy(ctx, x, y) {
        ctx.drawImage(this.image, x, y, this.width, this.height)
    }
}

/* 
    Got This From https://github.com/littlepriceonu/Phy.js/blob/main/Canvas%20Manager/main.js
    (Made It My Self)
*/

addEventListener("keydown", (e) => {if (e.key=="Enter" && document.getElementById("play")){
    document.getElementById("play").click()
}})

function start() {
    if (timedmode) {
        document.getElementById("overlay").style.display = "flex"
        var time = document.getElementById("time");
        window.timeintervalstarted = true
        var timeinterval = setInterval(() => {
            window.timeintervalstarted = true
            if (!parseInt(time.innerText) == 0) {
                time.innerText = (parseInt(time.innerText)-1).toString()
            }
            else {
                snuke = [{x:30, y:10}, {x: 20, y: 10}, {x: 10, y:10}, {x: 0, y:10}];// restart snake
                snuke2 = [{x:30, y:900}, {x: 20, y: 900}, {x: 10, y:900}, {x: 0, y:900}]
                movexby = 10
                moveyby = 0
                movexby2 = 10
                moveyby2 = 0
                inputhandled = false;
                inputhandled2 = false;
                canvasmanager.paused = true;
                deathscreen.style.display = "flex";
                document.getElementById("overlay").style.display = "none"
                document.getElementById("time").innerText = "150"
                clearInterval(timeinterval);
                window.timeintervalstarted = false;
            }
        }, 1000);
    }

    if(window.isVaildColor(snuke2color.value)) {
        window.snuke2currentcolor = snuke2color.value;
    }
    else {
        window.snuke2currentcolor = window.snuke2defaultcolor;
    }

    if(window.isVaildColor(snuke1color.value)) {
        window.snuke1currentcolor = snuke1color.value;
    }
    else {
        window.snuke1currentcolor = window.snuke1defaultcolor;
    }

    var canvasmanager = CanvasManager.createCanvasWithManager('canvas', 'canvas', [], true, false, 100, 'DimGray')

    addEventListener("resize", () => {
        canvasmanager.fullScreenCanvas()
    })

    var drawgrid = true;
    var moveyby = 0;
    var movexby = 10;
    var moveyby2 = 0;
    var movexby2 = 10;

    function random(min, max) {
        return Math.round((Math.random() * (max-min) + min));
    }    

    function randomroundup(min, max) {
        return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }

    var inputhandled = false;
    var inputhandled2 = false;

    addEventListener("keydown", (e) => {
        if (!window.multiplayer) {
            if (!inputhandled) {
                if ((e.key == "w" || e.key == "ArrowUp") && moveyby != 10) {
                    movexby = 0;
                    moveyby = -10;
                    inputhandled = true;
                }
            

                if ((e.key == "a" || e.key == "ArrowLeft") && movexby != 10) {
                    movexby = -10;
                    moveyby = 0;
                    inputhandled = true;
                }

                if ((e.key == "d" || e.key == "ArrowRight") && movexby != -10) {
                    movexby = 10;
                    moveyby = 0;
                    inputhandled = true;
                }

                if ((e.key == "s" || e.key == "ArrowDown") && moveyby != -10) {
                    movexby = 0;
                    moveyby = 10;
                    inputhandled = true;
                }
            }
        }

        else {
            if (!inputhandled) {
                if ((e.key == "w") && moveyby != 10) {
                    movexby = 0;
                    moveyby = -10;
                    inputhandled = true;
                }
            

                if ((e.key == "a") && movexby != 10) {
                    movexby = -10;
                    moveyby = 0;
                    inputhandled = true;
                }

                if ((e.key == "d") && movexby != -10) {
                    movexby = 10;
                    moveyby = 0;
                    inputhandled = true;
                }

                if ((e.key == "s") && moveyby != -10) {
                    movexby = 0;
                    moveyby = 10;
                    inputhandled = true;
                }
            }

            if (!inputhandled2) {
                if ((e.key == "ArrowUp") && moveyby2 != 10) {
                    movexby2 = 0;
                    moveyby2 = -10;
                    inputhandled2 = true;
                }
            

                if ((e.key == "ArrowLeft") && movexby2 != 10) {
                    movexby2 = -10;
                    moveyby2 = 0;
                    inputhandled2 = true;
                }
                if ((e.key == "ArrowRight") && movexby2 != -10) {
                    movexby2 = 10;
                    moveyby2 = 0;
                    inputhandled2 = true;
                }

                if ((e.key == "ArrowDown") && moveyby2 != -10) {
                    movexby2 = 0;
                    moveyby2 = 10;
                    inputhandled2 = true;
                }
            }
        }

        if (e.key == "Escape") {
            if (!canvasmanager.paused) {
                canvasmanager.paused = true;
                document.querySelector("#pausedtext").style.display = "block";
            }
            else {
                canvasmanager.paused = false;
                document.querySelector("#pausedtext").style.display = "none"
            }
        }

        if (e.key == "q") {
            if (window.multipleapples) {
                apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)})
            }
            else {
                apples = [{x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}]
            }
        }

        if (e.key == "r") {
            snuke = [{x:30, y:10}, {x: 20, y: 10}, {x: 10, y:10}, {x: 0, y:10}];// restart snake
            snuke2 = [{x:30, y:900}, {x: 20, y: 900}, {x: 10, y:900}, {x: 0, y:900}]
            movexby2 = 10
            moveyby2 = 0
            movexby = 10
            moveyby = 0
            if (timedmode) {
                document.getElementById("overlay").style.display = "flex"
                document.getElementById("time").innerText = "150"
            }
            apples = [{x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}];
        }

        if (e.key == "e") {
            if (drawgrid) {
                drawgrid = false
            }
            else {
                drawgrid = true
            }
        }
    })

    var apples = [{x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}]

    console.log(apples)


    var snuke = [{x:30, y:10}, {x: 20, y: 10}, {x: 10, y:10}, {x: 0, y:10}]
    var snuke2 = [{x:30, y:270}, {x: 20, y: 270}, {x: 10, y:270}, {x: 0, y:270}]
    

    canvasmanager.addCallBack((ctx) => {
        if (timedmode) {
            if (!window.timeintervalstarted) {
                window.timeintervalstarted = true
                var timeinterval = setInterval(() => {
                    window.timeintervalstarted = true
                    if (!parseInt(time.innerText) == 0) {
                        time.innerText = (parseInt(time.innerText)-1).toString()
                    }
                    else {
                        snuke = [{x:30, y:10}, {x: 20, y: 10}, {x: 10, y:10}, {x: 0, y:10}];// restart snake
                        snuke2 = [{x:30, y:900}, {x: 20, y: 900}, {x: 10, y:900}, {x: 0, y:900}]
                        movexby = 10
                        moveyby = 0
                        movexby2 = 10
                        moveyby2 = 0
                        inputhandled = false;
                        inputhandled2 = false;
                        canvasmanager.paused = true;
                        deathscreen.style.display = "flex";
                        document.getElementById("overlay").style.display = "none"
                        document.getElementById("time").innerText = "150"
                        clearInterval(timeinterval);
                        window.timeintervalstarted = false;
                    }
                }, 1000)
            }
        }
        window.snuke = snuke;
        window.snuke2 = snuke2;
        window.apples = apples;
        window.canvasmanager = canvasmanager;

        canvasmanager = window.canvasmanager;
        apples = window.apples;
        snuke2 = window.snuke2;
        snuke = window.snuke;

        // make sure apples dont got them placement errors
        apples.forEach((apple) => {
            if (apple.x + 10 > innerWidth) {
                let newapple = {x: apple.x-10, y:apple.y}
                apples[apples.indexOf(apple)] = newapple
            }

            if (apple.y + 10 > innerHeight) {
                let newapple = {x: apple.x, y:apple.y-10}
                apples[apples.indexOf(apple)] = newapple
            }
        })

        // draw lines 
        if (drawgrid) {
            for (let i=0; i<=Math.round(innerWidth/10)*10/10; i++) {
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.moveTo(i*10,0);
                ctx.lineTo(i*10, innerHeight);
                ctx.strokeStyle = "black";
                ctx.stroke();
            }

            for (let i=0; i<=Math.round(innerHeight/10)*10/10; i++) {
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.moveTo(0, i*10);
                ctx.lineTo(innerWidth, i*10);
                ctx.strokeStyle = "black";
                ctx.stroke();
            }
        }
        // make sure snake doesn't have any placement errors
        snuke.forEach(part => {
            part.x = Math.round(part.x / 10) * 10 
        })

        let newhead = {x: snuke[0].x+movexby, y: snuke[0].y+moveyby} // make the new head of the snake
        let newhead2 = {x: snuke2[0].x+movexby2, y: snuke2[0].y+moveyby2}

        inputhandled = false;
        inputhandled2 = false;

        // check for apple and death
        snuke.forEach(part => {
            snuke2.forEach(part2 => {
                if (!window.multiplayer) {
                    apples.forEach(apple => {
                        // check if snake part is at the same spot as the apple
                        if (part.x == apple.x && part.y == apple.y) { 
                            snuke.push({x: snuke[snuke.length - 1].x-movexby, y: snuke[snuke.length - 1].y-moveyby}) // add to snake
                            apples.splice(apples.indexOf(apple), 1) // remove apple
                            if (window.multipleapples) {
                                if (apples.length < 12) {
                                    apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}) // make a new apple
                                    if (random(1, 3) == 3) {apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)})}
                                    if (random(1, 3) >= 2) {apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)})}
                                }
                            }
                            else {
                                apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}) // make a new apple
                            }
                        }
                    })

                    // check if the head is at the same spot as the part
                    if (newhead.x == part.x && newhead.y == part.y) {
                        apples = [{x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}]; // make new apple
                        if (timedmode) {
                            document.getElementById("overlay").style.display = "none"
                            document.getElementById("time").innerText = "150"
                        }
                        console.log("dead. snuke:", snuke); // log the snake 
                        if (getCookie("bestscore") != '' && (snuke.length-4) < parseInt(getCookie("bestscore"))) {
                            document.getElementById("bestscore").textContent ="Your Best Score: "+getCookie("bestscore")
                        }
                        else {
                            setCookie("bestscore", (snuke.length-4).toString(), 365)
                            document.getElementById("bestscore").textContent ="Your Best Score: "+getCookie("bestscore")
                        }

                        document.getElementById("score").textContent = "Your Score: " + (snuke.length-4).toString();
                        snuke = [{x:30, y:10}, {x: 20, y: 10}, {x: 10, y:10}, {x: 0, y:10}];// restart snake
                        movexby = 10
                        moveyby = 0
                        newhead = {x: snuke[0].x+movexby, y: snuke[0].y+moveyby} // Make it so the head is at the new restarted snake
                        canvasmanager.paused = true;
                        deathscreen.style.display = "flex";
                    }
                }

                else {
                    apples.forEach(apple => {
                        // check if snake part is at the same spot as the apple
                        if (part.x == apple.x && part.y == apple.y) { 
                            snuke.push({x: snuke[snuke.length - 1].x-movexby, y: snuke[snuke.length - 1].y-moveyby}) // add to snake
                            apples.splice(apples.indexOf(apple), 1) // remove apple
                            if (window.multipleapples) {
                                if (apples.length < 12) {
                                    apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}) // make a new apple
                                    if (random(1, 3) == 3) {apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)})}
                                    if (random(1, 3) >= 2) {apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)})}
                                }
                            }
                            else {
                                apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}) // make a new apple
                            }
                        }

                        if (part2.x == apple.x && part2.y == apple.y) { 
                            snuke2.push({x: snuke[snuke.length - 1].x-movexby, y: snuke[snuke.length - 1].y-moveyby}) // add to snake
                            apples.splice(apples.indexOf(apple), 1) // remove apple
                            if (window.multipleapples) {
                                if (apples.length < 12) {
                                    apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}) // make a new apple
                                    if (random(1, 3) == 3) {apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)})}
                                    if (random(1, 3) >= 2) {apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)})}
                                }
                            }
                            else {
                                apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}) // make a new apple
                            }
                        }
                    })

                    // check if the head is at the same spot as the part
                    if ((newhead.x == part.x && newhead.y == part.y) || (newhead.x == part2.x && newhead.y == part2.y) || (newhead2.x == part.x && newhead2.y == part.y) || (newhead2.x == part2.x && newhead2.y == part2.y)) {
                        apples = [{x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}]; // make new apple
                        console.log("dead. snuke:", snuke); // log the snake 
                        console.log("dead. snuke2:", snuke2)
                        if (timedmode) {
                            document.getElementById("overlay").style.display = "none"
                        }
                        if (!window.multiplayer) {
                            if (getCookie("bestscore") != '' && (snuke.length-4) < parseInt(getCookie("bestscore"))) {
                                document.getElementById("bestscore").textContent ="Your Best Score: "+getCookie("bestscore")
                            }
                            else {
                                setCookie("bestscore", (snuke.length-4).toString(), 365)
                                document.getElementById("bestscore").textContent ="Your Best Score: "+getCookie("bestscore")
                            }
                            document.getElementById("score").textContent = "Your Score: " + (snuke.length-4).toString();
                        }
                        else {
                            if ((snuke.length-4) > (snuke2.length-4)) {document.getElementById("bestscore").textContent ="Snuke 1 Wins With A Score Of: " + (snuke.length-4)}
                            else if ((snuke.length-4) < (snuke2.length-4)) {document.getElementById("bestscore").textContent ="Snuke 2 Wins With A Score Of " + (snuke2.length-4)}
                            else {document.getElementById("bestscore").textContent ="Tie! You Both Got The Same Score"}
                            document.getElementById("score").textContent = "Snuke 1 Score: " + (snuke.length-4).toString() + "; Snuke 2 Score: " + (snuke2.length-4).toString()
                        }
                        snuke = [{x:30, y:10}, {x: 20, y: 10}, {x: 10, y:10}, {x: 0, y:10}];// restart snake
                        snuke2 = [{x:30, y:900}, {x: 20, y: 900}, {x: 10, y:900}, {x: 0, y:900}]
                        movexby = 10
                        moveyby = 0
                        movexby2 = 10
                        moveyby2 = 0
                        inputhandled = false;
                        newhead = {x: snuke[0].x+movexby, y: snuke[0].y+moveyby}
                        newhead2 = {x: snuke2[0].x+movexby2, y: snuke2[0].y+moveyby2} // Make it so the head is at the new restarted snake
                        canvasmanager.paused = true;
                        deathscreen.style.display = "flex";
                        document.getElementById("time").innerText = "150"
                    }
                }
            })
        })

        snuke.pop() // remove the last index in the array
        snuke.unshift(newhead) // add newhead to the front of the array

        snuke2.pop()
        snuke2.unshift(newhead2)
        // use snuke.push(item) to add to the end of the array
        //draw apples
        apples.forEach(apple => {
            ctx.fillStyle = 'red';
            ctx.strokeStyle = 'black';
            ctx.fillRect(apple.x, apple.y, 10, 10);
            ctx.strokeRect(apple.x, apple.y, 10, 10); 
        })
        // check for placement errors 2.0
        if (window.multiplayer) {
            snuke2.forEach(part => {
                part.y = Math.round(part.y / 10)*10
                part.x = Math.round(part.x / 10)*10
            })
        }

        snuke.forEach(part => {
            part.y = Math.round(part.y / 10)*10
            part.x = Math.round(part.x / 10)*10
        })

        //move the snake when it hits the border
        if (window.multiplayer) {
            snuke2.forEach((part) => {
                if (part.x > innerWidth || part.x-10 > innerWidth) {part.x = 0}
                if (part.x < 0 || part.x+10 < 0) {part.x = innerWidth}
                if (part.y > innerHeight || part.y+10 > innerHeight) {part.y = 0}
                if (part.y <0 || part.y+10 < 0) {part.y = innerHeight}
            })
        }

        snuke.forEach((part) => {
            if (part.x > innerWidth || part.x-10 > innerWidth) {part.x = 0}
            if (part.x < 0 || part.x+10 < 0) {part.x = innerWidth}
            if (part.y > innerHeight || part.y+10 > innerHeight) {part.y = 0}
            if (part.y <0 || part.y+10 < 0) {part.y = innerHeight}
        })

        // draw snuke
        if (window.multiplayer) {
            snuke2.forEach(part => {
                ctx.fillStyle = window.snuke2currentcolor;
                ctx.strokeStyle = 'darkgreen';
                ctx.fillRect(part.x, part.y, 10, 10);
                ctx.strokeRect(part.x, part.y, 10, 10);
            })
        }

        snuke.forEach(part => {
            ctx.fillStyle = window.snuke1currentcolor;
            ctx.strokeStyle = 'darkgreen';
            ctx.fillRect(part.x, part.y, 10, 10);
            ctx.strokeRect(part.x, part.y, 10, 10);
        })
    })

    document.getElementById("retry").onclick = ()=>{
        canvasmanager.paused = false;
        deathscreen.style.display = "none";
        document.getElementById("overlay").style.display = "flex"
        timedmode
    }

    canvasmanager.startUpdate()
}

document.getElementById("applebutton").checked = true

document.getElementById("quit").onclick = ()=>{
    window.canvasmanager.canvas.remove();
    var canvasmanager = undefined;
    deathscreen.style.display = "none";
    document.getElementById("snukeholder").style.display="flex";
}

document.getElementById("pausedtext").onclick = ()=>{
    window.canvasmanager.canvas.remove();
    var canvasmanager = undefined;
    document.getElementById("pausedtext").style.display="none";
    document.getElementById("snukeholder").style.display="flex";
}

document.getElementById("play").onclick = ()=>{start();window.multiplayer=document.getElementById("multibutton").checked; window.multipleapples=document.getElementById("applebutton").checked; document.getElementById("snukeholder").style.display="none";}