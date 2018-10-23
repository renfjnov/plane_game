class SceneMain extends Scene {
    init() {
        this.clouds = new Clouds(this.game)
        this.player = new Player(this.game)
        this.enemies = new Enemies(this.game)
        this.addElement(this.clouds, this.player, this.enemies)
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

            if (collide(eb, self.player)) {
                self.player.kill()
                self.enemies.killBullet(i)
            }

            for (let k = 0; k < self.player.bullets.length; k++) {
                let pb = self.player.bullets[k]
                if (collide(eb, pb)) {
                    log('碰撞')
                    self.enemies.killBullet(i)
                    self.player.killBullet(k)
                }
            }
        }

        for (let k= 0; k < self.enemies.elements.length ; k++) {
            let enemy = self.enemies.elements[k]
            for (let i = 0; i < self.player.bullets.length; i++) {
                let pb = self.player.bullets[i]
                if (collide(pb, enemy)) {
                    self.enemies.kill(k)
                    self.player.killBullet(i)
                } else if (collide(self.player, enemy)) {
                    self.enemies.kill(k)
                    self.player.kill()
                }

            }
        }

    }
}