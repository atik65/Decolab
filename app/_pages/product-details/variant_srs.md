# Product Variant System - Flexible Architecture Specification

## Problem Statement

We need a flexible variant pricing system for products with different customization options:

1. **Size only** (e.g., Car Shades with different sizes)
2. **Digit count only** (e.g., Custom text with character limits)
3. **Both size and digits** (e.g., House Numbers: size × digit count)
4. **No variants** (e.g., Fixed products like generic accessories)

**Current Issue:** The system is tightly coupled to `sizeId` and `digitCount`. Adding new pricing factors (material, finish, installation type) requires code changes.

---

## Solution: Generic Attribute-Based Variant System

### Core Concept

Shift from **hardcoded** logic to a **dimension-based** architecture where:

- The `conditions` JSONField is the single source of truth
- Matching logic is **key-agnostic** (works with any condition keys)
- Frontend dynamically detects active dimensions
- Easy to extend without database migrations

---

## Backend Implementation (Django DRF)

### 1. Service Layer Architecture

Create a dedicated service for variant logic separation.

**File: `products/services.py`** (NEW FILE)

```python
"""
Product Variant Pricing Service
Handles flexible variant matching and price calculation
"""
from typing import Dict, Tuple, Optional, List
from .models import Product, ProductVariant


class VariantPricingService:
    """
    Service for handling flexible variant pricing logic
    Works with any condition keys (sizeId, digitCount, materialId, etc.)
    """

    @staticmethod
    def find_matching_variant(
        product: Product,
        customization: Dict
    ) -> Optional[ProductVariant]:
        """
        Find variant matching customer customization

        Args:
            product: Product instance
            customization: Dict of customer choices
                Example: {"sizeId": 1, "digitCount": 3}
                Example: {"sizeId": 2}
                Example: {"digitCount": 5}

        Returns:
            ProductVariant instance or None
        """
        if product.pricing_type != 'variant':
            return None

        # Get all variants (optimized query)
        variants = product.variants.select_related('product').all()

        for variant in variants:
            if VariantPricingService._matches_conditions(
                variant.conditions,
                customization
            ):
                return variant

        return None

    @staticmethod
    def _matches_conditions(
        conditions: Dict,
        customization: Dict
    ) -> bool:
        """
        Check if customization satisfies ALL variant conditions

        This is the KEY method - it's completely generic!
        Works with: {"sizeId": 1, "digitCount": 2}
        Works with: {"sizeId": 1}
        Works with: {"digitCount": 3}
        Works with: {"materialId": 2, "finishId": 1, "sizeId": 3}

        Args:
            conditions: Variant conditions from DB
            customization: Customer selected options

        Returns:
            True if all conditions match
        """
        return all(
            str(customization.get(key)) == str(value)
            for key, value in conditions.items()
        )

    @staticmethod
    def calculate_price(
        product: Product,
        customization: Dict
    ) -> Tuple[Optional[ProductVariant], float]:
        """
        Calculate price for a product based on customization

        Args:
            product: Product instance
            customization: Customer selections

        Returns:
            tuple: (matched_variant, final_price)
        """
        # Base pricing - simple fixed price
        if product.pricing_type == 'base':
            price = product.base_price or product.min_price or 0
            return None, float(price)

        # Variant pricing - find matching variant
        variant = VariantPricingService.find_matching_variant(
            product,
            customization
        )

        if variant:
            return variant, float(variant.price)

        # Fallback to min_price if no variant matches
        fallback_price = product.min_price or 0
        return None, float(fallback_price)

    @staticmethod
    def get_active_dimensions(product: Product) -> Dict[str, bool]:
        """
        Detect which pricing dimensions are active for a product
        Useful for frontend to know what variant generator to use

        Returns:
            dict: {"sizes": bool, "digits": bool, "colors": bool, ...}
        """
        return {
            'sizes': product.sizes.exists(),
            'digits': bool(product.min_digits and product.max_digits),
            'colors': product.colors.exists(),
            'designs': product.designs.exists(),
            'fonts': product.fonts.exists(),
        }

    @staticmethod
    def validate_variant_conditions(
        product: Product,
        conditions: Dict
    ) -> Tuple[bool, str]:
        """
        Validate that variant conditions reference valid product attributes

        Args:
            product: Product instance
            conditions: Proposed variant conditions

        Returns:
            tuple: (is_valid, error_message)
        """
        if not conditions:
            return False, "Variant must have at least one condition"

        # Validate sizeId if present
        if 'sizeId' in conditions:
            size_id = conditions['sizeId']
            if not product.sizes.filter(id=size_id).exists():
                return False, f"Size ID {size_id} not in product's available sizes"

        # Validate digitCount if present
        if 'digitCount' in conditions:
            digit_count = int(conditions['digitCount'])
            if product.min_digits and product.max_digits:
                if not (product.min_digits <= digit_count <= product.max_digits):
                    return False, f"Digit count {digit_count} outside allowed range"
            else:
                return False, "Product doesn't support digit-based variants"

        return True, ""


class VariantGeneratorService:
    """
    Service for generating variant combinations
    Useful for admin interface or bulk creation
    """

    @staticmethod
    def generate_all_variants(product: Product) -> List[Dict]:
        """
        Generate all possible variant combinations for a product

        Returns:
            List of variant definitions ready for creation
        """
        dimensions = []

        # Size dimension
        if product.sizes.exists():
            dimensions.append([
                {'key': 'sizeId', 'value': size.id, 'label': size.title}
                for size in product.sizes.all()
            ])

        # Digit dimension
        if product.min_digits and product.max_digits:
            dimensions.append([
                {'key': 'digitCount', 'value': i, 'label': f'{i} Digit{"s" if i > 1 else ""}'}
                for i in range(product.min_digits, product.max_digits + 1)
            ])

        if not dimensions:
            return []

        # Generate cartesian product
        combinations = VariantGeneratorService._cartesian_product(dimensions)

        # Convert to variant definitions
        variants = []
        for combo in combinations:
            conditions = {item['key']: item['value'] for item in combo}
            label = ' × '.join(item['label'] for item in combo)

            variants.append({
                'variant_id': label.replace(' ', '_').lower(),
                'conditions': conditions,
                'description': label,
                'price': 0  # To be filled by admin
            })

        return variants

    @staticmethod
    def _cartesian_product(arrays: List[List]) -> List[List]:
        """Generate cartesian product of multiple arrays"""
        if not arrays:
            return [[]]
        if len(arrays) == 1:
            return [[item] for item in arrays[0]]

        result = [[]]
        for array in arrays:
            result = [x + [y] for x in result for y in array]
        return result
```

