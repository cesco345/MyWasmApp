import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Wasm Test",
        }}
      />
      <Stack.Screen
        name="explore"
        options={{
          title: "Image Processing",
        }}
      />
    </Stack>
  );
}
