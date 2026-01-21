import * as Haptics from "expo-haptics";

/**
 * Haptic Feedback Service
 * Provides centralized haptic feedback management
 */

let isEnabled = true;

/**
 * Set haptic feedback enabled state
 */
export const setHapticEnabled = (enabled: boolean) => {
    isEnabled = enabled;
};

/**
 * Check if haptic is enabled
 */
export const isHapticEnabled = () => isEnabled;

/**
 * Light tap - for subtle interactions like cell selection
 */
export const lightTap = async () => {
    if (!isEnabled) return;
    try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
        // Haptics not available on this device
    }
};

/**
 * Medium tap - for button presses
 */
export const mediumTap = async () => {
    if (!isEnabled) return;
    try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch (error) {
        // Haptics not available
    }
};

/**
 * Heavy tap - for important actions
 */
export const heavyTap = async () => {
    if (!isEnabled) return;
    try {
        await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
        // Haptics not available
    }
};

/**
 * Success notification - for winning, correct answers
 */
export const successNotification = async () => {
    if (!isEnabled) return;
    try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
        // Haptics not available
    }
};

/**
 * Error notification - for wrong answers
 */
export const errorNotification = async () => {
    if (!isEnabled) return;
    try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    } catch (error) {
        // Haptics not available
    }
};

/**
 * Warning notification - for hints, undo
 */
export const warningNotification = async () => {
    if (!isEnabled) return;
    try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    } catch (error) {
        // Haptics not available
    }
};

/**
 * Selection changed - for toggles, mode switches
 */
export const selectionChanged = async () => {
    if (!isEnabled) return;
    try {
        await Haptics.selectionAsync();
    } catch (error) {
        // Haptics not available
    }
};

export const hapticService = {
    setEnabled: setHapticEnabled,
    isEnabled: isHapticEnabled,
    lightTap,
    mediumTap,
    heavyTap,
    success: successNotification,
    error: errorNotification,
    warning: warningNotification,
    selection: selectionChanged,
};

export default hapticService;