---

### 2. Model Validation

Update models to prevent invalid configurations.

**File: `products/models.py`** - Add to Product and ProductVariant classes:

```python
from django.core.exceptions import ValidationError

class Product(models.Model):
    # ... existing fields ...

    def clean(self):
        """Validate product configuration"""
        super().clean()

        # If one digit field is set, both should be set
        if (self.min_digits is None) != (self.max_digits is None):
            raise ValidationError({
                'min_digits': "Both min_digits and max_digits must be set together, or both left empty."
            })

        # Min should be less than or equal to max
        if self.min_digits and self.max_digits:
            if self.min_digits > self.max_digits:
                raise ValidationError({
                    'min_digits': "min_digits cannot exceed max_digits"
                })

    def save(self, *args, **kwargs):
        self.full_clean()  # Run validation before saving
        super().save(*args, **kwargs)


class ProductVariant(models.Model):
    # ... existing fields ...

    def clean(self):
        """Validate variant conditions"""
        super().clean()

        # Ensure conditions is a dict
        if not isinstance(self.conditions, dict):
            raise ValidationError({
                'conditions': "Conditions must be a JSON object (dict)"
            })

        # Ensure at least one condition exists
        if not self.conditions:
            raise ValidationError({
                'conditions': (
                    "Variant must have at least one condition. "
                    "Use 'base' pricing type for fixed-price products."
                )
            })

        # Validate conditions reference valid product attributes
        if self.product_id:
            from .services import VariantPricingService
            is_valid, error = VariantPricingService.validate_variant_conditions(
                self.product,
                self.conditions
            )
            if not is_valid:
                raise ValidationError({'conditions': error})

    def save(self, *args, **kwargs):
        self.full_clean()  # Run validation before saving
        super().save(*args, **kwargs)

    def __str__(self):
        """Better string representation"""
        cond_str = ", ".join(f"{k}={v}" for k, v in self.conditions.items())
        return f"{self.product.title[:30]} | {cond_str} | {self.price} {self.currency}"
```

---

### 3. Update Serializers to Use Service

**File: `products/serializers.py`** - Update OrderCreateSerializer:

