import { Stack } from "expo-router";
import React, { useContext } from "react";
import SaveContext from "./context/SaveContext";

export default function RootLayout() {
  const saveNote = useContext(SaveContext);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Note List" }} />
      <Stack.Screen name="view/[id]" options={{ title: "Editor Page" }} />
    </Stack>
  );
}
