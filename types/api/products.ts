export interface Category {
  id: number;
  name: string;
  name_ar: string;
  description: string;
  description_ar: string;
  is_showable_navbar: boolean;
}

export interface Image {
  id: number;
  image_url: string;
  order: number;
}

export interface Product {
  id: number;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  category: Category;
  main_image: string;
  hovered_image: string;
  is_customizable: boolean;
  min_digits: number | null;
  max_digits: number | null;
  pricing_type: string;
  base_price: number | null;
  min_price: string;
  max_price: string;
  currency: string;
  images: Image[];
  created_at: string;
}

export interface ProductsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
}

// {
//     "id": 3,
//     "ar": {
//         "title": "Diwaniya Ar",
//         "images": [
//             "https://www.min-on.org/wp-content/uploads/2023/06/Kuwait7-1024x681.jpg",
//             "https://www.min-on.org/wp-content/uploads/2023/06/Kuwait7-1024x681.jpg"
//         ],
//         "mainImage": "https://picsum.photos/200/300",
//         "hoveredImage": "https://picsum.photos/200/300",
//         "category": "Diwaniya",
//         "description": "description of diwaniya ar",
//         "isCustomizable": true,
//         "pricing": {
//             "type": "variant",
//             "variants": [
//                 {
//                     "id": "size_1_digit_1",
//                     "price": 25,
//                     "currency": "KD",
//                     "conditions": {
//                         "sizeId": 1,
//                         "digitCount": 1
//                     },
//                     "description": "d"
//                 },
//                 {
//                     "id": "size_1_digit_2",
//                     "price": 27,
//                     "currency": "KD",
//                     "conditions": {
//                         "sizeId": 1,
//                         "digitCount": 2
//                     },
//                     "description": "d"
//                 },
//                 {
//                     "id": "size_2_digit_1",
//                     "price": 29,
//                     "currency": "KD",
//                     "conditions": {
//                         "sizeId": 2,
//                         "digitCount": 1
//                     },
//                     "description": "d"
//                 },
//                 {
//                     "id": "size_2_digit_2",
//                     "price": 35,
//                     "currency": "KD",
//                     "conditions": {
//                         "sizeId": 2,
//                         "digitCount": 2
//                     },
//                     "description": "d"
//                 }
//             ],
//             "defaultVariantId": "size_1_digit_1"
//         },
//         "minPrice": 25,
//         "maxPrice": 35,
//         "sizes": [
//             {
//                 "id": 3,
//                 "title": "30cm",
//                 "value": "30cm"
//             },
//             {
//                 "id": 4,
//                 "title": "35cm",
//                 "value": "35cm"
//             }
//         ],
//         "colors": [
//             {
//                 "id": 3,
//                 "name": "Gold",
//                 "colorCode": "#D4AF37"
//             },
//             {
//                 "id": 4,
//                 "name": "Silver",
//                 "colorCode": "#C0C0C0"
//             }
//         ],
//         "lightColors": [
//             {
//                 "id": 3,
//                 "name": "Gold",
//                 "colorCode": "#D4AF37"
//             },
//             {
//                 "id": 4,
//                 "name": "Silver",
//                 "colorCode": "#C0C0C0"
//             }
//         ],
//         "designs": [
//             {
//                 "id": 1,
//                 "url": "",
//                 "name": "Design 1"
//             },
//             {
//                 "id": 2,
//                 "url": "",
//                 "name": "Design 2"
//             }
//         ],
//         "fonts": [
//             {
//                 "id": 1,
//                 "url": "",
//                 "name": "Traditional Font"
//             },
//             {
//                 "id": 2,
//                 "url": "",
//                 "name": "Modern Font"
//             }
//         ],
//         "availableInstallationTypes": [
//             "Test"
//         ],
//         "digits": [
//             {
//                 "id": 1,
//                 "title": 1,
//                 "value": 1
//             },
//             {
//                 "id": 2,
//                 "title": 2,
//                 "value": 2
//             }
//         ],
//         "minDigits": 1,
//         "maxDigits": 2
//     },
//     "en": {
//         "title": "Diwaniya",
//         "images": [
//             "https://www.min-on.org/wp-content/uploads/2023/06/Kuwait7-1024x681.jpg",
//             "https://www.min-on.org/wp-content/uploads/2023/06/Kuwait7-1024x681.jpg"
//         ],
//         "mainImage": "https://picsum.photos/200/300",
//         "hoveredImage": "https://picsum.photos/200/300",
//         "category": "Diwaniya",
//         "description": "description of diwaniya",
//         "isCustomizable": true,
//         "pricing": {
//             "type": "variant",
//             "variants": [
//                 {
//                     "id": "size_1_digit_1",
//                     "price": 25,
//                     "currency": "KD",
//                     "conditions": {
//                         "sizeId": 1,
//                         "digitCount": 1
//                     },
//                     "description": "d"
//                 },
//                 {
//                     "id": "size_1_digit_2",
//                     "price": 27,
//                     "currency": "KD",
//                     "conditions": {
//                         "sizeId": 1,
//                         "digitCount": 2
//                     },
//                     "description": "d"
//                 },
//                 {
//                     "id": "size_2_digit_1",
//                     "price": 29,
//                     "currency": "KD",
//                     "conditions": {
//                         "sizeId": 2,
//                         "digitCount": 1
//                     },
//                     "description": "d"
//                 },
//                 {
//                     "id": "size_2_digit_2",
//                     "price": 35,
//                     "currency": "KD",
//                     "conditions": {
//                         "sizeId": 2,
//                         "digitCount": 2
//                     },
//                     "description": "d"
//                 }
//             ],
//             "defaultVariantId": "size_1_digit_1"
//         },
//         "minPrice": 25,
//         "maxPrice": 35,
//         "sizes": [
//             {
//                 "id": 3,
//                 "title": "30cm",
//                 "value": "30cm"
//             },
//             {
//                 "id": 4,
//                 "title": "35cm",
//                 "value": "35cm"
//             }
//         ],
//         "colors": [
//             {
//                 "id": 3,
//                 "name": "Gold",
//                 "colorCode": "#D4AF37"
//             },
//             {
//                 "id": 4,
//                 "name": "Silver",
//                 "colorCode": "#C0C0C0"
//             }
//         ],
//         "lightColors": [
//             {
//                 "id": 3,
//                 "name": "Gold",
//                 "colorCode": "#D4AF37"
//             },
//             {
//                 "id": 4,
//                 "name": "Silver",
//                 "colorCode": "#C0C0C0"
//             }
//         ],
//         "designs": [
//             {
//                 "id": 1,
//                 "url": "",
//                 "name": "Design 1"
//             },
//             {
//                 "id": 2,
//                 "url": "",
//                 "name": "Design 2"
//             }
//         ],
//         "fonts": [
//             {
//                 "id": 1,
//                 "url": "",
//                 "name": "Traditional Font"
//             },
//             {
//                 "id": 2,
//                 "url": "",
//                 "name": "Modern Font"
//             }
//         ],
//         "availableInstallationTypes": [
//             "Test"
//         ],
//         "digits": [
//             {
//                 "id": 1,
//                 "title": 1,
//                 "value": 1
//             },
//             {
//                 "id": 2,
//                 "title": 2,
//                 "value": 2
//             }
//         ],
//         "minDigits": 1,
//         "maxDigits": 2
//     }
// }

