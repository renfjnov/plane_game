class SceneMain extends Scene {
    init() {
        this.clouds = new Clouds(this.game)
        this.player = new Player(this.game)
        this.enemies = new Enemies(this.game)
        // this.paddle = new Paddle(this.game)
        // this.ball = new Ball(this.game)
        // enableDebugMode(true, this.game, this.ball)
        // window.bricks = loadLevels(1, this.game)
        // this.pointTitle = new Label(this.game, 10, 290, '得分:')
        // this.pointLabel = new Label(this.game, 40, 290, 0)
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
        // this.ball.move()
        // if (collideX(this.ball, this.paddle)) {
        //     this.ball.bounceX()
        // }
        // if (collideY(this.ball, this.paddle)) {
        //     this.ball.bounceY()
        // }
        // for (let i = 0; i < bricks.length; i++) {
        //     let brick = bricks[i]
        //     if (brick.alive) {
        //         if (collideX(this.ball, brick)) {
        //             log('x', this.ball.x, brick.x)
        //             this.ball.bounceX()
        //             brick.kill()
        //             log('ddd', brick.lifes)
        //             this.pointLabel.text += 100
        //         }
        //
        //         if (collideY(this.ball, brick)) {
        //             log('y', this.ball.y, brick.y)
        //             this.ball.bounceY()
        //             brick.kill()
        //             this.pointLabel.text += 100
        //         }
        //     }
        // }
    //    游戏结束
    //     if (this.ball.y > this.paddle.y) {
    //         let s = new SceneEnd(this.game)
    //         this.game.replaceScene(s)
    //     }
    }
}