import { Audio } from "expo-av";
import { Sound } from "expo-av/build/Audio";

/**
 * Sound Service
 * Manages sound playback for the Sudoku game
 */

// Sound file mapping
const SOUND_FILES = {
    tap: require("../assets/sounds/tap.mp3"),
    correct: require("../assets/sounds/correct.mp3"),
    error: require("../assets/sounds/error.mp3"),
    select: require("../assets/sounds/select.mp3"),
    win: require("../assets/sounds/win.mp3"),
    button: require("../assets/sounds/button.mp3"),
    undo: require("../assets/sounds/undo.mp3"),
    hint: require("../assets/sounds/hint.mp3"),
    start: require("../assets/sounds/start.mp3"),
    note: require("../assets/sounds/note.mp3"),
};

export type SoundName = keyof typeof SOUND_FILES;

// Preloaded sounds cache
const soundCache: Map<SoundName, Sound> = new Map();

let isEnabled = true;
let isInitialized = false;

/**
 * Initialize sound system
 */
export const initializeSounds = async (): Promise<void> => {
    if (isInitialized) return;

    try {
        await Audio.setAudioModeAsync({
            playsInSilentModeIOS: false,
            staysActiveInBackground: false,
            shouldDuckAndroid: true,
        });
        isInitialized = true;
    } catch (error) {
        console.warn("Failed to initialize audio:", error);
    }
};

/**
 * Preload a specific sound
 */
const preloadSound = async (name: SoundName): Promise<Sound | null> => {
    const soundFile = SOUND_FILES[name];
    if (!soundFile) return null;

    try {
        const { sound } = await Audio.Sound.createAsync(soundFile, {
            shouldPlay: false,
        });
        soundCache.set(name, sound);
        return sound;
    } catch (error) {
        console.warn(`Failed to preload sound ${name}:`, error);
        return null;
    }
};

/**
 * Preload all sounds for faster playback
 */
export const preloadAllSounds = async (): Promise<void> => {
    await initializeSounds();

    const loadPromises = Object.keys(SOUND_FILES).map((name) =>
        preloadSound(name as SoundName),
    );

    await Promise.allSettled(loadPromises);
};

/**
 * Play a sound by name
 */
export const playSound = async (name: SoundName): Promise<void> => {
    if (!isEnabled) return;

    const soundFile = SOUND_FILES[name];
    if (!soundFile) {
        // Sound file not yet added
        return;
    }

    try {
        await initializeSounds();

        // Try to use cached sound first
        let sound = soundCache.get(name);

        if (sound) {
            // Reset and replay
            await sound.setPositionAsync(0);
            await sound.playAsync();
        } else {
            // Load and play
            const { sound: newSound } = await Audio.Sound.createAsync(soundFile, {
                shouldPlay: true,
            });
            soundCache.set(name, newSound);
        }
    } catch (error) {
        console.warn(`Failed to play sound ${name}:`, error);
    }
};

/**
 * Set sound enabled state
 */
export const setSoundEnabled = (enabled: boolean): void => {
    isEnabled = enabled;
};

/**
 * Check if sound is enabled
 */
export const isSoundEnabled = (): boolean => isEnabled;

/**
 * Unload all sounds (cleanup)
 */
export const unloadAllSounds = async (): Promise<void> => {
    const unloadPromises = Array.from(soundCache.values()).map((sound) =>
        sound.unloadAsync().catch(() => { }),
    );

    await Promise.allSettled(unloadPromises);
    soundCache.clear();
    isInitialized = false;
};

// Convenience functions for common sounds
export const playSounds = {
    tap: () => playSound("tap"),
    correct: () => playSound("correct"),
    error: () => playSound("error"),
    select: () => playSound("select"),
    win: () => playSound("win"),
    button: () => playSound("button"),
    undo: () => playSound("undo"),
    hint: () => playSound("hint"),
    start: () => playSound("start"),
    note: () => playSound("note"),
};

export const soundService = {
    initialize: initializeSounds,
    preloadAll: preloadAllSounds,
    play: playSound,
    playSounds,
    setEnabled: setSoundEnabled,
    isEnabled: isSoundEnabled,
    unloadAll: unloadAllSounds,
};

export default soundService;
