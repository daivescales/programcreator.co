"use client";

import { Check } from "lucide-react";
import type { Question } from "@/content/questions";
import { choiceRowClass, letterForIndex } from "./shared";

type MultiChoiceStepProps = {
  question: Question;
  value: string[];
  onChange: (value: string[]) => void;
};

export default function MultiChoiceStep({
  question,
  value,
  onChange,
}: MultiChoiceStepProps) {
  const options = question.options ?? [];

  function toggle(option: string) {
    if (value.includes(option)) {
      onChange(value.filter((item) => item !== option));
    } else {
      onChange([...value, option]);
    }
  }

  return (
    <div
      className="space-y-3"
      role="group"
      aria-label={question.question}
    >
      {options.map((option, index) => {
        const selected = value.includes(option);
        const letter = letterForIndex(index);
        return (
          <button
            key={option}
            type="button"
            aria-pressed={selected}
            className={choiceRowClass(selected)}
            onClick={() => toggle(option)}
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
            <span className="flex-1 text-base text-white md:text-lg">
              {option}
            </span>
            {selected && (
              <Check
                size={18}
                className="shrink-0 text-azure-400"
                strokeWidth={2}
                aria-hidden
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