```python
from .services import VariantPricingService

class OrderCreateSerializer(serializers.ModelSerializer):
    items = OrderItemCreateSerializer(many=True)
    contact = ContactInfoSerializer()
    delivery = DeliveryInfoSerializer()

    class Meta:
        model = Order
        fields = ['items', 'contact', 'delivery', 'notes']

    def create(self, validated_data):
        import uuid
        items_data = validated_data.pop('items')
        contact_data = validated_data.pop('contact')
        delivery_data = validated_data.pop('delivery')

        # Create order
        order = Order.objects.create(
            order_number=f"OD{str(uuid.uuid4())[:8].upper()}",
            first_name=delivery_data.get('firstName', ''),
            last_name=delivery_data.get('lastName', ''),
            email=contact_data.get('email', ''),
            phone=str(contact_data.get('phoneNumber', '')),
            address=delivery_data.get('address', ''),
            apartment_suite=delivery_data.get('apartmentSuite', ''),
            city=delivery_data.get('city', ''),
            country=delivery_data.get('country', ''),
            postal_code=delivery_data.get('postalCode', ''),
            google_maps_link=delivery_data.get('googleMapsLink', ''),
            total_amount=0,
            currency='KD',
            notes=validated_data.get('notes', '')
        )

        total_amount = 0

        for item_data in items_data:
            product = item_data['product']
            quantity = item_data['quantity']
            customization = item_data['customization']

            # Use service for clean, flexible price calculation
            variant, unit_price = VariantPricingService.calculate_price(
                product,
                customization
            )

            # Create order item
            OrderItem.objects.create(
                order=order,
                product=product,
                variant=variant,
                quantity=quantity,
                unit_price=unit_price,
                total_price=unit_price * quantity,
                customization=customization
            )

            total_amount += unit_price * quantity

        order.total_amount = total_amount
        order.save()

        return order
```

---

### 4. Add API Endpoint for Variant Generation

**File: `products/views.py`** - Add to ProductViewSet:

```python
from .services import VariantGeneratorService
from rest_framework.decorators import action
from rest_framework.response import Response

class ProductViewSet(viewsets.ModelViewSet):
    # ... existing code ...

    @action(detail=True, methods=['get'], url_path='generate-variants')
    def generate_variants(self, request, pk=None):
        """
        Generate all possible variant combinations for this product
        Useful for admin to see what variants should be created
        """
        product = self.get_object()

        variants = VariantGeneratorService.generate_all_variants(product)

        return Response({
            'product_id': product.id,
            'product_title': product.title,
            'total_combinations': len(variants),
            'variants': variants,
            'active_dimensions': VariantPricingService.get_active_dimensions(product)
        })
```

---

## API Usage & Payload Examples

### Product Creation API

**Endpoint:** `POST /api/products/`  
**Authentication:** Required (IsAuthenticatedOrReadOnly)  
**Content-Type:** `multipart/form-data` (for image uploads) or `application/json`

---

### Payload Examples

#### Example 1: Product with Size and Digit Variants (House Numbers)

This is the most complex case - pricing depends on both size and digit count.

```json
{
  "title": "Premium House Numbers",
  "title_ar": "أرقام المنازل بريميوم",
  "description": "High-quality customizable house numbers with LED lighting options",
  "description_ar": "أرقام منازل عالية الجودة قابلة للتخصيص مع خيارات إضاءة LED",
  "category": 1,
  "is_customizable": true,
  "min_digits": 2,
  "max_digits": 5,
  "pricing_type": "variant",
  "min_price": 10.0,
  "max_price": 50.0,
  "currency": "KD",
  "sizes": [1, 2, 3],
  "colors": [1, 2, 3, 4, 5],
  "light_colors": [6, 7],
  "designs": [1, 2],
  "fonts": [1, 2, 3],
  "available_installation_types": [1, 2],
  "is_active": true
}
```

**Then create variants separately:**

```json
POST /api/products/1/variants/

[
  {
    "variant_id": "20cm_2_digits",
    "price": 10.00,
    "currency": "KD",
    "description": "20cm with 2 digits",
    "conditions": {
      "sizeId": 1,
      "digitCount": 2
    },
    "is_default": true
  },
  {
    "variant_id": "20cm_3_digits",
    "price": 12.00,
    "currency": "KD",
    "description": "20cm with 3 digits",
    "conditions": {
      "sizeId": 1,
      "digitCount": 3
    }
  },
  {
    "variant_id": "25cm_2_digits",
    "price": 15.00,
    "currency": "KD",
    "description": "25cm with 2 digits",
    "conditions": {
      "sizeId": 2,
      "digitCount": 2
    }
  },
  {
    "variant_id": "30cm_5_digits",
    "price": 50.00,
    "currency": "KD",
    "description": "30cm with 5 digits",
    "conditions": {
      "sizeId": 3,
      "digitCount": 5
    }
  }
  // ... more variants (3 sizes × 4 digit counts = 12 total)
]
```

---

#### Example 2: Product with Size Only (Car Shade)

No digit customization - price varies only by size.

