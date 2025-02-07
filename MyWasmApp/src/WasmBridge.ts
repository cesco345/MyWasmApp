import { Platform } from "react-native";

// Interface for our Wasm module
interface WasmModule {
  add_numbers: (a: number, b: number) => number;
  process_array: (data: number[]) => number[];
}

let wasmModule: WasmModule | null = null;

// Mock implementation for testing
const mockImplementation: WasmModule = {
  add_numbers: (a: number, b: number) => a + b,
  process_array: (data: number[]) => data.map((x) => x * 2),
};

export async function initWasm(): Promise<WasmModule> {
  if (wasmModule) return wasmModule;

  // For now, use mock implementation
  wasmModule = mockImplementation;
  return wasmModule;
}

export async function addNumbers(a: number, b: number): Promise<number> {
  try {
    const wasm = await initWasm();
    return wasm.add_numbers(a, b);
  } catch (error) {
    console.error("Error in addNumbers:", error);
    throw error;
  }
}

export async function processArray(data: number[]): Promise<number[]> {
  try {
    const wasm = await initWasm();
    return wasm.process_array(data);
  } catch (error) {
    console.error("Error in processArray:", error);
    throw error;
  }
}
