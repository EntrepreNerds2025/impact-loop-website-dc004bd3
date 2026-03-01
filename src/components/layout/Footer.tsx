import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logoWhite from "@/assets/logos/impact-loop-white.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-impact-dark text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoWhite} alt="Impact Loop" className="h-10 w-auto" />
              <span className="font-serif text-xl font-semibold">Impact Loop</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed">
              Cinematic storytelling for nonprofits & changemakers. Turning real
              human impact into trusted narratives.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Navigate</h4>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/work", label: "Work" },
                { href: "/services", label: "Services" },
                { href: "/research", label: "Research" },
                { href: "/blog", label: "Blog" },
                { href: "/hub/examples", label: "Hub Examples" },
                { href: "/contact", label: "Contact Us" },
                { href: "/bookings", label: "Book a Call" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white/60 hover:text-white text-sm transition-colors duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Contact</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@impactloop.ca"
                className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors duration-300"
              >
                <Mail size={16} />
                info@impactloop.ca
              </a>
              <a
                href="tel:+16478329775"
                className="flex items-center gap-3 text-white/60 hover:text-white text-sm transition-colors duration-300"
              >
                <Phone size={16} />
                (647) 832-9775
              </a>
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin size={16} />
                Toronto, ON, Canada
              </div>
            </div>
          </div>

          {/* Client Access */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold">Client Access</h4>
            <p className="text-white/60 text-sm">
              Already a client? Access your framework materials and resources.
            </p>
            <Link
              to="/login"
              className="inline-block text-impact-blue hover:text-impact-purple text-sm font-medium transition-colors duration-300"
            >
              Login to Client Portal →
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} Impact Loop. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              to="/privacy"
              className="text-white/40 hover:text-white/60 text-sm transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="text-white/40 hover:text-white/60 text-sm transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;