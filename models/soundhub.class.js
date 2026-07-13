class SoundHub {
    static CHARACTER_WALK = new Audio('audio/character/characterRun.mp3'); // check
    static CHARACTER_DEAD = new Audio('audio/character/characterDead.wav'); //check
    static CHARACTER_HURT = new Audio('audio/character/characterDamage.mp3'); // check
    static CHARACTER_JUMP = new Audio('audio/character/characterJump.wav'); //check
    static CHARACTER_SNORE = new Audio('audio/character/characterSnoring.mp3'); //check

    static CHICKEN_DEAD = new Audio('audio/chicken/chickenDead.mp3'); // check
    // chicken hurt

    static BOTTLE_HIT = new Audio('audio/throwable/bottleBreak.mp3'); // check
    static BOTTLE_COLLECT = new Audio('audio/collectibles/bottleCollectSound.wav'); //check
    static COIN_COLLECT = new Audio('audio/collectibles/collectSound.wav'); // check

    static ENDBOSS_ATTACK = new Audio('audio/endboss/endbossApproach.wav'); // check

    static GAME_START = new Audio('audio/game/gameStart.mp3'); // check

    static allSounds = [
        SoundHub.CHARACTER_WALK,
        SoundHub.CHARACTER_DEAD,
        SoundHub.CHARACTER_HURT,
        SoundHub.CHARACTER_JUMP,
        SoundHub.CHARACTER_SNORE,
        SoundHub.CHICKEN_DEAD,
        SoundHub.BOTTLE_HIT,
        SoundHub.BOTTLE_COLLECT,
        SoundHub.COIN_COLLECT,
        SoundHub.ENDBOSS_ATTACK,
        SoundHub.GAME_START
    ];



    // Spielt eine einzelne Audiodatei ab
    static playSound(sound) {  // instrumentId nur wichtig für die Visualisierung
        sound.volume = 0.2;  // Setzt die Lautstärke auf 0.2 = 20% / 1 = 100%
        sound.currentTime = 0;  // Startet ab einer bestimmten stelle (0=Anfang/ 5 = 5 sec.)
        sound.play();  // Spielt das übergebene Sound-Objekt ab
    }


    // Stoppt das Abspielen aller Audiodateien
    static stopAllSounds() {
        SoundHub.allSounds.forEach(sound => {
            // sound.pause();  // Pausiert jedes Audio in der Liste
            sound.muted = true;
        });
        // document.getElementById('volume').value = 0.2;  // Setzt den Sound-Slider wieder auf 0.2

    }

    // static stopAllSounds() {
    //     // SoundHub.isMuted = !SoundHub.isMuted;
    //     SoundHub.allSounds.forEach(sound => {
    //         sound.muted = true;
    //         // sound.muted = SoundHub.isMuted;
    //         // sound.pause();  // Pausiert jedes Audio in der Liste
    //         // if (!sound.muted) {
    //         //     sound.muted = true;
    //         // } else if (sound.muted) {
    //         //     sound.muted = false;
    //         // }
    //     }); }
    }