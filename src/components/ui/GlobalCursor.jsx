import { useContext, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ThemeContext } from "../../context/ThemeContext";

const GlobalCursor = () => {
    const cursorRef = useRef(null);
    const followerRef = useRef(null);
    const { theme } = useContext(ThemeContext);
    const isDark = theme === "dark";

    useEffect(() => {
        const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
        if (isTouchDevice) return undefined;

        const cursor = cursorRef.current;
        const follower = followerRef.current;
        const moveCursorX = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "none" });
        const moveCursorY = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "none" });
        const moveFollowerX = gsap.quickTo(follower, "x", { duration: 0.28, ease: "none" });
        const moveFollowerY = gsap.quickTo(follower, "y", { duration: 0.28, ease: "none" });

        const handlePointerMove = (event) => {
            moveCursorX(event.clientX);
            moveCursorY(event.clientY);
            moveFollowerX(event.clientX);
            moveFollowerY(event.clientY);
        };

        document.body.style.cursor = "none";
        window.addEventListener("pointermove", handlePointerMove, { passive: true });

        return () => {
            window.removeEventListener("pointermove", handlePointerMove);
            document.body.style.cursor = "";
            gsap.killTweensOf([cursor, follower]);
        };
    }, []);

    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
        return null;
    }

    const color = isDark ? "#60a5fa" : "#2563eb";

    return (
        <div aria-hidden="true">
            <div
                ref={cursorRef}
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                style={{ backgroundColor: color }}
            />
            <div
                ref={followerRef}
                className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border"
                style={{ borderColor: color }}
            />
        </div>
    );
};

export default GlobalCursor;
