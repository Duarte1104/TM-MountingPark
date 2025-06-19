import { pontuacoes } from './storage.js'; 

export default class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }

  preload() {
    console.log('[Menu] PRELOAD');
    this.load.image('background', 'assets/IMAGEMMENU.png');
  }

  create() {
    console.log('[Menu] CREATE');
    this.bg = this.add.image(0, 0, 'background')
      .setOrigin(0)
      .setDisplaySize(1536, 1024);

   const largura = 300;
const altura = 70;
const x = 580;
const yBase = 450;
const espacamento = 100;

const criarBotao = (texto, y, callback) => {
  const botao = this.add.graphics();
  botao.fillStyle(0xFFA500, 1);
  botao.fillRoundedRect(x, y, largura, altura, 20);

  const txt = this.add.text(x + largura / 2, y + altura / 2, texto, {
    fontSize: '32px',
    fontFamily: 'Arial',
    color: '#ffffff',
  }).setOrigin(0.5)
    .setInteractive({ useHandCursor: true })
    .on('pointerover', () => {
      botao.clear();
      botao.fillStyle(0x1E90FF, 1);
      botao.fillRoundedRect(x, y, largura, altura, 20);
    })
    .on('pointerout', () => {
      botao.clear();
      botao.fillStyle(0xFFA500, 1);
      botao.fillRoundedRect(x, y, largura, altura, 20);
    })
    .on('pointerdown', callback);
};

// Criar botões com o novo estilo
criarBotao('JOGAR', yBase, () => {
  console.log('[Menu] Botão JOGAR clicado → Vai para NivelSelect');
  this.bg.destroy();
  this.scene.start('NivelSelect');
});

criarBotao('INSTRUÇÕES', yBase + espacamento, () => {
  console.log('[Menu] Vai para Instruções');
  this.scene.start('Instrucoes');
});

criarBotao('SAIR', yBase + 2 * espacamento, () => {
  console.log('[Menu] Sair clicado');
  window.close();
});

  }
}

export class NivelSelect extends Phaser.Scene {
  constructor() {
    super('NivelSelect');
  }

  preload() {
    console.log('[NivelSelect] PRELOAD');
    this.load.image('background', 'assets/IMAGEMMENU.png');
  }

  create() {
    console.log('[NivelSelect] CREATE');
    this.add.image(0, 0, 'background').setOrigin(0).setDisplaySize(1536, 1024);

    const largura = 300;
    const altura = 70;
    const x = 570;
    const yBase = 450;
    const espacamento = 100;

    const estrelasTexto = ['⛔', '⭐', '⭐⭐', '⭐⭐⭐'];

const mostrarEstrelas = (nivel, x, y) => {
  const estrelas = estrelasTexto[pontuacoes[nivel] || 0];
  this.add.text(x + largura + 50, y + altura / 2, estrelas, {
    fontSize: '28px',
    color: '#ffff00',
    fontFamily: 'Verdana'
  }).setOrigin(0, 0.5);
};

    const criarBotao = (texto, y, callback) => {
      const botao = this.add.graphics();
      botao.fillStyle(0xFFA500, 1);
      botao.fillRoundedRect(x, y, largura, altura, 20);

      const txt = this.add.text(x + largura / 2, y + altura / 2, texto, {
        fontSize: '32px',
        fontFamily: 'Arial',
        color: '#ffffff',
      }).setOrigin(0.5)
        .setInteractive({ useHandCursor: true })
        .on('pointerover', () => {
          botao.clear();
          botao.fillStyle(0x1E90FF, 1);
          botao.fillRoundedRect(x, y, largura, altura, 20);
        })
        .on('pointerout', () => {
          botao.clear();
          botao.fillStyle(0xFFA500, 1);
          botao.fillRoundedRect(x, y, largura, altura, 20);
        })
        .on('pointerdown', callback);
    };

    criarBotao('NÍVEL 1', yBase, () => {
      console.log('[NivelSelect] NÍVEL 1 clicado → Vai para Nivel1');
      this.scene.stop('Menu');
      this.scene.stop('NivelSelect');
      this.scene.stop('Instrucoes');
      this.scene.start('Nivel1');
    });
    mostrarEstrelas('Nivel1', x, yBase);


    criarBotao('NÍVEL 2', yBase + espacamento, () => {
      console.log('[NivelSelect] NÍVEL 2 clicado');
      this.scene.stop('Menu');
      this.scene.stop('NivelSelect');
      this.scene.stop('Instrucoes');
      this.scene.start('Nivel2');
    });
    mostrarEstrelas('Nivel2', x, yBase + espacamento);


    criarBotao('NÍVEL 3', yBase + 2 * espacamento, () => {
      console.log('[NivelSelect] NÍVEL 3 clicado');
      this.scene.stop('Menu');
      this.scene.stop('NivelSelect');
      this.scene.stop('Instrucoes');
      this.scene.start('Nivel3');
    });

    criarBotao('VOLTAR', yBase + 3 * espacamento, () => {
      console.log('[NivelSelect] VOLTAR → Vai para Menu');
      this.scene.start('Menu');
    });
    mostrarEstrelas('Nivel3', x, yBase + 2 * espacamento);
  }
}

export class Instrucoes extends Phaser.Scene {
  constructor() {
    super('Instrucoes');
  }

  preload() {
    console.log('[Instrucoes] PRELOAD');
    this.load.image('imgInstrucoes', 'assets/ImagemInstrucoes.png');
  }

  create() {
    console.log('[Instrucoes] CREATE');
    this.add.image(0, 0, 'imgInstrucoes').setOrigin(0).setDisplaySize(1536, 1024);

    const largura = 250;
    const altura = 70;
    const x = 640;
    const y = 900;

    const botaoVoltar = this.add.graphics();
    botaoVoltar.fillStyle(0xFFA500, 1);
    botaoVoltar.fillRoundedRect(x, y, largura, altura, 20);

    this.add.text(x + largura / 2, y + altura / 2, 'VOLTAR', {
      fontSize: '32px',
      fontFamily: 'Arial',
      color: '#ffffff',
    }).setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerover', () => {
        botaoVoltar.clear();
        botaoVoltar.fillStyle(0x1E90FF, 1);
        botaoVoltar.fillRoundedRect(x, y, largura, altura, 20);
      })
      .on('pointerout', () => {
        botaoVoltar.clear();
        botaoVoltar.fillStyle(0xFFA500, 1);
        botaoVoltar.fillRoundedRect(x, y, largura, altura, 20);
      })
      .on('pointerdown', () => {
        console.log('[Instrucoes] VOLTAR → Vai para Menu');
        this.scene.start('Menu');
      });
  }
}
