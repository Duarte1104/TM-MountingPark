import { player } from './player.js';
import { pontuacoes } from './storage.js';


let hitboxEstacionamento;
let venceu = false;

export function setupParking(scene) {
  venceu = false; // reinicia o estado ao iniciar nova cena

  const zonaVisual = scene.add.image(400, 260, 'estacionamento');
  zonaVisual.setScale(0.27);
  zonaVisual.setAlpha(0.6);
  zonaVisual.setOrigin(0.5);

  hitboxEstacionamento = scene.matter.add.rectangle(400, 260, 200, 90, {
    isStatic: true,
    isSensor: true
  });
}

export function checkVictory(scene, proximaCena = 'Nivel2') {

  if (venceu) return;

  const carWidth = player.width * player.scaleX;
  const carHeight = player.height * player.scaleY;
  const centerX = player.x;
  const centerY = player.y;
  const angle = player.rotation;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);

  const corners = [
    { x: centerX + carWidth / 2 * cos - carHeight / 2 * sin, y: centerY + carWidth / 2 * sin + carHeight / 2 * cos },
    { x: centerX - carWidth / 2 * cos - carHeight / 2 * sin, y: centerY - carWidth / 2 * sin + carHeight / 2 * cos },
    { x: centerX - carWidth / 2 * cos + carHeight / 2 * sin, y: centerY - carWidth / 2 * sin - carHeight / 2 * cos },
    { x: centerX + carWidth / 2 * cos + carHeight / 2 * sin, y: centerY + carWidth / 2 * sin - carHeight / 2 * cos }
  ];

  const hb = hitboxEstacionamento.bounds;
  const todosDentro = corners.every(p =>
    p.x >= hb.min.x && p.x <= hb.max.x &&
    p.y >= hb.min.y && p.y <= hb.max.y
  );

  if (todosDentro) {
  venceu = true;
  player.setVelocity(0, 0);
  player.setAngularVelocity(0);

  const largura = 900;
  const altura = 180;

  

  const tempoTotal = ((scene.time.now - scene.startTime) / 1000).toFixed(1);

// Mensagem de fundo
const fundoMsg = scene.add.graphics();
fundoMsg.fillStyle(0xFFA500, 0.95); // fundo laranja suave
fundoMsg.fillRoundedRect(418, 250, 700, 300, 30); // posição + bordas arredondadas
fundoMsg.lineStyle(4, 0xffffff, 1);
fundoMsg.strokeRoundedRect(418, 250, 700, 300, 30);


// Título
const msg1 = scene.add.text(768, 310, "Estacionaste com sucesso!", {
  fontSize: "42px",
  fontFamily: "Verdana",
  color: "#ffffff",
  fontStyle: "bold"
}).setOrigin(0.5).setDepth(2);

// Tempo final
const msg2 = scene.add.text(768, 360, `⏱ Tempo: ${tempoTotal}s`, {
  fontSize: "30px",
  fontFamily: "Verdana",
  color: "#ffffff"
}).setOrigin(0.5).setDepth(2);

// Estrelas com base no tempo
let estrelas = '';
if (tempoTotal < 9) {
  estrelas = '⭐⭐⭐';
} else if (tempoTotal < 13) {
  estrelas = '⭐⭐';
} else if (tempoTotal < 18) {
  estrelas = '⭐';
} else {
  estrelas = '⛔ Sem estrelas';
}

// Verifica e guarda a melhor pontuação
const nivelAtual = scene.scene.key;
if (pontuacoes[nivelAtual] !== undefined) {
  const estrelasNum = estrelas === '⛔ Sem estrelas' ? 0 : estrelas.length;
  if (estrelasNum > pontuacoes[nivelAtual]) {
    pontuacoes[nivelAtual] = estrelasNum;
  }
}

const msg3 = scene.add.text(768, 410, `Pontuação: ${estrelas}`, {
  fontSize: "30px",
  fontFamily: "Verdana",
  color: "#ffffff"
}).setOrigin(0.5).setDepth(2);

const larguraBtn = 180;
const alturaBtn = 60;

// VOLTAR
const btnVoltar = scene.add.graphics();
btnVoltar.fillStyle(0xd9534f, 1); // vermelho
btnVoltar.fillRoundedRect(550, 460, larguraBtn, alturaBtn, 15);

const txtVoltar = scene.add.text(550 + larguraBtn / 2, 460 + alturaBtn / 2, 'VOLTAR', {
  fontSize: '28px',
  fontFamily: 'Verdana',
  color: '#ffffff'
}).setOrigin(0.5).setInteractive({ useHandCursor: true });

txtVoltar.on('pointerover', () => {
  btnVoltar.clear();
  btnVoltar.fillStyle(0xc9302c, 1);
  btnVoltar.fillRoundedRect(550, 460, larguraBtn, alturaBtn, 15);
});
txtVoltar.on('pointerout', () => {
  btnVoltar.clear();
  btnVoltar.fillStyle(0xd9534f, 1);
  btnVoltar.fillRoundedRect(550, 460, larguraBtn, alturaBtn, 15);
});
txtVoltar.on('pointerdown', () => {
  [fundoMsg, msg1, msg2, msg3, btnVoltar, txtVoltar, btnContinuar, txtContinuar].forEach(el => el.destroy?.());
  scene.scene.start('Menu');
});

// CONTINUAR
const btnContinuar = scene.add.graphics();
btnContinuar.fillStyle(0x5cb85c, 1); // verde
btnContinuar.fillRoundedRect(790, 460, larguraBtn, alturaBtn, 15);

const txtContinuar = scene.add.text(790 + larguraBtn / 2, 460 + alturaBtn / 2, 'CONTINUAR', {
  fontSize: '28px',
  fontFamily: 'Verdana',
  color: '#ffffff'
}).setOrigin(0.5).setInteractive({ useHandCursor: true });

txtContinuar.on('pointerover', () => {
  btnContinuar.clear();
  btnContinuar.fillStyle(0x4cae4c, 1);
  btnContinuar.fillRoundedRect(790, 460, larguraBtn, alturaBtn, 15);
});
txtContinuar.on('pointerout', () => {
  btnContinuar.clear();
  btnContinuar.fillStyle(0x5cb85c, 1);
  btnContinuar.fillRoundedRect(790, 460, larguraBtn, alturaBtn, 15);
});
txtContinuar.on('pointerdown', () => {
  [fundoMsg, msg1, msg2, msg3, btnVoltar, txtVoltar, btnContinuar, txtContinuar].forEach(el => el.destroy?.());
  scene.scene.start(proximaCena);
});
}


}

export function setupParkingNivel2(scene) {
  venceu = false;

  // Estacionamento visual (imagem horizontal)
  const zonaVisual = scene.add.image(200, 330, 'estacionamento');
  zonaVisual.setScale(0.27);
  zonaVisual.setAlpha(0.6);
  zonaVisual.setOrigin(0.5);
  // ➤ Não aplicamos .setAngle(90)

  // Hitbox horizontal compatível com checkVictory
  hitboxEstacionamento = scene.matter.add.rectangle(200, 330, 200, 90, {
    isStatic: true,
    isSensor: true
  });
}


export function setupParkingNivel3(scene) {
  venceu = false;

  const zonaVisual = scene.add.image(1170, 630, 'estacionamento');
  zonaVisual.setScale(0.27);
  zonaVisual.setAlpha(0.6);
  zonaVisual.setOrigin(0.5);

  hitboxEstacionamento = scene.matter.add.rectangle(1170, 630, 200, 90, {
    isStatic: true,
    isSensor: true
  });
}




