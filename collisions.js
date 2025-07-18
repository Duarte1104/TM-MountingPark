import { player } from './player.js';
import { arvores, barreiras, arbustos, bermas} from './obstacles.js';

export function setupCollisions(scene) {
  scene.matter.world.on('collisionstart', function (event) {
    event.pairs.forEach(pair => {
      const bodies = [pair.bodyA, pair.bodyB];
      if (bodies.includes(player.body)) {
        for (let obj of [...arvores, ...barreiras, ...arbustos,]) {
          if (bodies.includes(obj.body)) {
            this.scene.restart();
          }
        }
        for (let berma of bermas) {
        if (bodies.includes(berma)) {
        this.scene.restart();
        }
}
      }
    });
  }, scene);
}
