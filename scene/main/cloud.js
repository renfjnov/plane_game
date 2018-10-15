class Cloud extends ObjectsWithImage {
    constructor(game) {
        super(game, 250, 0, 'cloud')
        this.speedY = 3
    }
    move() {
        this.y += this.speedY
    }
    update() {
        this.move()
    }
}