import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useLocation } from "react-router-dom";

const Stairs = ({ children }) => {
  const currentPath = useLocation().pathname;

  const stairParentRef = useRef(null);
  const pageRef = useRef(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "expo.inOut" } });

        // Reset stairs before animation
        gsap.set(".stair", { y: "0%", height: "0%" });
        gsap.set(stairParentRef.current, { opacity: 1, pointerEvents: "auto" });

        // Animate stairs growing
        tl.to(".stair", {
          height: "100%",
          duration: 0.6,
          stagger: { each: 0.12, from: "start" },
        });

        // Slide stairs down
        tl.to(".stair", {
          y: "100%",
          duration: 0.6,
          stagger: { each: 0.12, from: "start" },
        });

        // Fade out stairs container
        tl.set(stairParentRef.current, { opacity: 0, pointerEvents: "none" });

        // Animate page content in after stairs
        tl.fromTo(
          pageRef.current,
          { opacity: 0, scale: 1.04 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.3" // slight overlap for smoothness
        );
      }, stairParentRef);

      return () => ctx.revert(); // cleanup animations per route
    },
    { dependencies: [currentPath] }
  );

  return (
    <div>
      {/* Transition Layer */}
      <div
        ref={stairParentRef}
        className="fixed inset-0 z-50 flex opacity-0 pointer-events-none"
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="stair flex-1 bg-black"></div>
        ))}
      </div>

      {/* Page Content */}
      <div ref={pageRef}>{children}</div>
    </div>
  );
};

export default Stairs;
