import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";

const Stairs = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [pendingPath, setPendingPath] = useState(null);

  const stairParentRef = useRef(null);
  const pageRef = useRef(null);

  // --- 1. Intercept clicks on internal links and play COVER animation ---
  useEffect(() => {
    const handleClick = async (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("#")) return; // external link, ignore
      if (href === location.pathname) return; // same page, ignore

      e.preventDefault(); // stop default navigation
      setPendingPath(href); // save destination path
      await playCoverAnimation(); // wait for cover animation
      navigate(href); // now navigate
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [location.pathname, navigate]);

  // --- 2. Play REVEAL animation on route change ---
  useEffect(() => {
    if (!pageRef.current) return;
    playRevealAnimation();
    setPendingPath(null); // reset
  }, [location.pathname]);

  // --- COVER Animation ---
  const playCoverAnimation = () => {
    return new Promise((resolve) => {
      const stairs = stairParentRef.current.querySelectorAll(".stair");

      gsap.killTweensOf(stairs);
      gsap.set(stairs, { height: 0, y: "0%" });
      gsap.set(stairParentRef.current, { opacity: 1, pointerEvents: "auto" });

      gsap.to(stairs, {
        height: "100%",
        duration: 0.45,
        stagger: { each: 0.08, from: "start" },
        ease: "expo.inOut",
        onComplete: resolve,
      });
    });
  };

  // --- REVEAL Animation ---
  const playRevealAnimation = () => {
    const stairs = stairParentRef.current.querySelectorAll(".stair");

    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onComplete: () => {
        gsap.set(stairParentRef.current, { opacity: 0, pointerEvents: "none" });
      },
    });

    tl.to(stairs, {
      y: "100%",
      duration: 0.6,
      stagger: { each: 0.08, from: "start" },
    });

    tl.fromTo(
      pageRef.current,
      { opacity: 0, y: 20, scale: 1.02 },
      { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: "power2.out" },
      "-=0.4"
    );
  };

  return (
    <>
      {/* Stairs overlay */}
      <div
        ref={stairParentRef}
        className="fixed inset-0 z-50 flex pointer-events-none"
        style={{ opacity: 0 }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="stair flex-1 bg-black"></div>
        ))}
      </div>

      {/* Page Content */}
      <div ref={pageRef}>{children}</div>
    </>
  );
};

export default Stairs;
