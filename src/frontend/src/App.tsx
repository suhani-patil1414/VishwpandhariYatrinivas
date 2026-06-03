import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Star,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Rooms", href: "#rooms" },
  { label: "Amenities", href: "#amenities" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const ROOMS = [
  {
    id: 1,
    title: "Standard Room",
    image:
      "https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=600&q=80",
    description:
      "A cozy, well-appointed room perfect for solo pilgrims or couples seeking a peaceful retreat after temple visits.",
    features: [
      "Queen Bed",
      "Private Bathroom",
      "Hot Water",
      "AC",
      "Free Wi-Fi",
    ],
    price: "\u20b9800",
  },
  {
    id: 2,
    title: "Deluxe Room",
    image:
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80",
    description:
      "Spacious and elegantly furnished, our Deluxe Room offers premium amenities and a tranquil ambiance for a blessed stay.",
    features: [
      "King Bed",
      "Ensuite Bathroom",
      "Hot Water",
      "AC",
      "Free Wi-Fi",
      "Room Service",
    ],
    price: "\u20b91,200",
  },
  {
    id: 3,
    title: "Family Room",
    image:
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=600&q=80",
    description:
      "Thoughtfully designed for families on spiritual journeys, with extra space and amenities to ensure everyone's comfort.",
    features: [
      "2 Double Beds",
      "Extra Mattress",
      "Hot Water",
      "AC",
      "Free Wi-Fi",
      "Mini Fridge",
    ],
    price: "\u20b91,800",
  },
];

const AMENITIES = [
  {
    icon: "\ud83d\ude97",
    title: "Free Parking",
    desc: "Spacious and secure parking for your vehicle",
  },
  {
    icon: "\ud83d\udebf",
    title: "Hot Water",
    desc: "24-hour hot water supply for your comfort",
  },
  {
    icon: "\ud83e\uddf9",
    title: "Clean Rooms",
    desc: "Daily housekeeping and sanitised spaces",
  },
  {
    icon: "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67",
    title: "Family Stay",
    desc: "Family-friendly environment, safe for all ages",
  },
  {
    icon: "\ud83d\uded5",
    title: "Temple Access",
    desc: "Walking distance to Vitthal-Rukmini Temple",
  },
  {
    icon: "\ud83d\udcde",
    title: "24/7 Support",
    desc: "Round-the-clock assistance for all guests",
  },
];

const GALLERY_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80",
    alt: "Hotel exterior",
  },
  {
    src: "https://images.unsplash.com/photo-1559599101-f09722fb4948?w=600&q=80",
    alt: "Dining area",
  },
  {
    src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    alt: "Room interior",
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    alt: "Lobby",
  },
  {
    src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80",
    alt: "Garden",
  },
  {
    src: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=600&q=80",
    alt: "Pool area",
  },
];

const TESTIMONIALS = [
  {
    id: 1,
    name: "Ramesh Kulkarni",
    location: "Pune, Maharashtra",
    avatar: "https://i.pravatar.cc/80?img=1",
    rating: 5,
    review:
      "A truly divine experience! The rooms are spotlessly clean, the staff is warm and welcoming. Being so close to the Vitthal temple made our pilgrimage unforgettable. Highly recommended for families!",
  },
  {
    id: 2,
    name: "Sunita Deshpande",
    location: "Nashik, Maharashtra",
    avatar: "https://i.pravatar.cc/80?img=2",
    rating: 5,
    review:
      "We stayed here during Ashadhi Ekadashi. Despite being a busy time, everything was perfectly organised. The hot water, cleanliness, and hospitality made us feel at home. Will definitely come again!",
  },
  {
    id: 3,
    name: "Vijay Patil",
    location: "Solapur, Maharashtra",
    avatar: "https://i.pravatar.cc/80?img=3",
    rating: 5,
    review:
      "Vishwpandhari Yatrinivas exceeded all our expectations. The family room was spacious and comfortable. The staff helped us with temple timings and local guidance. A gem near Pandharpur!",
  },
];

