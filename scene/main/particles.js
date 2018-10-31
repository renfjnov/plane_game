class Particle extends ObjectsWithImage {
    constructor(game, x, y, v, angle, ax, ay) {
        // position 是[x, y, lives]格式, todo 暂时只支持一条命
        super(game, x, y, 'particle')
	    let angleInRadian = angle / 180 * Math.PI
	    this.speedX = v * Math.sin(angleInRadian)
        this.speedY = v * Math.cos(angleInRadian)
	    this.ax = ax
	    this.ay = ay

    }
    move() {
        this.y += this.speedY
	    this.x += this.speedX
    }

    update() {
        this.move()
		this.speedX += this.ax
		this.speedY += this.ay
    }
}

class Particles {
	constructor(game, x, y, n) {
		this.numOfParticles = n
		this.game = game
		this.x = x
		this.y = y
		this.elements = []
		this.duration = 10
		this.generateParticles()

	}
	generateParticles() {
		for (let i = 0; i < this.numOfParticles; i++) {
			let angle = Math.floor(Math.random() * 360)
			let p = new Particle(
				this.game, this.x, this.y,
				config.particle_speed, angle, config.particle_ax, config.particle_ay
				)
			this.elements.push(p)
		}
	}
	update() {
		if (this.duration < 0){
			return
		}
		this.duration --
		for (let i = 0; i < this.elements.length; i++) {
			this.elements[i].update()
		}
	}
	draw() {
		if (this.duration < 0){
			return
		}
		for (let i = 0; i < this.elements.length; i++) {
			this.elements[i].draw()
		}
	}

}