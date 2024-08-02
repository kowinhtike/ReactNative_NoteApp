import {Text,View,StyleSheet,TouchableOpacity,FlatList} from "react-native";
import { router, useFocusEffect } from "expo-router";
import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  //AsyncStorage.setItem('notes', JSON.stringify([]));
  const [notes, setNotes] = useState([]);
  const loadNotes = async () => {
    const storedNotes = await AsyncStorage.getItem("notes");
    if (storedNotes) setNotes(JSON.parse(storedNotes));
  };
  useEffect(() => {
    loadNotes();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadNotes();
    }, [])
  );

  const addNote = () => {
    const newNote = { id: Date.now().toString(), content: "" };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
    router.push(`view/${notes.length}`);
  };

  const removeNote = (noteId) => {
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    setNotes(updatedNotes);
    AsyncStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <TouchableOpacity onPress={addNote}>
        <View style={styles.addContainer}>
          <Ionicons name="add" size={20} color="white" />
          <Text style={styles.addText}>Add New Note</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={styles.noteItem}
            onPress={() => {
              router.push(`view/${index}`);
            }}
          >
            <Text style={styles.note}>
              {item.content.length > 55
                ? item.content.substring(0, 20)
                : item.content}{" "}
              {item.content == "" ? "New Note" : ""}{" "}
            </Text>
            <Ionicons
              onPress={() => {
                removeNote(item.id);
              }}
              name="trash"
              size={32}
              color="red"
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  addContainer: {
    flexDirection: "row",
    backgroundColor: "blue",
    padding: 10,
    margin: 20,
    width: 150,
    alignSelf: "flex-end",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    color: "white",
    fontSize: 16,
  },
  noteItem: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "lightblue",
    margin: 8,
    borderRadius: 10,
    borderWidth: 5,
    borderBottomColor: "blue",
    borderRightColor: "blue",
  },
  note: {
    fontSize: 18,
  },
});
