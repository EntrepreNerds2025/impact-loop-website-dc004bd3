import { useEffect } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BlogFAQ } from "@/lib/blog";

interface FAQSectionProps {
  faqs: BlogFAQ[];
}

export const FAQSection = ({ faqs }: FAQSectionProps) => {
  useEffect(() => {
    if (!faqs || faqs.length === 0) return;
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };
    const id = "faq-jsonld";
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.id = id;
      el.type = "application/ld+json";
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => {
      const node = document.getElementById(id);
      if (node) node.remove();
    };
  }, [faqs]);

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="border-t border-[#e6e8ef] pt-12 mt-12">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#6e3acb]">
        Frequently Asked
      </p>
      <h2 className="mb-8 font-serif text-2xl font-bold leading-tight text-[#1f2233] md:text-4xl">
        Questions readers have asked.
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, idx) => (
          <AccordionItem key={idx} value={`item-${idx}`}>
            <AccordionTrigger className="text-left font-serif text-lg font-semibold text-[#1f2233]">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-base leading-relaxed text-[#6b6f7a]">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default FAQSection;
