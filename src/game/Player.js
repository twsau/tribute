import { AnimatedSprite, Loader, Sprite } from 'pixi.js';
import { Bodies, Body} from 'matter-js';
const loader = Loader.shared;

const Player = {
	new: () => {
		let player = Bodies.rectangle(48, 85, 7, 7, {
			label: 'player'
		});
		Object.assign(player, {
			state: {
				dead: false
			},
			go: {
				left: false,
				right: false
			},
			sprite: new AnimatedSprite([loader.resources['raft_0'].texture, loader.resources['raft_1'].texture])
		});
		initSprite(player);
		handleInput(player);
		player.die = () => {
			player.dead = true;
			player.sprite.textures = [loader.resources['raft_dead_0'].texture, loader.resources['raft_dead_1'].texture];
			player.sprite.play();
		}
		player.update = () => {
			move(player);
			player.sprite.position.set(player.position.x, player.position.y);
		};
		return player;
	}
}

const handleInput = player => {
	document.addEventListener('keydown', e => {
		if (e.key == 'ArrowLeft' || e.key.toLowerCase() == 'a') {
			player.go.left = true;
		}
		if (e.key == 'ArrowRight' || e.key.toLowerCase() == 'd') {
			player.go.right = true;
		}
	});
	document.addEventListener('keyup', e => {
		if (e.key == 'ArrowLeft' || e.key.toLowerCase() == 'a') {
			player.go.left = false;
		}
		if (e.key == 'ArrowRight' || e.key.toLowerCase() == 'd') {
			player.go.right = false;
		}
	});
}

const initSprite = player => {
	player.sprite.anchor.set(0.5);
	player.sprite.animationSpeed = 0.02;
	player.sprite.play();
	player.sprite.position.set(player.position.x, player.position.y);
	player.sprite.roundPixels = true;
	player.sprite.zIndex = 2;
}

const move = player => {
	if (player.go.left) {
		Body.setPosition(player, {
			x: player.position.x - 1,
			y: player.position.y
		});
	}
	if (player.go.right) {
		Body.setPosition(player, {
			x: player.position.x + 1,
			y: player.position.y
		});
	}
}

export default Player;