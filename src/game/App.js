import { Application, Graphics } from 'pixi.js';
import { Bodies, Engine, Events, use, World } from 'matter-js';
import Bg from './Bg.js';
import Rock from './Rock.js';
import Player from './Player.js';
import 'matter-attractors';
use('matter-attractors');
import './App.css';

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
			bg: new Bg(),
			player: Player.new(),
			engine: Engine.create(),
			objects: [],
			oob: Bodies.rectangle(48, 110, 96, 10, {
				label: 'oob',
				isSensor: true,
			})
		});
		addObject(this, this.player);
		spawn(this, 'rock');
		spawn(this, 'rock', -200);
		spawn(this, 'rock', -250);
		this.engine.world.gravity.y = 0;
		World.add(this.engine.world, [this.bg.bounds, this.oob]);
		handleCollision(this);
		this.stage.addChild(this.bg);
		this.stage.sortableChildren = true;
		this.ticker.add(delta => this.update(delta));
		Engine.run(this.engine);
	}
	update() {
		if (!this.player.dead) {
			this.player.update();
			this.objects.forEach(obj => {
				obj.update();
			});
			this.bg.update();
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
			if (a.label == 'oob') {
				removeObject(app, b);
				spawn(app, 'rock');
			} else if (b.label == 'oob') {
				removeObject(app, a);
				spawn(app, 'rock');
			}
		});
	});
}

const spawn = (app, obj, y) => {
	if (!y) {
		y = Math.floor(Math.random() * (-150 - -200 + 1) + -200);
	}
	switch (obj) {
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
			app.player.die();
			msg = 'Your lifeless body is strewn across the rocks. All hope is lost. Get rekt m8.';
			break;
	}
	console.log(msg);
}