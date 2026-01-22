import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Platform, Pressable, StyleSheet, Switch, View } from "react-native";
import { useSettingsStore } from "../../store/settingsStore";
import { useTheme } from "../../styles/ThemeContext";
import hapticService from "../../utils/hapticService";
import { ThemedText } from "../ui/ThemedText";

interface GameSettingsModalProps {
    visible: boolean;
    onClose: () => void;
}

export const GameSettingsModal: React.FC<GameSettingsModalProps> = ({
    visible,
    onClose,
}) => {
    const { theme } = useTheme();
    const {
        soundEnabled,
        toggleSound,
        vibrationEnabled,
        toggleVibration,
        errorHighlight,
        toggleErrorHighlight,
    } = useSettingsStore();
    const styles = createStyles(theme);
    const colors = theme.colors as any;

    const handleClose = () => {
        hapticService.lightTap();
        onClose();
    };

    const SettingRow = ({
        icon,
        label,
        value,
        onToggle,
    }: {
        icon: string;
        label: string;
        value: boolean;
        onToggle: () => void;
    }) => (
        <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
                <View style={styles.iconBox}>
                    <Ionicons name={icon as any} size={20} color={colors.primary} />
                </View>
                <ThemedText variant="body" weight="bold">
                    {label}
                </ThemedText>
            </View>
            <Switch
                value={value}
                onValueChange={() => {
                    hapticService.selection();
                    onToggle();
                }}
                trackColor={{ false: colors.border, true: colors.primary }}
                thumbColor="#FFF"
            />
        </View>
    );

    return (
        <Modal visible={visible} transparent animationType="fade">
            <Pressable style={styles.overlay} onPress={handleClose}>
                <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <View style={styles.header}>
                        <ThemedText variant="h3" weight="bold">
                            গেম সেটিংস
                        </ThemedText>
                        <Pressable onPress={handleClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color={colors.text} />
                        </Pressable>
                    </View>

                    {/* Settings */}
                    <View style={styles.settingsList}>
                        <SettingRow
                            icon="volume-high"
                            label="শব্দ"
                            value={soundEnabled}
                            onToggle={toggleSound}
                        />
                        <View style={styles.divider} />
                        <SettingRow
                            icon="phone-portrait-outline"
                            label="ভাইব্রেশন"
                            value={vibrationEnabled}
                            onToggle={toggleVibration}
                        />
                        <View style={styles.divider} />
                        <SettingRow
                            icon="alert-circle-outline"
                            label="ভুল হাইলাইট"
                            value={errorHighlight}
                            onToggle={toggleErrorHighlight}
                        />
                    </View>

                    {/* Info */}
                    <View style={styles.infoSection}>
                        <ThemedText variant="caption" color={colors.textSecondary} align="center">
                            সেটিংস স্বয়ংক্রিয়ভাবে সেভ হয়
                        </ThemedText>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const createStyles = (theme: any) =>
    StyleSheet.create({
        overlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "center",
            alignItems: "center",
            padding: 24,
        },
        card: {
            width: "100%",
            backgroundColor: theme.colors.surface,
            borderRadius: 20,
            padding: 20,
            ...(Platform.OS === "ios"
                ? {
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.25,
                    shadowRadius: 16,
                }
                : { elevation: 8 }),
        },
        header: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 20,
        },
        closeButton: {
            width: 36,
            height: 36,
            borderRadius: 18,
            backgroundColor: theme.colors.surfaceLight || theme.colors.highlight,
            justifyContent: "center",
            alignItems: "center",
        },
        settingsList: {
            backgroundColor: theme.colors.surfaceLight || theme.colors.highlight,
            borderRadius: 12,
            padding: 4,
        },
        settingRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingVertical: 12,
            paddingHorizontal: 12,
        },
        settingLeft: {
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
        },
        iconBox: {
            width: 36,
            height: 36,
            backgroundColor: theme.colors.surface,
            borderRadius: 10,
            justifyContent: "center",
            alignItems: "center",
        },
        divider: {
            height: 1,
            backgroundColor: theme.colors.border,
            marginHorizontal: 12,
        },
        infoSection: {
            marginTop: 16,
        },
    });
