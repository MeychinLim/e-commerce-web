"use client";

import React, { useMemo } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/zustands/cart";
import type { CartItemType } from "@/app/types/cart";
import CartItemCard from "@/app/components/cart/CartItemCard";
import CartEmptyMessage from "@/app/components/cart/CartEmptyMessage";
import PageTitle from "@/app/components/website/PageTitle";

const CartPage = () => {
  const { cart } = useCartStore();

  console.log("Cart: ", cart);

  const cartSummary = useMemo(() => {
    if (!cart || !cart.items || cart.items.length === 0) {
      return {
        subTotal: 0,
        discountFee: 0,
        taxFee: 0,
        deliveryFee: 0,
        total: 0,
      };
    }

    const subTotal = cart.items.reduce((sum, item: CartItemType) => {
      return sum + item.price * item.quantity;
    }, 0);

    return {
      subTotal,
      discountFee: cart.discountFee || 0,
      taxFee: cart.taxFee || 0,
      deliveryFee: cart.deliveryFee || 0,
      total:
        subTotal +
        (cart.taxFee || 0) +
        (cart.deliveryFee || 0) -
        (cart.discountFee || 0),
    };
  }, [cart]);

  if (!cart || !cart.items || cart.items.length === 0) {
    return <CartEmptyMessage />;
  }

  return (
    <div className="px-4 py-8">
      <PageTitle title="Shopping Cart" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item: CartItemType) => (
            <CartItemCard key={item.id} item={item} />
          ))}
        </div>

        {/* Cart Summary */}
        <div>
          <Card className="rounded-2xl sticky top-4">
            <CardHeader className="py-4 border-b">
              <CardTitle className="font-bold text-xl">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {/* Subtotal */}
              <div className="flex justify-between text-gray-300">
                <span className="font-semibold">Subtotal:</span>
                <span className="font-bold">
                  ${cartSummary.subTotal.toFixed(2)}
                </span>
              </div>

              {/* Discounts */}
              {cartSummary.discountFee > 0 && (
                <div className="flex justify-between text-green-600">
                  <span className="font-semibold">Discount:</span>
                  <span className="font-bold">
                    -${cartSummary.discountFee.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Tax */}
              {cart.taxIncluded && cartSummary.taxFee > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span className="font-semibold">
                    Tax ({cart.taxPercentage}%):
                  </span>
                  <span className="font-bold">
                    ${cartSummary.taxFee.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Delivery Fee */}
              {cartSummary.deliveryFee > 0 && (
                <div className="flex justify-between text-gray-300">
                  <span className="font-semibold">Delivery:</span>
                  <span className="font-bold">
                    ${cartSummary.deliveryFee.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Promo Code (Placeholder) */}
              {cart.offers && cart.offers.length > 0 && (
                <div className="pt-3 border-t">
                  <p className="text-sm font-semibold text-gray-300 mb-2">
                    Active Offers:
                  </p>
                  <div className="space-y-1">
                    {cart.offers.map((offer) => (
                      <div key={offer.id} className="text-sm text-blue-600">
                        {offer.name} (-{offer.discount}%)
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between items-center rounded-2xl">
                <span className="font-bold text-lg">Total:</span>
                <span className="text-2xl font-bold text-emerald-500">
                  ${cartSummary.total.toFixed(2)}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <Button
                  className="w-full rounded-2xl font-bold"
                  size="lg"
                  variant="outline"
                >
                  Proceed to Checkout
                </Button>
                <Link href="/products" className="block">
                  <Button className="w-full rounded-2xl font-bold" size="lg">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Item Count */}
              <p className="text-center text-sm text-gray-500 pt-2 border-t">
                {cart.items.length} item{cart.items.length !== 1 ? "s" : ""} in
                cart
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
