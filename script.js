class Intro extends Phaser.Scene {
    constructor(){
        super("intro");
    }
    preload(){
        this.load.path = "./assets/";
        this.load.image("gamelogo", "gamelogo.png");
        this.load.image("studiologo", "pandared@2x.png");
        this.load.audio("carwoosh", "carwoosh.wav");

    }
    create(){
        this.scale.displaySize.setAspectRatio(config.width/config.height);
        this.scale.refresh();

        let woosh = this.sound.add("carwoosh");
        let title = this.add.image(config.width/2, config.height+100, "gamelogo").setScale(1.3);
        let logo = this.add.image(config.width/2, config.height/2, "studiologo").setAlpha(0);
        let start = this.add.text(config.width/2, config.height/2, "click anywhere to start");
        start.setFontSize(40).setOrigin(0.5).setAlpha(0);
        let play = this.add.text(config.width/2, config.height/2 + 50, "play", {
            fontFamily: "Baloo2-Regular", 
            fontSize: 100
        }).setOrigin(0.5).setAlpha(0).setInteractive();
        let quit = this.add.text(config.width/2, config.height/2 + 250, "quit", {
            fontFamily: "Baloo2-Regular",
            fontSize: 100
        }).setOrigin(0.5).setAlpha(0).setInteractive();

        const tweens_chain = this.tweens.chain({
            tweens: [
                {
                    targets: logo,
                    alpha: {from: 0, to: 1},
                    duration: 2300,
                    ease: "Quad.easeInOut",
                    yoyo: true 
                },
                {
                    targets: title,
                    y: config.height/2.5,
                    duration: 2500,
                    ease: "Back.easeOut",
                }, 
                {
                    targets: start,
                    alpha: {from: 0.3, to: 1},
                    duration: 1000,
                    ease: "Quad.easeInOut",
                    repeat: -1,
                    yoyo: true
                }
            ]
        });

        this.input.once('pointerdown', ()=> {
            tweens_chain.stop();
            logo.setAlpha(0);
            title.setY(config.height/2.5);
            woosh.play();
            this.tweens.add({
                targets: title,
                y: config.height/2.5 - 100,
                ease: "Quad.easeOut"
            });
            this.tweens.add({
                targets: start,
                alpha: 0,
                ease: "Quad.easeOut"
            });
            this.tweens.add({
                targets: [play, quit],
                alpha: 1,
                ease: "Quad.easeOut"
            });
        });

        play.on('pointerover', ()=> {
            play.setScale(1.1);
        });

        play.on('pointerout', ()=> {
            play.setScale(1);
        });

        play.on('pointerdown', ()=> {
            woosh.stop();
            this.scene.start('loading');
        });

        quit.on('pointerover', ()=> {
            quit.setScale(1.1);
        });

        quit.on('pointerout', ()=> {
            quit.setScale(1);
        });

        quit.on('pointerdown', ()=> {
            woosh.stop();
            this.scene.start('endscene');
        });

    }
    update(){
    }
}

class Loading extends Phaser.Scene {
    constructor () {
        super('loading');
    }
    create() {
        this.scale.displaySize.setAspectRatio(config.width/config.height);
        this.scale.refresh();

        let margin = 55
        let circle_1 = this.add.graphics();
        let circle_2 = this.add.graphics();
        let circle_3 = this.add.graphics();
        circle_1.fillCircle(config.width-(margin*3),config.height-margin,10).fillStyle('0xfffcfd');
        circle_2.fillCircle(config.width-(margin*2),config.height-margin,10).fillStyle('0xfffcfd');
        circle_3.fillCircle(config.width-margin,config.height-margin,10).fillStyle('0xfffcfd');
        this.add.text(config.width-(margin*3.7), config.height-margin, "loading", {
            fontFamily: "Baloo2-Regular", 
            fontSize: 100
        }).setOrigin(1, 0.65)

        this.tweens.add ({
            targets: [circle_1, circle_2, circle_3],
            y: -15,
            duration: 1000,
            ease: "Quad.easeInOut",
            yoyo: true,
            repeat: 2,
            delay: this.tweens.stagger(300)
        })

        this.time.delayedCall(2600, ()=> {
            this.cameras.main.fadeOut(2000, 51, 38, 40)
        })

        this.time.delayedCall(4600, ()=> {
            this.scene.start('endscene')
        })

    }
}
class EndScene extends Phaser.Scene {
    constructor() {
        super('endscene');
    }
    preload() {
        this.load.path = "./assets/";
        this.load.audio("backgroundaudio", "backgroundaudio.mp3");
        this.cameras.main.setBackgroundColor(0x332628)
    }
    create() {
        this.sound.add("backgroundaudio", {
            loop: true,
            volume: 3.0
        }).play();

        this.add.text(config.width/2, config.height/2, 
        ['Thanks for playing!',
        'All assets and code created by Thanyared Wong.',
        'May 2023'], {align: 'center'}
        ).setFontSize(40).setOrigin(0.5)
    }
}

let config = {
    type: Phaser.WEBGL,
    width: 1920,
    height: 1080,
    scale: {
        mode: Phaser.Scale.FIT
    },
    backgroundColor: 0xffc1cc,
    scene: [Intro, Loading, EndScene]
}

let game = new Phaser.Game(config);