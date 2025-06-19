import { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { colors, fonts } from "../theme/roiTheme";
import Header from "../components/Header";
import { getDepartments } from "../api/contactApi";

export default function ContactForm({ initialContact = {}, onSave, onCancel }) {
  const [name, setName] = useState(initialContact.name || "");
  const [departments, setDepartments] = useState([]); // Initialize as empty array
  const [phone, setPhone] = useState(initialContact.phone || "");
  const [department, setDepartment] = useState(
    initialContact.department || departments[0]?.id || ""
  );
  const [departmentQuery, setDepartmentQuery] = useState(
    departments.find((d) => d.id === (initialContact.department || departments[0].id))?.name || ""
  );
  const [address, setAddress] = useState(initialContact.address || "");
  const [showDeptSuggestions, setShowDeptSuggestions] = useState(false);
  useEffect(() => {
    const fetchDepartments = async () => {
      const departments = await getDepartments();
      setDepartments(departments);
      setDepartmentQuery(
        departments.find((d) => d.id === (initialContact.department || departments[0].id))?.name || ""
      );
    };
    fetchDepartments();
  }, []);

  const handleSave = () => {
    if (!name || !phone || !address) return;
    onSave({
      id: initialContact.id || Date.now().toString(),
      name,
      phone,
      department,
      address,
    });
    Alert.alert("Success", "Contact added successfully!");
  };

  // Filter departments for autocomplete
  const filteredDepartments = departments.filter((d) =>
    d.name.toLowerCase().includes(departmentQuery.toLowerCase())
  );

  const handleDeptSelect = (dept) => {
    setDepartment(dept.id);
    setDepartmentQuery(dept.name);
    setShowDeptSuggestions(false);
  };

  // Use FlatList for the whole form to avoid nesting FlatList in ScrollView
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <Header onMenuPress={() => { }} />
      <FlatList
        data={[{}]}
        keyExtractor={() => "form"}
        renderItem={() => (
          <View style={styles.formContainer}>
            <Text style={styles.formHeading}>
              {initialContact.id ? "Edit Staff" : "Add Staff"}
            </Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Full Name"
              returnKeyType="next"
            />
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Phone Number"
              keyboardType="phone-pad"
              returnKeyType="next"
            />
            <Text style={styles.label}>Department</Text>
            <View
              style={{
                position: "relative",
                marginBottom:
                  showDeptSuggestions && filteredDepartments.length > 0 ? 140 : 16,
              }}
            >
              <TextInput
                style={styles.input}
                value={departmentQuery}
                onChangeText={(text) => {
                  setDepartmentQuery(text);
                  setShowDeptSuggestions(true);
                }}
                placeholder="Department"
                onFocus={() => setShowDeptSuggestions(true)}
                autoCorrect={false}
                autoCapitalize="words"
                returnKeyType="next"
              />
              {showDeptSuggestions && filteredDepartments.length > 0 && (
                <View style={styles.suggestionBox}>
                  <FlatList
                    data={filteredDepartments}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                      <Pressable
                        style={styles.suggestionItem}
                        onPress={() => handleDeptSelect(item)}
                      >
                        <Text style={styles.suggestionText}>{item.name}</Text>
                      </Pressable>
                    )}
                    keyboardShouldPersistTaps="handled"
                  />
                </View>
              )}
            </View>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="Address"
              returnKeyType="done"
            />
            <View style={styles.buttonRow}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    paddingTop: 24,
  },
  formContainer: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  formHeading: {
    fontSize: 21,
    color: colors.roiRed,
    fontWeight: "bold",
    fontFamily: fonts.regular,
    marginBottom: 24,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: colors.roiCharcoal,
    fontFamily: "Trebuchet MS, Calibri, Arial",
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.roiGrey,
    borderRadius: 6,
    padding: 10,
    fontSize: 14,
    fontFamily: "Trebuchet MS, Calibri, Arial",
    backgroundColor: "#f9f9f9",
    marginBottom: 8,
  },
  suggestionBox: {
    position: "absolute",
    top: 48,
    left: 0,
    right: 0,
    backgroundColor: colors.roiLightGrey, // Use your theme's light color for dropdown background
    borderWidth: 1,
    borderColor: colors.roiGrey,
    borderRadius: 6,
    zIndex: 10,
    maxHeight: 120,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  suggestionItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.roiLightGrey,
  },
  suggestionText: {
    fontSize: 14,
    color: colors.roiCharcoal,
    fontFamily: "Trebuchet MS, Calibri, Arial",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  saveButton: {
    backgroundColor: colors.roiRed,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: fonts.regular,
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: colors.roiGrey,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontFamily: fonts.regular,
    fontSize: 16,
  },
});
