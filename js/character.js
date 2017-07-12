//Requires input.js

(function() {

	function Character(url, data, x, y, scale) {
		this.url = url;

		this.sw = data.width;
		this.sh = data.height;
		this.frames = data.frames;

		this._spriteToRender = {};
		this._spriteToRender.sw = this.sw;
		this._spriteToRender.sh = this.sh;
		this._spriteToRender.sx = 0;
		this._spriteToRender.sy = 0;
		
		this._animationTime;
		this._currentFrame = 0;
		this._tDistance = 0;

		this.x = x;
		this.y = y;
		this.scale = scale;

		this.isMoiving = false;
		this.animationDone = true;
	}

	Character.prototype.update = function(dt) {

		var dir = _moveMentCheck();

		if (dir.x != 0 || dir.y != 0) {
			this.isMoving = true;
		} else {
			this.isMoving = false;
		}

		// console.log(this._animationTime);
		// console.log(this.isMoving);

		if (!this.animationDone) {

			this._animationTime += dt;
			// console.log("Animation Time: " + this._animationTime);
			// Continue Animating until it is done.

			if (this._animationTime >= this.frames[this._currentFrame].duration) {

				var currentFrameData = this.frames[this._currentFrame];
				this._animationTime -= currentFrameData.duration;
				var skipTDistance = false;

				// console.log("Current Frame: " + this._currentFrame);
				
				switch (currentFrameData.type) {
					case "I":
					case "M":
					case "F":
						this._currentFrame++;
						break;
					case "C":
						if (this.isMoving) {
							this._currentFrame = currentFrameData.cFrameID;
						} else {
							this._currentFrame++;
						}
						break;
					case "D":
						this._currentFrame = 0;
						this._animationTime = 0;
						this.animationDone = true;
						// this._tDistance = currentFrameData.tDistance;
						// skipTDistance = true;
						break;
					case "T":
						if (this.isMoving) {
							this._currentFrame = currentFrameData.cFrameID;
							this._tDistance = currentFrameData.tDistance;
							skipTDistance = true;
						} else {
							this._currentFrame++;
						}
						break;
					default:
						break;

				}

				// if (this.frames[this._currentFrame].type == "D") {
				// 	this._currentFrame = 0;
				// 	this._animationTime = 0;
				// 	this.animationDone = true;
				// }
				
				this._updateRender(this._currentFrame, skipTDistance);
			}

		} else {
			if (this.isMoving) {
				this.animationDone = false;
			}else {
				this._animationTime = 0;
			}
		}
	}

	Character.prototype._updateRender = function(currentFrame, skipTDistance) {

		// console.log(currentFrame);

		if (!skipTDistance) {
			this.x += this.frames[currentFrame].distance * this.scale;	
		} else {
			this.x += (this.frames[currentFrame].distance + this._tDistance) * this.scale;
			this._tDistance = 0;
		}
		
		this._spriteToRender.sx = this.sw * this.frames[currentFrame].sID;
		this._spriteToRender.sy = 0;
	}

	Character.prototype.render = function(ctx, interp) {

		ctx.mozImageSmoothingEnabled = false;
		ctx.webkitImageSmoothingEnabled = false;
		ctx.msImageSmoothingEnabled = false;
		ctx.imageSmoothingEnabled = false;

		var w = this._spriteToRender.sw * this.scale;
		var h = this._spriteToRender.sh * this.scale;

		ctx.drawImage(resources.get(this.url),
						this._spriteToRender.sx, this._spriteToRender.sy,
						this._spriteToRender.sw, this._spriteToRender.sh, 
						this.x, this.y, w, h);

		// [TODO] 
		// 1. An animation state controller DONE!
		// 1a. Support All Four Directions.
		// 2. Add support for keyframe and fillframes. (The idea is that when resources allowed, fillframes will display, and when not, only keyframes will display)
		// 3. Collision Box
		// 5. An external editor that allows easier animation control
		
		// if (this._animationTime > currentFrameDuration) {
		// 	this._animationTime -= currentFrameDuration;
		// 	this._currentFrame++;
		// 	if (this._currentFrame >= this.frames.length) {
		// 		this._currentFrame = 0;
		// 	}
		// 	var distance = this.frames[this._currentFrame].distance;
		// 	this.x += distance * this.scale;
		// }

		// // console.log(this._currentFrame);

		// var sw = 4;
		// var sh = 9;
		// var sx = 4 * this._currentFrame;
		// var sy = 0;

		// var w = this.scale * sw;
		// var h = this.scale * sh;

		// ctx.drawImage(resources.get(this.url),
		// 				sx, sy, sw, sh, 
		// 				this.x, this.y, w, h);
		
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