"use client";

import { useState } from "react";
import { products } from "@/static/products";
import ProductSmallCard from "@/app/components/product/ProductSmallCard";
import { Button } from "@/components/ui/button";
import { ArrowDownAZ, ArrowDownZA, SearchIcon } from "lucide-react";
import { SORT_BY_ASC, SORT_BY_DESC } from "@/constants/constant";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

const Page = () => {
  const [name, setName] = useState<string>("");
  const [sortedBy, setSortedBy] = useState<string>(SORT_BY_ASC);

  return (
    <div className="px-4 py-8">
      <div className="flex flex-row gap-4 justify-between my-4">
        <div>
          <InputGroup>
            <InputGroupInput
              value={name}
              placeholder="Search Product Name"
              className="rounded-2xl"
              onChange={(e) => setName(e.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              setSortedBy(
                sortedBy === SORT_BY_ASC ? SORT_BY_DESC : SORT_BY_ASC
              );
            }}
          >
            {sortedBy === SORT_BY_DESC ? <ArrowDownAZ /> : <ArrowDownZA />}
          </Button>
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4 text-center">Our Products</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {products.map((product) => (
          <div key={product.id} className="w-full">
            <ProductSmallCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