export interface Pricing {
  type: string;
  variants: Variant[];
  defaultVariantId: string;
  price?: number;
}

export interface Variant {
  id: string;
  price: number;
  currency: string;
  conditions: Conditions;
  description: string;
}

export interface Conditions {
  sizeId?: number;
  digitCount?: number;
  [key: string]: number | string | undefined; // Allow any future dimensions (materialId, colorId, etc.)
}

export interface Size {
  id: string | number;
  title: string;
  value: string;
}

export interface Color {
  id: string | number;
  name: string;
  colorCode: string;
  image?: string;
}

export interface LightColor {
  id: number | string;
  name: string;
  colorCode: string;
  image?: string;
}

export interface Design {
  id: number | string;
  url: string;
  name: string;
  image?: string;
}

export interface Font {
  id: number | string;
  url?: string;
  name: string;
  image?: string;
}

export interface Digit {
  id: number;
  title: number;
  value: number;
}

export interface ProductDetails {
  id?: string;
  title: string;
  images: string[];
  mainImage: string;
  hoveredImage: string;
  category: string;
  description: string;
  isCustomizable: boolean;
  pricing: Pricing;
  minPrice: number;
  maxPrice: number;
  sizes: Size[];
  colors: Color[];
  lightColors: LightColor[];
  designs: Design[];
  fonts: Font[];
  availableInstallationTypes: string[];
  digits: Digit[];
  minDigits: number;
  maxDigits: number;
}

// product details response
export interface ProductDetailsResponse {
  id: number;
  ar: ProductDetails;
  en: ProductDetails;
}
