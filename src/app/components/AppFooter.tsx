"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Twitter, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCustomerStore } from "@/zustands/customer";

const AppFooter: React.FC = () => {
  const customer = useCustomerStore((s) => s.customer);
  const [review, setReview] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  const submitReview = () => {
    setStatus(null);
    if (!customer) {
      setStatus("Please sign in to leave a review.");
      return;
    }

    if (!review.trim()) {
      setStatus("Please enter a review before submitting.");
      return;
    }

    const reviewsRaw = localStorage.getItem("reviews");
    const reviews = reviewsRaw ? JSON.parse(reviewsRaw) : [];
    reviews.push({
      author: customer.email ?? customer.fullName ?? "Anonymous",
      text: review.trim(),
      createdAt: Date.now(),
    });
    localStorage.setItem("reviews", JSON.stringify(reviews));
    setReview("");
    setStatus("Thanks — your review was saved locally.");
  };

  return (
    <footer className="w-full bg-gradient-to-t from-black/60 to-transparent text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & Quote */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {/* Try to render a logo image if available, fallback to text */}
            <div className="relative h-12 w-12 rounded-full overflow-hidden bg-white/10 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="Shop logo"
                fill
                style={{ objectFit: "cover" }}
                sizes="48px"
                onError={() => {}}
              />
            </div>
            <div>
              <h3 className="text-lg font-bold">Plant & Petal</h3>
              <p className="text-sm text-muted-foreground">
                Natural beauty, nurtured with care.
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground max-w-sm">
            We grow with love — sustainably sourced plants and botanical
            skincare.
          </p>

          <div className="flex items-center gap-3">
            <a aria-label="Twitter" href="#" className="hover:text-primary">
              <Twitter size={20} />
            </a>
            <a aria-label="Instagram" href="#" className="hover:text-primary">
              <Instagram size={20} />
            </a>
            <a aria-label="Facebook" href="#" className="hover:text-primary">
              <Facebook size={20} />
            </a>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex flex-col">
          <h4 className="font-semibold mb-3">Navigate</h4>
          <nav className="flex flex-col gap-2 text-sm">
            <Link href="/products" className="hover:underline">
              Products
            </Link>
            <Link href="/sales" className="hover:underline">
              Sales
            </Link>
            <Link href="/cart" className="hover:underline">
              Cart
            </Link>
            <Link href="/about" className="hover:underline">
              About
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>

        {/* Reviews / Contact */}
        <div className="flex flex-col">
          <h4 className="font-semibold mb-3">Share your thoughts</h4>

          {customer ? (
            <>
              <p className="text-sm text-muted-foreground mb-2">
                Hi {customer.fullName ?? customer.email}, leave a quick review.
              </p>
              <Textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write a short review..."
              />
              <div className="flex gap-2 justify-end mt-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setReview("")}
                >
                  Clear
                </Button>
                <Button size="sm" onClick={submitReview}>
                  Submit
                </Button>
              </div>
              {status ? (
                <p className="text-sm mt-2 text-muted-foreground">{status}</p>
              ) : null}
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-muted-foreground">
                Sign in to leave reviews.
              </p>
              <div className="flex gap-2">
                <Link href="/auth?mode=login">
                  <Button variant="outline" size="sm">
                    Sign in
                  </Button>
                </Link>
                <Link href="/auth?mode=register">
                  <Button size="sm">Create account</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-white/10 mt-4 py-4">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>
            © {new Date().getFullYear()} Plant & Petal — All rights reserved.
          </span>
          <span>
            Built with care · Terms ·{" "}
            <Link href="/privacy-policy" className="hover:underline">
              Privacy
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;
