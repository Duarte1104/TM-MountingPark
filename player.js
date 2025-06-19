export let player;
let cursors;

export function setupPlayer(scene, startX = 1300, startY = 900) {
  player = scene.matter.add.sprite(startX, startY, 'car');
  player.setScale(1);
  player.setFrictionAir(0.05);
  player.setFixedRotation(false);

  cursors = scene.input.keyboard.createCursorKeys();
}


export function updatePlayer() {
  const speed = 0.05;
  const maxSpeed = 5;
  const angle = player.rotation;

  if (cursors.left.isDown) {
    player.setAngularVelocity(-speed);
  } else if (cursors.right.isDown) {
    player.setAngularVelocity(speed);
  } else {
    player.setAngularVelocity(0);
  }

  if (cursors.up.isDown) {
    player.setVelocity(Math.cos(angle) * maxSpeed, Math.sin(angle) * maxSpeed);
  } else if (cursors.down.isDown) {
    player.setVelocity(Math.cos(angle) * -maxSpeed / 2, Math.sin(angle) * -maxSpeed / 2);
  } else {
    player.setVelocity(player.body.velocity.x * 0.98, player.body.velocity.y * 0.98);
  }
}
