import { ReactNode, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Lenis from "lenis";

const NAV = [
  { to: "/", label: "Home", code: "00" },
  { to: "/", label: "Domains", code: "01", hash: "#domains" },
  { to: "/", label: "Archive", code: "02", hash: "#archive" },
  { to: "/lab", label: "The Lab", code: "03" },
  { to: "/", label: "Journey", code: "04", hash: "#journey" },
  { to: "/", label: "Red Frontier", code: "05", hash: "#team" },
  { to: "/", label: "Contact", code: "06", hash: "#contact" },
];

export default function Layout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const handleNav = (
    e: React.MouseEvent,
    item: (typeof NAV)[number]
  ) => {
    if (item.hash) {
      e.preventDefault();
      if (location.pathname !== "/") {
        window.location.href = "/" + item.hash;
        return;
      }
      document
        .querySelector(item.hash)
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-lab-950">
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-white/[0.06] bg-lab-950/85 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="container-lab flex h-16 items-center justify-between sm:h-20">
          <Link to="/" className="group flex items-center gap-3">
            <svg viewBox="0 0 64 64" className="h-7 w-7 shrink-0">
              <path
                d="M14 14 L32 44 L50 14"
                fill="none"
                stroke="#FF4D24"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="32" cy="52" r="4" fill="#FF773D" className="animate-blink-dot" />
            </svg>
            <div className="leading-none">
              <div className="font-display text-sm font-bold tracking-[0.2em] text-ice">
                RED FRONTIER
              </div>
              <div className="mt-1 font-mono text-[9px] tracking-widest2 text-ice-dim">
                ENGINEERING DIVISION
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV.map((item) => (
              <NavLink
                key={item.code}
                to={item.to}
                onClick={(e) => handleNav(e, item)}
                className="group font-mono text-[11px] uppercase tracking-[0.18em] text-ice-dim transition-colors hover:text-ice"
              >
                <span className="mr-1 text-accent/70 group-hover:text-accent">
                  {item.code}
                </span>
                {item.label}
              </NavLink>
            ))}
            <Link
              to="/lab"
              className="rounded-md border border-accent/50 px-4 py-2 font-mono text-[11px] uppercase tracking-widest2 text-accent transition-all hover:bg-accent hover:text-white hover:shadow-glow-sm"
            >
              Initialize Lab
            </Link>
          </nav>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-ice lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <div className="border-t border-white/[0.06] bg-lab-950/95 backdrop-blur-xl lg:hidden">
            <div className="container-lab flex flex-col py-4">
              {NAV.map((item) => (
                <NavLink
                  key={item.code}
                  to={item.to}
                  onClick={(e) => handleNav(e, item)}
                  className="flex items-center justify-between border-b border-white/[0.04] py-3.5 font-mono text-xs uppercase tracking-[0.18em] text-ice"
                >
                  <span>{item.label}</span>
                  <span className="text-accent/70">{item.code}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] bg-lab-900/50">
      <div className="container-lab grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="font-display text-lg font-bold tracking-[0.2em] text-ice">
            RED FRONTIER
          </div>
          <p className="mt-3 max-w-xs text-sm text-ice-dim">
            Engineering the unknown. A robotics &amp; AI team identity built
            around curiosity, experimentation and future systems.
          </p>
        </div>
        <div className="font-mono text-xs uppercase tracking-widest2 text-ice-dim">
          <div className="kicker mb-4">Site Index</div>
          <div className="flex flex-col gap-2.5">
            <Link to="/" className="transition-colors hover:text-ice">
              /// Home
            </Link>
            <Link to="/lab" className="transition-colors hover:text-ice">
              /// The Lab
            </Link>
            {["red-dual-mode", "ai-robotics", "esp32-experiments", "missionforge"].map(
              (slug) => (
                <Link
                  key={slug}
                  to={`/projects/${slug}`}
                  className="transition-colors hover:text-ice"
                >
                  /// Case Study — {slug}
                </Link>
              )
            )}
          </div>
        </div>
        <div className="font-mono text-xs uppercase tracking-widest2 text-ice-dim">
          <div className="kicker mb-4">System Log</div>
          <p className="leading-loose">
            SYSTEM: <span className="text-ice-cyan">ONLINE</span> <br />
            BUILD: <span className="text-ice">PORTFOLIO v1.0</span> <br />
            DOMAIN: <span className="text-ice">ROBOTICS + AI</span> <br />
            LOCATION: <span className="text-ice">EGYPT</span>
          </p>
        </div>
      </div>
      <div className="border-t border-white/[0.04] py-5">
        <div className="container-lab flex flex-col items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest2 text-ice-dim sm:flex-row">
          <span>© {new Date().getFullYear()} Osama Mohamed — Red Frontier</span>
          <span>
            Reference imagery used with attribution — conceptual renders only
          </span>
        </div>
      </div>
    </footer>
  );
}
