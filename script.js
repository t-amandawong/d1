class AmandaGame extends Phaser.Scene {
    constructor(){
        super("amandaGame")
    }
    preload(){
        this.load.path = "./assets/";
        this.load.image("gamelogo", "gamelogo.png");
        this.load.image("studiologo", "studiologo.png");
        this.load.audio("carwoosh", "carwoosh.wav");
        this.load.audio("backgroundaudio", "backgroundaudio.mp3")

    }
    create(){
        this.graphics = this.add.graphics();
        let bgm = this.sound.add("backgroundaudio");
        let woosh = this.sound.add("carwoosh");
        let title = this.image.add("gamelogo");
        let logo = this.image.add("studiologo")

        this.graphics.fillStyle(0xff9999, 1);
        this.graphics.fillCircle(100,100,50);
        this.graphics.fillTriangle(250,50,200, 150, 300, 150);
        this.graphics.fillEllipse(450,100,200,100,16);

        this.graphics.lineStyle(5, 0x000000, 1);
        this.graphics.lineBetween(100,100,250,100);
        this.graphics.lineStyle(5, 0x000000, 0.5);
        this.graphics.lineBetween(250,100,450,100);

        this.graphics.fillGradientStyle();
        this.graphics.fillRect(600, 50, 150, 100);

        this.textObject = this.add.text(
            0,
            600,
            "Hello world",
            {
                font: "40px Arial",
                color: "#ff7000"
            }
        );

        this.imageObject = this.add.image(
            600,
            300,
            "sectionimage",
        )
        this.imageObject.setScale(0.2)

        this.tweens.add({
            targets: title,
            alpha: 0,
            x:800,
            y:0,
            duration: 1000,
            ease: "Linear",
            repeat: -1
        })

        this.tweens.add({
            targets: this.imageObject,
            x:300,
            y:300,
            duration: 1000,
            ease: 'Linear',
            repeat: -1,
        });
    }
    update(){}
}

let config = {
    type: Phaser.WEBGL,
    width: 800,
    height: 600,
    backgroundColor: 0xffc1cc,
    scene: [AmandaGame]
}

let game = new Phaser.Game(config);