"use client";

import { useEffect, useRef, useState } from "react";
import {
  Eye,
  Heart,
  MessageSquare,
  Repeat2,
  Sparkles,
  Smile,
  Meh,
  Frown,
  Info,
  Image as ImageIcon,
} from "lucide-react";

export type Sentiment = "positive" | "neutral" | "negative";

export type SnippetProps = {
  handle: string;
  username?: string;
  platform?: "instagram";
  timestamp: string;
  body: string;
  metrics: {
    views: number;
    likes: number;
    comments: number;
    reposts: number;
    stars: number;
  };
  sentiment: Sentiment;
  tag?: string;
};

const SENTIMENT_META: Record<
  Sentiment,
  { icon: typeof Smile; color: string; label: string }
> = {
  positive: { icon: Smile, color: "#16a34a", label: "Positive" },
  neutral: { icon: Meh, color: "#6b7280", label: "Neutral" },
  negative: { icon: Frown, color: "#dc2626", label: "Negative" },
};

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-label="Instagram" role="img">
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%" stopColor="#fdf497" />
          <stop offset="5%" stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="url(#ig-grad)" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="#fff" />
    </svg>
  );
}

function PenguinAvatar() {
  return (
    <div className="h-6 w-6 rounded-full bg-[#E85A2A] flex items-center justify-center overflow-hidden shrink-0">
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
        <path
          d="M12 3.2c-3.2 0-5.4 2.3-5.4 5.6 0 1.5.5 2.8 1.2 3.8-1.2 1.3-2 3-2 4.9 0 1.6.6 3 1.6 4 1 1 2.4 1.5 3.9 1.5h1.4c1.5 0 2.9-.5 3.9-1.5 1-1 1.6-2.4 1.6-4 0-1.9-.8-3.6-2-4.9.7-1 1.2-2.3 1.2-3.8 0-3.3-2.2-5.6-5.4-5.6z"
          fill="#111"
        />
        <ellipse cx="12" cy="15.5" rx="2.6" ry="3.8" fill="#fff" />
        <circle cx="10.5" cy="8.4" r="0.7" fill="#fff" />
        <circle cx="13.5" cy="8.4" r="0.7" fill="#fff" />
        <path d="M11.2 9.7 L12 10.3 L12.8 9.7 L12 10.9 Z" fill="#F5A623" />
      </svg>
    </div>
  );
}

function Metric({ icon, value }: { icon: React.ReactNode; value: number | string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[#6b7280]">
      {icon}
      <span className="text-[13px]">{value}</span>
    </span>
  );
}

function SentimentControl({ aiSentiment }: { aiSentiment: Sentiment }) {
  const [current, setCurrent] = useState<Sentiment>(aiSentiment);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onDocClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const CurrentIcon = SENTIMENT_META[current].icon;
  const currentColor = SENTIMENT_META[current].color;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label={`Sentiment: ${SENTIMENT_META[current].label}. Click to change.`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center rounded-full p-0.5 hover:bg-[#eef0f3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c7d2fe]"
      >
        <CurrentIcon className="h-5 w-5" strokeWidth={1.75} style={{ color: currentColor }} />
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-[#e5e7eb] bg-white p-1 shadow-lg"
        >
          {(Object.keys(SENTIMENT_META) as Sentiment[]).map((key) => {
            const meta = SENTIMENT_META[key];
            const Icon = meta.icon;
            const isCurrent = key === current;
            const isAi = key === aiSentiment;
            return (
              <button
                key={key}
                type="button"
                role="menuitemradio"
                aria-checked={isCurrent}
                onClick={() => {
                  setCurrent(key);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-[13px] hover:bg-[#f3f4f6] ${
                  isCurrent ? "bg-[#f3f4f6]" : ""
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} style={{ color: meta.color }} />
                <span className="text-[#111827]">{meta.label}</span>
                {isAi && (
                  <span className="ml-auto text-[11px] font-medium text-[#6b7280]">AI</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Snippet({
  handle,
  username,
  timestamp,
  body,
  metrics,
  sentiment,
  tag = "Caption",
}: SnippetProps) {
  const displayUsername = username ?? handle;
  return (
    <div className="rounded-2xl border border-[#e5e7eb] bg-[#f7f8fa] px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] max-w-[720px]">
      <div className="flex items-start gap-2 text-[14px]">
        <div className="flex flex-1 items-center gap-2 min-w-0">
          <PenguinAvatar />
          <span className="font-semibold text-[#111827]">{displayUsername}</span>
          <InstagramIcon />
          <span className="text-[#6b7280]">@{handle}</span>
          <span className="text-[#9ca3af]">•</span>
          <span className="text-[#6b7280]">{timestamp}</span>
        </div>
        <SentimentControl aiSentiment={sentiment} />
      </div>

      <p className="mt-3 text-[15px] leading-[1.55] text-[#111827]">{body}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]">
        <Metric icon={<Eye className="h-4 w-4" strokeWidth={1.75} />} value={`${metrics.views} Impressions`} />
        <span className="text-[#d1d5db]">•</span>
        <Metric icon={<Sparkles className="h-4 w-4" strokeWidth={1.75} />} value={`${metrics.stars} Engagement`} />
        <span className="relative group inline-flex items-center">
          <button
            type="button"
            aria-label="Engagement estimate details"
            className="inline-flex items-center text-[#6b7280] hover:text-[#374151] focus:outline-none focus-visible:text-[#374151]"
          >
            <Info className="h-4 w-4" strokeWidth={1.75} />
          </button>
          <div
            role="tooltip"
            className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg border border-[#e5e7eb] bg-white p-3 text-left text-[12px] text-[#374151] opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            <div className="text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
              Engagement
            </div>
            <div className="mt-1 flex items-center justify-between gap-2 py-0.5">
              <span className="inline-flex items-center gap-1.5 text-[#6b7280]">
                <Heart className="h-3.5 w-3.5" strokeWidth={1.75} />
                Likes
              </span>
              <span className="font-medium text-[#111827]">{metrics.likes}</span>
            </div>
            <div className="flex items-center justify-between gap-2 py-0.5">
              <span className="inline-flex items-center gap-1.5 text-[#6b7280]">
                <MessageSquare className="h-3.5 w-3.5" strokeWidth={1.75} />
                Comments
              </span>
              <span className="font-medium text-[#111827]">{metrics.comments}</span>
            </div>
            <div className="flex items-center justify-between gap-2 py-0.5">
              <span className="inline-flex items-center gap-1.5 text-[#6b7280]">
                <Repeat2 className="h-3.5 w-3.5" strokeWidth={1.75} />
                Reposts
              </span>
              <span className="font-medium text-[#111827]">{metrics.reposts}</span>
            </div>
            <p className="mt-2 text-[11px] leading-snug text-[#6b7280]">
              Pendulum estimates engagement when not present. Estimates are derived from follower count and past engagement, and are replaced by actual values when available.
            </p>
            <div className="mt-3 border-t border-[#f3f4f6] pt-2 text-[11px] font-semibold uppercase tracking-wide text-[#6b7280]">
              Impressions
            </div>
            <p className="mt-1 text-[11px] leading-snug text-[#6b7280]">
              Pendulum estimates impressions when actual data in not available. Estimates are derived from follower count and past impressions, and are replaced with real values when present.
            </p>
          </div>
        </span>
        <span className="ml-1 inline-flex items-center gap-1 rounded-md bg-[#e6f4ea] px-2 py-0.5 text-[12px] text-[#166534]">
          <ImageIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
          {tag}
        </span>
      </div>
    </div>
  );
}
