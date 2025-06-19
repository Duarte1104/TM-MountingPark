export let arvores = [];
export let barreiras = [];
export let arbustos = [];
export let bermas = [];

export function setupObstacles(scene) {
  // Árvores
  const posicoesArvores = [
    [600, 445, Math.PI / 2],
    [720, 445, Math.PI / 2],
    [840, 445, Math.PI / 2],
    [1100, 480, 0],
    [1100, 680, 0],
    [1100, 880, 0]
  ];
  posicoesArvores.forEach(([x, y, rot]) => {
    const arvore = scene.matter.add.sprite(x, y, 'arvore', null, { isStatic: true }).setScale(0.2);
    arvore.setBody({ type: 'rectangle', width: 110, height: 180 });
    arvore.setRotation(rot);
    arvores.push(arvore);
  });

  // Barreiras
  const posicoesBarreiras = [
    [100, 430, -0.8],
    [300, 430, 0.6]
  ];
  posicoesBarreiras.forEach(([x, y, rot]) => {
    const barreira = scene.matter.add.sprite(x, y, 'barreira', null, { isStatic: true }).setScale(0.1);
    barreira.setBody({ type: 'rectangle', width: 150, height: 40 });
    barreira.setRotation(rot);
    barreiras.push(barreira);
  });

  // Arbustos
  const posicoesArbustos = [
    [250, 800],
    [500, 630],
    [750, 700],
    [530, 850]
  ];
  posicoesArbustos.forEach(([x, y]) => {
    const arbusto = scene.matter.add.sprite(x, y, 'arbusto', null, { isStatic: true }).setScale(0.15);
    arbusto.setCircle(70);
    arbustos.push(arbusto);
  });

  // Bermas invisíveis
 bermas.push( scene.matter.add.rectangle(768, 160, 1536, 10, { isStatic: true }));
 bermas.push( scene.matter.add.rectangle(768, 1014, 1536, 10, { isStatic: true }));
  bermas.push( scene.matter.add.rectangle(0, 512, 10, 1024, { isStatic: true }));
 bermas.push( scene.matter.add.rectangle(1536, 512, 10, 1024, { isStatic: true }));
}

export function setupObstaclesNivel2(scene) {
  arvores.length = 0;
  barreiras.length = 0;
  arbustos.length = 0;

  // Árvores (coluna da direita)
  const posicoesArvores = [
    [750, 280, 0],
    [750, 480, 0],
    [750, 680, 0],
    [1100, 480, 0],
    [1100, 680, 0],
    [1100, 880, 0]
  ];
  posicoesArvores.forEach(([x, y, rot]) => {
    const arvore = scene.matter.add.sprite(x, y, 'arvore', null, { isStatic: true }).setScale(0.2);
    arvore.setBody({ type: 'rectangle', width: 110, height: 180 });
    arvore.setRotation(rot);
    arvores.push(arvore);
  });

  // Barreiras diagonais
  const posicoesBarreiras = [
    [150, 1013, -0.8],
    [370, 780, 0],
    [450, 640, -0.8],
    [450, 400, -0.8],
    [550, 300, 0.8]
  ];
  posicoesBarreiras.forEach(([x, y, rot]) => {
    const barreira = scene.matter.add.sprite(x, y, 'barreira', null, { isStatic: true }).setScale(0.1);
    barreira.setBody({ type: 'rectangle', width: 150, height: 40 });
    barreira.setRotation(rot);
    barreiras.push(barreira);
  });

  const carro = scene.matter.add.sprite(500, 880, 'car2', null, { isStatic: true }).setScale(1);
  carro.setBody({ type: 'rectangle', width: 70, height: 120 });
  carro.setAngle(-30);
  barreiras.push(carro);

  // Bermas invisíveis
 bermas.push( scene.matter.add.rectangle(768, 160, 1536, 10, { isStatic: true }));
 bermas.push( scene.matter.add.rectangle(768, 1014, 1536, 10, { isStatic: true }));
 bermas.push( scene.matter.add.rectangle(0, 512, 10, 1024, { isStatic: true }));
 bermas.push( scene.matter.add.rectangle(1536, 512, 10, 1024, { isStatic: true }));
}

export function setupObstaclesNivel3(scene) {
  arvores.length = 0;
  barreiras.length = 0;
  arbustos.length = 0;

  // Árvores (lateral esquerda + junto ao estacionamento)
  const posicoesArvores = [
    [375, 480, 0],
    [375, 680, 0],
    [375, 880, 0],
    [940, 630, 0],
    [1410, 630, 0]
  ];
  posicoesArvores.forEach(([x, y, rot]) => {
    const arvore = scene.matter.add.sprite(x, y, 'arvore', null, { isStatic: true }).setScale(0.2);
    arvore.setBody({ type: 'rectangle', width: 110, height: 180 });
    arvore.setRotation(rot);
    arvores.push(arvore);
  });

  // Barreiras (em volta do estacionamento em forma de retângulo)
  const posicoesBarreiras = [
    // Topo
    [870, 360, 0], [1040, 360, 0], [1210, 360, 0], [1400, 360, 0],
    
    // Fundo
    [870, 900, 0], [1040, 900, 0], [1210, 900, 0], [1400, 900, 0],
    // Esquerda
    [730, 419, Math.PI / 2], [730,850, Math.PI / 2],
  ];
  posicoesBarreiras.forEach(([x, y, rot]) => {
    const barreira = scene.matter.add.sprite(x, y, 'barreira', null, { isStatic: true }).setScale(0.1);
    barreira.setBody({ type: 'rectangle', width: 150, height: 40 });
    barreira.setRotation(rot);
    barreiras.push(barreira);
  });

  // Carro verde com movimento (adicionado externamente no create, mas podemos definir a hitbox aqui se necessário)
  const carroVerde = scene.matter.add.sprite(150, 270, 'car3', null, {
  isStatic: false,
  isSensor: true
}).setScale(1).setFixedRotation();
scene.carroVerde = carroVerde; // ← necessário para o update no Nivel3.js
barreiras.push(carroVerde);


  // Bermas invisíveis
  bermas.push(scene.matter.add.rectangle(768, 160, 1536, 10, { isStatic: true }));
  bermas.push(scene.matter.add.rectangle(768, 1014, 1536, 10, { isStatic: true }));
  bermas.push(scene.matter.add.rectangle(0, 512, 10, 1024, { isStatic: true }));
  bermas.push(scene.matter.add.rectangle(1536, 512, 10, 1024, { isStatic: true }));
}
