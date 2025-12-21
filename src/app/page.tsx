import Image from "next/image";
import SectionTitle from "./components/website/SectionTitle";
import { products } from "@/static/products";
import ProductLargeCard from "./components/product/ProductLargeCard";
import CustomerReviewCard from "./components/customer/CustomerReviewCard";
import { customerReviews } from "@/static/customer";
import CustomerReviewCardCarousel from "./components/customer/CustomerReviewCardCarousel";
import ProductCardCarousel from "./components/product/ProductCardCarousel";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] min-h-screen relative home-bg">
      <div className="mt-40 mb-20 mx-20 relative z-10">
        <main className="flex flex-col w-full">
          <div className="grid grid-cols-3 justify-between gap-10">
            <div className="col-span-2">
              <h1 className="text-8xl text-wrap font-bold mb-2">
                Cacti Plantso
              </h1>
              <p className="text-lg text-muted-foreground">
                Best plants and cacti for your home and office. Browse our
                collection and find the perfect greenery to brighten up your
                space.
              </p>
              <button
                type="button"
                className="mt-4 px-6 py-2 rounded-tr-2xl rounded-bl-2xl border text-white transition"
              >
                Explore
              </button>

              <CustomerReviewCard customerReview={customerReviews[0]} />
            </div>

            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-4xl shadow-xl p-10 h-96 flex flex-col justify-end">
              <div className="flex items-center h-64">
                <Image
                  src="/images/home-plant-3.png"
                  alt="Cactus"
                  width={550}
                  height={100}
                  className="absolute -top-38 right-1/2 translate-x-1/2"
                />
              </div>
              <h1 className="text-3xl font-bold">Rubber Plant</h1>
              <p>
                Clear dirty air, help produce O2. Best for living life style.
              </p>
              <div>
                <button
                  type="button"
                  className="mt-6 px-6 py-2 rounded-tr-2xl rounded-bl-2xl border text-white transition"
                >
                  Get Yours Now
                </button>
              </div>
            </div>
          </div>

          <div>
            <SectionTitle title="Our Trendy Plants" />
            <ProductLargeCard product={products[0]} />

            <SectionTitle title="Our Top Selling" />
            {products && <ProductCardCarousel products={products} />}

            <SectionTitle title="Our Best O2" />
            <ProductLargeCard product={products[4]} />

            <SectionTitle title="Customer Review" />
            {customerReviews && (
              <CustomerReviewCardCarousel customerReviews={customerReviews} />
            )}
          </div>
        </main>
        {/* <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer> */}
      </div>
    </div>
  );
}
