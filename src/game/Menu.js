import { Container, Graphics, Loader, Text, Sprite } from 'pixi.js';
const loader = Loader.shared;

export default class Menu extends Container {

	constructor() {
		super();
		Object.assign(this, {
			x: 0,
			y: 0,
			w: 96,
			h: 96
		});
		Object.assign(this, {
			logo: element.logo(this),
			bg: element.bg({x: 0, y: 0, w: 96, h: 96}),
			play: () => {
				this.visible = false;
			},
			screens: {
				main: screen.main(this),
				highscores: screen.highscores(this),
				options: screen.options(this),
			}
		});
		this.addChild(this.bg, this.logo);
		for (const [key, value] of Object.entries(this.screens)) {
			this.addChild(value);
		}
		this.zIndex = 100
	}

	update(time) {
		this.bg.clear().beginFill(0x3B8253).drawRect(this.x, this.y, this.w, this.h).endFill();
		for (let x = 0; x < this.w / this.bg.size + 2; x++) {
			for (let y = 0; y < this.h / this.bg.size + 2; y++) {
				let p = {
					x: x * this.bg.size + Math.cos(time + y) * -this.bg.size / 2,
					y: y * this.bg.size + Math.sin(time + y) * this.bg.size / 2,
					r: 1 + Math.sin(time) * Math.sin(x - y),
					o: Math.sin(Math.sin(x * y)) * Math.sin(time) * 0.5
				};
				this.bg.lineStyle(1, 0x89B6C1, 0.4 + p.o).beginFill(0xB8C5DD, p.o).arc(p.x, p.y, p.r, 0, Math.PI * 2).endFill();
			}
		}
	}
}

const display = (screen, menu) => {
		if (screen == 'play') {
			menu.play();
			menu.visible = false;
		} else {
			for (const [key, value] of Object.entries(menu.screens)) {
				value.visible = key == screen ? true : false;
			}
		}
	}

	const element = {
		border: menu => {
			let border = new Graphics();
			border.lineStyle(1, 0xB8C5DD).beginFill(0x202103, 0.5).drawRect(menu.w / 2 - 35, 0, 70, 20);
			return border;
		},
		button: (content, callback, menu) => {
			let button = new Container();
			button.interactive = true;
			button.on('pointerdown', e => {
				callback(content, menu);
			});
			let border = element.border(menu);
			let text = element.text(content, menu);
			button.addChild(border, text);
			return button;
		},
		logo: menu => {
			let logo = new Sprite(loader.resources['logo'].texture);
			logo.anchor.set(0.5);
			logo.position.set(menu.w / 2, 10);
			return logo;
		},
		bg: bounds => {
			let bg = new Graphics();
			bg.size = bounds.w > bounds.h ? bounds.w / 20 : bounds.h / 15;
			return bg;
		},
		text: (content, menu) => {
			let text = new Text(content, config.textStyle);
			text.anchor.set(0.5);
			text.position.set(menu.w / 2, 10);
			return text;
		}
	}

	const screen = {
		build: (screen, items) => {
			let i = 0;
			for (const [key, value] of Object.entries(items)) {
				value.y = 30 + i * 25;
				i++;
				screen.addChild(value);
			}
			return screen;
		},
		dead: menu => {
			let dead = new Container();
			dead.visible = false;
			let items = {
				msg: element.text('you died', menu),
				suggest: element.text('refresh the page to try again', menu)
			};
			return screen.build(dead, items);
		},
		highscores: menu => {
			let highscores = new Container();
			highscores.visible = false;
			let items = {
				main: element.button('main', display, menu)
			};
			return screen.build(highscores, items);
		},
		main: menu => {
			let main = new Container();
			let items = {
				play: element.button('play', display, menu),
				options: element.button('options', display, menu),
			};
			return screen.build(main, items);
		},
		options: menu => {
			let options = new Container();
			options.visible = false;
			let items = {
				save: element.button('main', display, menu)
			};
			return screen.build(options, items);
		}
	}


	const config = {
		textStyle: {fill: 0xB8C5DD, fontFamily: 'Press Start 2P', fontSize: 9}
	}