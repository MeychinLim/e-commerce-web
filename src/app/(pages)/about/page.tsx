"use client";

import React from "react";
import PageTitle from "@/app/components/website/PageTitle";
import SectionTitle from "@/app/components/website/SectionTitle";
import { Card } from "@/components/ui/card";
import {
  Check,
  Earth,
  Eye,
  Goal,
  HeartHandshake,
  Leaf,
  Lightbulb,
  Package,
  Sprout,
  Star,
  Target,
  ThumbsUp,
  Truck,
} from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: <Leaf className="w-10 h-10" />,
      title: "Sustainability",
      description:
        "We are committed to sustainable practices and eco-friendly products that benefit both our customers and the environment.",
    },
    {
      icon: <ThumbsUp className="w-10 h-10" />,
      title: "Quality",
      description:
        "We prioritize quality in every aspect, from sourcing to delivery, ensuring customer satisfaction.",
    },
    {
      icon: <HeartHandshake className="w-10 h-10" />,
      title: "Community",
      description:
        "Building strong relationships with our customers and supporting local communities is at our core.",
    },
    {
      icon: <Earth className="w-10 h-10" />,
      title: "Innovation",
      description:
        "We continuously innovate to bring the best products and services to our valued customers.",
    },
  ];

  return (
    <div className="w-full empty-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main About Content */}
        <section className="my-16">
          <PageTitle title="Who We Are" />
          <div className="space-y-4">
            <p className="text-lg text-foreground/80 leading-relaxed">
              Welcome to our e-commerce platform, your one-stop destination for
              quality products and exceptional service. We believe in creating
              meaningful connections between customers and products that enhance
              their daily lives.
            </p>
            <p className="text-lg text-foreground/80 leading-relaxed">
              With years of experience in the industry, we have established
              ourselves as a trusted brand committed to excellence,
              sustainability, and customer satisfaction.
            </p>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-16">
          <SectionTitle title="Vision" subtitle="Where We're Headed" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">
            <div className="rounded-2xl border border-green-200 bg-white/10 backdrop-blur-lg shadow-xl transition duration-300 p-8">
              <Eye className="mb-4 w-20 h-20" />
              <p className="text-lg text-foreground leading-relaxed">
                To become a leading global e-commerce platform that empowers
                customers to make conscious choices through sustainable,
                high-quality products while fostering a community of like-minded
                individuals who value excellence and environmental
                responsibility.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg border border-green-100 hover:border-green-300 transition-colors">
                <Check className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    Sustainable Growth
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Expanding our reach while maintaining eco-friendly practices
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg border border-green-100 hover:border-green-300 transition-colors">
                <Check className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    Customer First
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Delivering exceptional value and experience to every
                    customer
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg border border-green-100 hover:border-green-300 transition-colors">
                <Check className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-foreground">Innovation</h3>
                  <p className="text-sm text-foreground/70">
                    Leveraging technology to improve customer experience
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <SectionTitle title="Mission" subtitle="What We Do" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-8">
            <div className="space-y-4 order-2 md:order-1">
              <div className="flex items-start gap-4 p-4 rounded-lg border border-green-100 hover:border-green-300 transition-colors">
                <Target className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    Quality Products
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Curating and delivering premium products that meet our
                    strict standards
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg border border-green-100 hover:border-green-300 transition-colors">
                <Package className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    Reliable Service
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Ensuring seamless shopping experience from browsing to
                    delivery
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-lg border border-green-100 hover:border-green-300 transition-colors">
                <Lightbulb className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold text-foreground">
                    Continuous Improvement
                  </h3>
                  <p className="text-sm text-foreground/70">
                    Constantly evolving our platform and services
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-green-200 bg-white/10 backdrop-blur-lg shadow-xl transition duration-300 p-8 order-1 md:order-2">
              <Goal className="mb-4 w-20 h-20" />
              <p className="text-lg text-foreground leading-relaxed">
                Our mission is to provide an exceptional shopping experience by
                offering high-quality, sustainable products at competitive
                prices while maintaining the highest standards of customer
                service and environmental responsibility. We are dedicated to
                building trust and long-term relationships with our customers.
              </p>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-16">
          <SectionTitle title="Core Values" subtitle="What Drives Us" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-green-200 hover:border-green-400 p-6 text-center"
              >
                <div className="flex justify-center mt-4 mb-2 group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {value.description}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <SectionTitle title="Why Choose Us" subtitle="Our Advantages" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="rounded-xl border p-6">
              <h3 className="text-xl font-bold text-foreground mb-3">
                <Star /> Premium Quality
              </h3>
              <p className="text-foreground/70">
                All products are carefully selected and tested to ensure they
                meet our high-quality standards.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <h3 className="text-xl font-bold text-foreground mb-3">
                <Truck /> Fast Delivery
              </h3>
              <p className="text-foreground/70">
                We partner with reliable logistics providers to ensure your
                orders arrive quickly and safely.
              </p>
            </div>
            <div className="rounded-xl border p-6">
              <h3 className="text-xl font-bold text-foreground mb-3">
                <Sprout /> Eco-Friendly
              </h3>
              <p className="text-foreground/70">
                Committed to sustainable practices and environmentally
                responsible operations.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
