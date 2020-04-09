var Catcher = (function() {
	//Initialize the canvas
	function setUpCanvas() {
		canvas = document.getElementById('feild');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;


		
		if (canvas.getContext) {
			ctx = canvas.getContext('2d');
		}
	}
	
	//Add an enemy to the array of enemies
	function addEnemy() {
		var enemy = new Enemy();
		
		enemy.x = Math.round(Math.random() * canvas.width);
		enemy.y = 0
		enemy.width = 60;
		enemy.height = 60;
		enemy.speed = 7;

		enemy.captured = false;

		enemies.push(enemy);
	}

	//Add an coronavirus to the array of enemies
	function addCoronavirus() {
		var covid = new Coronavirus();

		covid.x = Math.round(Math.random() * canvas.width);
		covid.y = 0
		covid.width = 60;
		covid.height = 60;
		covid.speed = 4;

		covid.captured = false;

		enemies.push(covid);
	}
	
	//Removes an enemy from the specified index in the array of enemies
	function removeEnemy(index) {
		enemies.splice(index, 1);
	}
	
	//Check if player caught an enemy
	function detectCatch(enemy, player) {
		var horizontal;
		var vertical;

		if ((enemy.x + enemy.width) > player.x && enemy.x < (player.x + player.width)) {
			horizontal = true;
		}
		else {
			horizontal = false;
		}
		
		if ((enemy.y + enemy.height) > player.y) {
			vertical = true;
		}
		else {
			vertical = false;
		}

		return horizontal && vertical;
	}
	
	//Handles game logic
	function gameLoop() {
		//Clear screen
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		
		var background = new Image();
		var attackedByCorona = false; // Verify if player was attacked by corona virus

		background.src = 'images/background.jpg';
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.font = "30px Arial";
		ctx.fillText(score, canvas.width-100, 50, canvas.width, canvas.height);
		
		//If a second has passed since an enemy was made, add an enemy then reset lastspawn.
		if (!insane) {
			var mod = score*10;
			if ((new Date().getTime() - lastSpawnCorona) > (2000-mod)) {
				addCoronavirus();
				lastSpawnCorona = new Date().getTime();
			}
			if ((new Date().getTime() - lastSpawn) > (1000-mod)) {
				addEnemy();
				lastSpawn = new Date().getTime();
			}
		}
		else if (insane) {
			addEnemy();
		}
		
		//Update properties of each enemy in the array and draw them.
		for (var i = 0;  i < enemies.length; i++) {
			enemies[i].captured = detectCatch(enemies[i], player)

			if (enemies[i].captured) {
				if (enemies[i].type == 'corona') {
					removeEnemy(i);
					gamePlaying = false;
					attackedByCorona = true;
					break;
				}
				removeEnemy(i);
				score++;

				continue;
			}
			else if ((enemies[i].y + enemies[i].height) > canvas.height) {
				if (enemies[i].type == 'corona') {
					removeEnemy(i);
					//score++;
					continue;
				}
				removeEnemy(i);
				gamePlaying = false;
				console.log('Enemy y: ' + enemies[i].y + '\nEnemy height: ' + enemies[i].height + '\nCanvas height: ' + canvas.height);
				console.log('Enemy y + height: ' + (enemies[i].y + enemies[i].height));
				break;
			}
			else if (enemies[i].x + enemies[i].width > canvas.width) {
				enemies[i].x = canvas.width - enemies.width;
			}
			
			enemies[i].fall();
			enemies[i].draw();	
		}
		
		player.draw();
	
		//If game is still active, keep playing
		if (gamePlaying) {
			window.webkitRequestAnimationFrame(gameLoop);
		}
		else {
			displayScore(attackedByCorona);
		}	
	}
	
	function displayScore(attackedByCorona) {
		var title;
		var text;
		var icon;

		if (!attackedByCorona) {
			title = 'Cuidado!';
			text = `Você pegou ${score} ovos e não foi atingido pelo vírus. Mas lembre-se de respeitar a quarentena e procurar um médico caso sinta algum sintoma.`;
			icon = 'warning';
		} else {
			title = 'Oopss!';
			text = `Você foi atingido pelo Corona vírus. Lembre-se da importância de respeitar a quarentena e manter o isolamento social para o bem estar de todos.`;
			icon = 'error';
		}

		Swal.fire({
			title: title,
			text: text,
			icon: icon,
			confirmButtonText: 'Jogar novamente!'
		}).then((result) => {
			if (result.value) {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				window.location.href = 'index.html';
			}
		})
	}

	function moveOnPhone(e) {
		var touch = e.touches[0]; // Get the information for finger #1
		touchX=touch.pageX-touch.target.offsetLeft;
		touchY=touch.pageY-touch.target.offsetTop;
		player.moveTo(touchX, player.y);
	}
	
	return {
		play: function() {
			gamePlaying = true;
			setUpCanvas();
		
			player = new Bucket(0, canvas.height - 100, 100, 120);
			
			canvas.addEventListener('mousemove', function() {player.moveTo(event.clientX, player.y);}, false);
			canvas.addEventListener('touchstart', moveOnPhone, false);
			canvas.addEventListener('touchmove', moveOnPhone, false);
			gameLoop();
		}
	}
})()

window.onload = Catcher.play;