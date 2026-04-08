"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getProfile, saveProfile } from "@/lib/profile";

const interestOptions = [
  "Tech & Gadgets",
  "Fashion & Style",
  "Beauty & Skincare",
  "Home & Living",
  "Kitchen & Cooking",
  "Sports & Fitness",
  "Gaming",
  "Books & Reading",
  "Pets",
];

const interestIds = [
  "tech", "fashion", "beauty", "home", "kitchen", "sports", "gaming", "books", "pets",
];

const entertainmentOptions = [
  "Action & Thriller",
  "Comedy",
  "Drama",
  "Sci-Fi & Fantasy",
  "Horror",
  "Documentary",
  "Anime",
  "K-Pop & K-Drama",
  "Hip-Hop & R&B",
  "Latin Music",
  "Rock & Indie",
  "Pop",
];

const entertainmentIds = [
  "action", "comedy", "drama", "scifi", "horror", "documentary",
  "anime", "kpop", "hiphop", "latin", "rock", "pop",
];

const priceOptions = [
  { id: "budget", label: "Budget-friendly", desc: "Best value for money" },
  { id: "mid", label: "Mid-range", desc: "Balance of quality & price" },
  { id: "premium", label: "Premium", desc: "Top quality, no limits" },
];

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [entertainment, setEntertainment] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<
    "budget" | "mid" | "premium" | ""
  >("");

  const toggle = (arr: string[], id: string, set: (v: string[]) => void) => {
    set(arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]);
  };

  const finish = () => {
    const profile = getProfile();
    profile.interests = interests;
    profile.entertainment = entertainment;
    profile.priceRange = priceRange;
    profile.completedQuiz = true;
    saveProfile(profile);
    router.push("/for-you");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--color-bg)" }}
    >
      <div className="w-full max-w-md">
        {/* Progress */}
        <div className="flex gap-1 mb-10">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-0.5 flex-1"
              style={{
                background:
                  i <= step ? "var(--color-accent)" : "var(--color-border)",
              }}
            />
          ))}
        </div>

        <p
          className="text-[10px] uppercase tracking-[0.2em] mb-4"
          style={{
            color: "var(--color-text-tertiary)",
            fontFamily: "var(--font-mono)",
          }}
        >
          {String(step + 1).padStart(2, "0")} / 03
        </p>

        {step === 0 && (
          <div>
            <h1
              className="text-2xl font-bold tracking-tight mb-1"
            >
              What are you into?
            </h1>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Pick everything that interests you.
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {interestOptions.map((opt, i) => (
                <button
                  key={interestIds[i]}
                  onClick={() =>
                    toggle(interests, interestIds[i], setInterests)
                  }
                  className="p-2.5 text-xs font-medium text-center transition-all"
                  style={{
                    border: `1px solid ${interests.includes(interestIds[i]) ? "var(--color-accent)" : "var(--color-border)"}`,
                    background: interests.includes(interestIds[i])
                      ? "var(--color-accent-subtle)"
                      : "var(--color-surface)",
                    color: interests.includes(interestIds[i])
                      ? "var(--color-accent)"
                      : "var(--color-text-secondary)",
                    borderRadius: "var(--radius-card)",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              disabled={interests.length === 0}
              className="w-full mt-6 py-2.5 text-sm font-medium disabled:opacity-30 transition-opacity"
              style={{
                background: "var(--color-text)",
                color: "var(--color-bg)",
                borderRadius: "var(--radius-card)",
              }}
            >
              Next
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">
              Entertainment taste
            </h1>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Movies, series, music — what do you enjoy?
            </p>
            <div className="grid grid-cols-3 gap-1.5">
              {entertainmentOptions.map((opt, i) => (
                <button
                  key={entertainmentIds[i]}
                  onClick={() =>
                    toggle(
                      entertainment,
                      entertainmentIds[i],
                      setEntertainment
                    )
                  }
                  className="p-2.5 text-xs font-medium text-center transition-all"
                  style={{
                    border: `1px solid ${entertainment.includes(entertainmentIds[i]) ? "var(--color-accent)" : "var(--color-border)"}`,
                    background: entertainment.includes(entertainmentIds[i])
                      ? "var(--color-accent-subtle)"
                      : "var(--color-surface)",
                    color: entertainment.includes(entertainmentIds[i])
                      ? "var(--color-accent)"
                      : "var(--color-text-secondary)",
                    borderRadius: "var(--radius-card)",
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setStep(0)}
                className="px-5 py-2.5 text-sm font-medium"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                  borderRadius: "var(--radius-card)",
                }}
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={entertainment.length === 0}
                className="flex-1 py-2.5 text-sm font-medium disabled:opacity-30 transition-opacity"
                style={{
                  background: "var(--color-text)",
                  color: "var(--color-bg)",
                  borderRadius: "var(--radius-card)",
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-1">
              Budget preference
            </h1>
            <p
              className="text-sm mb-6"
              style={{ color: "var(--color-text-secondary)" }}
            >
              What&apos;s your typical spending range?
            </p>
            <div className="grid gap-1.5">
              {priceOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() =>
                    setPriceRange(opt.id as typeof priceRange)
                  }
                  className="p-3 text-left transition-all"
                  style={{
                    border: `1px solid ${priceRange === opt.id ? "var(--color-accent)" : "var(--color-border)"}`,
                    background:
                      priceRange === opt.id
                        ? "var(--color-accent-subtle)"
                        : "var(--color-surface)",
                    borderRadius: "var(--radius-card)",
                  }}
                >
                  <span
                    className="text-sm font-medium"
                    style={{
                      color:
                        priceRange === opt.id
                          ? "var(--color-accent)"
                          : "var(--color-text)",
                    }}
                  >
                    {opt.label}
                  </span>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--color-text-tertiary)" }}
                  >
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-5 py-2.5 text-sm font-medium"
                style={{
                  border: "1px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                  borderRadius: "var(--radius-card)",
                }}
              >
                Back
              </button>
              <button
                onClick={finish}
                disabled={!priceRange}
                className="flex-1 py-2.5 text-sm font-medium disabled:opacity-30 transition-opacity"
                style={{
                  background: "var(--color-accent)",
                  color: "#fff",
                  borderRadius: "var(--radius-card)",
                }}
              >
                See my recommendations
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => router.push("/")}
          className="w-full mt-4 text-center text-xs transition-colors"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
