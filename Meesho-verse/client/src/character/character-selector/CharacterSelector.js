import Ami from "../Ami.js";
import Helen from "../Helen.js";
import Remy from "../Remy.js";
import Henry from "../Henry.js";
import camera from "../../env/Camera.js";
import loopMachine from "../../env/LoopMachine.js";
import scene from "../../env/Scene.js";
import player from "./Player.js";

const characters = {
	Ami: {
		name: "Ami",
		getter: Ami,
	},
	Helen: {
		name: "Helen",
		getter: Helen,
	},
	Remy: {
		name: "Remy",
		getter: Remy,
	},
	Henry: {
		name: "Henry",
		getter: Henry,
	},
};

const ch = characters.Remy;

class CharacterSelector {
	constructor() {
		document.querySelector("canvas").style.background =
			"linear-gradient(to bottom right, #a4c5c7, #2d3f48)";
		scene.add(new THREE.AmbientLight("white", 1));
		this.root = null;
		this.selector = fetch("src/UI/characterSelector.html").then((response) =>
			response.text()
		);
		this.selector.then((html) => {
			this.root = document.createElement("div");
			this.root.innerHTML = html;
			this.root.style.display = "none";
			// this.root.querySelector("button").style.display = "none";
			document.body.appendChild(this.root);
		});
		this.character = null;
	}

	cameraSpinOut = () => {
		camera.rotation.y += 0.05;
		if (camera.rotation.y >= Math.PI / 2) {
			loopMachine.removeCallback(this.cameraSpinOut);
			console.log(this.character);
			this.loadCharacter();
			camera.rotation.y = -Math.PI * 1.75;
		}
	};

	cameraSpinIn = () => {
		camera.rotation.y -= 0.03;
		if (camera.rotation.y <= -Math.PI * 2) {
			loopMachine.removeCallback(this.cameraSpinIn);
			camera.rotation.y = 0;
			this.root.querySelector("button").style.display = "block";
		}
	};

	loadCharacter() {
		this.character.getter.then((mesh) => {
			mesh.scale.set(0.01, 0.01, 0.01);
			scene.add(mesh);
			mesh.name = this.character.name;
			player.setUser(mesh);
			loopMachine.addCallback(this.cameraSpinIn);
		});
	}

	start() {
		this.selector.then(() => {
			// this.root.querySelector("ul").innerHTML = "";
			// console.log("hdfdf ", characters.);
			// Object.entries(characters).forEach((character) => {
			// 	const li = document.createElement("li");
			// 	li.innerHTML = character[1].name;
			// 	// console.log(character[0]);
			// 	console.log(character[1]);
			// 	li.style.backgroundImage = `url(assets/Images/${character[0]}.png)`;
			// 	li.addEventListener("click", () => {
			// 		this.character = character[1];
			// 		this.root.querySelector("button").style.display = "none";
			// 		loopMachine.addCallback(this.cameraSpinOut);
			// 	});
			// 	this.root.querySelector("ul").append(li);
			// });

			this.root.querySelector("button").style.display = "none";
			// const li = document.createElement("li");
			// li.innerHTML = ch.name;
			console.log(ch);
			// li.style.backgroundImage = `url(assets/Images/${ch.name}.png)`;
			// li.addEventListener("click", () => {});
			// this.root.querySelector("ul").append(li);
			this.root.querySelector(".button").addEventListener("change", () => {
				const imge = document.createElement("div");
				imge.className = "image-ct";
				imge.style.background = `url(images/image.jpg) no-repeat`;
				imge.style.position = "fixed";
				imge.style.width = "100%";
				imge.style.height = "100%";
				imge.style.zIndex = "100";

				this.root.querySelector(".character-selector").appendChild(imge);
				console.log("Hello  ");
				this.root.querySelector(".button").style.display = "none";
				setTimeout(() => {
					this.character = ch;
					this.root.querySelector("button").style.display = "inline";
					loopMachine.addCallback(this.cameraSpinOut);
					this.root.querySelector(".image-ct").style.display = "none";
				}, 5000);
			});

			this.root.querySelector("button").addEventListener("click", () => {
				this.root.querySelector("button").style.display = "none";
				window.location.replace(`./meta.html?character=${ch.name}`);
			});

			this.root.style.display = "block";
		});
		return this.selector;
	}

	stop() {
		this.root.style.display = "none";
	}
}

const characterSelector = new CharacterSelector();
export default characterSelector;
export { CharacterSelector };