// ─── Components ────────────────────────────────────────────────────────────

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          className={`w-4 h-4 ${
            n <= rating
              ? "fill-amber-400 text-amber-400"
              : "text-muted-foreground"
          }`}
        />
      ))}
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <span className="text-saffron font-body font-semibold text-sm uppercase tracking-widest">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mt-2 mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground max-w-2xl leading-relaxed text-base md:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = NAV_LINKS.map((l) => l.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActive(`#${id}`);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setIsOpen(false);
    const el = document.getElementById(href.slice(1));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-card/95 backdrop-blur-md shadow-card" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 md:h-20">
        {/* Logo */}
        <button
          type="button"
          onClick={() => handleNav("#home")}
          className="flex items-center gap-2.5"
          data-ocid="nav.link"
        >
          <span className="text-2xl">\ud83d\uded5</span>
          <span className="font-display font-bold text-lg leading-tight text-foreground">
            Vishwpandhari
            <span className="block text-xs font-body font-normal text-saffron tracking-widest uppercase">
              Yatrinivas
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                onClick={() => handleNav(link.href)}
                data-ocid="nav.link"
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active === link.href
                    ? "text-saffron bg-saffron-light"
                    : "text-foreground hover:text-saffron hover:bg-saffron-light"
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-card border-b border-border shadow-warm"
          >
            <ul className="px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => handleNav(link.href)}
                    data-ocid="nav.link"
                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active === link.href
                        ? "text-saffron bg-saffron-light"
                        : "text-foreground hover:text-saffron hover:bg-saffron-light"
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ──────────────────────────────────────────────────────────────────
function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-[0.2em] uppercase rounded-full border border-amber-400/60 text-amber-300 bg-black/20">
            \ud83d\uded5 Near Pandharpur Temple
          </span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Welcome to <span className="text-amber-400">Vishwpandhari</span>
            <br />
            <span className="italic font-normal">Yatrinivas</span>
          </h1>
          <p className="text-lg md:text-xl text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed">
            Peaceful homestay near Pandharpur for pilgrims and families \u2014
            where every stay is a blessed experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={() => scrollTo("rooms")}
              data-ocid="hero.primary_button"
              className="bg-saffron hover:bg-amber-600 text-white px-8 py-6 text-base font-semibold rounded-xl shadow-warm border-0 transition-all hover:scale-105"
            >
              View Rooms
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollTo("contact")}
              data-ocid="hero.secondary_button"
              className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-foreground px-8 py-6 text-base font-semibold rounded-xl backdrop-blur-sm transition-all hover:scale-105"
            >
              Contact Now
            </Button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center pt-1.5"
        >
          <div className="w-1.5 h-2.5 bg-white/70 rounded-full" />
        </motion.div>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────
