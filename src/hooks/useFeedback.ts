import { useCallback, useEffect } from "react";
import { useSettingsStore } from "../store/settingsStore";
import hapticService from "../utils/hapticService";
import soundService from "../utils/soundService";

/**
 * useFeedback Hook
 * Combines sound and haptic feedback based on user settings
 */
export function useFeedback() {
    const soundEnabled = useSettingsStore((s) => s.soundEnabled);
    const vibrationEnabled = useSettingsStore((s) => s.vibrationEnabled);

    // Sync service state with settings
    useEffect(() => {
        soundService.setEnabled(soundEnabled);
        hapticService.setEnabled(vibrationEnabled);
    }, [soundEnabled, vibrationEnabled]);

    // Initialize sounds on mount
    useEffect(() => {
        soundService.initialize();
    }, []);

    /**
     * Light tap feedback - for cell selection, subtle touches
     */
    const tap = useCallback(() => {
        soundService.playSounds.tap();
        hapticService.lightTap();
    }, []);

    /**
     * Select feedback - for selecting cells
     */
    const select = useCallback(() => {
        soundService.playSounds.select();
        hapticService.lightTap();
    }, []);

    /**
     * Button press feedback
     */
    const button = useCallback(() => {
        soundService.playSounds.button();
        hapticService.mediumTap();
    }, []);

    /**
     * Correct answer feedback
     */
    const correct = useCallback(() => {
        soundService.playSounds.correct();
        hapticService.success();
    }, []);

    /**
     * Error feedback - wrong number
     */
    const error = useCallback(() => {
        soundService.playSounds.error();
        hapticService.error();
    }, []);

    /**
     * Win/Success feedback
     */
    const win = useCallback(() => {
        soundService.playSounds.win();
        hapticService.success();
    }, []);

    /**
     * Undo feedback
     */
    const undo = useCallback(() => {
        soundService.playSounds.undo();
        hapticService.warning();
    }, []);

    /**
     * Hint feedback
     */
    const hint = useCallback(() => {
        soundService.playSounds.hint();
        hapticService.warning();
    }, []);

    /**
     * Start game feedback
     */
    const start = useCallback(() => {
        soundService.playSounds.start();
        hapticService.success();
    }, []);

    /**
     * Note mode toggle feedback
     */
    const note = useCallback(() => {
        soundService.playSounds.note();
        hapticService.selection();
    }, []);

    /**
     * Erase feedback
     */
    const erase = useCallback(() => {
        hapticService.lightTap();
    }, []);

    return {
        tap,
        select,
        button,
        correct,
        error,
        win,
        undo,
        hint,
        start,
        note,
        erase,
        // Raw services for advanced use
        sound: soundService,
        haptic: hapticService,
    };
}

export default useFeedback;
