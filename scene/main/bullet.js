class Bullet extends ObjectsWithImage {
    constructor(game, x, y) {
        super(game, x, y, 'bullet')
        this.speedY = -10
    }
    update() {
        this.y += this.speedY
    }
}

class EnemyBullet extends ObjectsWithImage {
    constructor(game, x, y) {
        super(game, x, y, 'bullet')
        this.speedY = 10
    }
    update() {
        this.y += this.speedY
    }
}