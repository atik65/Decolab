/**
 * localStorage Utility Functions for E-commerce Project
 * Simple cart management with type-safe operations
 */

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

export interface CartItem {
  productId: string;
  sizeId: string;
  colorId: string;
  lightColorId: string;
  houseNumber: number;
  text: string;
  designId: string;
  fontId: string;
  quantity: number;
  digitCount: string;
  price: number;
}

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
  cart.push(product);
  setItem(CART_STORAGE_KEY, cart);
};

/**
 * Remove product from cart by index
 */
export const removeProduct = (index: number): void => {
  const cart = getAllProducts();
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    setItem(CART_STORAGE_KEY, cart);
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
};

// ============================================================================
// DEFAULT EXPORT
// ============================================================================

const cart = {
  addProduct,
  getAllProducts,
  getTotalPrice,
  removeProduct,
  clearCart,
};

export default cart;
