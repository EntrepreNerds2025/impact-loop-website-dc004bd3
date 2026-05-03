import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoWhite from "@/assets/logos/impact-loop-white.png";
import logoBlack from "@/assets/logos/impact-loop-black.png";

const servicesDropdown = [
  { href: "/impact-visibility-system", label: "Impact Visibility System" },
  { href: "/adapt-ai-training", label: "ADAPT AI Training" },
  { href: "/signature-production", label: "Signature Productions" },
  { href: "/cinematic-impact-films", label: "Cinematic Impact Films" },
  { href: "/impact-media-hub", label: "Impact Media Hub" },
  { href: "/services", label: "Workshops & Training" },
  { href: "/services", label: "Strategic Advisory" },
  { href: "/services", label: "Impact Technology Solutions" },
];

const resourcesDropdown = [
  { href: "/research", label: "Research" },
];

// Media Hubs, add corporate hub below when ready
const mediaHubsDropdown = [
  { href: "/hub/black-creek-bhm", label: "Black Creek BHM Hub" },
  { href: "/hub/story-cafcan", label: "CAFCAN OPKT Hub" },
  // { href: "/hub/corporate-demo", label: "Corporate Impact Hub" },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isHubsOpen, setIsHubsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileResourcesOpen, setIsMobileResourcesOpen] = useState(false);
  const [isMobileHubsOpen, setIsMobileHubsOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const hubsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsServicesOpen(false);
    setIsResourcesOpen(false);
    setIsHubsOpen(false);
    setIsMobileServicesOpen(false);
    setIsMobileResourcesOpen(false);
    setIsMobileHubsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false);
      }
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setIsResourcesOpen(false);
      }
      if (hubsRef.current && !hubsRef.current.contains(e.target as Node)) {
        setIsHubsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navLinkClass = (active: boolean) =>
    `text-sm font-medium transition-colors duration-300 ${
      isScrolled
        ? active ? "text-foreground" : "text-foreground/60 hover:text-foreground"
        : active ? "text-white" : "text-white/70 hover:text-white"
    }`;

  const isServicesActive = ["/services", "/cinematic-impact-films", "/signature-production", "/impact-media-hub", "/adapt-ai-training", "/impact-visibility-system"].includes(location.pathname) ||
    location.pathname.startsWith("/services") ||
    location.pathname.startsWith("/signature") ||
    location.pathname.startsWith("/adapt") ||
    location.pathname.startsWith("/impact-visibility");

  const isResourcesActive = location.pathname.startsWith("/research") || location.pathname.startsWith("/blog");

  const isHubsActive = location.pathname.startsWith("/hub");

  const DesktopDropdown = ({
    items,
    containerRef,
    isOpen,
    setOpen,
    label,
    isActive,
    showViewAll,
    viewAllHref,
    viewAllLabel,
  }: {
    items: { href: string; label: string }[];
    containerRef: React.RefObject<HTMLDivElement | null>;
    isOpen: boolean;
    setOpen: (v: boolean) => void;
    label: string;
    isActive: boolean;
    showViewAll?: boolean;
    viewAllHref?: string;
    viewAllLabel?: string;
  }) => (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setOpen(!isOpen)}
        className={`flex items-center gap-1 ${navLinkClass(isActive)}`}
      >
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-0 mt-3 w-64 bg-background border border-border rounded-md shadow-lg z-50 overflow-hidden"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-5 py-3 text-sm text-foreground/70 hover:text-foreground hover:bg-muted transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
            {showViewAll && viewAllHref && (
              <div className="border-t border-border">
                <Link
                  to={viewAllHref}
                  className="block px-5 py-3 text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-200"
                >
                  {viewAllLabel || "View All"} →
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const MobileAccordion = ({
    items,
    isOpen,
    setOpen,
    label,
  }: {
    items: { href: string; label: string }[];
    isOpen: boolean;
    setOpen: (v: boolean) => void;
    label: string;
  }) => (
    <>
      <button
        onClick={() => setOpen(!isOpen)}
        className="flex items-center justify-between text-lg font-medium py-2 text-foreground/60 hover:text-foreground w-full text-left"
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-4"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-base text-foreground/50 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
         <Link to="/" className="flex items-center gap-3">
          <img
            src={isScrolled ? logoBlack : logoWhite}
            alt="Impact Loop"
            className="h-10 w-auto transition-opacity duration-500"
          />
          <span className={`font-serif text-xl font-semibold tracking-wide transition-colors duration-500 ${
            isScrolled ? "text-foreground" : "text-white"
          }`}>
            Impact Loop
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className={navLinkClass(location.pathname === "/")}>Home</Link>
          <Link to="/work" className={navLinkClass(location.pathname === "/work")}>Work</Link>

          <DesktopDropdown
            items={servicesDropdown}
            containerRef={servicesRef}
            isOpen={isServicesOpen}
            setOpen={setIsServicesOpen}
            label="Services"
            isActive={isServicesActive}
            showViewAll
            viewAllHref="/services"
            viewAllLabel="View All Services"
          />

          <DesktopDropdown
            items={resourcesDropdown}
            containerRef={resourcesRef}
            isOpen={isResourcesOpen}
            setOpen={setIsResourcesOpen}
            label="Resources"
            isActive={isResourcesActive}
          />

          <DesktopDropdown
            items={mediaHubsDropdown}
            containerRef={hubsRef}
            isOpen={isHubsOpen}
            setOpen={setIsHubsOpen}
            label="Media Hubs"
            isActive={isHubsActive}
          />

          <Link to="/about" className={navLinkClass(location.pathname === "/about")}>About</Link>
          <Link to="/contact" className={navLinkClass(location.pathname === "/contact")}>Contact</Link>

          <Link to="/bookings" className="btn-primary text-xs !px-5 !py-2">
            Book a Story Call
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors duration-300 ${
            isScrolled ? "text-foreground" : "text-white"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/98 backdrop-blur-md"
          >
            <nav className="container mx-auto px-6 py-6 flex flex-col gap-1">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium py-2 text-foreground/60 hover:text-foreground">Home</Link>
              <Link to="/work" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium py-2 text-foreground/60 hover:text-foreground">Work</Link>

              <MobileAccordion items={servicesDropdown} isOpen={isMobileServicesOpen} setOpen={setIsMobileServicesOpen} label="Services" />
              <MobileAccordion items={resourcesDropdown} isOpen={isMobileResourcesOpen} setOpen={setIsMobileResourcesOpen} label="Resources" />
              <MobileAccordion items={mediaHubsDropdown} isOpen={isMobileHubsOpen} setOpen={setIsMobileHubsOpen} label="Media Hubs" />

              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium py-2 text-foreground/60 hover:text-foreground">About</Link>
              <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium py-2 text-foreground/60 hover:text-foreground">Contact</Link>

              <Link
                to="/bookings"
                onClick={() => setIsMobileMenuOpen(false)}
                className="btn-primary text-center mt-4"
              >
                Book a Story Call
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
