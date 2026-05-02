import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";

const CartEmptyMessage = () => {
  return (
    <div className="px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
        <ShoppingBag className="w-16 h-16 text-gray-400" />
        <h1 className="text-3xl font-bold text-center">Your Cart is Empty</h1>
        <p className="text-gray-600 text-center max-w-md">
          Start shopping and add items to your cart to see them here.
        </p>
        <Link href="/products">
          <Button className="rounded-2xl">Continue Shopping</Button>
        </Link>
      </div>
    </div>
  );
};

export default CartEmptyMessage;
