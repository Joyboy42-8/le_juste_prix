// Etape 1 - Sélectionner nos éléments
let input = document.getElementById("prix");
let error = document.querySelector("small");
let formulaire = document.getElementById("formulaire");
let instructions = document.getElementById("instructions");
let modal = document.querySelector(".modal");
let yes = document.getElementById("yes");
let no = document.getElementById("no");
let close = document.getElementById("close");

// Etape 2 - Cacher l'erreur
error.style.display = "none";

// Etape 3 - Générer un nombre aléatoire
let nombreAleatoire = Math.floor(Math.random() * 1001);
let coups = 0;
let nombreChoisi;

// Etape 7 - Proposer à l'utilisateur de rejouer
function rejouer() {
	modal.style.display = "grid";
	no.addEventListener("click", () => {
		modal.style.display = "none";
	});
	yes.addEventListener("click", () => {
        input.disabled = false;
        modal.style.display = "none";
		instructions.innerHTML = "";
	});
}

// Etape 6 - Créer la fonction vérifier
function verifier(nombre) {
	let instruction = document.createElement("div");
	if (nombre < nombreAleatoire) {
		instruction.innerHTML = `#${coups} (${nombreChoisi}) C'est plus !`;
		instruction.className = "instruction plus";
	} else if (nombre > nombreAleatoire) {
		instruction.innerHTML = `#${coups} (${nombreChoisi}) C'est moins !`;
		instruction.className = "instruction moins";
	} else if (nombre == nombreAleatoire) {
		instruction.innerHTML = `#${coups} (${nombreChoisi}) Félicitations vous avez gagné !`;
		instruction.className = "instruction fini";
		input.disabled = true;
		// Confetti JS
		const duration = 3 * 1000,
			animationEnd = Date.now() + duration,
			defaults = {
				startVelocity: 30,
				spread: 360,
				ticks: 60,
				zIndex: 0,
			};

		function randomInRange(min, max) {
			return Math.random() * (max - min) + min;
		}

		const interval = setInterval(function () {
			const timeLeft = animationEnd - Date.now();

			if (timeLeft <= 0) {
				return clearInterval(interval);
			}

			const particleCount = 50 * (timeLeft / duration);

			// since particles fall down, start a bit higher than random
			confetti(
				Object.assign({}, defaults, {
					particleCount,
					origin: {
						x: randomInRange(0.1, 0.3),
						y: Math.random() - 0.2,
					},
				})
			);
			confetti(
				Object.assign({}, defaults, {
					particleCount,
					origin: {
						x: randomInRange(0.7, 0.9),
						y: Math.random() - 0.2,
					},
				})
			);
		}, 250);
		setTimeout(rejouer, 2000);
	}
	instructions.prepend(instruction);
}

// Etape 4 - Vérifier que l'utilisateur donne bien un nombre
input.addEventListener("keyup", () => {
	if (isNaN(input.value)) {
		error.style.display = "block";
	} else {
		error.style.display = "none";
	}
});

// Etape 5 - Agir à l'envoi du formulaire
formulaire.addEventListener("submit", (e) => {
	e.preventDefault();
	if (isNaN(input.value) || input.value == "") {
		input.style.borderColor = "crimson";
		input.style.outlineColor = "crimson";
	} else {
		coups++;
		input.style.borderColor = "gray";
		input.style.outlineColor = "gray";
		nombreChoisi = input.value;
		input.value = "";
		verifier(nombreChoisi);
	}
});
