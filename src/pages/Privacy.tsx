import Layout from "@/components/layout/Layout";

const Privacy = () => {
  return (
    <Layout>
      <section className="py-24 md:py-32 bg-background">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground mb-8 text-sm">
            Last updated: February 27, 2026
          </p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 leading-relaxed">
            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">1. Introduction</h2>
              <p>
                Impact Loop ("we", "us", "our") is committed to protecting the privacy of our clients, website visitors, and story participants. This Privacy Policy explains how we collect, use, disclose, and safeguard your information in accordance with Canada's Personal Information Protection and Electronic Documents Act (PIPEDA).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number, and organization name when you book a call, submit a form, or contact us.</li>
                <li><strong>Project Information:</strong> Details related to your organization, programs, and storytelling needs provided during consultations and production.</li>
                <li><strong>Participant Information:</strong> Names, images, and stories of individuals featured in our productions, collected with informed consent.</li>
                <li><strong>Website Usage Data:</strong> IP address, browser type, pages visited, and interaction data collected through cookies and analytics tools.</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Deliver and manage our video production and storytelling services</li>
                <li>Communicate with you about projects, bookings, and inquiries</li>
                <li>Improve our website and service offerings</li>
                <li>Send relevant updates or resources (with your consent)</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">4. Cookies & Analytics</h2>
              <p>
                Our website uses cookies and similar technologies to enhance your browsing experience and collect usage analytics. You can control cookie preferences through your browser settings. We may use third-party analytics services such as Google Analytics to understand website traffic patterns.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">5. Third-Party Services</h2>
              <p>
                We may use third-party service providers for hosting, analytics, email communications, scheduling, and payment processing. These providers only have access to the information necessary to perform their functions and are obligated to maintain confidentiality.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">6. Data Retention</h2>
              <p>
                We retain personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by law. Project files and deliverables are retained for a reasonable period following project completion to support client needs.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">7. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">8. Your Rights Under PIPEDA</h2>
              <p>Under Canadian privacy law, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Withdraw consent for the collection or use of your information</li>
                <li>File a complaint with the Office of the Privacy Commissioner of Canada</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">9. Children's Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 13. When our productions involve minors, we obtain consent from a parent or legal guardian.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">10. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated revision date. Continued use of our website or services constitutes acceptance of the revised policy.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-semibold text-foreground">11. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or wish to exercise your privacy rights, please contact us at{" "}
                <a href="mailto:info@impactloop.ca" className="text-primary hover:underline">
                  info@impactloop.ca
                </a>.
              </p>
              <p className="mt-2">
                Impact Loop<br />
                Toronto, ON, Canada
              </p>
            </section>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Privacy;
