import { Loader, Sprite, TilingSprite } from 'pixi.js';
import { Bodies, Body, Vertices } from 'matter-js';
import decomp from 'poly-decomp';
window.decomp = decomp;
const loader = Loader.shared;

const SceneObject = {
	init: {
		sprite: sprite => {
			sprite.anchor.set(0.5);
			sprite.position.set(sprite.body.position.x, sprite.body.position.y);
		}
	},
	Wall: {
		sandstone: (x, y, w, h, a) => {
			const wall = new TilingSprite(loader.resources['wall_sandstone'].texture, w, h);
			wall.body = Bodies.rectangle(x, y, w, h, {
				isStatic: true
			});
			if (a) {
				Body.rotate(wall.body, a * Math.PI / 180);
				wall.rotation = wall.body.angle;
			}
			SceneObject.init.sprite(wall);
			return wall;
		}
	}
};

export default SceneObject;