```json
{
  "title": "Premium Car Shade",
  "title_ar": "مظلة سيارة بريميوم",
  "description": "UV-protected car shade with easy installation",
  "description_ar": "مظلة سيارة محمية من الأشعة فوق البنفسجية مع تركيب سهل",
  "category": 2,
  "is_customizable": false,
  "min_digits": null,
  "max_digits": null,
  "pricing_type": "variant",
  "min_price": 20.0,
  "max_price": 35.0,
  "currency": "KD",
  "sizes": [4, 5, 6],
  "colors": [1, 2, 3],
  "light_colors": [],
  "designs": [],
  "fonts": [],
  "available_installation_types": [1],
  "is_active": true
}
```

**Variants (size only):**

```json
[
  {
    "variant_id": "small",
    "price": 20.0,
    "currency": "KD",
    "description": "Small (fits compact cars)",
    "conditions": {
      "sizeId": 4
    },
    "is_default": true
  },
  {
    "variant_id": "medium",
    "price": 25.0,
    "currency": "KD",
    "description": "Medium (fits sedans)",
    "conditions": {
      "sizeId": 5
    }
  },
  {
    "variant_id": "large",
    "price": 35.0,
    "currency": "KD",
    "description": "Large (fits SUVs)",
    "conditions": {
      "sizeId": 6
    }
  }
]
```

---

#### Example 3: Product with Digits Only (Custom Text Sign)

No size options - price varies only by character count.

```json
{
  "title": "Custom Neon Sign",
  "title_ar": "لافتة نيون مخصصة",
  "description": "Personalized neon sign with your custom text",
  "description_ar": "لافتة نيون شخصية مع نصك المخصص",
  "category": 3,
  "is_customizable": true,
  "min_digits": 1,
  "max_digits": 10,
  "pricing_type": "variant",
  "min_price": 15.0,
  "max_price": 80.0,
  "currency": "KD",
  "sizes": [],
  "colors": [8, 9, 10],
  "light_colors": [],
  "designs": [],
  "fonts": [4, 5, 6],
  "available_installation_types": [2],
  "is_active": true
}
```

**Variants (digit count only):**

```json
[
  {
    "variant_id": "1_char",
    "price": 15.0,
    "currency": "KD",
    "description": "1 character",
    "conditions": {
      "digitCount": 1
    },
    "is_default": true
  },
  {
    "variant_id": "5_chars",
    "price": 40.0,
    "currency": "KD",
    "description": "5 characters",
    "conditions": {
      "digitCount": 5
    }
  },
  {
    "variant_id": "10_chars",
    "price": 80.0,
    "currency": "KD",
    "description": "10 characters",
    "conditions": {
      "digitCount": 10
    }
  }
  // ... more variants for 2-4, 6-9 characters
]
```

---

#### Example 4: Fixed Price Product (No Variants)

Simple product with one fixed price - no customization affecting price.

```json
{
  "title": "Standard Doorbell",
  "title_ar": "جرس باب قياسي",
  "description": "Wireless doorbell with chime",
  "description_ar": "جرس باب لاسلكي مع رنين",
  "category": 4,
  "is_customizable": false,
  "min_digits": null,
  "max_digits": null,
  "pricing_type": "base",
  "base_price": 25.0,
  "min_price": 25.0,
  "max_price": 25.0,
  "currency": "KD",
  "sizes": [],
  "colors": [],
  "light_colors": [],
  "designs": [],
  "fonts": [],
  "available_installation_types": [],
  "is_active": true
}
```

**No variants needed** - The product has a single fixed price.

---

### Using the Variant Generator Endpoint

After creating a product, you can auto-generate variant combinations:

**Request:**

```bash
GET /api/products/1/generate-variants/
```

**Response:**

```json
{
  "product_id": 1,
  "product_title": "Premium House Numbers",
  "pricing_type": "variant",
  "total_combinations": 12,
  "variants": [
    {
      "variant_id": "20cm_×_2_digits",
      "conditions": {
        "sizeId": 1,
        "digitCount": 2
      },
      "description": "20cm × 2 Digits",
      "price": 0.0
    },
    {
      "variant_id": "20cm_×_3_digits",
      "conditions": {
        "sizeId": 1,
        "digitCount": 3
      },
      "description": "20cm × 3 Digits",
      "price": 0.0
    }
    // ... 10 more variants
  ],
  "active_dimensions": {
    "sizes": true,
    "digits": true,
    "colors": false,
    "designs": false,
    "fonts": false
  },
  "recommendation": "Use variant pricing"
}
```

Then you can use this response to create the actual variants with prices filled in.

---

### Complete Product Creation Workflow

