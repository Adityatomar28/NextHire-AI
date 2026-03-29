// ===========================
// UTILITY HOOKS FOR DASHBOARD
// ===========================

import { useState, useCallback, useEffect } from "react";

/**
 * Custom hook for managing expandable card state
 * @param {number} initialId - Initial expanded card ID
 */
export const useCardExpansion = (initialId = null) => {
  const [expandedCard, setExpandedCard] = useState(initialId);

  const toggleCard = useCallback((cardId) => {
    setExpandedCard((prev) => (prev === cardId ? null : cardId));
  }, []);

  return { expandedCard, toggleCard, setExpandedCard };
};

/**
 * Custom hook for animated number counter
 * @param {number} targetValue - Value to count up to
 * @param {number} duration - Duration in milliseconds
 */
export const useCountUp = (targetValue = 100, duration = 2000) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / duration;

      if (progress < 1) {
        setCount(Math.floor(targetValue * progress));
        requestAnimationFrame(animate);
      } else {
        setCount(targetValue);
      }
    };

    requestAnimationFrame(animate);
  }, [targetValue, duration]);

  return count;
};

/**
 * Custom hook for managing sidebar active section
 * @param {string} initialSection - Initial active section
 */
export const useSidebarSection = (initialSection = "technical") => {
  const [activeSection, setActiveSection] = useState(initialSection);

  const changeSection = useCallback((sectionId) => {
    setActiveSection(sectionId);
    // Optional: Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { activeSection, changeSection };
};

/**
 * Custom hook for search functionality
 * @param {Array} items - Items to search through
 * @param {string} searchKey - Key to search in items
 */
export const useSearch = (items = [], searchKey = "question") => {
  const [query, setQuery] = useState("");

  const filteredItems = items.filter((item) =>
    item[searchKey]?.toLowerCase().includes(query.toLowerCase())
  );

  const clearSearch = () => setQuery("");

  return { query, setQuery, filteredItems, clearSearch };
};

/**
 * Custom hook for scroll progress tracking
 */
export const useScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
};

/**
 * Custom hook for responsive design detection
 */
export const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return {
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
    windowSize,
  };
};

/**
 * Custom hook for keyboard navigation
 */
export const useKeyboardNavigation = (items = [], onSelect) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < items.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case "Enter":
          e.preventDefault();
          onSelect?.(items[selectedIndex]);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [items, selectedIndex, onSelect]);

  return { selectedIndex, setSelectedIndex };
};
