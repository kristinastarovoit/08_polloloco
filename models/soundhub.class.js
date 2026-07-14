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
    static BG_MUSIC = new Audio('audio/game/bensound-funkysuspense.mp3')
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
        SoundHub.GAME_START,
        SoundHub.BG_MUSIC
    ];
    static isMuted = false;

    /**
     * Loads the saved mute state from localStorage and applies it
     * to the SoundHub.
     */
    static loadMuteState() {
        const saved = localStorage.getItem('soundhub.isMuted');
        if (saved !== null) {
            SoundHub.isMuted = JSON.parse(saved);
        }
    }

    /**
     * Saves the current mute state to localStorage so it can be restored later.
     */
    static saveMuteState() {
        localStorage.setItem('soundhub.isMuted', JSON.stringify(SoundHub.isMuted));
    }

    /**
     * Plays a sound unless muted. Resets non‑music sounds before playback
     * and configures looping/volume for background music.
     */
    static playSound(sound) {
        if (SoundHub.isMuted) {
            return;
        }
        sound.volume = 0.2;
        if (sound === SoundHub.BG_MUSIC) {
            sound.loop = true;
            sound.volume = 1;
        } else {
            sound.currentTime = 0;
        }
        sound.play();
    }

    /**
     * Stops all registered sounds and resets their playback position.
     */
    static stopAllSounds() {
        SoundHub.allSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    /**
     * Toggles the global mute state, updates all sound objects,
     * saves the preference, and restarts background music when unmuted.
     * The blur() call prevents the space key from re-triggering the mute button
     * after it was clicked (avoids unwanted focus activation).
     */
    static toggleMute() {
        SoundHub.isMuted = !SoundHub.isMuted;
        SoundHub.saveMuteState();
        SoundHub.allSounds.forEach(sound => {
            sound.muted = SoundHub.isMuted;
        });
        if (!SoundHub.isMuted) {
            SoundHub.playSound(SoundHub.BG_MUSIC);
            document.getElementById('unmute_button').classList.add('d_none');
            document.getElementById('mute_button').classList.remove('d_none');
        } else {
            document.getElementById('unmute_button').classList.remove('d_none');
            document.getElementById('mute_button').classList.add('d_none');
        }
        document.getElementById('mute_button').blur();
    }

    /**
     * Fully unmutes all sounds and updates stored preferences.
     */
    static unmuteAll() {
        SoundHub.isMuted = false;
        SoundHub.saveMuteState();
        SoundHub.allSounds.forEach(sound => {
            sound.muted = false;
        });
    }
}