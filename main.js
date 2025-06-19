import { config } from './config.js';
import Menu, { NivelSelect, Instrucoes } from './Menu.js';
import Nivel1 from './Nivel1/Nivel1.js';
import Nivel2 from './Nivel2/Nivel2.js';
import Nivel3 from './Nivel3/Nivel3.js';


config.scene = [Menu, NivelSelect, Instrucoes, Nivel1, Nivel2, Nivel3];


new Phaser.Game(config);
