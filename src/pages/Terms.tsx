import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { setSEO, resetSEO } from "@/lib/seo";

const Terms = () => {
  useEffect(() => {
    setSEO({
      title: "Terms of Service — Impact Loop",
      description: "Impact Loop's terms of service for video production, storytelling, and media services.",
      ogType: "website",
    });
    return resetSEO;
  }, []);

  return (
    <Layout>
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-8 text-sm">
            Last updated: February 27, 2026
          </p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">1. Agreement to Terms</h2>
              <p>
                By engaging Impact Loop ("we", "us", "our") for any services, you ("Client") agree to be bound by these Terms of Service. These terms govern all video production, storytelling, media creation, and related services provided by Impact Loop, a media company operating in Ontario, Canada.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">2. Services</h2>
              <p>
                Impact Loop provides cinematic storytelling, video production, impact media hub creation, content strategy, and related media services for nonprofits, corporations, and changemakers. The specific scope, deliverables, and timeline for each engagement will be outlined in a separate project agreement or statement of work.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">3. Intellectual Property</h2>
              <p>
                All raw footage, project files, and working materials remain the property of Impact Loop unless otherwise specified in a project agreement. Upon full payment, the Client receives a non-exclusive, perpetual license to use the final deliverables for the purposes outlined in the project scope. Impact Loop retains the right to use completed work in its portfolio, showreel, and marketing materials unless a confidentiality agreement is in place.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">4. Payment Terms</h2>
              <p>
                A non-refundable deposit of 50% is required to secure a production date and begin pre-production. The remaining balance is due upon delivery of the final deliverables. Late payments may be subject to a 2% monthly interest charge. All prices are quoted in Canadian Dollars (CAD) and are subject to applicable taxes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">5. Client Responsibilities</h2>
              <p>
                The Client agrees to provide timely access to locations, participants, and relevant materials needed for production. The Client is responsible for obtaining any necessary permissions, releases, or consents from participants and location owners. Delays caused by the Client may result in rescheduling fees or revised timelines.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">6. Content Usage & Ethical Standards</h2>
              <p>
                Impact Loop is committed to ethical storytelling. We protect the dignity and privacy of all story participants. The Client agrees not to alter, re-edit, or misrepresent any delivered content in a way that distorts the intended narrative or harms the individuals featured. Any redistribution must respect the consent agreements established during production.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">7. Revisions & Approvals</h2>
              <p>
                Each project includes up to two rounds of revisions on the final edit unless otherwise specified. Additional revisions will be billed at our standard hourly rate. Client approval of the final deliverable constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">8. Cancellation & Rescheduling</h2>
              <p>
                Cancellations made more than 14 days before a scheduled production date will receive a partial refund of the deposit, minus any costs already incurred. Cancellations within 14 days of production are non-refundable. Rescheduling is subject to availability and may incur additional fees.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">9. Limitation of Liability</h2>
              <p>
                Impact Loop's total liability for any claim arising from our services shall not exceed the total amount paid by the Client for the specific project in question. We are not liable for any indirect, incidental, or consequential damages, including lost revenue or reputation, arising from the use or inability to use our deliverables.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">10. Governing Law</h2>
              <p>
                These Terms are governed by and construed in accordance with the laws of the Province of Ontario and the federal laws of Canada applicable therein. Any disputes shall be resolved in the courts located in Ontario, Canada.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">11. Contact</h2>
              <p>
                For questions about these Terms, please contact us at{" "}
                <a href="mailto:info@impactloop.ca" className="text-primary hover:underline">
                  info@impactloop.ca
                </a>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Terms;
