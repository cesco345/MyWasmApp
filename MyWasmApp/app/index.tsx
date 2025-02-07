import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { addNumbers, processArray } from "../src/WasmBridge";

export default function HomePage() {
  const [result, setResult] = useState<number | null>(null);
  const [arrayResult, setArrayResult] = useState<number[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testFunctions = async () => {
    try {
      setLoading(true);
      setError(null);

      // Test simple addition
      console.log("Testing addition...");
      const sum = await addNumbers(5, 7);
      setResult(sum);

      // Test array processing
      console.log("Testing array processing...");
      const testArray = [1, 2, 3, 4, 5];
      const processed = await processArray(testArray);
      setArrayResult(processed);
    } catch (err) {
      console.error("Error in test:", err);
      setError("Error running functions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Function Test</Text>

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={testFunctions}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Test Functions</Text>
        )}
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}

      {result !== null && (
        <Text style={styles.result}>Addition Result (5 + 7): {result}</Text>
      )}

      {arrayResult && (
        <Text style={styles.result}>
          Array Result ([1,2,3,4,5] × 2): [{arrayResult.join(", ")}]
        </Text>
      )}

      <Link href="/explore" asChild>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
          <Text style={styles.buttonText}>Go to Image Processing</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 8,
    minWidth: 200,
    alignItems: "center",
    marginVertical: 10,
  },
  secondaryButton: {
    backgroundColor: "#5856D6",
    marginTop: 20,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  result: {
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
});
