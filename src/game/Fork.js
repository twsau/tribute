import { Sprite, Loader } from 'pixi.js';
import { Bodies, Body, Composite } from 'matter-js';
const loader = Loader.shared;

const Fork = {
	new: () => {
		let main = Bodies.rectangle(48, -150, 20, 96, {
			label: 'fork lethal',
			isStatic: true
		});
		let leftChannel = Bodies.rectangle(24, -102, 42, 30, {
			label: 'left channel',
			isSensor: true,
			isStatic: true
		});
		let rightChannel = Bodies.rectangle(72, -102, 48, 30, {
			label: 'right channel',
			isSensor: true,
			isStatic: true
		});
		let fork = Composite.create();
		Composite.add(fork, [main, leftChannel, rightChannel]);
		Object.assign(fork, {
			sprite: new Sprite(loader.resources['fork_0'].texture)
		});
		initSprite(fork);
		fork.update = () => {
			Composite.translate(fork, {
				x: 0,
				y: 1
			});
			fork.sprite.position.set(fork.bodies[0].position.x, fork.bodies[0].position.y);
		}
		return fork;
	},
	channel: direction => {
		let d = direction == 'left' ? 79 : 17;
		let channel = Bodies.rectangle(d, -56, 20, 96, {
			isStatic: true
		});
		Object.assign(channel, {
			sprite: new Sprite(loader.resources['fork_1'].texture)
		});
		if (direction == 'left') {
			channel.sprite.scale.x *= -1;
			Body.rotate(channel, 45 * Math.PI / 180);
		} else {
			Body.rotate(channel, -45 * Math.PI / 180);
		}
		channel.sprite.anchor.set(0.5);
		channel.sprite.rotation = channel.angle;
		channel.sprite.zIndex = 2;
		channel.update = () => {
			Body.setPosition(channel, {
				x: channel.position.x,
				y: channel.position.y + 1
			});
			channel.sprite.position.set(channel.position.x, channel.position.y);
		}
		return channel;
	}
}

const initSprite = fork => {
	fork.sprite.anchor.set(0.5);
	fork.sprite.position.set(fork.bodies[0].position.x, fork.bodies[0].position.y);
	fork.sprite.roundPixels = true;
	fork.sprite.zIndex = 10;
}

export default Fork;