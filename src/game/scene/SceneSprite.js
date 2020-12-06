import { Loader, Sprite, TilingSprite } from 'pixi.js';
const loader = Loader.shared;

const SceneSprite = {
	init: {
		sprite: (sprite, x, y) => {
			sprite.anchor.set(0.5);
			sprite.position.set(x, y);
		}
	},
	Logo: (x, y) => {
		let logo = new Sprite(loader.resources['logo'].texture);
		SceneSprite.init.sprite(logo, x, y);
		return logo;
	},
	Wall: {
		sandstone: (x, y, w, h, a) => {
			let wall = new TilingSprite(loader.resources['wall_sandstone'].texture, w, h);
			if (a) {
				wall.angle = a;
			}
			SceneSprite.init.sprite(wall, x, y);
			return wall;
		}
	}
}

export default SceneSprite;