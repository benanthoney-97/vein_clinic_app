"use client";
import React, { useState, useEffect } from "react";
import Script from "next/script";

export default function VoicePage() {
  const agentId = process.env.NEXT_PUBLIC_ELEVENLABS_AGENT_ID || "agent_3501k3v27092erv8bz40nm47p6he";
  const heroLogo = process.env.NEXT_PUBLIC_BRAND_LOGO_URL || "https://ielaigfiyikzxqecyplz.supabase.co/storage/v1/object/public/business_logos/Batch_Logotype_1.avif";
  const headerLogo = process.env.NEXT_PUBLIC_HEADER_LOGO_URL || "https://ielaigfiyikzxqecyplz.supabase.co/storage/v1/object/public/UI_elements/Frame_5-removebg-preview.png";
  const businessName = process.env.NEXT_PUBLIC_BRAND_NAME || "Batch";
  const businessTagline =
    process.env.NEXT_PUBLIC_BRAND_TAGLINE || "Casual Suits Made in LDN. Just for you.";

  const links = [
    { label: "Get a quote", href: "#" },
    { label: "Leave a review", href: "#" },
    { label: "View website", href: "#" },
  ];

  // --- Toast state ---
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  // --- Share with clipboard fallback (no alert) ---
  function onShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = { title: businessName, text: businessTagline, url };

    const copy = () => {
      navigator.clipboard?.writeText(url).then(() => setCopied(true));
    };

    if (navigator.share) {
      navigator.share(shareData).catch(copy); // if user cancels / fails, copy instead
    } else {
      copy();
    }
  }

  return (
    <div className="page">
      <div className="container">
        {/* Header */}
<div className="topbar">
  <div className="topbar-left">
    {headerLogo ? (
      // eslint-disable-next-line @next/next/no-img-element
      <a
        href="https://www.dialogue-ai.co/service-providers"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src={headerLogo} alt="Logo" className="miniLogo" />
      </a>
    ) : (
      <a
        href="https://www.dialogue-ai.co/service-providers"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="miniLogo placeholder" />
      </a>
    )}
  </div>

  <button className="shareBtn" aria-label="Share" onClick={onShare}>
    <img
      src="https://ielaigfiyikzxqecyplz.supabase.co/storage/v1/object/public/UI_elements/share.png"
      alt="Share"
      className="shareIcon"
    />
  </button>

          {/* Copied toast (top-right near header) */}
          <div
            className={`toast ${copied ? "show" : ""}`}
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            Copied!
          </div>
        </div>

        {/* Big circular brand logo */}
        <div className="heroLogoWrap">
          {heroLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={heroLogo} alt="Brand" className="heroLogo" />
          ) : (
            <div className="heroLogo placeholder" />
          )}
        </div>

        {/* Name + description (bold, no chips, no elevation) */}
        <h1 className="brandName">{businessName}</h1>
        <p className="brandTagline">{businessTagline}</p>

        {/* Links column */}
        <div className="links">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="linkBtn">
              <span className="label">{link.label}</span>
              <span className="kebab" aria-hidden="true">⋮</span>
            </a>
          ))}
        </div>

        {/* ElevenLabs widget (below links) */}
        <div className="widgetWrap">
          <elevenlabs-convai agent-id={agentId}></elevenlabs-convai>
        </div>
      </div>

      {/* Widget script */}
      <Script
        src="https://unpkg.com/@elevenlabs/convai-widget-embed"
        async
        strategy="afterInteractive"
      />

      {/* Global override: fix mobile body background to blue, desktop to white */}
      <style jsx global>{`
        body {
        }
        @media (min-width: 900px) {
          body { background: #ffffff !important; } /* desktop page background */
        }
      `}</style>

      <style jsx>{`
        :root {
          --blue: black;
          --text-blue: black;
          --page-bg-desktop: #ffffff;     /* only used around the container on desktop */
          --btn-bg: #ffffff;
          --btn-shadow: 0 4px 16px rgba(0,0,0,0.10);
          --radius-xl: 50px;              /* buttons: 50px radius */
          --content-max: 760px;

          /* Increase top gap on desktop to reduce container height */
          --gap-top-desktop: clamp(4rem, 9vw, 7rem);
        }

        /* MOBILE/TABLET: whole page blue */
        .page {
            min-height: 100vh;
  min-height: 100svh;  
          background: #2b3040;        /* ensure page wrapper is blue */
          display: flex;
          justify-content: center;
          align-items: stretch;
        }

        /* Container:
           - Mobile: full width/height, blue background
           - Desktop: centered column, blue background, rounded top corners,
             starts near top (larger gap to reduce height) and reaches bottom */
        .container {
          width: 100%;
          background: #2b3040 !important;  /* ensure not overridden */
          color: var(--text-blue);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 16px 16px 48px;
        }

        /* Top bar */
        .topbar {
          width: 100%;
          max-width: var(--content-max);
          display: none;
          align-items: center;
          justify-content: space-between;
          padding: 4px 2px;
        }

        .miniLogo {
        
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 9999px;
    background: #fff;
    border: 1px solid rgba(0, 0, 0, .06);
    box-shadow: 0 2px 10px rgba(0, 0, 0, .08);
    cursor: pointer;
    padding: 0;
}

        .miniLogo.placeholder {
        
          background: #ffffff;
          opacity: 0.7;
        }

                /* Toast */
        .toast {
  position: fixed;             /* was absolute -> can cause layout overflow */
          right: 0;
  top: 0;                      /* starts at very top */
          transform: translateY(-6px);
          background: #111;          /* dark chip for contrast */
          color: #fff;
          font-weight: 700;
          font-size: 12px;
          font-family: Tiempos
          padding: 8px 10px;
          border-radius: 9999px;
          box-shadow: 0 6px 16px rgba(0,0,0,0.18);
          opacity: 0;
          pointer-events: none;
          transition: opacity 200ms ease, transform 200ms ease;
        }
        .toast.show {
          opacity: 1;
          transform: translateY(0);
        }

        .shareBtn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 9999px;  /* circular */
          background: #ffffff;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          cursor: pointer;
          padding: 0;
        }
        .shareIcon {
          width: 60%;
          height: 60%;
          object-fit: contain;
        }

        /* Big circular brand logo */
/* Big circular brand logo */
.heroLogoWrap {
  width: 100%;
  max-width: var(--content-max);
  display: flex;
  justify-content: center;
  margin-top: clamp(18px, 4vw, 28px);
}

.heroLogo {
  width: clamp(120px, 26vw, 180px);
  height: clamp(120px, 26vw, 180px);
  object-fit: contain;            /* zoomed out: whole logo fits */
  border-radius: 9999px;          /* perfect circle */
  background: #ffffff;            /* white background fills any transparent space */
  border: 3px solid #ffffff;
  box-shadow: 0 10px 30px rgba(0,0,0,0.10);
}

.heroLogo.placeholder {
  width: clamp(120px, 26vw, 180px);
  height: clamp(120px, 26vw, 180px);
  border-radius: 9999px;
  background: #ffffff;
  opacity: 0.85;
}

        /* Name + tagline (bold, NO chips/elevation) */
        .brandName {
          width: 100%;
          max-width: var(--content-max);
          text-align: center;
          font-size: clamp(1.2rem, 4.6vw, 1.8rem);
          font-weight: 800;
          
          margin: 16px 0 6px 0;
          color: #e5e7eb;
        }
        .brandTagline {
          width: 100%;
          max-width: var(--content-max);
          text-align: center;
          font-size: clamp(1rem, 3.8vw, 1.1rem);
          font-weight: 800;
          color: #e5e7eb;
          margin: 0 0 clamp(16px, 4vw, 22px) 0;
        }

        /* Links column */
        .links {
          width: 100%;
          max-width: var(--content-max);
          display: grid;
          gap: 16px;
          margin-top: clamp(16px, 4vw, 24px);
          padding: 0 2px;
          display: none;
        }

        .linkBtn {
  display: flex;
  align-items: center;
  justify-content: center;       /* center contents horizontally */
  position: relative;            /* so we can absolutely position the kebab */
  background: white;
  color: #2b3040;                /* blue text on white button */
  padding: 22px 22px;            /* taller buttons */
  border-radius: 50px;           /* rounded corners */
  box-shadow: var(--btn-shadow);
  text-decoration: none;
  border: 1px solid #eef2f7;
  transition: transform 0.06s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}
        .linkBtn:hover {
          transform: translateY(-1px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.12);
          border-color: #e6edf5;
        }
        .label {
          font-weight: 800;
          font-size: clamp(1rem, 3.6vw, 1.4rem);
                    font-family: Tiempos

        }
        .kebab {
          color: #9ca3af;
          font-size: 22px;   /* vertical ellipsis */
  right: 22px;
            position: absolute;            /* pin to the right side */

        }

        .widgetWrap {
          width: 100%;
          max-width: var(--content-max);
          display: flex;
          justify-content: center;
          margin-top: clamp(18px, 4vw, 26px);
        }

        /* DESKTOP: white around a centered blue container, reduced height */
        @media (min-width: 900px) {
          .page {
            background: #ffffffff; /* white page background */
          }
          .container {
            width: min(92vw, 820px);
     /* Key change: pin container to bottom, offset from top */
    margin-top: 80px;                    /* push down from the top */
    height: calc(100vh - 80px);          /* keep bottom fixed */
            border-top-left-radius: 22px;
            border-top-right-radius: 22px;
            padding: 24px 24px 56px;
            box-shadow: 0 18px 48px rgba(12, 113, 195, 0.22);
            background: #2b3040;
          }
        }
      `}</style>
    </div>
  );
}