import App from './game/App.js';
import { Loader, utils } from 'pixi.js';
import * as WebFont from 'webfontloader';
const loader = Loader.shared;

const manifest = {
	banks: './asset/img/banks.png',
	raft_0: './asset/img/raft_0.png',
	raft_1: './asset/img/raft_1.png',
	raft_dead_0: './asset/img/raft_dead_0.png',
	raft_dead_1: './asset/img/raft_dead_1.png',
	rock_0: './asset/img/rock_0.png',
	rock_1: './asset/img/rock_1.png',
	water_0: './asset/img/water_0.png',
	water_1: './asset/img/water_1.png',
	water_2: './asset/img/water_2.png',
	water_3: './asset/img/water_3.png',
	water_4: './asset/img/water_4.png',
	water_5: './asset/img/water_5.png',
	water_6: './asset/img/water_6.png',
};

const preload = () => {
	for (const [key, value] of Object.entries(manifest)) {
		loader.add(key, value);
	}
};

const load = () => {
	loader.load(() => {
		WebFont.load({
			google: {
				families: [
					'Press Start 2P'
				]
			},
			active: e => {
				utils.skipHello();
				const app = new App();
			}
		})
	})
};

preload();
load();