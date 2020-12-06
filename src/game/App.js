import { Application, Graphics } from 'pixi.js';
import { Engine, Events, use, World } from 'matter-js';
import 'matter-attractors';
use('matter-attractors');
import Camera from './Camera.js';
import SceneLoader from './scene/SceneLoader.js';
import './App.css';

const config = {
	antialias: true,
	height: 540,
	width: 990,
	view: document.querySelector('canvas')
}

export default class App extends Application {
	constructor() {
		super(config);
		Object.assign(this, {
			camera: new Camera(this.screen),
			engine: Engine.create(),
			updatables: []
		});
		this.updatables.push(this.camera);
		loadScene(this, 'example');
		handleCollision(this);
		// this.camera.addChild();
		this.stage.addChild(this.camera);
		this.ticker.add(delta => this.update(delta));
		Engine.run(this.engine);
	}
	update() {
		this.updatables.forEach(asset => {
			asset.update();
		});
	}		
}

const loadScene = (app, sceneTitle) => {
	if (sceneTitle in SceneLoader) {
		app.updatables = [];
		let scene = SceneLoader[sceneTitle]();
		for (const [alias, asset] of Object.entries(scene)) {
			app.camera.addChild(asset);
			if (asset.body) {
				World.add(app.engine.world, asset.body);
			}
			if (asset.update) {
				app.updatables.push(asset);
			}
		}
	} else {
		console.log(`error: scene "${sceneTitle}" does not exist`)
	}
}

const handleCollision = app => {
	Events.on(app.engine, 'collisionStart', e => {
		e.pairs.forEach(pair => {
			const {bodyA: a, bodyB: b} = pair;
		});
	});
	Events.on(app.engine, 'collisionActive', e => {
		e.pairs.forEach(pair => {
			const {bodyA: a, bodyB: b} = pair;
		});
	});
	Events.on(app.engine, 'CollisionEnd', e => {
		e.pairs.forEach(pair => {
			const {bodyA: a, bodyB: b} = pair;
		});
	});
}