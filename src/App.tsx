import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Lab from "./pages/Lab";
import ProjectPage from "./pages/ProjectPage";
import NotFound from "./pages/NotFound";
import { projects } from "./data/projects";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

export default function App() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/lab"
            element={
              <Layout>
                <Lab />
              </Layout>
            }
          />
          {projects.map((p) => (
            <Route
              key={p.slug}
              path={`/projects/${p.slug}`}
              element={
                <Layout>
                  <ProjectPage project={p} />
                </Layout>
              }
            />
          ))}
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}
