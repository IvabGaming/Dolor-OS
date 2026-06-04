// Global variable for the Web Audio API context
let audioCtx = null;

/**
 * Initializes the audio context on demand (browser security requirement)
 */
function initAudio() {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
}

/**
 * Plays a single, clean electronic beep tone
 * @param {number} frequency - Pitch in Hz (e.g., 880)
 * @param {number} startTime - Precise audio context clock time to start playing
 * @param {number} duration - How long the note lasts in seconds
 */
function playTone(frequency, startTime, duration) {
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    // 'sine' wave creates a pure, clean electronic beep
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, startTime);

    // Volume Envelope: Start at 25% volume, then fade quickly to prevent pops
    gainNode.gain.setValueAtTime(0.25, startTime);
    gainNode.gain.setValueAtTime(0.25, startTime + duration - 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

    osc.start(startTime);
    osc.stop(startTime + duration);
}

/**
 * Main function to call when your HTML timer reaches zero.
 * Plays a sharp, premium double-beep alarm pattern.
 */
function playTimerAlarm() {
    initAudio();

    // Wake up audio context if suspended by browser security
    if (audioCtx.state === 'suspended') {
        audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    
    // Beep 1: 880Hz (High A note), lasts 0.12 seconds, plays immediately
    playTone(880, now, 0.12);
    
    // Beep 2: 880Hz, lasts 0.12 seconds, plays after a tiny 0.08 second gap
    playTone(880, now + 0.20, 0.12);
}
