"use client";

import React, { useState, useRef, useCallback } from "react";
import { RefreshCw } from "lucide-react";

const PullToRefresh = ({ onRefresh, children, disabled = false }) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);

  const PULL_THRESHOLD = 80;
  const MAX_PULL = 120;

  const handleTouchStart = useCallback((e) => {
    if (disabled || isRefreshing) return;

    const container = containerRef.current;
    if (!container) return;

    // Only enable pull-to-refresh when scrolled to top
    const scrollTop = container.scrollTop || window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 0) return;

    startYRef.current = e.touches[0].clientY;
    setIsPulling(true);
  }, [disabled, isRefreshing]);

  const handleTouchMove = useCallback((e) => {
    if (!isPulling || disabled || isRefreshing) return;

    currentYRef.current = e.touches[0].clientY;
    const diff = currentYRef.current - startYRef.current;

    if (diff > 0) {
      // Apply resistance to the pull
      const resistance = 0.5;
      const newPullDistance = Math.min(diff * resistance, MAX_PULL);
      setPullDistance(newPullDistance);

      // Prevent default scroll when pulling
      if (newPullDistance > 10) {
        e.preventDefault();
      }
    }
  }, [isPulling, disabled, isRefreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (!isPulling || disabled) return;

    setIsPulling(false);

    if (pullDistance >= PULL_THRESHOLD && !isRefreshing) {
      setIsRefreshing(true);
      setPullDistance(PULL_THRESHOLD);

      try {
        await onRefresh?.();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
  }, [isPulling, pullDistance, isRefreshing, onRefresh, disabled]);

  const pullProgress = Math.min(pullDistance / PULL_THRESHOLD, 1);
  const rotation = pullProgress * 180;
  const scale = 0.5 + pullProgress * 0.5;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative"
    >
      {/* Pull indicator */}
      <div
        className="absolute left-0 right-0 flex items-center justify-center overflow-hidden transition-all duration-200 ease-out z-10"
        style={{
          height: `${pullDistance}px`,
          top: 0,
        }}
      >
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 transition-all duration-200 ${
            isRefreshing ? "animate-spin" : ""
          }`}
          style={{
            transform: `rotate(${isRefreshing ? 0 : rotation}deg) scale(${scale})`,
            opacity: pullProgress,
          }}
        >
          <RefreshCw
            className={`w-5 h-5 ${
              pullProgress >= 1 ? "text-yellow-500" : "text-gray-400"
            }`}
          />
        </div>
      </div>

      {/* Content */}
      <div
        className="transition-transform duration-200 ease-out"
        style={{
          transform: `translateY(${pullDistance}px)`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PullToRefresh;
