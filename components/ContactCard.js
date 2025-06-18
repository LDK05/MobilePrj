import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../theme/roiTheme";
import departments from "../data/departments";

export default function ContactCard({ contact, onPress }) {
  const dept = departments.find(d => d.id === contact.department)?.name || "Unknown";
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.name}>{contact.name}</Text>
      <Text style={styles.department}>{dept}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.roiLightGrey,
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    color: colors.roiCharcoal,
    fontWeight: "bold",
    fontFamily: "Trebuchet MS, Calibri, Arial",
  },
  department: {
    fontSize: 14,
    color: colors.roiGrey,
    fontFamily: "Trebuchet MS, Calibri, Arial",
  },
});