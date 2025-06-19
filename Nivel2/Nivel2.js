import { setupPlayer, updatePlayer } from '../player.js';
import { setupObstaclesNivel2 } from '../obstacles.js';
import { setupParkingNivel2, checkVictory } from '../parking.js';
import { setupCollisions } from '../collisions.js';

export default class Nivel2 extends Phaser.Scene {
  constructor() {
    super('Nivel2');
  }

  preload() {
    console.log("🔄 Nivel2 PRELOAD iniciado");
    this.load.image('nivel1_bg', 'assets/parking_lot.png');
    this.load.image('car', 'assets/car.png');
    this.load.image('car2', 'assets/car2.png');
    this.load.image('arvore', 'assets/arvore.png');
    this.load.image('barreira', 'assets/barreira.png');
    this.load.image('arbusto', 'assets/arbusto.png');
    this.load.image('estacionamento', 'assets/estacionamento.png');
  }

  create() {
    console.log("✅ Nivel2 CREATE iniciado");
    this.add.image(0, 0, 'nivel1_bg').setOrigin(0, 0);
    setupPlayer(this, 1350, 850); // nova posição inicial do carro
    setupObstaclesNivel2(this);  // nova função de obstáculos
    setupParkingNivel2(this);    // nova posição do estacionamento
    setupCollisions(this);

    // Botão de voltar ao menu (estilo igual ao menu principal)
const xBotao = 1465;
const yBotao = 60;
const raio = 40;

// Fundo redondo laranja
const fundoVoltar = this.add.graphics();
fundoVoltar.fillStyle(0xFFA500, 1); // cor laranja
fundoVoltar.fillCircle(xBotao, yBotao, raio);
fundoVoltar.setDepth(10); // garantir que aparece por cima

// Seta branca
const setaVoltar = this.add.text(xBotao, yBotao, '↩', {
  fontSize: '36px',
  color: '#ffffff',
  fontFamily: 'Verdana',
})
  .setOrigin(0.5)
  .setDepth(11)
  .setInteractive({ useHandCursor: true })
  .on('pointerdown', () => {
    this.scene.start('Menu');
  });

    //cronometro
    this.startTime = null;
this.timerStarted = false;

this.timerText = this.add.text(20, 20, 'Tempo: 0.0s', {
  fontSize: '36px',
  fontFamily: 'Verdana',
  color: '#ffffff',
  backgroundColor: '#000000aa',
  padding: { x: 10, y: 5 }
}).setScrollFactor(0);
  }

  update() {
  updatePlayer();

  // Iniciar cronómetro apenas quando o jogador carregar numa tecla de movimento
  const cursors = this.input.keyboard.createCursorKeys();
  if (!this.timerStarted && (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown)) {
    this.startTime = this.time.now;
    this.timerStarted = true;
  }

  // Atualizar cronómetro apenas se tiver começado
  if (this.timerStarted) {
    const elapsed = (this.time.now - this.startTime) / 1000;
    this.timerText.setText(`Tempo: ${elapsed.toFixed(1)}s`);
  }

  checkVictory(this, 'Nivel3');
}
}
