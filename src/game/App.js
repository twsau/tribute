import { Application, Graphics, Loader } from 'pixi.js';
import { Bodies, Engine, Events, Render, use, World } from 'matter-js';
import Bg from './Bg.js';
import Fork from './Fork.js';
import Menu from './Menu.js';
import Rock from './Rock.js';
import Player from './Player.js';
import 'matter-attractors';
use('matter-attractors');
import './App.css';

const loader = Loader.shared;

const config = {
	antialias: false,
	height: 96,
	width: 96,
	view: document.querySelector('canvas')
}

export default class App extends Application {
	constructor() {
		super(config);
		Object.assign(this, {
			audio: document.createElement('AUDIO'),
			bg: new Bg(),
			player: Player.new(),
			menu: new Menu(),
			engine: Engine.create(),
			objects: [],
			oob: Bodies.rectangle(48, 192, 96, 10, {
				label: 'oob',
				isSensor: true,
			}),
			state: {
				pause: true
			},
			spawner: setInterval(() => {
				if (!this.state.pause) {
					spawn(this, 'rock');
				}
			}, 500)
		});
		this.audio.src = './asset/audio/tribute.mp3';
		console.log(this.menu)
		addObject(this, this.player);
		//spawn(this, 'fork');
		// spawn(this, 'rock');
		// spawn(this, 'rock', -200);
		// spawn(this, 'rock', -250);
		this.engine.world.gravity.y = 0;
		World.add(this.engine.world, [this.bg.bounds, this.oob]);
		handleCollision(this);
		this.stage.addChild(this.bg, this.menu);
		this.stage.sortableChildren = true;
		this.ticker.add(delta => this.update(delta));
		Engine.run(this.engine);
	}
	update() {
		if (!this.menu.visible) {
			this.state.pause = false;
			this.audio.play();
			if (!this.player.dead) {
				this.player.update();
				this.objects.forEach(obj => {
					obj.update();
				});
				this.bg.update();
			}
		} else {
			this.state.pause = true;
			this.menu.update(this.ticker.lastTime / 1000);
		}
	}		
}

const addObject = (app, object) => {
	World.add(app.engine.world, object);
	app.stage.addChild(object.sprite);
}

const removeObject = (app, object) => {
	World.remove(app.engine.world, object);
	app.stage.removeChild(object.sprite);
}

const handleCollision = app => {
	Events.on(app.engine, 'collisionStart', e => {
		e.pairs.forEach(pair => {
			const {bodyA: a, bodyB: b} = pair;
			if (a.label == 'player') {
				if (b.label.includes('lethal')) {
					gameOver(app, b.label);
				}
			} else if (b.label == 'player') {
				if (a.label.includes('lethal')) {
					gameOver(app, a.label);
				}
			}
			if (a.label.includes('channel') && b.label == 'player') {
			} else if (b.label.includes('channel') && a.label == 'player') {
				if (b.label.includes('left')) {
					spawn(app, 'channel_left');
				} else {
					spawn(app, 'channel_right');
				}
			}
			if (a.label == 'oob') {
				removeObject(app, b);
			} else if (b.label == 'oob') {
				removeObject(app, a);
			}
		});
	});
}

const spawn = (app, obj, y) => {
	if (!y) {
		y = Math.floor(Math.random() * (-150 - -200 + 1) + -200);
	}
	switch (obj) {
		case 'fork':
			let fork = Fork.new();
			addObject(app, fork);
			app.objects.push(fork);
			break;
		case 'channel_left':
			let channel_left = Fork.channel('left');
			addObject(app, channel_left);
			app.objects.push(channel_left);
			break;
		case 'channel_right':
			let channel_right = Fork.channel('right');
			addObject(app, channel_right);
			app.objects.push(channel_right);
			break;
		case 'rock':
			let rock = Rock.new(Math.floor(Math.random() * (79 - 17 + 1) + 17), y);
			addObject(app, rock);
			app.objects.push(rock);
			break;
	}
}

const gameOver = (app, reason) => {
	let msg;
	switch (reason.split(' ')[0]) {
		case 'rock':
			msg = 'Your lifeless body is strewn across the rocks. All hope is lost. Get rekt m8.';
			break;
		case 'fork':
			msg = 'You got forked. How embarrassing.';
			break;
	}
	app.player.die();
	console.log(msg);
}