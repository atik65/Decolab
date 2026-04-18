/**
 * localStorage Utility Functions for E-commerce Project
 * Simple cart management with type-safe operations
 */

import { CompleteCartItem } from "./productUtils";

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

// Re-export CompleteCartItem as CartItem so consumers can use either name
export type CartItem = CompleteCartItem;

// ============================================================================
// CONSTANTS
// ============================================================================

const CART_STORAGE_KEY = "ecommerce_cart";

// ============================================================================
// CORE UTILITY FUNCTIONS
// ============================================================================

/**
 * Safely check if localStorage is available
 */
const isLocalStorageAvailable = (): boolean => {
  try {
    const test = "__localStorage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Get item from localStorage
 */
const getItem = <T>(key: string, defaultValue: T): T => {
  if (!isLocalStorageAvailable()) {
    console.warn("localStorage is not available");
    return defaultValue;
  }

  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

/**
 * Set item to localStorage
 */
const setItem = <T>(key: string, value: T): boolean => {
  if (!isLocalStorageAvailable()) {
    console.warn("localStorage is not available");
    return false;
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error writing ${key} to localStorage:`, error);
    return false;
  }
};

// ============================================================================
// CART FUNCTIONS
// ============================================================================

/**
 * Get all cart items
 */
export const getAllProducts = (): CartItem[] => {
  return getItem<CartItem[]>(CART_STORAGE_KEY, []);
};

/**
 * Add product to cart
 */
export const addProduct = (product: CartItem): void => {
  const cart = getAllProducts();

  // Find index of existing product with exact same options
  const existingProductIndex = cart.findIndex(
    (item) =>
      item.productId === product.productId &&
      String(item.size?.id) === String(product.size?.id) &&
      String(item.color?.id) === String(product.color?.id) &&
      String(item.lightColor?.id) === String(product.lightColor?.id) &&
      String(item.design?.id) === String(product.design?.id) &&
      String(item.font?.id) === String(product.font?.id) &&
      item.houseNumber === product.houseNumber &&
      item.text === product.text &&
      String(item.digitCount) === String(product.digitCount),
  );

  if (existingProductIndex !== -1) {
    // If found, increase quantity
    cart[existingProductIndex].quantity += product.quantity;
    // Update totalPrice for that item
    cart[existingProductIndex].totalPrice =
      cart[existingProductIndex].price * cart[existingProductIndex].quantity;
  } else {
    // If not found, add as new item
    cart.push(product);
  }

  setItem(CART_STORAGE_KEY, cart);
  // Dispatch custom event for reactivity
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"));
  }
};

/**
 * Remove product from cart by index
 */
export const removeProduct = (index: number): void => {
  const cart = getAllProducts();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    setItem(CART_STORAGE_KEY, cart);
    // Dispatch custom event for reactivity
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cart-updated"));
    }
  }
};

/**
 * Get total price of all products in cart
 */
export const getTotalPrice = (): number => {
  const cart = getAllProducts();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

/**
 * Clear entire cart
 */
export const clearCart = (): void => {
  setItem(CART_STORAGE_KEY, []);
  // Dispatch custom event for reactivity
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"));
  }
};

/**
 * Update product quantity in cart by index
 */
export const updateQuantity = (index: number, quantity: number): void => {
  const cart = getAllProducts();
  if (index >= 0 && index < cart.length && quantity > 0) {
    cart[index].quantity = quantity;
    // Update individual item total price
    cart[index].totalPrice = cart[index].price * quantity;
    setItem(CART_STORAGE_KEY, cart);
    // Dispatch custom event for reactivity
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("cart-updated"));
    }
  }
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

const cart = {
  addProduct,
  getAllProducts,
  getTotalPrice,
  removeProduct,
  updateQuantity,
  clearCart,
};

export default cart;