1. **Create base product** - `POST /api/products/` with product details
2. **Get variant suggestions** - `GET /api/products/{id}/generate-variants/`
3. **Create variants with prices** - `POST /api/products/{id}/variants/` (bulk create)
4. **Upload images** - `PATCH /api/products/{id}/` with image files
5. **Activate product** - Ensure `is_active: true`

---

### cURL Examples

#### Create Product with File Upload

```bash
curl -X POST http://localhost:8000/api/products/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "title=Premium House Numbers" \
  -F "title_ar=أرقام المنازل بريميوم" \
  -F "description=High-quality house numbers" \
  -F "description_ar=أرقام منازل عالية الجودة" \
  -F "category=1" \
  -F "is_customizable=true" \
  -F "min_digits=2" \
  -F "max_digits=5" \
  -F "pricing_type=variant" \
  -F "min_price=10.00" \
  -F "max_price=50.00" \
  -F "currency=KD" \
  -F "sizes=[1,2,3]" \
  -F "colors=[1,2,3,4,5]" \
  -F "main_image=@/path/to/main.jpg" \
  -F "hovered_image=@/path/to/hover.jpg" \
  -F "is_active=true"
```

---

## Frontend Implementation (Next.js + TypeScript)

### Complete Implementation Guide for AI Tools

#### File Structure

```
src/
├── lib/
│   └── variantSystem.ts          # Core variant logic
├── components/
│   ├── admin/
│   │   ├── ProductForm.tsx       # Product creation form
│   │   └── VariantGenerator.tsx  # Variant generator component
│   └── customer/
│       └── ProductCustomizer.tsx # Customer product customization
└── types/
    └── product.ts                # TypeScript interfaces
```

---

### 1. Type Definitions

**File: `src/types/product.ts`**

```typescript
export interface ProductSize {
  id: number;
  title: string;
  title_ar: string;
  value: string;
}

export interface ProductColor {
  id: number;
  name: string;
  name_ar: string;
  color_code: string;
  image?: string;
}

export interface ProductDesign {
  id: number;
  name: string;
  name_ar: string;
  url?: string;
  image?: string;
}

export interface ProductFont {
  id: number;
  name: string;
  name_ar: string;
  image?: string;
}

export interface VariantConditions {
  sizeId?: number;
  digitCount?: number;
  [key: string]: number | string | undefined; // Allow future dimensions
}

export interface ProductVariant {
  id?: number;
  variant_id: string;
  price: number;
  currency: string;
  description: string;
  conditions: VariantConditions;
  is_default?: boolean;
}

export interface Product {
  id?: number;
  title: string;
  title_ar: string;
  description: string;
  description_ar: string;
  category: number;
  main_image?: File | string;
  hovered_image?: File | string;
  is_customizable: boolean;
  min_digits?: number;
  max_digits?: number;
  pricing_type: "base" | "variant";
  base_price?: number;
  min_price?: number;
  max_price?: number;
  currency: string;
  sizes: ProductSize[] | number[];
  colors: ProductColor[] | number[];
  light_colors: ProductColor[] | number[];
  designs: ProductDesign[] | number[];
  fonts: ProductFont[] | number[];
  variants?: ProductVariant[];
  is_active: boolean;
}

export interface PricingDimension {
  key: string;
  values: DimensionValue[];
}

export interface DimensionValue {
  id: number | string;
  label: string;
}
```

---

### 2. Core Variant Logic

**File: `src/lib/variantSystem.ts`**

