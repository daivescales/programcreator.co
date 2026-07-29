"use client";

import type { Question } from "@/content/questions";
import { choiceRowClass, letterForIndex } from "./shared";

type ChoiceStepProps = {
  question: Question;
  value: string;
  onSelect: (value: string) => void;
};

export default function ChoiceStep({
  question,
  value,
  onSelect,
}: ChoiceStepProps) {
  const options = question.options ?? [];

  return (
    <div className="space-y-3" role="radiogroup" aria-label={question.question}>
      {options.map((option, index) => {
        const selected = value === option;
        const letter = letterForIndex(index);
        return (
          <button
            key={option}
            type="button"
            role="radio"
            aria-checked={selected}
            className={choiceRowClass(selected)}
            onClick={() => onSelect(option)}
          >
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded border text-xs font-semibold ${
                selected
                  ? "border-azure-400 text-azure-400"
                  : "border-white/15 text-mist-500 group-hover:border-azure-400 group-hover:text-azure-400"
              }`}
            >
              {letter}
            </span>
            <span className="text-base text-white md:text-lg">{option}</span>
          </button>
        );
      })}
    </div>
  );
}
