
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
    .add('scene', 'cenario.jpg')
    .add('character', 'bonequin.png')
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
    const scene = new PIXI.Sprite(resources.scene.texture);
    configureObject(app, scene, 1.5, 0, 0)

    // Crie um sprite para o alvo
    const target = new PIXI.Graphics();
    target.beginFill(0x39916f);// (0x pra iniciar a cor, depois posso colocar a cor que for.)
    target.drawRect(0, 0, 50, 50);
    target.endFill();
    configureObject(app, target, 1, middle.x, app.screen.height - 100, true, true)

    // função alerta ao clicar
    function handleClick() {
        alert('Bloco Verdinho clicado!')
    }

    // Ouvinte de clique para chamar função
    target.on('pointerup', handleClick)

    // Personagem
    const character = new PIXI.Sprite(resources.character.texture);
    character.id = 'personagem'
    character.anchor.set(0.5);
    configureObject(app, character, 1, middle.x, middle.y, true)



    document.addEventListener("keydown", function (event) {
        // O evento do parâmetro é do tipo KeyboardEvent

        const speed = 8;

        if (event.code === 'KeyA') {
            character.x -= speed;
        } 
        
        if (event.code === 'KeyW') {
            character.y -= speed;
        } 

        if (event.code === 'KeyS') {
            character.y += speed;
        } 
        
        if (event.code === 'KeyD') {
            character.x += speed;
        } 

        if (event.code === 'Space') {
            setInterval(()=>{character.angle += 1}, 10)
        }   

        console.log(event.code)
    });

    // Função de atualização do jogo
    app.ticker.add(delta => {
        // Atualize o jogo aqui
    });
}


// Adicione controles de teclado
const keys = {
    left: keyboard('ArrowLeft'),
    right: keyboard('ArrowRight'),
    up: keyboard('ArrowUp'),
    down: keyboard('ArrowDown'),
};

// Adicione um personagem //carrega a imagem
// const character = new PIXI.Graphics();
// character.beginFill(0xFF0000);
// character.drawRect(0, 0, 50, 50);
// character.endFill();
// character.x = app.screen.width / 2;
// character.y = app.screen.height - 100;
// app.stage.addChild(character);





// // Velocidade de movimento do personagem
// const speed = 10;//nao faz nada 

// // Controles de teclado //nao faz nada também
// keys.left.press = () => {
//     character.x -= speed;
// };

// keys.right.press = () => {
//     character.x += speed;
// };

// keys.up.press = () => {
//     character.y -= speed;
// };

// keys.down.press = () => {
//     character.y += speed;
// };

// // Controles de mouse //nao faz nada
// app.stage.interactive = true;
// app.stage.on('pointerdown', (event) => {
//     // Verifique se o clique do mouse atingiu o alvo
//     if (target.getBounds().contains(event.data.global.x, event.data.global.y)) {
//         console.log('Target hit!');
//     }
// });

// Função auxiliar para criar controles de teclado
// function keyboard(key) {
//     const k = {
//         code: key,
//         isDown: false,
//         isUp: true,
//         press: undefined,
//         release: undefined,
//         downHandler: (event) => {
//             if (event.key === k.code) {
//                 if (k.isUp && k.press) k.press();
//                 k.isDown = true;
//                 k.isUp = false;
//                 event.preventDefault();
//             }
//         },
//         upHandler: (event) => {
//             if (event.key === k.code) {
//                 if (k.isDown && k.release) k.release();
//                 k.isDown = false;
//                 k.isUp = true;
//                 event.preventDefault();
//             }
//         },
//     };

//     window.addEventListener('keydown', k.downHandler.bind(k), false);
//     window.addEventListener('keyup', k.upHandler.bind(k), false);

//     return k;
// }

// Função para criar e adicionar um novo alvo aleatório
// function createRandomTarget() {
//     const randomX = Math.random() * app.screen.width;
//     const randomY = Math.random() * app.screen.height;
//     const target = new PIXI.Sprite(PIXI.Loader.shared.resources['target'].texture);
//     target.anchor.set(0.5);
//     target.x = randomX;
//     target.y = randomY;
//     app.stage.addChild(target);

//     // Movimento do alvo em direção ao personagem
//     app.ticker.add(() => {
//         const dx = character.x - target.x;
//         const dy = character.y - target.y;
//         const angle = Math.atan2(dy, dx);
//         const vx = Math.cos(angle) * 2;
//         const vy = Math.sin(angle) * 2;
//         target.x += vx;
//         target.y += vy;
//     });
// }

// Chame createRandomTarget a cada 2 segundos
// setInterval(createRandomTarget, 2000);

app.stage.sortableChildren = true;
