class DrawableObject {
    x = 120;
    y = 280;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

    loadImg(path) { // erstellt ein img mit einer src
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) { // rendert quasi das Objekt in den canvas
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImgs(arr) { // erstellt von einem object ein bild für jedes Element
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) { // zeigt Bild- und Hitboxrahmen an
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();

            // --- Hitbox (rot) ---
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'red';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }

}