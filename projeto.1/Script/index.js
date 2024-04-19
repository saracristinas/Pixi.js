//Crie a aplicação Pixi.js //cria a imagem
const app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0x1099bb,
});

// Adicione o canvas ao corpo do HTML
document.body.appendChild(app.view);

// Carregue os recursos do jogo
PIXI.Loader.shared

    .add('back01', 'img/cenario/01.png')
    .add('back02', 'img/cenario/02.png')
    .add('back03', 'img/cenario/03.png')
    .add('back04', 'img/cenario/04.png')
    .add('back06', 'img/cenario/05.png')
    .add('back05', 'img/cenario/06.png')
    .add('sounds', 'sound/efeito-sonoro.mp3') //testando o som
    // .add('personaJson', 'img/walking/spritesheet.json')
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

    // // Personagem //
    // const character = new PIXI.Sprite(resources.character.texture);
    // character.id = 'personagem'
    // character.anchor.set(0.3); //posicao do personagem
    // configureObject(app, character, 0.6, 100, middle.y * 1.5, false, false)





    // const blurFilter = new PIXI.filters.BlurFilter(0);
    // Crie um sprite para o alvo
    const target = new PIXI.Graphics();
    target.beginFill(0x39916f);// (0x pra iniciar a cor, depois posso colocar a cor que for.)
    target.drawRect(0, 0, 50, 50);
    target.endFill();
    configureObject(app, target, 1, middle.x, app.screen.height - 100, true, true)

    gsap.to(target, { angle: 360, delay: 5 })



    const texturesAndando = []
    for (let i = 0; i < 8; i++) {
        const texture = new PIXI.Texture.from(`img/Persona2m/acoes/Andar/Walk0${i + 1}.png`)
        texturesAndando.push(texture)
    }


    const texturesParada = []
    for (let i = 0; i < 8; i++) {
        const texture = new PIXI.Texture.from(`img/Persona2m/acoes/Descansar/Descanso0${i + 1}.png`)
        texturesParada.push(texture)
    }


    const persona = new PIXI.AnimatedSprite(texturesParada);
    persona.position.set(0, 276);
    persona.scale.set(5, 5)
    app.stage.addChild(persona)
    persona.play();
    persona.animationSpeed = 0.12


    let click = false;
    const personaActions = (action) => {

        // if (!click) {
        //     click = true
            persona.animationSpeed = 0.12
            switch (action) {
                case 'parada':
                    persona.textures = texturesParada;
                    persona.play()
                    break;

                case 'andar':
                    if(persona.textures === texturesAndando) return
                    persona.textures = texturesAndando;
                    persona.play()
                    break;

                default:
                    break;
            }
        
        
        // debugger
        // }



    }


    document.addEventListener("keydown", function (event) { //
        // O evento do parâmetro é do tipo KeyboardEvent

        const speed = 8;

        if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
            // character.x -= speed;
            walkingCharacter('back')
            persona.animationSpeed -= 0.12
            persona.play()
        }

        if (event.code === 'KeyW' || event.code === 'ArrowUp') {
            // persona.y -= speed;
            // gsap.to(persona, { pixi: { y: 0 } })
        }

        if (event.code === 'KeyS' || event.code === 'ArrowDown') {
            persona.y += speed;
        }

        if (event.code === 'KeyD' || event.code === 'ArrowRight') {
            // persona.x += speed;
            walkingCharacter('front')
            personaActions('andar')
        }

        if (event.code === 'Space') {
            setInterval(() => { character.angle += 1 }, 10)
        }
        console.log(event.code)
    });


    document.addEventListener("keyup", function (event) {
        if (event.code === 'KeyD' || event.code === 'ArrowRight') {
            click = false
            personaActions('parada')
        }
    });




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


app.stage.sortableChildren = true;


