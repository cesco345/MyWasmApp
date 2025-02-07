use wasm_bindgen::prelude::*;

// Basic test function
#[wasm_bindgen]
pub fn add_numbers(a: i32, b: i32) -> i32 {
    a + b
}

// Simple array processing function
#[wasm_bindgen]
pub fn process_array(data: &[i32]) -> Vec<i32> {
    data.iter().map(|x| x * 2).collect()
}
