//Requires input.js

(function() {

	//Can this sprite width and height be a series of number?

	/*
		Drifter = new Character("img/eoe.gif", {idle: idleSpriteChain, run: runSpriteChain})
	*/

	/* This is not very helpful
	function SpriteChain(width, height, dir, number) {
		this.width = width;
		this.height = height;
		this.dir = dir;
		this.number = number;
	}

	SpriteCahin.prototype.render = function (url) {
		ctx.drawImage(resources.get(url),
                          0, 0,
                          this.width, this.height,
                          0, 0,
                          this.size[0], this.size[1]))
	}

	function Character(spriteUrl, spriteChains) {
		this.spriteUrl = spriteUrl;
		this.spriteChains = spriteChains;
	}

	Character.prototype.render = function(chain) {
		this.spriteChains[chain].render(this.spriteUrl);
	}

	// console.log(interp);

	var currentFrame;
	var dir = _moveMentCheck();

	if (this.animation.frames > 1) {
		if (dir.x != 0 || dir.y != 0) {
			var flatIndex = this.animation._frameIndex / (1000 / this.animation.fps);
			// console.log("Flat Index: " + flatIndex);
			currentFrame = Math.floor(flatIndex % this.animation.frames);
			// console.log("Current Frame: " + currentFrame);
		}
		else {
			currentFrame = 0;
		}
		
		// console.log(currentFrame);
	}

	var x = -1;
	var y = 0;
	x += currentFrame * this.size[0];

	// ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
	if (this.sprite.dir == 0) {
		ctx.drawImage(resources.get(this.sprite.url),
		              x, y,
		              this.size[0], this.size[1],
		              this.pos.x, this.pos.y,
		              this.size[0], this.size[1]);
	}else {
		ctx.save();

		ctx.translate(this.pos.x + this.size[0] / 2, this.pos.y + this.size[1] / 2);
		ctx.scale(-1, 1);
		
		ctx.drawImage(resources.get(this.sprite.url),
		              x, y,
		              this.size[0], this.size[1],
		              -this.size[0]/2, -this.size[1]/2,
		              this.size[0], this.size[1]);
		
		
		ctx.restore();
	}
	
	*/

	function Character(url, frames, x, y, scale) {
		this.url = url;
		this.frames = frames;
		this._animationTime;
		this._currentFrame = 0;
		this.x = x;
		this.y = y;
		this.scale = scale;
	}

	Character.prototype.update = function(dt) {

		var dir = _moveMentCheck();

		if (dir.x != 0 || dir.y != 0) {
			this._animationTime += dt;
		} 
		else {
			this._animationTime = 0;
		}

	}

	Character.prototype.render = function(ctx, interp) {

		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;

		var currentFrameDuration = this.frames[this._currentFrame].duration;

		if (this._animationTime > currentFrameDuration) {
			this._animationTime -= currentFrameDuration;
			this._currentFrame++;
			if (this._currentFrame >= this.frames.length) {
				this._currentFrame = 0;
			}
			var distance = this.frames[this._currentFrame].distance;
			this.x += distance * this.scale;
		}

		// console.log(this._currentFrame);

		var sw = 4;
		var sh = 9;
		var sx = 4 * this._currentFrame;
		var sy = 0;

		var w = this.scale * sw;
		var h = this.scale * sh;

		ctx.drawImage(resources.get(this.url),
						sx, sy, sw, sh, 
						this.x, this.y, w, h);
		
	}

	function _moveMentCheck() {

		var x = y = 0;

		if (input.isDown("RIGHT")) {
			x++;
		}
		if (input.isDown("LEFT")) {
			x--;
		}
		if (input.isDown("UP")) {
			y--;
		}
		if (input.isDown("DOWN")) {
			y++;
		}

		return {x, y};

	}

	window.Character = Character;
	
})();