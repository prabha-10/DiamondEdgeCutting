import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { equipmentCategories } from "@/data/equipment";
import { Button } from "@/components/ui/Button";
import { ProductSchema } from "@/components/seo/ProductSchema";
import { ArrowRight } from "lucide-react";

export function generateStaticParams() {
  return equipmentCategories.map((category) => ({
    category: category.id,
  }));
}

export function generateMetadata({ params }: { params: { category: string } }): Metadata {
  const categoryData = equipmentCategories.find((c) => c.id === params.category);
  
  if (!categoryData) {
    return {
      title: "Not Found"
    };
  }

  return {
    title: categoryData.title,
    description: categoryData.description,
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryData = equipmentCategories.find((c) => c.id === params.category);

  if (!categoryData) {
    notFound();
  }

  return (
    <>
      <ProductSchema products={categoryData.models} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": categoryData.faqs.map((faq) => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
      
      <section className="relative pt-48 pb-32 bg-brand-gray-100 overflow-hidden border-b border-brand-gray-300">
        <div className="container relative z-20 mx-auto px-4 md:px-8">
          <div className="max-w-5xl">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-brand-gray-900 mb-12 leading-[1] tracking-tighter">
              {categoryData.h1}
            </h1>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 border-t border-brand-gray-300 pt-12">
              <p className="text-2xl md:text-3xl text-brand-gray-700 max-w-2xl font-medium leading-relaxed">
                {categoryData.overview}
              </p>
              <Button asChild variant="brand" size="lg" className="shrink-0">
                <Link href="/contact">Inquire Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            <div className="lg:col-span-8 flex flex-col gap-24">
              {/* Models Grid */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 mb-12 tracking-tight">Models</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {categoryData.models.map((model, index) => (
                    <div key={index} className="flex flex-col border-t border-brand-gray-300 pt-6 group">
                      <div className="aspect-video bg-brand-gray-100 mb-6 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                         <span className="text-brand-gray-500 font-mono text-xs tracking-widest uppercase">[Image: {model.name}]</span>
                      </div>
                      <h3 className="text-3xl font-bold text-brand-gray-900 mb-2">{model.name}</h3>
                      <p className="text-brand-gray-700 text-lg font-medium mb-6">{model.spec}</p>
                      <Button asChild variant="outline" className="w-full rounded-full h-14 text-lg">
                        <Link href={`/contact?equipment=${model.name}`}>
                          Inquire Details
                        </Link>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div className="border-t border-brand-gray-300 pt-12">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 mb-12 tracking-tight">Capabilities</h2>
                <ul className="flex flex-col gap-6">
                  {categoryData.useCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-4">
                      <span className="w-2 h-2 rounded-full bg-brand-red mt-2.5 shrink-0" />
                      <span className="text-brand-gray-700 text-xl font-medium">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Terms */}
              <div className="border-t border-brand-gray-300 pt-12">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 mb-8 tracking-tight">Terms</h2>
                <p className="text-brand-gray-700 text-xl font-medium leading-relaxed max-w-3xl">{categoryData.terms}</p>
              </div>

              {/* FAQs */}
              <div className="border-t border-brand-gray-300 pt-12">
                <h2 className="text-4xl md:text-5xl font-bold text-brand-gray-900 mb-12 tracking-tight">FAQ</h2>
                <div className="flex flex-col">
                  {categoryData.faqs.map((faq, index) => (
                    <div key={index} className="border-b border-brand-gray-300 py-8 first:border-t-0">
                      <h3 className="text-2xl font-bold text-brand-gray-900 mb-4">{faq.question}</h3>
                      <p className="text-brand-gray-700 text-lg font-medium max-w-3xl leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar / Cross-sells */}
            <div className="lg:col-span-4 sticky top-32">
              <div className="bg-brand-gray-50 border border-brand-gray-100 p-10 mb-12 flex flex-col gap-8">
                <h3 className="text-3xl font-bold text-brand-gray-900 tracking-tight">Ready to Rent?</h3>
                <p className="text-brand-gray-700 text-lg font-medium">Contact us to confirm availability, pricing, and operator options.</p>
                <Button asChild variant="brand" className="w-full">
                  <Link href="/contact">Request a Quote</Link>
                </Button>
              </div>

              <div className="border-t border-brand-gray-300 pt-10">
                <h3 className="text-2xl font-bold text-brand-gray-900 mb-8">Pairs Well With</h3>
                <div className="flex flex-col gap-6">
                  {categoryData.crossSells.map((crossSell, index) => (
                    <Link 
                      key={index} 
                      href={crossSell.link}
                      className="group flex flex-col gap-2"
                    >
                      <span className="font-bold text-brand-gray-900 text-xl group-hover:text-brand-red transition-colors">
                        {crossSell.name}
                      </span>
                      <span className="text-brand-gray-500 font-medium text-sm uppercase tracking-widest group-hover:translate-x-2 transition-transform flex items-center gap-2">
                        View Equipment <ArrowRight className="w-4 h-4" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
