import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useState, useEffect, useCallback } from "react";
import React from "react";
import {useLocalSearchParams,router,useFocusEffect,useNavigation} from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SaveContext from "../context/SaveContext";
import { Ionicons } from "@expo/vector-icons";

const view = () => {
  const navigation = useNavigation();
  const [content, setContent] = useState("");
  var notes = [];
  const { id } = useLocalSearchParams();
  const loadNotes = useCallback(async () => {
    const storedNotes = await AsyncStorage.getItem("notes");
    const praseNotes = JSON.parse(storedNotes);
    notes = praseNotes;
    setContent(notes[id].content);
  },[id]);
  
  useEffect(() => {
    loadNotes();
  }, [loadNotes]);

  const saveNote = useCallback(async () => {
    const storedNotes = await AsyncStorage.getItem("notes");
    const parseNotes = JSON.parse(storedNotes);
    parseNotes[id].content = content;
    await AsyncStorage.setItem("notes", JSON.stringify(parseNotes));
    //alert("Save Successfully");
    router.back();
  }, [content, id]);

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => (
          <Ionicons name="save" size={25} color="blue" onPress={saveNote} />
        ),
      });
    }, [saveNote])
  );

  return (
    <SaveContext.Provider value={saveNote}>
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          value={content}
          onChangeText={setContent}
          multiline
        />
      </View>
    </SaveContext.Provider>
  );
};

export default view;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  textInput: {
    flex: 1,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 8,
    fontSize: 18,
    textAlignVertical: "top",
  },
});
