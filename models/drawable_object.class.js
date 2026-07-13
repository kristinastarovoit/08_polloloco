class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

    /**
    * Loads a single image and assigns it to the object's main sprite.
    */
    loadImg(path) { 
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) { 
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Preloads multiple images and stores them in the object's cache
     * for fast access during animations.
     */
    loadImgs(arr) { 
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Cycles through a list of animation frames and updates the
     * object's current image based on the animation index.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

}