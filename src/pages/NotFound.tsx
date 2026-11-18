import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[80svh] items-center justify-center overflow-hidden pt-20">
      <div className="grid-bg absolute inset-0 opacity-40" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative text-center"
      >
        <div className="font-mono text-[10px] uppercase tracking-widest2 text-accent">
          FAULT 404 — ROUTE NOT FOUND
        </div>
        <h1 className="mt-4 font-display text-6xl font-bold text-ice sm:text-8xl">
          NO SIGNAL
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm text-ice-dim">
          The requested module is not present in this facility. Thesensing
          network suggests returning to navigable space.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link to="/" className="btn-primary">Return to base</Link>
          <Link to="/lab" className="btn-ghost">Enter the lab</Link>
        </div>
      </motion.div>
    </section>
  );
}
