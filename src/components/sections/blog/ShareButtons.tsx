"use client";

import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Check, Link2, MessageCircle } from "lucide-react";
import { LinkedInIcon } from "@/components/ui/LinkedInIcon";

// Share row for the article header.
//
// The URL is read from the browser on mount rather than composed from
// NEXT_PUBLIC_SITE_URL, which is currently unset in production and falls back
// to the Vercel staging domain (see HANDOFF.md §5) — sharing a staging link
// from the live site would be worse than no share buttons at all. Reading
// location.href also means the link is always right whichever host serves it.

// location.href is a value the server cannot know, so it is read through
// useSyncExternalStore rather than set from an effect: the server snapshot is
// an empty string, the client snapshot is the real URL, and React swaps them
// after hydration without a mismatch or a cascading render.
const subscribeToNothing = () => () => {};
const readHref = () => window.location.href;
const readHrefOnServer = () => "";

export function ShareButtons({ title }: { title: string }) {
  const url = useSyncExternalStore(subscribeToNothing, readHref, readHrefOnServer);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      // Clipboard is blocked without a user gesture in some browsers, and over
      // plain http. Nothing useful to tell the user — the link is in the
      // address bar either way.
    }
  }

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const buttonClasses =
    "inline-flex items-center justify-center w-9 h-9 rounded-full border border-brand-gray-300 text-brand-gray-700 hover:border-brand-red hover:text-brand-red transition-colors";

  return (
    <div className="flex items-center gap-2">
      <span className="sr-only">Share this article</span>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={buttonClasses}
      >
        <LinkedInIcon className="w-4 h-4" />
      </a>
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className={buttonClasses}
      >
        <MessageCircle className="w-4 h-4" strokeWidth={2} />
      </a>
      <button
        type="button"
        onClick={copyLink}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={buttonClasses}
      >
        {copied ? (
          <Check className="w-4 h-4 text-brand-red" strokeWidth={2.5} />
        ) : (
          <Link2 className="w-4 h-4" strokeWidth={2} />
        )}
      </button>
    </div>
  );
}
