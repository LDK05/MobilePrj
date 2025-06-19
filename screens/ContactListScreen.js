import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View
} from "react-native";
import ContactCard from "../components/ContactCard";
import Header from "../components/Header";
import departments from "../data/departments";
import { colors, fonts } from "../theme/roiTheme";
import ContactDetails from "./ContactDetails";
import { addContact, editExistingContact, fetchContactData } from "../api/contactApi";
import ContactForm from "./ContactForm";

export default function ContactListScreen() {
  const [contacts, setContacts] = useState([]); // Initialize as empty array
  const [selected, setSelected] = useState(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editContact, setEditContact] = useState(null); // <-- Add this line

  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  const handleAddContact = () => {
    setMenuVisible(false);
    setShowAddForm(true);
    setEditContact(null); // <-- Reset editContact when adding
  };

  const fetchContacts = () => {
    fetchContactData().then(setContacts);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSaveContact = (newContact) => {
    if (editContact) {
      editExistingContact(newContact);
    } else {
      addContact(newContact);
    }
    setShowAddForm(false);
    setEditContact(null);
    setSelected(null);
    fetchContacts(); // Refresh the contact list after saving
  };

  const handleCancelForm = () => {
    setShowAddForm(false);
    setEditContact(null);
  };

  const handleEditContact = (contact) => {
    setEditContact(contact);
    setShowAddForm(true);
    setSelected(null);
  };

  if (showAddForm) {
    return (
      <ContactForm
        initialContact={editContact || {}}
        onSave={handleSaveContact}
        onCancel={handleCancelForm}
      />
    );
  }

  if (selected) {
    const dept =
      departments.find((d) => d.id === selected.department)?.name || "Unknown";
    return (
      <ContactDetails
        contact={selected}
        department={dept}
        onBack={() => setSelected(null)}
        onEdit={handleEditContact} // <-- Pass edit handler
      />
    );
  }

  return (
    <View style={styles.container}>
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setMenuVisible(false)}
        >
          <View style={styles.menuLarge}>
            <Text style={styles.menuHeading}>Staff Directory</Text>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={handleAddContact}
            >
              <MaterialIcons
                name="person-add"
                size={20}
                color={colors.roiRed}
              />
              <Text style={styles.menuText}>Add Staff</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>

      <Header onMenuPress={() => setMenuVisible(true)} />

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        // Add a key that changes with numColumns to force FlatList to re-render
        key={isTablet ? "tablet-2col" : "phone-1col"}
        renderItem={({ item }) => (
          <View style={{ width: isTablet ? "48%" : "100%", marginBottom: 16 }}>
            <ContactCard contact={item} onPress={() => setSelected(item)} />
          </View>
        )}
        numColumns={isTablet ? 2 : 1}
        columnWrapperStyle={
          isTablet ? { justifyContent: "space-between" } : undefined
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    marginTop: 24,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    justifyContent: "space-between",
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 8,
  },
  hamburger: {
    padding: 8,
  },
  heading: {
    fontSize: 21,
    color: colors.roiRed,
    fontWeight: "bold",
    textAlign: "right",
    fontFamily: fonts.regular,
  },
  subheading: {
    fontSize: 16,
    color: colors.roiCharcoal,
    textAlign: "right",
    fontFamily: fonts.regular,
  },
  detailContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  detailName: {
    fontSize: 16,
    color: colors.roiRed,
    fontWeight: "bold",
    fontFamily: fonts.regular,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 12,
    color: colors.roiCharcoal,
    fontWeight: "bold",
    fontFamily: fonts.regular,
    marginTop: 8,
  },
  detailValue: {
    fontSize: 12,
    color: colors.roiGrey,
    fontFamily: fonts.regular,
  },
  back: {
    marginTop: 24,
    color: colors.roiRed,
    fontWeight: "bold",
    fontFamily: fonts.regular,
    fontSize: 14,
  },
  // Hamburger menu styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  menuLarge: {
    width: "70%",
    height: "100%",
    backgroundColor: "#fff",
    marginLeft: 0,
    paddingVertical: 16,
    paddingHorizontal: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
  },
  menuHeading: {
    fontSize: 21,
    color: colors.roiRed,
    fontWeight: "bold",
    fontFamily: fonts.regular,
    marginBottom: 24,
    textAlign: "left",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuText: {
    marginLeft: 12,
    fontSize: 16,
    color: colors.roiRed,
    fontFamily: fonts.regular,
  },
});
