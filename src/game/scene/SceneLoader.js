import SceneObject from './SceneObject.js';
import SceneSprite from './SceneSprite.js';

const SceneLoader = {
	example: () => {
		return {
			wall_0: SceneObject.Wall.sandstone(495, 535, 990, 10),
			wall_1: SceneObject.Wall.sandstone(985, 270, 10, 540),
			wall_2: SceneObject.Wall.sandstone(495, 5, 990, 10),
			wall_3: SceneObject.Wall.sandstone(5, 270, 10, 540),
			logo: SceneSprite.Logo(495, 270)
		}
	}
}

export default SceneLoader;