```typescript
import {
  Product,
  ProductVariant,
  PricingDimension,
  DimensionValue,
  VariantConditions,
} from "@/types/product";

/**
 * Detects which pricing dimensions are active for a product
 * This tells us what factors affect the price
 */
export function detectPricingDimensions(
  product: Partial<Product>,
): PricingDimension[] {
  const dimensions: PricingDimension[] = [];

  // Size dimension
  if (
    product.sizes &&
    Array.isArray(product.sizes) &&
    product.sizes.length > 0
  ) {
    // Check if sizes are objects or just IDs
    const sizeValues = product.sizes.map((size): DimensionValue => {
      if (typeof size === "object" && "id" in size && "title" in size) {
        return { id: size.id, label: size.title };
      }
      return { id: size as number, label: `Size ${size}` };
    });

    dimensions.push({
      key: "sizeId",
      values: sizeValues,
    });
  }

  // Digit count dimension
  if (product.min_digits && product.max_digits) {
    const digitValues: DimensionValue[] = [];
    for (let i = product.min_digits; i <= product.max_digits; i++) {
      digitValues.push({
        id: i,
        label: `${i} Digit${i > 1 ? "s" : ""}`,
      });
    }

    dimensions.push({
      key: "digitCount",
      values: digitValues,
    });
  }

  // Future: Add more dimensions here
  // Color dimension (if colors affect pricing in the future)
  // Material dimension, etc.

  return dimensions;
}

/**
 * Generates all possible variant combinations
 * This is the CORE function for variant generation
 */
export function generateAllVariants(
  dimensions: PricingDimension[],
): ProductVariant[] {
  // If no dimensions, return empty (should use base pricing)
  if (dimensions.length === 0) {
    return [];
  }

  // Extract value arrays from dimensions
  const dimensionValues = dimensions.map((d) =>
    d.values.map((v) => ({
      key: d.key,
      id: v.id,
      label: v.label,
    })),
  );

  // Generate cartesian product
  const combinations = cartesianProduct(dimensionValues);

  // Convert to variant objects
  return combinations.map((combo) => {
    const conditions: VariantConditions = {};
    const labels: string[] = [];

    combo.forEach((item) => {
      conditions[item.key] = item.id as number;
      labels.push(item.label);
    });

    const variantId = labels.join("_").replace(/\s+/g, "_").toLowerCase();
    const description = labels.join(" with ");

    return {
      variant_id: variantId,
      conditions,
      price: 0, // To be filled by admin
      currency: "KD",
      description,
      is_default: false,
    };
  });
}

/**
 * Calculates cartesian product of multiple arrays
 * Example: [[A, B], [1, 2]] => [[A,1], [A,2], [B,1], [B,2]]
 */
function cartesianProduct<T>(arrays: T[][]): T[][] {
  if (arrays.length === 0) return [[]];
  if (arrays.length === 1) return arrays[0].map((item) => [item]);

  return arrays.reduce(
    (acc, curr) => acc.flatMap((a) => curr.map((c) => [...a, c])),
    [[]] as T[][],
  );
}

/**
 * Checks if product should use variant pricing
 * Returns recommendation based on available dimensions
 */
export function shouldUseVariantPricing(product: Partial<Product>): {
  recommended: boolean;
  reason: string;
  dimensionCount: number;
} {
  const dimensions = detectPricingDimensions(product);

  if (dimensions.length === 0) {
    return {
      recommended: false,
      reason:
        "No pricing dimensions (size/digits) configured. Use base pricing.",
      dimensionCount: 0,
    };
  }

  if (dimensions.length >= 1) {
    return {
      recommended: true,
      reason: `${dimensions.length} pricing dimension(s) detected: ${dimensions.map((d) => d.key).join(", ")}`,
      dimensionCount: dimensions.length,
    };
  }

  return {
    recommended: false,
    reason: "Unknown configuration",
    dimensionCount: 0,
  };
}

/**
 * Finds matching variant for customer selections
 * Client-side version (for preview/validation)
 */
export function findMatchingVariant(
  variants: ProductVariant[],
  customization: VariantConditions,
): ProductVariant | null {
  for (const variant of variants) {
    const conditions = variant.conditions;

    // Check if ALL conditions are met
    const matches = Object.entries(conditions).every(([key, value]) => {
      return String(customization[key]) === String(value);
    });

    if (matches) {
      return variant;
    }
  }

  return null;
}

/**
 * Calculates price for customer selections
 */
export function calculateCustomizationPrice(
  product: Product,
  customization: VariantConditions,
): { price: number; variant: ProductVariant | null } {
  if (product.pricing_type === "base") {
    return {
      price: product.base_price || product.min_price || 0,
      variant: null,
    };
  }

  if (product.pricing_type === "variant" && product.variants) {
    const matchedVariant = findMatchingVariant(product.variants, customization);

    if (matchedVariant) {
      return {
        price: matchedVariant.price,
        variant: matchedVariant,
      };
    }

    // Fallback to min_price
    return {
      price: product.min_price || 0,
      variant: null,
    };
  }

  return { price: 0, variant: null };
}
```

---

### 3. Admin: Variant Generator Component

**File: `src/components/admin/VariantGenerator.tsx`**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Product, ProductVariant } from '@/types/product';
import {
  detectPricingDimensions,
  generateAllVariants,
  shouldUseVariantPricing
} from '@/lib/variantSystem';

interface VariantGeneratorProps {
  product: Partial<Product>;
  onVariantsGenerated: (variants: ProductVariant[]) => void;
}

