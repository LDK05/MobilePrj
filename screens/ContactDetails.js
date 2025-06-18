import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { colors, fonts } from "../theme/roiTheme";
import Header from "../components/Header";

export default function ContactDetails({ contact, department, onBack }) {
  return (
    <View style={styles.container}>
      <Header onMenuPress={() => {}} />
      <View style={styles.card}>
        <Text style={styles.detailName}>{contact.name}</Text>
        <View style={styles.infoRow}>
          <Text style={styles.detailLabel}>Phone:</Text>
          <Text style={styles.detailValue}>{contact.phone}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.detailLabel}>Department:</Text>
          <Text style={styles.detailValue}>{department}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.detailLabel}>Address:</Text>
          <Text style={styles.detailValue}>{contact.address}</Text>
        </View>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Back to List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.roiLightGrey,
    padding: 16,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 28,
    marginTop: 32,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  detailName: {
    fontSize: 24,
    color: colors.roiRed,
    fontWeight: "bold",
    fontFamily: "Trebuchet MS, Calibri, Arial",
    marginBottom: 20,
    textAlign: "left",
    letterSpacing: 0.5,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "flex-start",
  },
  detailLabel: {
    fontSize: 16,
    color: colors.roiCharcoal,
    fontWeight: "bold",
    fontFamily: "Trebuchet MS, Calibri, Arial",
    width: 120,
    letterSpacing: 0.2,
  },
  detailValue: {
    fontSize: 16,
    color: colors.roiGrey,
    fontFamily: "Trebuchet MS, Calibri, Arial",
    flex: 1,
    flexWrap: "wrap",
    letterSpacing: 0.1,
  },
  backButton: {
    marginTop: 36,
    backgroundColor: colors.roiRed,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#941a1d",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: "Trebuchet MS, Calibri, Arial",
    fontSize: 18,
    letterSpacing: 1,
  },
});