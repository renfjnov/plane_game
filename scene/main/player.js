class Player extends ObjectsWithImage {
    constructor(game) {
        log('init player')
        super(game, 150, 300, 'player')
        this.speed = 10
        this.life = 1
        this.bullets = []
        this.coolDownConfig = 9
        this.coolDown = 0
        this.alive = true
        this.shoot()
 }
    _move(x, y) {
        if (x < 0) {
            x = 0
        }
        if (x > 400 - this.w) {
            x = 400 - this.w
        }
        if (y < 0) {
            y = 0
        }
        if (y > 600 - this.h) {
            y = 600 - this.h
        }
        this.x = x
        this.y = y
    }
    moveLeft() {
        this._move(this.x - this.speed, this.y)
    }
    moveRight () {
        this._move(this.x + this.speed, this.y)
    }
    moveUp () {
        this._move(this.x, this.y - this.speed)
    }
    moveDown () {
        this._move(this.x, this.y + this.speed)
    }
    shoot() {
        if (this.life < 1) {
            return
        }
        if (this.coolDown !== 0) {
            this.coolDown--
            return
        }
        this.coolDown = this.coolDownConfig
        let x = this.x + this.w / 2
        let y = this.y
        let bullet = new Bullet(this.game, x, y)
        this.bullets.push(bullet)
    }
    update() {
        super.update()
        this.shoot()
        for (let i = 0; i < this.bullets.length; i++) {
            let b = this.bullets[i]
            b.update()
            if (b.y < 0) {
                this.killBullet(i)
            }
        }
    }
    draw() {
        if (this.life > 0) {
            super.draw()
        }
        for (let bullet of this.bullets) {
            bullet.draw()
        }
    }
    kill() {
        this.life--
        if (this.life <= 0) {
            this.alive = false
        }
    }
    killBullet(i) {
        this.bullets.splice(i, 1)
    }

}