export default function VariantGenerator({
  product,
  onVariantsGenerated
}: VariantGeneratorProps) {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [autoGenerated, setAutoGenerated] = useState(false);

  const pricingCheck = shouldUseVariantPricing(product);
  const dimensions = detectPricingDimensions(product);

  useEffect(() => {
    // Auto-generate when dimensions change
    if (product.pricing_type === 'variant' && dimensions.length > 0 && !autoGenerated) {
      handleGenerate();
      setAutoGenerated(true);
    }
  }, [dimensions.length, product.pricing_type]);

  const handleGenerate = () => {
    const generated = generateAllVariants(dimensions);
    setVariants(generated);
    onVariantsGenerated(generated);
  };

  const updateVariantPrice = (index: number, price: number) => {
    const updated = [...variants];
    updated[index].price = price;
    setVariants(updated);
    onVariantsGenerated(updated);
  };

  const setDefault = (index: number) => {
    const updated = variants.map((v, i) => ({
      ...v,
      is_default: i === index
    }));
    setVariants(updated);
    onVariantsGenerated(updated);
  };

  if (product.pricing_type === 'base') {
    return (
      <div className="p-4 bg-blue-50 rounded">
        <p className="text-sm text-blue-800">
          Base pricing selected. No variants needed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Dimension Info */}
      <div className="p-4 bg-gray-50 rounded">
        <h3 className="font-semibold mb-2">Pricing Dimensions Detected:</h3>
        <ul className="space-y-1 text-sm">
          {dimensions.map(dim => (
            <li key={dim.key}>
              <strong>{dim.key}:</strong> {dim.values.length} options
              ({dim.values.map(v => v.label).join(', ')})
            </li>
          ))}
        </ul>

        {!pricingCheck.recommended && (
          <div className="mt-2 p-2 bg-yellow-100 rounded text-yellow-800 text-sm">
            ⚠️ {pricingCheck.reason}
          </div>
        )}
      </div>

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        disabled={dimensions.length === 0}
      >
        {variants.length > 0 ? 'Regenerate' : 'Generate'} Variants
        {dimensions.length > 0 && ` (${dimensions.reduce((acc, d) => acc * d.values.length, 1)} combinations)`}
      </button>

      {/* Variants Table */}
      {variants.length > 0 && (
        <div className="border rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Variant ID</th>
                <th className="p-2 text-left">Conditions</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Price (KD)</th>
                <th className="p-2">Default</th>
              </tr>
            </thead>
            <tbody>
              {variants.map((variant, index) => (
                <tr key={variant.variant_id} className="border-t">
                  <td className="p-2 font-mono text-xs">
                    {variant.variant_id}
                  </td>
                  <td className="p-2 text-xs">
                    {JSON.stringify(variant.conditions)}
                  </td>
                  <td className="p-2 text-sm">
                    {variant.description}
                  </td>
                  <td className="p-2">
                    <input
                      type="number"
                      step="0.01"
                      value={variant.price}
                      onChange={(e) => updateVariantPrice(index, parseFloat(e.target.value) || 0)}
                      className="w-24 px-2 py-1 border rounded"
                      placeholder="0.00"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <input
                      type="radio"
                      name="default_variant"
                      checked={variant.is_default || false}
                      onChange={() => setDefault(index)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
```

---

### 4. Admin: Product Form Integration

**How to use in your Product Form:**

```typescript
'use client';

import { useState } from 'react';
import VariantGenerator from './VariantGenerator';
import { Product, ProductVariant } from '@/types/product';

export default function ProductForm() {
  const [product, setProduct] = useState<Partial<Product>>({
    pricing_type: 'base',
    sizes: [],
    currency: 'KD',
    // ... other fields
  });

  const [variants, setVariants] = useState<ProductVariant[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare form data
    const formData = new FormData();

    // Add basic fields
    Object.entries(product).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, String(value));
        }
      }
    });

    // Add variants if variant pricing
    if (product.pricing_type === 'variant') {
      formData.append('variants', JSON.stringify(variants));
    }

    // Submit to API
    const response = await fetch('/api/products/', {
      method: 'POST',
      body: formData
    });

    // Handle response...
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic fields */}
      {/* ... */}

      {/* Pricing Type */}
      <div>
        <label className="block font-semibold mb-2">Pricing Type</label>
        <select
          value={product.pricing_type}
          onChange={(e) => setProduct({
            ...product,
            pricing_type: e.target.value as 'base' | 'variant'
          })}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="base">Base (Fixed Price)</option>
          <option value="variant">Variant (Dynamic Pricing)</option>
        </select>
      </div>

      {/* Variant Generator */}
      {product.pricing_type === 'variant' && (
        <VariantGenerator
          product={product}
          onVariantsGenerated={setVariants}
        />
      )}

      <button type="submit" className="px-6 py-2 bg-green-600 text-white rounded">
        Create Product
      </button>
    </form>
  );
}
```

---

### 5. Customer: Product Customizer

**File: `src/components/customer/ProductCustomizer.tsx`**

```typescript
'use client';

import { useState, useEffect } from 'react';
import { Product, VariantConditions } from '@/types/product';
import { calculateCustomizationPrice } from '@/lib/variantSystem';

interface ProductCustomizerProps {
  product: Product;
  onCustomizationChange: (customization: VariantConditions, price: number) => void;
}

export default function ProductCustomizer({
  product,
  onCustomizationChange
}: ProductCustomizerProps) {
  const [customization, setCustomization] = useState<VariantConditions>({});
  const [currentPrice, setCurrentPrice] = useState(0);

  useEffect(() => {
    // Calculate price whenever customization changes
    const { price, variant } = calculateCustomizationPrice(product, customization);
    setCurrentPrice(price);
    onCustomizationChange(customization, price);
  }, [customization, product]);

  const updateCustomization = (key: string, value: number) => {
    setCustomization(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      {product.sizes && product.sizes.length > 0 && (
        <div>
          <label className="block font-semibold mb-2">Select Size</label>
          <div className="grid grid-cols-3 gap-2">
            {product.sizes.map((size) => {
              const sizeObj = typeof size === 'object' ? size : null;
              if (!sizeObj) return null;

              return (
                <button
                  key={sizeObj.id}
                  type="button"
                  onClick={() => updateCustomization('sizeId', sizeObj.id)}
                  className={`p-3 border rounded ${
                    customization.sizeId === sizeObj.id
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white hover:border-blue-400'
                  }`}
                >
                  {sizeObj.title}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Digit Count Selection */}
      {product.min_digits && product.max_digits && (
        <div>
          <label className="block font-semibold mb-2">Number of Digits</label>
          <div className="flex gap-2">
            {Array.from(
              { length: product.max_digits - product.min_digits + 1 },
              (_, i) => product.min_digits! + i
            ).map(count => (
              <button
                key={count}
                type="button"
                onClick={() => updateCustomization('digitCount', count)}
                className={`px-4 py-2 border rounded ${
                  customization.digitCount === count
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white hover:border-blue-400'
                }`}
              >
                {count}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Display */}
      <div className="p-4 bg-gray-100 rounded">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Current Price:</span>
          <span className="text-2xl font-bold text-blue-600">
            {currentPrice.toFixed(2)} {product.currency}
          </span>
        </div>
      </div>
    </div>
  );
}
```

---

## Implementation Checklist

### Backend (Django DRF)

- [ ] Create `products/services.py` with `VariantPricingService` and `VariantGeneratorService`
- [ ] Add `clean()` methods to `Product` and `ProductVariant` models
- [ ] Update `OrderCreateSerializer` to use `VariantPricingService.calculate_price()`
- [ ] Add `generate_variants` action to `ProductViewSet`
- [ ] Test variant matching with different condition combinations
- [ ] Test validation (try creating invalid variants)

### Frontend (Next.js)

- [ ] Create `src/types/product.ts` with all interfaces
- [ ] Create `src/lib/variantSystem.ts` with core functions
- [ ] Create `src/components/admin/VariantGenerator.tsx`
- [ ] Integrate variant generator into product form
- [ ] Create `src/components/customer/ProductCustomizer.tsx`
- [ ] Test with all 4 scenarios: size only, digits only, both, none
- [ ] Add loading states and error handling

### Testing Scenarios

1. **Size Only Product** (Car Shade)
   - 3 sizes (Small, Medium, Large)
   - No digit count
   - Should generate 3 variants

2. **Digits Only Product** (Custom Text)
   - No sizes
   - 1-10 characters
   - Should generate 10 variants

3. **Both** (House Numbers)
   - 3 sizes × 4 digit options (2-5)
   - Should generate 12 variants

4. **None** (Generic Product)
   - No sizes, no digits
   - Should use base pricing
   - Variant generator should show warning

---

## Summary of Benefits

### ✅ Flexibility

- Works with ANY pricing dimension (size, digits, material, finish, etc.)
- Add new dimensions without code changes
- Just modify `conditions` JSON

### ✅ Clean Architecture

- Single matching algorithm for all scenarios
- Service layer separates business logic
- Type-safe frontend with TypeScript

### ✅ Easy to Extend

- Want to add "Material" pricing? Just add `materialId` to conditions
- Want to add "Color" pricing? Just add `colorId` to conditions
- No database migrations needed

### ✅ User-Friendly

- Auto-generates variants based on detected dimensions
- Frontend validates selections
- Real-time price updates

---

_Version: 2.0_  
_Last Updated: April 7, 2026_
