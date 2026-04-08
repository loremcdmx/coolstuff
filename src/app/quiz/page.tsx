"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useApp } from "../providers";
import { t } from "@/data/i18n";
import { getProfile, saveProfile } from "@/lib/profile";

const interestOptions = [
  { id: "tech", label: "Tech & Gadgets", icon: "laptop" },
  { id: "fashion", label: "Fashion & Style", icon: "shirt" },
  { id: "beauty", label: "Beauty & Skincare", icon: "sparkles" },
  { id: "home", label: "Home & Living", icon: "home" },
  { id: "kitchen", label: "Kitchen & Cooking", icon: "chef" },
  { id: "sports", label: "Sports & Fitness", icon: "dumbbell" },
  { id: "gaming", label: "Gaming", icon: "gamepad" },
  { id: "books", label: "Books & Reading", icon: "book" },
  { id: "pets", label: "Pets", icon: "paw" },
];

const entertainmentOptions = [
  { id: "action", label: "Action & Thriller" },
  { id: "comedy", label: "Comedy" },
  { id: "drama", label: "Drama" },
  { id: "scifi", label: "Sci-Fi & Fantasy" },
  { id: "horror", label: "Horror" },
  { id: "documentary", label: "Documentary" },
  { id: "anime", label: "Anime" },
  { id: "kpop", label: "K-Pop & K-Drama" },
  { id: "hiphop", label: "Hip-Hop & R&B" },
  { id: "latin", label: "Latin Music" },
  { id: "rock", label: "Rock & Indie" },
  { id: "pop", label: "Pop" },
];

const priceOptions = [
  { id: "budget", label: "Budget-friendly", desc: "Best value for money" },
  { id: "mid", label: "Mid-range", desc: "Balance of quality & price" },
  { id: "premium", label: "Premium", desc: "Top quality, no limits" },
];

export default function QuizPage() {
  const { lang } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<string[]>([]);
  const [entertainment, setEntertainment] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<"budget" | "mid" | "premium" | "">("");

  const toggleInterest = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleEntertainment = (id: string) => {
    setEntertainment((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
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
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Progress */}
        <div className="flex gap-1 mb-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${
                i <= step ? "bg-amber-500" : "bg-zinc-800"
              }`}
            />
          ))}
        </div>

        {step === 0 && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              What are you into?
            </h1>
            <p className="text-zinc-400 mb-6 text-sm">
              Pick everything that interests you. We'll use this to personalize your feed.
            </p>
            <div className="grid grid-cols-3 gap-2">
              {interestOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleInterest(opt.id)}
                  className={`p-3 rounded-xl text-sm font-medium text-center transition-all border ${
                    interests.includes(opt.id)
                      ? "bg-amber-500/15 border-amber-500 text-amber-400"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setStep(1)}
              disabled={interests.length === 0}
              className="w-full mt-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-30 disabled:cursor-not-allowed text-black font-semibold rounded-xl transition-colors"
            >
              Next
            </button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Entertainment taste
            </h1>
            <p className="text-zinc-400 mb-6 text-sm">
              What kind of movies, series, and music do you enjoy?
            </p>
            <div className="grid grid-cols-3 gap-2">
              {entertainmentOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => toggleEntertainment(opt.id)}
                  className={`p-3 rounded-xl text-sm font-medium text-center transition-all border ${
                    entertainment.includes(opt.id)
                      ? "bg-purple-500/15 border-purple-500 text-purple-400"
                      : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setStep(0)}
                className="px-6 py-3 bg-zinc-800 text-zinc-300 font-medium rounded-xl"
              >
                Back
              </button>
              <button
                onClick={() => setStep(2)}
                disabled={entertainment.length === 0}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-30 disabled:cursor-not-allowed text-black font-semibold rounded-xl transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">
              Budget preference
            </h1>
            <p className="text-zinc-400 mb-6 text-sm">
              What's your typical spending range for purchases?
            </p>
            <div className="grid gap-2">
              {priceOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setPriceRange(opt.id as typeof priceRange)}
                  className={`p-4 rounded-xl text-left transition-all border ${
                    priceRange === opt.id
                      ? "bg-amber-500/15 border-amber-500"
                      : "bg-zinc-900 border-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  <span className={`font-semibold text-sm ${priceRange === opt.id ? "text-amber-400" : "text-white"}`}>
                    {opt.label}
                  </span>
                  <p className="text-xs text-zinc-500 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-3 bg-zinc-800 text-zinc-300 font-medium rounded-xl"
              >
                Back
              </button>
              <button
                onClick={finish}
                disabled={!priceRange}
                className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-30 disabled:cursor-not-allowed text-black font-semibold rounded-xl transition-colors"
              >
                See my recommendations
              </button>
            </div>
          </div>
        )}

        <button
          onClick={() => router.push("/")}
          className="w-full mt-4 text-center text-xs text-zinc-600 hover:text-zinc-400"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
