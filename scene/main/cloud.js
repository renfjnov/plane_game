class Cloud extends ObjectsWithImage {
    constructor(game, x, y) {
        super(game, x, y, 'cloud')
        this.speedY = 3
    }
    move() {
        this.y += this.speedY
    }
    update() {
        this.move()
    }
}

class Clouds {
    constructor(game) {
        this.game = game
        this.elements = []
        this.coolDown = 9
        this.creatCloud()
    }
    creatCloud() {
        let image = this.game.imageByName('cloud')
        let width = this.game.canvas.width -image.width
        let x = Math.floor(Math.random() * width)
        let y = Math.floor(Math.random() * -1000)
        let cloud = new Cloud(this.game, x, y)
        this.elements.push(cloud)
    }
    draw() {
        for (let e of this.elements) {
            e.draw()
        }
    }
    update() {
        this.coolDown --
        if (this.coolDown == 0) {
            this.creatCloud()
            this.coolDown = 50
        }
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            e.update()
            if (e.y > this.game.canvas.height) {
                this.elements.splice(i, 1)
            }
        }
    }
}