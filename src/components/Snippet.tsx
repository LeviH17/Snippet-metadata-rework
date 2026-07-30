import { Eye, Heart, MessageSquare, Repeat2, Sparkles, Meh, Image as ImageIcon } from "lucide-react";

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
  tag?: string;
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

export default function Snippet({
  handle,
  username,
  timestamp,
  body,
  metrics,
  tag = "Caption",
}: SnippetProps) {
  const displayUsername = username ?? handle;
  return (
    <div className="rounded-2xl border border-[#e5e7eb] bg-[#f7f8fa] px-5 py-4 shadow-[0_1px_2px_rgba(0,0,0,0.02)] max-w-[720px]">
      <div className="flex items-center gap-2 text-[14px]">
        <PenguinAvatar />
        <span className="font-semibold text-[#111827]">{displayUsername}</span>
        <InstagramIcon />
        <span className="text-[#6b7280]">@{handle}</span>
        <span className="text-[#9ca3af]">•</span>
        <span className="text-[#6b7280]">{timestamp}</span>
      </div>

      <p className="mt-3 text-[15px] leading-[1.55] text-[#111827]">{body}</p>

      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px]">
        <Metric icon={<Eye className="h-4 w-4" strokeWidth={1.75} />} value={metrics.views} />
        <span className="text-[#d1d5db]">•</span>
        <span className="relative group inline-flex items-center">
          <span className="inline-flex items-center gap-1 text-[#6b7280] cursor-help">
            <Sparkles className="h-4 w-4" strokeWidth={1.75} />
            <span className="text-[13px]">{metrics.stars}</span>
          </span>
          <div
            role="tooltip"
            className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-lg border border-[#e5e7eb] bg-white p-3 text-left text-[12px] text-[#374151] opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            <div className="flex items-center justify-between gap-2 py-0.5">
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
            <p className="mt-2 border-t border-[#f3f4f6] pt-2 text-[11px] leading-snug text-[#6b7280]">
              Pendulum estimates engagement when not present. Estimates are replaced by actual values when available.
            </p>
          </div>
        </span>
        <span className="text-[#d1d5db]">•</span>
        <Meh className="h-4 w-4 text-[#6b7280]" strokeWidth={1.75} />
        <span className="ml-1 inline-flex items-center gap-1 rounded-md bg-[#e6f4ea] px-2 py-0.5 text-[12px] text-[#166534]">
          <ImageIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
          {tag}
        </span>
      </div>
    </div>
  );
}
