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
        for (let i = 0; i < this.enemies.elements.length; i++) {
            let e = this.enemies.elements[i]
            for (let j = 0; j < e.bullets.length ; j++) {
                let eb = e.bullets[j]
                if (collide(eb, this.player)) {
                    this.player.kill()
                    e.killBullet(j)
                }
                for (let k = 0; k < this.player.bullets.length; k++) {
                    let pb = this.player.bullets[k]
                    if (collide(pb, e)) {
                        this.enemies.kill(k)
                        this.player.killBullet(k)
                    } else if (collide(pb, eb)) {
                        e.killBullet(j)
                        this.player.killBullet(k)
                    }
                }
            }
        }

    }
}