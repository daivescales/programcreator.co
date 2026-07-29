"use client";

import Button from "@/components/ui/Button";
import type { Question } from "@/content/questions";

type WelcomeStepProps = {
  question: Question;
  onStart: () => void;
};

export default function WelcomeStep({ question, onStart }: WelcomeStepProps) {
  return (
    <div className="w-full">
      <h1 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-white md:text-5xl">
        {question.headline}
      </h1>
      {question.body && (
        <p className="mt-6 max-w-xl text-base leading-relaxed text-mist-500 md:text-lg">
          {question.body}
        </p>
      )}
      <div className="mt-10">
        <Button type="button" size="lg" onClick={onStart}>
          {question.buttonLabel ?? "Start Application"}
        </Button>
        <p className="mt-3 text-sm text-mist-700">
          press{" "}
          <kbd className="rounded border border-white/10 bg-navy-900 px-1.5 py-0.5 text-mist-500">
            Enter ↵
          </kbd>
        </p>
      </div>
    </div>
  );
}
