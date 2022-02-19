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

/* 
    Got This From https://github.com/littlepriceonu/Phy.js/blob/main/Canvas%20Manager/main.js
    (Made It My Self)
*/

addEventListener("keydown", (e) => {if (e.key=="Enter" && document.getElementById("play")){
    document.getElementById("play").click()
}})

function start() {
    const canvasmanager = CanvasManager.createCanvasWithManager('canvas', 'canvas', [], true, false, 100, 'DimGray')

    addEventListener("resize", () => {
        canvasmanager.fullScreenCanvas()
    })

    var drawgrid = true;
    var moveyby = 0;
    var movexby = 10;

    function random(min, max) {
        return Math.round((Math.random() * (max-min) + min));
    }    

    function randomroundup(min, max) {
        return Math.round((Math.random() * (max-min) + min) / 10) * 10;
    }

    addEventListener("keydown", (e) => {
        if ((e.key == "w" || e.key == "ArrowUp") && moveyby != 10) {
            movexby = 0;
            moveyby = -10;
        }


        if ((e.key == "a" || e.key == "ArrowLeft") && movexby != 10) {
            movexby = -10;
            moveyby = 0;
        }

        if ((e.key == "d" || e.key == "ArrowRight") && movexby != -10) {
            movexby = 10;
            moveyby = 0;
        }

        if ((e.key == "s" || e.key == "ArrowDown") && moveyby != -10) {
            movexby = 0;
            moveyby = 10;
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
            apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)})
        }

        if (e.key == "r") {
            snuke = [{x:30, y:10}, {x: 20, y: 10}, {x: 10, y:10}, {x: 0, y:10}];// restart snake
            movexby = 10
            moveyby = 0
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

    canvasmanager.addCallBack((ctx) => {
        window.snuke = snuke;
        window.apples = apples;

        apples = window.apples;
        snuke = window.snuke;

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
                ctx.stroke();
            }

            for (let i=0; i<=Math.round(innerHeight/10)*10/10; i++) {
                ctx.fillStyle = "black";
                ctx.beginPath();
                ctx.moveTo(0, i*10);
                ctx.lineTo(innerWidth, i*10);
                ctx.stroke();
            }
        }
        // make sure snake doesn't have any placement errors
        snuke.forEach(part => {
            part.x = Math.round(part.x / 10) * 10 
        })

        let newhead = {x: snuke[0].x+movexby, y: snuke[0].y+moveyby} // make the new head of the snake

        // check for apple and death
        snuke.forEach(part => {
            apples.forEach(apple => {
                // check if snake part is at the same spot as the apple
                if (part.x == apple.x && part.y == apple.y) { 
                    snuke.push({x: snuke[snuke.length - 1].x-movexby, y: snuke[snuke.length - 1].y-moveyby}) // add to snake
                    apples.splice(apples.indexOf(apple), 1) // remove apple
                    apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}) // make a new apple
                    if (window.multipleapples && apples.length < 12) {
                        if (random(1, 3) == 3) {apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)})}
                        if (random(1, 3) >= 2) {apples.push({x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)})}
                    }
                }
            })

            // check if the head is at the same spot as the part
            if (newhead.x == part.x && newhead.y == part.y) {
                apples = [{x: randomroundup(0, innerWidth), y: randomroundup(0, innerHeight)}]; // make new apple
                console.log("dead. snuke:", snuke); // log the snake 
                snuke = [{x:30, y:10}, {x: 20, y: 10}, {x: 10, y:10}, {x: 0, y:10}];// restart snake
                movexby = 10
                moveyby = 0
                newhead = {x: snuke[0].x+movexby, y: snuke[0].y+moveyby} // Make it so the head is at the new restarted snake
            }
        })

        snuke.pop() // remove the last index in the array
        snuke.unshift(newhead) // add newhead to the front of the array
        // use snuke.push(item) to add to the end of the array

        apples.forEach(apple => {
            ctx.fillStyle = 'red';
            ctx.strokestyle = 'black';
            ctx.fillRect(apple.x, apple.y, 10, 10);
            ctx.strokeRect(apple.x, apple.y, 10, 10); 
        })
        // check for placement errors 2.0
        snuke.forEach(part => {
            part.y = Math.round(part.y / 10)*10
            part.x = Math.round(part.x / 10)*10
        })
        //move the snake when it hits the border
        snuke.forEach((part) => {
            if (part.x > innerWidth || part.x+10 > innerWidth) {part.x = 0}
            if (part.x < 0 || part.x+10 < 0) {part.x = innerWidth}
            if (part.y > innerHeight || part.y+10 > innerHeight) {part.y = 0}
            if (part.y <0 || part.y+10 < 0) {part.y = innerHeight}
        })
        // draw snuke
        snuke.forEach(part => {
            ctx.fillStyle = 'lightgreen';
            ctx.strokestyle = 'darkgreen';
            ctx.fillRect(part.x, part.y, 10, 10);
            ctx.strokeRect(part.x, part.y, 10, 10);
        })
    })

    canvasmanager.startUpdate()
}

document.getElementById("applebutton").checked = true

document.getElementById("play").onclick = ()=>{start(); window.multipleapples=document.getElementById("applebutton").checked; document.getElementById("snukeholder").remove();}