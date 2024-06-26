//Crie a aplicação Pixi.js //cria a imagem


//ERRADOOOOOOOOOOOOOO
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
    debugger

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

    let velocity = 4;
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



    // const blurFilter = new PIXI.filters.BlurFilter(0);
    // Crie um sprite para o alvo
    const target = new PIXI.Graphics();
    target.beginFill(0x39916f);// (0x pra iniciar a cor, depois posso colocar a cor que for.)
    target.drawRect(0, 0, 50, 50);
    target.endFill();
    configureObject(app, target, 1, middle.x, app.screen.height - 100, true, true)

    gsap.to(target, { angle: 360, delay: 5 }) // usado no target para fazer a rotacao

    const texturesAndando = []
    for (let i = 0; i < 8; i++) {
        const texture = new PIXI.Texture.from(`img/Persona2m/acoes/Andar/Walk0${i + 1}.png`)
        texturesAndando.push(texture)
    }

    const texturesCorrendo = []
    for (let i = 0; i < 8; i++) {
        const texture = new PIXI.Texture.from(`img/Persona2m/acoes/Correr/Run${i + 1}.png`)
        texturesCorrendo.push(texture)
    }

    const texturesVoltando = []
    for (let i = 0; i < 8; i++) {
        const texture = new PIXI.Texture.from(`img/Persona2m/acoes/Andar/Walk0${i + 1}.png`)
        texturesVoltando.push(texture)
        texturesVoltando.reverse();
    }

    const texturesParada = []
    for (let i = 0; i < 5; i++) { //looping para fazer a contagem de a 8, ele percorre toda a imagem
        const texture = new PIXI.Texture.from(`img/Persona2m/acoes/Descansar/Descanso${i + 1}.png`)
        texturesParada.push(texture)
    }

    //////// Adicionando o metodo pra sentar
    const texturesSentando = []
    for (let i = 1; i < 6; i++) { //looping para fazer a contagem de a 8, ele percorre toda a imagem
        const texture = new PIXI.Texture.from(`img/Persona2m/acoes/Descansar/Idle${i}.png`)
        texturesSentando.push(texture)
    }

    const texturesSentada = []
    for (let i = 6; i < 9; i++) { //looping para fazer a contagem de a 8, ele percorre toda a imagem
        const texture = new PIXI.Texture.from(`img/Persona2m/acoes/Descansar/Idle${i}.png`)
        texturesSentada.push(texture)
    }

    const texturesLevantando = []
    for (let i = 9; i < 11; i++) { //looping para fazer a contagem de a 8, ele percorre toda a imagem
        const texture = new PIXI.Texture.from(`img/Persona2m/acoes/Descansar/Idle${i}.png`)
        texturesLevantando.push(texture)
    }
    texturesLevantando


    const texturesPulando = []
    for (let i = 1; i < 12; i++) {
        const texture = new PIXI.Texture.from(`img/Persona2m/acoes/Pular/Jump${i + 1}.png`)
        texturesPulando.push(texture)
    }

    const persona = new PIXI.AnimatedSprite(texturesParada);
    persona.position.set(60, 440); //x = 0 e y =350 (obs: X e vertical e y horizontal)
    persona.scale.set(4, 4)
    app.stage.addChild(persona)
    persona.play();
    persona.animationSpeed = 0.12

    let click = false;



    const personaPulando = new PIXI.AnimatedSprite(texturesPulando);
    personaPulando.position.set(60, 440); // Defina as coordenadas iniciais do personagem
    personaPulando.animationSpeed = 0.1; // Ajuste a velocidade da animação conforme necessário
    personaPulando.loop = false; // Define se a animação deve ser repetida ou não
    personaPulando.visible = false; // Por padrão, o personagem pulando não será visível
    // Defina o tamanho do sprite do personagem pulando
    personaPulando.scale.set(4); // Ajuste o valor conforme necessário para aumentar o tamanho do personagem

    app.stage.addChild(personaPulando);

    const initY = persona.y
    function pular() {


        
        persona.textures = texturesPulando
        persona.animationSpeed = .14
        if(persona.y > initY) personagotoAndStop(7)
        persona.play()



        const tl = gsap.timeline()
        tl.to(persona, {
            y: 300,
            duration: .5,
            ease: 'power1.out'
        })

        tl.to(persona, {
            y: initY,
            duration: .5,
            ease: 'power1.in',
            onComplete: function () {
                persona.textures = texturesParada
                persona.animationSpeed = .14
                persona.play()
            }
        })
    }



    const personaActions = (action) => {

        persona.animationSpeed = 0.12 //velocidade que o personagem faz os movimentos
        switch (action) {
            case 'parada':
                persona.textures = texturesParada;
                persona.play()
                break;

            case 'andar':
                if (persona.textures === texturesAndando) return
                persona.textures = texturesAndando;
                persona.play()
                break;

            case 'voltar':
                if (persona.textures === texturesVoltando) return
                persona.textures = texturesVoltando;
                persona.play()
                break;

            case 'correr':
                if (persona.textures === texturesCorrendo) return
                persona.textures = texturesCorrendo;
                persona.play()
                break

            case 'pular':
                if (persona.textures === texturesPulando) return
                persona.textures = texturesPulando;
                persona.play()
                break;

            default:
                break;
        }
    }

    let sentada = false

    document.addEventListener("keydown", function (event) {
        // O evento do parâmetro é do tipo KeyboardEvent
        // O evento e acionado quando uma tecla e pressionada; 
        const speed = 8;

        if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
            walkingCharacter('back')
            personaActions('voltar')
            persona.play()
        }

        if (event.code === 'KeyW' || event.code === 'ArrowUp') {
            // persona.y -= speed;
            gsap.to(persona, { pixi: { y: 0 } })
        }

        if (event.code === 'KeyS' || event.code === 'ArrowDown') {


            if (!sentada) {
                persona.textures = texturesSentando;
                // persona.animationSpeed -= 0.18
                persona.loop = false;
                persona.play();

                setTimeout(() => {
                    persona.textures = texturesSentada;
                    persona.animationSpeed = 0.02
                    persona.loop = true;
                    persona.play();
                }, 800);
            } else {
                persona.textures = texturesLevantando;
                persona.animationSpeed = 0.18
                persona.loop = false;
                persona.play();

                setTimeout(() => {
                    persona.textures = texturesParada;
                    persona.animationSpeed = 0.12
                    persona.loop = true;
                    persona.play();
                }, 500);
            }
            sentada = !sentada
        }

        if (event.code === 'KeyD' || event.code === 'ArrowRight') {
            // persona.x += speed;
            walkingCharacter('front')
            personaActions('andar')
            persona.play()
            velocity = 4;

        }

        if (event.code === 'Space') {
            pular();
        }

        if (event.code === 'KeyC') {
            walkingCharacter('front')
            personaActions('correr')
            persona.play()
            velocity = 15; //velocidade dela correndo
        }
        console.log(event.code)
    });

    document.addEventListener("keyup", function (event) {
        if (event.code === 'KeyD' || event.code === 'ArrowRight' || event.code === 'KeyA' || event.code === 'ArrowLeft') {
            click = false
            personaActions('parada')
        }

        if (event.code === 'KeyC') {
            click = false
            personaActions('parada')
        }

        // if (event.code === 'Space') {
        //     click = false
        //     personaActions('parada')
        // }
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