function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-saffron-light rounded-2xl opacity-60" />
              <div className="absolute -bottom-4 -right-4 w-32 h-16 bg-gold/20 rounded-2xl" />
              <img
                src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80"
                alt="Peaceful homestay interior"
                className="relative rounded-2xl shadow-warm w-full h-80 md:h-96 object-cover"
              />
              <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-card">
                <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">
                  Est. since
                </p>
                <p className="font-display text-2xl font-bold text-saffron">
                  2010
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <SectionHeading
              eyebrow="Our Story"
              title="A Home Away from Home"
              subtitle="Nestled in the holy town of Pandharpur, Vishwpandhari Yatrinivas has been a haven for pilgrims and families for over a decade."
            />
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Our yatrinivas is built on the values of devotion, comfort, and
                cleanliness. We understand that your spiritual journey deserves
                a restful and welcoming place to stay, and we strive to provide
                exactly that.
              </p>
              <p>
                Located just a short walk from the sacred Vitthal-Rukmini
                Temple, our property offers modern amenities while preserving
                the traditional warmth of Maharashtrian hospitality.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { num: "500+", label: "Happy Guests" },
                { num: "14+", label: "Years of Service" },
                { num: "100%", label: "Clean & Safe" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="text-center p-4 bg-saffron-light rounded-xl"
                >
                  <p className="font-display text-2xl font-bold text-saffron">
                    {s.num}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1 font-medium">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Rooms ─────────────────────────────────────────────────────────────────
function RoomsSection() {
  return (
    <section id="rooms" className="py-20 md:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <SectionHeading
            eyebrow="Accommodation"
            title="Choose Your Room"
            subtitle="Each room is designed with your comfort and peace of mind in focus, blending modern amenities with a warm, home-like atmosphere."
            center
          />
        </div>
        <div className="grid md:grid-cols-3 gap-8" data-ocid="rooms.list">
          {ROOMS.map((room, i) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-warm transition-shadow group"
              data-ocid={`rooms.item.${i + 1}`}
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={room.image}
                  alt={room.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-saffron text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                  {room.price}/night
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground mb-2">
                  {room.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {room.description}
                </p>
                <ul className="space-y-1.5 mb-6">
                  {room.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-center gap-2 text-sm text-foreground"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full bg-saffron hover:bg-amber-600 text-white font-semibold rounded-xl border-0"
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  data-ocid={`rooms.primary_button.${i + 1}`}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Amenities ─────────────────────────────────────────────────────────────
function AmenitiesSection() {
  return (
    <section id="amenities" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <SectionHeading
            eyebrow="What We Offer"
            title="Premium Amenities"
            subtitle="Everything you need for a comfortable and spiritual stay, provided with care and dedication."
            center
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {AMENITIES.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-warm hover:border-saffron/30 transition-all group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {a.icon}
              </div>
              <h3 className="font-display font-bold text-foreground mb-2">
                {a.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {a.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Gallery ───────────────────────────────────────────────────────────────
function GallerySection() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const prev = useCallback(
    () =>
      setLightboxIdx((i) =>
        i !== null
          ? (i - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
          : null,
      ),
    [],
  );
  const next = useCallback(
    () =>
      setLightboxIdx((i) =>
        i !== null ? (i + 1) % GALLERY_IMAGES.length : null,
      ),
    [],
  );

  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIdx(null);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIdx, prev, next]);

  return (
    <section id="gallery" className="py-20 md:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <SectionHeading
            eyebrow="Our Spaces"
            title="Photo Gallery"
            subtitle="A glimpse into the warmth and beauty of Vishwpandhari Yatrinivas."
            center
          />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GALLERY_IMAGES.map((img, i) => (
            <motion.button
              type="button"
              key={img.alt}
              onClick={() => setLightboxIdx(i)}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="group relative overflow-hidden rounded-2xl aspect-square focus:outline-none focus:ring-2 focus:ring-saffron"
              data-ocid={`gallery.item.${i + 1}`}
              aria-label={`View ${img.alt}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  \ud83d\udd0d
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxIdx(null)}
            data-ocid="gallery.modal"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_IMAGES[lightboxIdx].src.replace("w=600", "w=1200")}
                alt={GALLERY_IMAGES[lightboxIdx].alt}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              <button
                type="button"
                onClick={() => setLightboxIdx(null)}
                className="absolute -top-10 right-0 text-white/80 hover:text-white"
                data-ocid="gallery.close_button"
              >
                <X className="w-7 h-7" />
              </button>
              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                data-ocid="gallery.pagination_prev"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                data-ocid="gallery.pagination_next"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
              <p className="text-center text-white/60 text-sm mt-3">
                {lightboxIdx + 1} / {GALLERY_IMAGES.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────
function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => setCurrent((c) => (c + 1) % TESTIMONIALS.length);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <SectionHeading
            eyebrow="Guest Reviews"
            title="What Our Guests Say"
            subtitle="Hear from the pilgrims and families who made Vishwpandhari Yatrinivas their home away from home."
            center
          />
        </div>

        {/* Desktop: all 3 cards */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="bg-card border border-border rounded-2xl p-7 shadow-card hover:shadow-warm transition-shadow"
              data-ocid={`testimonials.item.${i + 1}`}
            >
              <StarRating rating={t.rating} />
              <p className="text-muted-foreground text-sm leading-relaxed mt-4 mb-6 italic">
                &ldquo;{t.review}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-saffron/30"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{t.location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: slider */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              className="bg-card border border-border rounded-2xl p-6 shadow-card"
              data-ocid="testimonials.card"
            >
              <StarRating rating={TESTIMONIALS[current].rating} />
              <p className="text-muted-foreground text-sm leading-relaxed mt-4 mb-6 italic">
                &ldquo;{TESTIMONIALS[current].review}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={TESTIMONIALS[current].avatar}
                  alt={TESTIMONIALS[current].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-saffron/30"
                />
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    {TESTIMONIALS[current].name}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {TESTIMONIALS[current].location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              type="button"
              onClick={prev}
              className="p-2 rounded-full border border-border hover:border-saffron hover:text-saffron transition-colors"
              data-ocid="testimonials.pagination_prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "bg-saffron w-5"
                      : "bg-muted-foreground/40 w-2"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              className="p-2 rounded-full border border-border hover:border-saffron hover:text-saffron transition-colors"
              data-ocid="testimonials.pagination_next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Contact ───────────────────────────────────────────────────────────────
function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^@]+@[^@]+\.[^@]+$/.test(form.email))
      e.email = "Enter a valid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", message: "" });
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <SectionHeading
            eyebrow="Get in Touch"
            title="Contact Us"
            subtitle="We'd love to hear from you. Reach out to make a booking or for any queries about your stay."
            center
          />
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-card rounded-2xl p-8 shadow-card">
              <h3 className="font-display text-xl font-bold mb-6 text-foreground">
                Find Us Here
              </h3>
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-saffron-light flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Address
                    </p>
                    <p className="text-muted-foreground text-sm mt-0.5 leading-relaxed">
                      Near Pandharpur Temple,
                      <br />
                      Pandharpur, Maharashtra 413304
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-saffron-light flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Phone
                    </p>
                    <a
                      href="tel:+919876543210"
                      className="text-saffron text-sm hover:underline"
                    >
                      +91 98765 43210
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-saffron-light flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-saffron" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">
                      Email
                    </p>
                    <a
                      href="mailto:info@vishwpandhariyatrinivas.com"
                      className="text-saffron text-sm hover:underline"
                    >
                      info@vishwpandhariyatrinivas.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid="contact.primary_button"
              className="flex items-center justify-center gap-3 w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-6 rounded-2xl shadow-warm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <MessageCircle className="w-5 h-5" />
              Chat on WhatsApp
            </a>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="bg-card rounded-2xl p-8 shadow-card">
              {submitted ? (
                <div
                  className="text-center py-10"
                  data-ocid="contact.success_state"
                >
                  <div className="text-5xl mb-4">\ud83d\ude4f</div>
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground">
                    Your message has been received. We&apos;ll get back to you
                    shortly.
                  </p>
                  <Button
                    className="mt-6 bg-saffron hover:bg-amber-600 text-white border-0"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  data-ocid="contact.modal"
                  noValidate
                >
                  <h3 className="font-display text-xl font-bold text-foreground mb-6">
                    Send a Message
                  </h3>

                  <div className="space-y-1.5">
                    <Label htmlFor="name" className="text-sm font-medium">
                      Full Name <span className="text-saffron">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, name: e.target.value }))
                      }
                      placeholder="Your name"
                      data-ocid="contact.input"
                      className={errors.name ? "border-destructive" : ""}
                    />
                    {errors.name && (
                      <p
                        className="text-destructive text-xs"
                        data-ocid="contact.error_state"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address <span className="text-saffron">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, email: e.target.value }))
                      }
                      placeholder="your@email.com"
                      data-ocid="contact.input"
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && (
                      <p
                        className="text-destructive text-xs"
                        data-ocid="contact.error_state"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, phone: e.target.value }))
                      }
                      placeholder="+91 XXXXX XXXXX"
                      data-ocid="contact.input"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message <span className="text-saffron">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, message: e.target.value }))
                      }
                      placeholder="Tell us about your stay requirements..."
                      rows={4}
                      data-ocid="contact.textarea"
                      className={errors.message ? "border-destructive" : ""}
                    />
                    {errors.message && (
                      <p
                        className="text-destructive text-xs"
                        data-ocid="contact.error_state"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-saffron hover:bg-amber-600 text-white font-semibold py-5 rounded-xl border-0"
                    data-ocid="contact.submit_button"
                  >
                    Send Message \ud83d\ude4f
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────
function Footer() {
  const year = new Date().getFullYear();
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="bg-foreground text-background/80 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-3 gap-10 pb-10 border-b border-background/10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">\ud83d\uded5</span>
              <span className="font-display font-bold text-lg text-background">
                Vishwpandhari Yatrinivas
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              A peaceful and blessed stay near Pandharpur, serving pilgrims and
              families with warmth and devotion.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4 uppercase text-xs tracking-widest">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(l.href.slice(1))}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-amber-300 transition-all text-left"
                    data-ocid="nav.link"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-background mb-4 uppercase text-xs tracking-widest">
              Contact
            </h4>
            <ul className="space-y-3 text-sm opacity-70">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                Near Pandharpur Temple, Maharashtra 413304
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                info@vishwpandhariyatrinivas.com
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs opacity-60">
          <p>&copy; {year} Vishwpandhari Yatrinivas. All rights reserved.</p>
          <p>
            Built with \u2764\ufe0f using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 underline underline-offset-2"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Scroll to top ─────────────────────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 bg-saffron hover:bg-amber-600 text-white rounded-full shadow-warm flex items-center justify-center transition-colors"
          aria-label="Scroll to top"
          data-ocid="nav.button"
        >
          <ChevronUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <RoomsSection />
        <AmenitiesSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
