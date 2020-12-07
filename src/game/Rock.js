import { AnimatedSprite, Loader } from 'pixi.js';
import { Bodies, Body} from 'matter-js';
const loader = Loader.shared;

const Rock = {
	new: (x, y) => {
		let rock = Bodies.rectangle(x, y, 9, 5, {
			label: 'rock lethal',
			isStatic: true
		});
		Object.assign(rock, {
			sprite: new AnimatedSprite([loader.resources['rock_0'].texture, loader.resources['rock_1'].texture])
		});
		initSprite(rock);
		rock.update = () => {
			Body.setPosition(rock, {
				x: rock.position.x,
				y: rock.position.y + 1
			});
			rock.sprite.position.set(rock.position.x, rock.position.y);
		}
		return rock;
	}
}

const initSprite = rock => {
	rock.sprite.anchor.set(0.5);
	rock.sprite.animationSpeed = 0.02;
	rock.sprite.play();
	rock.sprite.position.set(rock.position.x, rock.position.y);
	rock.sprite.roundPixels = true;
	rock.sprite.zIndex = 1;
}

export default Rock;