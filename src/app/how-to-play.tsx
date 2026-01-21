import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card } from "../components/ui/Card";
import { Header } from "../components/ui/Header";
import { ThemedText } from "../components/ui/ThemedText";
import { useTheme } from "../styles/ThemeContext";
import { toBangla } from "../utils/bangla";

const rules = [
  {
    icon: "grid",
    title: "বোর্ড",
    desc: "সুডোকু ৯×৯ ঘরের একটি গ্রিডে খেলা হয়, যা ৩×৩ এর ৯টি বক্সে বিভক্ত।",
  },
  {
    icon: "options",
    title: "সংখ্যা বসানো",
    desc: "প্রতিটি সারি, কলাম এবং ৩×৩ বক্সে ১-৯ পর্যন্ত সংখ্যা একবার করে থাকতে হবে।",
  },
  {
    icon: "bulb",
    title: "কৌশল",
    desc: "প্রতিটি ঘরে কোন সংখ্যা হতে পারে তা বিশ্লেষণ করুন এবং বাদ দিয়ে সঠিক উত্তর খুঁজুন।",
  },
  {
    icon: "pencil",
    title: "নোট মোড",
    desc: "নিশ্চিত না হলে নোট মোডে সম্ভাব্য সংখ্যাগুলো লিখে রাখুন।",
  },
];

export default function HowToPlayScreen() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <Header title="কিভাবে খেলবেন" showBack />

      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.intro} padding="lg">
          <ThemedText variant="h3" weight="bold" style={{ marginBottom: 8 }}>
            সুডোকু কি?
          </ThemedText>
          <ThemedText
            variant="body"
            color={theme.colors.textSecondary}
            style={{ lineHeight: 24 }}
          >
            সুডোকু একটি লজিক-ভিত্তিক সংখ্যা পাজেল গেম। লক্ষ্য হল গ্রিডের প্রতিটি
            খালি ঘরে সঠিক সংখ্যা বসানো।
          </ThemedText>
        </Card>

        <ThemedText variant="h3" style={styles.sectionTitle}>
          মূল নিয়ম
        </ThemedText>

        {rules.map((rule, index) => (
          <Card key={index} style={styles.ruleCard} padding="lg">
            <View style={styles.ruleHeader}>
              <View
                style={[
                  styles.iconBox,
                  { backgroundColor: theme.colors.primary + "20" },
                ]}
              >
                <Ionicons
                  name={rule.icon as any}
                  size={24}
                  color={theme.colors.primary}
                />
              </View>
              <ThemedText variant="h3" weight="bold">
                {toBangla((index + 1).toString())}. {rule.title}
              </ThemedText>
            </View>
            <ThemedText
              variant="body"
              color={theme.colors.textSecondary}
              style={{ marginTop: 8, lineHeight: 22 }}
            >
              {rule.desc}
            </ThemedText>
          </Card>
        ))}

        <ThemedText variant="h3" style={styles.sectionTitle}>
          টিপস
        </ThemedText>

        <Card padding="lg">
          <View style={styles.tip}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.success}
            />
            <ThemedText
              variant="body"
              color={theme.colors.textSecondary}
              style={{ flex: 1 }}
            >
              সহজ সংখ্যা দিয়ে শুরু করুন যেগুলো শুধুমাত্র একটি স্থানে বসতে পারে
            </ThemedText>
          </View>
          <View style={styles.tip}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.success}
            />
            <ThemedText
              variant="body"
              color={theme.colors.textSecondary}
              style={{ flex: 1 }}
            >
              একই সারি, কলাম বা বক্সে থাকা সংখ্যা দেখে বাদ দিন
            </ThemedText>
          </View>
          <View style={styles.tip}>
            <Ionicons
              name="checkmark-circle"
              size={20}
              color={theme.colors.success}
            />
            <ThemedText
              variant="body"
              color={theme.colors.textSecondary}
              style={{ flex: 1 }}
            >
              নোট ব্যবহার করুন সম্ভাব্য সংখ্যাগুলো মনে রাখতে
            </ThemedText>
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const createStyles = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      padding: theme.spacing.lg,
      paddingBottom: theme.spacing.xl,
    },
    intro: {
      marginBottom: theme.spacing.md,
    },
    sectionTitle: {
      marginTop: theme.spacing.lg,
      marginBottom: theme.spacing.md,
    },
    ruleCard: {
      marginBottom: theme.spacing.md,
    },
    ruleHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: theme.spacing.md,
    },
    iconBox: {
      width: 44,
      height: 44,
      borderRadius: theme.radius.md,
      justifyContent: "center",
      alignItems: "center",
    },
    tip: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: theme.spacing.sm,
      marginBottom: theme.spacing.md,
    },
  });
