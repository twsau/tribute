import { AnimatedSprite, Container, Loader, Sprite } from 'pixi.js';
import { Bodies, Composite } from 'matter-js';
const loader = Loader.shared;

export default class Bg extends Container {
	constructor() {
		super();
		Object.assign(this, {
			bounds:  Composite.create(),
			water: new AnimatedSprite([
				loader.resources['water_0'].texture,
				loader.resources['water_1'].texture,
				loader.resources['water_2'].texture,
				loader.resources['water_3'].texture,
				loader.resources['water_4'].texture,
				loader.resources['water_5'].texture,
				loader.resources['water_6'].texture,
				loader.resources['water_5'].texture,
				loader.resources['water_4'].texture,
				loader.resources['water_3'].texture,
				loader.resources['water_2'].texture,
				loader.resources['water_1'].texture
			])
		});
		Composite.add(this.bounds, Bodies.rectangle(5, 48, 10, 96, {
			isStatic: true
		}));
		Composite.add(this.bounds, Bodies.rectangle(91, 48, 10, 96, {
			isStatic: true
		}));
		this.water.y = -96;
		this.water.animationSpeed = 0.05;
		this.water.play();
		this.banks = new Sprite(loader.resources['banks'].texture);
		this.addChild(this.water, this.banks);
	}
	update() {
		if (this.water.y == 0) {
			this.water.y = -96;
		} else {
			this.water.y += 1;
		}
	}
}