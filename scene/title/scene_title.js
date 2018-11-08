/**
 * Created by djz on 2018/9/26.
 */
class StartButton extends ObjectsWithImage {
    constructor(game, x, y) {
        super(game, x, y, 'start_button')
    }
}

class EditorButton extends ObjectsWithImage {
    constructor(game, x, y) {
        super(game, x, y, 'editor_button')
    }
}


class SceneTitle extends Scene {
    init() {
        let self = this
        let startButton = new StartButton(this.game, 150, 100)
        self.addElement(startButton)
        window.addEventListener('click', function(event) {
            if (self.active) {
                if (isClicked(event, startButton)) {
                    log('debug', startButton)
                    let s = new SceneMain(self.game)
                    self.game.replaceScene(s)
                }
            }
        })
    }
}