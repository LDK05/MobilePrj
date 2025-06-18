import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../theme/roiTheme";

export default function Header({ onMenuPress }) {
  return (
    <View style={styles.headerRow}>
      <TouchableOpacity onPress={onMenuPress} style={styles.hamburger}>
        <MaterialIcons name="menu" size={28} color={colors.roiRed} />
      </TouchableOpacity>
      <Image
        source={require("../assets/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.heading}>Staff Directory</Text>
        <Text style={styles.subheading}>Red Opal Innovations</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
    marginTop: 24,
  },
  logo: {
    width: 70,
    height: 70,
    marginRight: 8,
    marginLeft: 8,
  },

  heading: {
    fontSize: 21,
    color: colors.roiRed,
    fontWeight: "bold", // Trebuchet Bold for heading
    fontFamily: "Trebuchet MS, Calibri, Arial",
    textAlign: "right",
  },
  subheading: {
    fontSize: 16,
    color: colors.roiCharcoal,
    fontFamily: "Trebuchet MS, Calibri, Arial",
    textAlign: "right",
  },
});