class Enemy extends ObjectsWithImage {
    constructor(game, x, y, lives) {
        super(game, x, y, 'enemy')
        this.lifes = lives
        this.alive = true
        this.speedY = 5
        this.coolDownConfig = 40
        this.coolDown = 0
        this.bullets = []
    }
    kill() {
        let o = this
        o.lifes --
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    move() {
        this.y += this.speedY
    }
    shoot() {
        if (this.coolDown !== 0) {
            this.coolDown--
            return
        }
        this.coolDown = this.coolDownConfig
        let x = this.x + this.w / 2
        let y = this.y
        let bullet = new EnemyBullet(this.game, x, y)
        return bullet
    }

    draw() {
        if (this.alive) {
            super.draw()
        }
        for (let b of this.bullets) {
            b.draw()
        }
    }
    update() {
        this.move()
    }
    killBullet(i) {
        this.bullets.splice(i, 1)
    }
}

class Enemies {
    constructor(game) {
        this.game = game
        this.elements = []
        this.bullets = []
        this.coolDown = 9
        this.createEnemies()
    }
    createEnemies() {
        let image = this.game.imageByName('enemy')
        let width = this.game.canvas.width -image.width
        let x = Math.floor(Math.random() * width)
        let y = Math.floor(Math.random() * -500)
        let enemy = new Enemy(this.game, x, y, 1)
        this.elements.push(enemy)
    }
    draw() {
        for (let e of this.elements) {
            e.draw()
        }
        for (let b of this.bullets) {
            b.draw()
        }
    }
    update() {
        this.coolDown --
        if (this.coolDown == 0) {
            this.createEnemies()
            this.coolDown = 30
        }
        for (let b of this.bullets) {
            b.update()
        }
        for (let i = 0; i < this.elements.length; i++) {
            let e = this.elements[i]
            e.update()
            let bullet = e.shoot()
            if (bullet) {
                this.bullets.push(bullet)
            }
            if (e.y > this.game.canvas.height || e.lifes === 0) {
                this.kill(i)
            }
        }
    }
    kill(i) {
        this.elements.splice(i, 1)
    }
    killBullet(i) {
        this.bullets.splice(i, 1)
    }
}