class SoundHub {
    static CHARACTER_WALK = new Audio('audio/character/characterRun.mp3'); 
    static CHARACTER_DEAD = new Audio('audio/character/characterDead.wav'); 
    static CHARACTER_HURT = new Audio('audio/character/characterDamage.mp3'); 
    static CHARACTER_JUMP = new Audio('audio/character/characterJump.wav'); 
    static CHARACTER_SNORE = new Audio('audio/character/characterSnoring.mp3'); 

    static CHICKEN_DEAD = new Audio('audio/chicken/chickenDead.mp3'); 

    static BOTTLE_HIT = new Audio('audio/throwable/bottleBreak.mp3'); 
    static BOTTLE_COLLECT = new Audio('audio/collectibles/bottleCollectSound.wav'); 
    static COIN_COLLECT = new Audio('audio/collectibles/collectSound.wav'); 

    static ENDBOSS_ATTACK = new Audio('audio/endboss/endbossApproach.wav'); 

    static GAME_START = new Audio('audio/game/gameStart.mp3'); 
    static BG_MUSIC = new Audio('audio/game/mixkit-medieval-show-fanfare-announcement-226.wav')
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
    static isMuted = false;

    static playSound(sound) {
        if (SoundHub.isMuted) {
            return;
        }
        sound.volume = 0.1;

        if (sound === SoundHub.BG_MUSIC) {
            sound.loop = true;
        } else {
            sound.currentTime = 0;
        }
        sound.play();
    }

    static stopAllSounds() {
        SoundHub.isMuted = true;
        SoundHub.allSounds.forEach(sound => {
            sound.muted = true;
        });
    }

    static toggleMute() {
        SoundHub.isMuted = !SoundHub.isMuted;
        SoundHub.allSounds.forEach(sound => {
            sound.muted = SoundHub.isMuted;
        });
        console.log(SoundHub.isMuted);
    }
}