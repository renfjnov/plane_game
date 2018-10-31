class SceneMain extends Scene {
    init() {
        this.clouds = new Clouds(this.game)
        this.player = new Player(this.game)
        this.enemies = new Enemies(this.game)
        // this.particles = new Particles(this.game, 100, 200, 50)
        this.bg = new ObjectsWithImage(this.game, 0, 0, 'bg')
        this.addElement(this.bg, this.clouds, this.player, this.enemies)
        let self = this
        self.game.registerActions('a', function () {
            self.player.moveLeft()
        })

        self.game.registerActions('d', function () {
            self.player.moveRight()
        })

        self.game.registerActions('w', function() {
            self.player.moveUp()
        })
        self.game.registerActions('s', function() {
            self.player.moveDown()
        })
    }

    update() {
        if (paused) {
                return
        }
        super.update()
        let self = this
        for (let i = 0; i < self.enemies.bullets.length; i++) {
            let eb = self.enemies.bullets[i]

            if (self.player.alive && collide(eb, self.player)) {
                self.player.kill()
                let x = self.player.x + Math.floor(self.player.w / 2)
                let y = self.player.y + Math.floor(self.player.h / 2)
                let particles = new Particles(self.game, x, y, 100)
                self.addElement(particles)
                self.enemies.killBullet(i)
            }

            for (let k = 0; k < self.player.bullets.length; k++) {
                let pb = self.player.bullets[k]
                if (collide(eb, pb)) {
                    log('碰撞')
                    self.enemies.killBullet(i)
                    self.player.killBullet(k)
                    let x = (pb.x + eb.x) / 2
                    let y = (pb.y + eb.y) / 2
                    let particles = new Particles(self.game, x, y, 50)
                    self.addElement(particles)
                }
            }
        }

        for (let k= 0; k < self.enemies.elements.length ; k++) {
            let enemy = self.enemies.elements[k]
            for (let i = 0; i < self.player.bullets.length; i++) {
                let pb = self.player.bullets[i]
                if (collide(pb, enemy)) {
                    self.enemies.kill(k)
                    let x = enemy.x + Math.floor(enemy.w / 2)
	                let y = enemy.y + Math.floor(enemy.h / 2)
	                let particles = new Particles(self.game, x, y, 100)
                    self.addElement(particles)
                    self.player.killBullet(i)
                } else if (collide(self.player, enemy)) {
                    self.enemies.kill(k)
                    let x = enemy.x + Math.floor(enemy.w / 2)
	                let y = enemy.y + Math.floor(enemy.h / 2)
	                let particles = new Particles(self.game, x, y, 100)
                    self.addElement(particles)

                    self.player.kill()
                    let x1 = self.player.x + Math.floor(self.player.w / 2)
                    let y1 = self.player.y + Math.floor(self.player.h / 2)
                    let particles1 = new Particles(self.game, x1, y1, 100)
                    self.addElement(particles1)

                }
            }
        }

    }
}