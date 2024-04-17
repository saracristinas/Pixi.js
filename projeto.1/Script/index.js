// Crie a aplicação Pixi.js //cria a imagem
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
});

// Adicione o canvas ao corpo do HTML
document.body.appendChild(app.view);

// Carregue os recursos do jogo
PIXI.Loader.shared
    .add('character', 'img/bonequin.png')
    .add('back01', 'img/01.png')
    .add('back02', 'img/02.png')
    .add('back03', 'img/03.png')
    .add('back04', 'img/04.png')
    .add('back06', 'img/05.png')
    .add('back05', 'img/06.png')
    .add('sounds', 'sound/efeito-sonoro.mp3') //testando o som
    .load(setup);


// Configuração e objetos
function configureObject(app, obj, scale, x, y, visible = true, interactive = false) {
    obj.x = x;
    obj.y = y;
    obj.scale.x = scale;
    obj.scale.y = scale;
    obj.visible = visible;
    obj.interactive = interactive;
    obj.buttonMode = interactive;
    app.stage.addChild(obj);
}

function setup(loader, resources) {

    const middle = {
        x: app.screen.width / 2,
        y: app.screen.height / 2
    }

    // cenario //Modifico a imagem abaixo do personagem (o background);
    const back01 = new PIXI.TilingSprite(
        resources.back01.texture,
        app.screen.width,
        app.screen.height
    )

    back01.tileTransform.scale.set(0.8);//aqui mudo a escola da imagem
    app.stage.addChild(back01)


    // //back02
    const back02 = new PIXI.TilingSprite(
        resources.back02.texture,
        app.screen.width,
        app.screen.height
    )

    back02.tileTransform.scale.set(1.0);
    app.stage.addChild(back02)


    // //back03
    const back03 = new PIXI.TilingSprite(
        resources.back03.texture,
        app.screen.width,
        app.screen.height
    )
    back03.tileTransform.scale.set(1.0);
    app.stage.addChild(back03)


    // //back04
    const back04 = new PIXI.TilingSprite(
        resources.back04.texture,
        app.screen.width,
        app.screen.height
    )
    back04.tileTransform.scale.set(1.0);
    app.stage.addChild(back04)

    //back06
    const back05 = new PIXI.TilingSprite(
        resources.back05.texture,
        app.screen.width,
        app.screen.height
    )
    back05.tileTransform.scale.set(1.0);
    app.stage.addChild(back05)

    //back05
    const back06 = new PIXI.TilingSprite(resources.back06.texture, app.screen.width, app.screen.height)

    back06.tileTransform.position.y = 30;
    back06.tileTransform.scale.set(1.0);
    app.stage.addChild(back06)

    app.ticker.add(() => {
        // back06.tileTransform.position.x -= 1.3;
        // back05.tileTransform.position.x -= 1.1;
        // back04.tileTransform.position.x -= 0.9;
        // back03.tileTransform.position.x -= 0.7;
        // back02.tileTransform.position.x -= 0.5;
        // back01.tileTransform.position.x -= 0.3;
    })


    const velocity = 5

    function walkingCharacter(position) {
        switch (position) {
            case "front":
                back06.tileTransform.position.x -= velocity * 1.3;
                back05.tileTransform.position.x -= velocity * 1.1;
                back04.tileTransform.position.x -= velocity * 0.9;
                back03.tileTransform.position.x -= velocity * 0.7;
                back02.tileTransform.position.x -= velocity * 0.5;
                back01.tileTransform.position.x -= velocity * 0.3;

                break;

            case "back":
                back06.tileTransform.position.x += velocity * 1.3;
                back05.tileTransform.position.x += velocity * 1.1;
                back04.tileTransform.position.x += velocity * 0.9;
                back03.tileTransform.position.x += velocity * 0.7;
                back02.tileTransform.position.x += velocity * 0.5;
                back01.tileTransform.position.x += velocity * 0.3;

                break;

            default:
                break;
        }
    }




    function handleClick() {
        alert('Bloco clicado!')
    }


    // Personagem //
    const character = new PIXI.Sprite(resources.character.texture);
    character.id = 'personagem'
    character.anchor.set(0.5);
    configureObject(app, character, 0.6, 100, middle.y * 1.5, true)

    // Ouvinte de clique para chamar função
    // target.on('pointerup', handleClick);

    document.addEventListener("keydown", function (event) {
        // O evento do parâmetro é do tipo KeyboardEvent

        const speed = 8;

        if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
            // character.x -= speed;
            walkingCharacter('back')
        }

        if (event.code === 'KeyW' || event.code === 'ArrowUp') {
            character.y -= speed;
        }

        if (event.code === 'KeyS' || event.code === 'ArrowDown') {
            character.y += speed;
        }

        if (event.code === 'KeyD' || event.code === 'ArrowRight') {
            // character.x += speed;
            walkingCharacter('front')
        }

        if (event.code === 'Space') {
            setInterval(() => { character.angle += 1 }, 10)
        }
        console.log(event.code)
    });

    const blurFilter = new PIXI.filters.BlurFilter(0);
    // scene.filters = [blurFilter];

    // Crie um sprite para o alvo
    const target = new PIXI.Graphics();
    target.beginFill(0x39916f);// (0x pra iniciar a cor, depois posso colocar a cor que for.)
    target.drawRect(0, 0, 50, 50);
    target.endFill();
    configureObject(app, target, 1, middle.x, app.screen.height - 100, true, true)


    // Função de atualização do jogo
    app.ticker.add(delta => {

    });
}

// const soundURL = resources.sound.soundURL;
const sound = new Howl({
    src: ['https://liaser.s3.sa-east-1.amazonaws.com/praticas/testes-estagiario/efeito-sonoro.mp3'],
    loop: true,
    volume: 0.1,
    autoplay: true
});

// debugger

// Adicione controles de teclado
// const keys = {
//     left: keyboard('ArrowLeft'),
//     right: keyboard('ArrowRight'),
//     up: keyboard('ArrowUp'),
//     down: keyboard('ArrowDown'),
// };

app.stage.sortableChildren = true;


