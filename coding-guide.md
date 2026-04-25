# E-Commerce Web - Coding Guide

## Overview

This guide establishes standards for writing clean, maintainable code across this e-commerce application. All team members should follow these guidelines to ensure consistency and code quality.

---

## 1. Component Structure

### File Organization

- **Page components**: Use `page.tsx` in route directories (`src/app/(pages)/*/page.tsx`)
- **Reusable components**: Place in `src/app/components/` with descriptive folder names
- **UI components**: Use `src/components/ui/` for shadcn/ui components
- **One component per file**: Unless tightly coupled

### Component Naming

- Use **PascalCase** for component files: `ProductCard.tsx`, `CustomerLoginForm.tsx`
- Use **lowercase with hyphens** for page routes: `[id]`, `shop-location`
- Export components as default

### TypeScript

- Always define **component props with interfaces**
- Use **strict typing** (no `any` types)
- Example:
  ```tsx
  interface ProductCardProps {
    product: ProductType;
    onAddToCart?: (id: number) => void;
  }
  ```

---

## 2. Styling & Tailwind CSS

### Rounded Corners

- **Default border radius for all components**: Use `rounded-2xl`
- Apply to: cards, buttons, inputs, modals, and any container elements
- Examples:
  ```tsx
  <Card className="rounded-2xl">...</Card>
  <Button className="rounded-2xl">Click me</Button>
  <input className="rounded-2xl border" />
  ```

### Color Scheme

- **Text**: Use `text-gray-600` for secondary text instead of `text-muted-foreground`
- **Primary**: `text-blue-600` for links and primary actions
- **Status colors**:
  - Success: `text-green-600`
  - Error: `text-red-600`
  - Warning: `text-yellow-600`

### Font Weights

- **Headings**: Use `font-bold` for h1, h2, h3
- **Body**: Use `font-normal` (default)
- **Labels**: Use `font-semibold`
- **Emphasis**: Use `font-bold`

### Spacing & Layout

- **Page containers**: Always use `px-4 py-8` for top-level page padding
- **Remove `max-w-6xl mx-auto`**: The layout's `max-w-screen-xl mx-auto` wrapper handles width constraints
- **Grid layouts**: Use `grid-cols-1 md:grid-cols-2 gap-8` pattern for responsive designs
- **Centered content**: Use `flex flex-col items-center justify-center min-h-[60vh]` for placeholder pages

### Avoid

- ❌ `text-muted-foreground` (use `text-gray-600` instead)
- ❌ `font-semibold` for headings (use `font-bold`)
- ❌ Arbitrary border-radius values (use `rounded-2xl`)
- ❌ `min-h-screen` for page containers (use `min-h-[60vh]`)

---

## 3. Code Cleanliness

### Imports

- Sort imports: **React/Next** → **External packages** → **Internal imports**
- Example:

  ```tsx
  import React from "react";
  import Link from "next/link";

  import { Button } from "@/components/ui/button";
  import { products } from "@/static/products";
  ```

### Remove Comments

- ❌ Delete commented-out code
- ✅ Use meaningful variable/function names instead of inline comments
- ✅ Only keep comments for **complex logic** or **why** decisions (not **what**)

### Variable Naming

- Use **descriptive names**: `productPrice`, `isLoading`, `handleAddToCart`
- Avoid: `p`, `x`, `temp`, `data`
- Boolean variables: Prefix with `is`, `has`, `should`, `can`

### Function Organization

- Keep functions **small and focused** (single responsibility)
- Use **arrow functions** for components: `const Page = () => {}`
- Extract complex logic into separate functions
- Example:
  ```tsx
  const calculateDiscount = (price: number, discount: number) => {
    return (price * (100 - discount)) / 100;
  };
  ```

### Conditional Rendering

- Use **ternary operators** for simple conditions
- Use **logical AND** for presence checks
- Example:

  ```tsx
  // Good
  {
    isOnSale && <Badge>Sale</Badge>;
  }
  {
    quantity > 0 ? (
      <span className="text-green-600">In Stock</span>
    ) : (
      <span className="text-red-600">Out of Stock</span>
    );
  }

  // Avoid
  {
    isOnSale === true ? <Badge>Sale</Badge> : null;
  }
  ```

---

## 4. Async Components

### Server Components (Page & Layout)

- Use `async/await` for data fetching
- Always destructure and await params:

  ```tsx
  interface PageProps {
    params: Promise<{ id: string }>;
  }

  const Page: React.FC<PageProps> = async ({ params }) => {
    const { id } = await params;
    // fetch or find data
  };
  ```

### Client Components

- Use `"use client"` directive at top of file
- Use `useEffect` for side effects
- Use Zustand for state management

---

## 5. Error Handling

### 404 Pages

- Use consistent centered layout:
  ```tsx
  <div className="px-4 py-8 flex flex-col items-center justify-center min-h-[60vh] gap-4">
    <h1 className="text-3xl font-bold">Product Not Found</h1>
    <Link href="/products">
      <Button>Back to Products</Button>
    </Link>
  </div>
  ```

---

## 6. Component Examples

### Page Component Template

```tsx
import React from "react";
import { Button } from "@/components/ui/button";

interface PageProps {
  params: Promise<{ id: string }>;
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = await params;

  return (
    <div className="px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Page Title</h1>
      <Button className="rounded-2xl">Action</Button>
    </div>
  );
};

export default Page;
```

### Reusable Component Template

```tsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

interface MyComponentProps {
  title: string;
  description?: string;
  onAction?: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({
  title,
  description,
  onAction,
}) => {
  return (
    <Card className="rounded-2xl">
      <CardContent>
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        {description && <p className="text-gray-600">{description}</p>}
        {onAction && <button onClick={onAction}>Action</button>}
      </CardContent>
    </Card>
  );
};

export default MyComponent;
```

---

## 7. TypeScript Best Practices

- **Use strict mode**: `strict: true` in tsconfig.json
- **Import types explicitly**:
  ```tsx
  import type { ProductType } from "@/app/types/product";
  ```
- **Define response types**: Create interfaces for API responses
- **Avoid implicit `any`**: Always annotate function parameters and return types

---

## 8. Accessibility (a11y)

- Use **semantic HTML**: `<button>`, `<input>`, `<label>`
- Add **alt text** to images
- Use **aria labels** for interactive elements
- Ensure **keyboard navigation** support

---

## 9. Performance

- Use **Next.js Image** component for images
- Implement **lazy loading** for lists
- Minimize **re-renders** with proper state management
- Keep components **focused and modular**

---

## 10. Checklist Before Commit

- [ ] Code follows naming conventions
- [ ] All components use `rounded-2xl` where applicable
- [ ] No commented-out code
- [ ] TypeScript has no `any` types
- [ ] Imports are organized
- [ ] Colors follow the scheme (no `text-muted-foreground`)
- [ ] Props are typed with interfaces
- [ ] Functions are small and focused
- [ ] No console.log statements (unless debugging)
- [ ] All files have proper exports

---

**Last Updated**: April 2026
