var ENEMY_START_X = -150;
var win_state = false;
var CHECK_COLLISION_Y_TOL = 0;
var CHECK_COLLISION_X_PASS_TOL = 0;
var CHECK_COLLISION_X_INTERSECT_TOL = 30;
var ENEMY_WIDTH = 101;
var PLAYER_WIDTH = 101;

var Entity = function(sprite, x, y){
    this.sprite = sprite;
    this.x = x;
    this.y = y;
};
Entity.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


var Enemy = function(sprite, x, y, speed){
    Entity.call(this, sprite, x, y);
    this.speed = speed;
};

Enemy.prototype = Object.create(Entity.prototype);
Enemy.prototype.constructor = Enemy;
Enemy.prototype.update = function(dt){
    this.x = this.x + dt * this.speed;
    if(this.x > 700) {
	this.x = ENEMY_START_X;
	newRow = Math.floor((Math.random() * 3) + 2);
	this.y = newRow * 83 - 106;
    }
};
Enemy.prototype.checkCollisions = function(entity){
    if (Math.abs(player.y - this.y)  <= CHECK_COLLISION_Y_TOL && player.x + PLAYER_WIDTH - this.x >= CHECK_COLLISION_X_PASS_TOL) {
	if (this.x + ENEMY_WIDTH - player.x >= CHECK_COLLISION_X_INTERSECT_TOL && player.x + PLAYER_WIDTH - this.x >= CHECK_COLLISION_X_INTERSECT_TOL) {
	    return true;
	} else {
	    return false;
	}
    } else {
	return false;
    }

};

var Player = function(sprite, x, y){
    Entity.call(this, sprite, x, y);
};
Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function(){
    if (this.y < 60) {
	if (win_state == false) {
	    console.log('you win');
	    win_state = true;
	}
    }
};
Player.prototype.dies = function(){
    this.x = 202;
    this.y = 392;
}
Player.prototype.handleInput = function(input){
    switch (input) {
	case 'up':
	    if (this.y >= 60) {
		this.y = this.y - 83;
	    }
	    break;
	case 'down':
	    if (this.y <= 309) {
		this.y = this.y + 83;
	    }
	    break;
	case 'left':
	    if (this.x >= 101) {
		this.x = this.x - 101;
	    }
	    break;
	case 'right':
	    if (this.x <= 303) {
		this.x = this.x + 101;
	    }
	    break;
	default:
	    console.log('not allowed');
    }
};

var allEnemies = [];
for (var i = 0; i < 1; i++) {
    randomStart = Math.floor((Math.random() * 101));
    randomRow = Math.floor((Math.random() * 3) + 2);
    randomSpeed = Math.floor((Math.random() * 600) + 200);
    allEnemies.push(new Enemy('images/char-horn-girl.png',
			      ENEMY_START_X + randomStart,
			      randomRow * 83 - 106,
			      randomSpeed));
}

var player = new Player('images/enemy-bug.png', 202, 392);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
