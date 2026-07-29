"use client";

import { forwardRef } from "react";
import type { Question } from "@/content/questions";
import { inputClass } from "./shared";

type TextStepProps = {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  id: string;
};

const TextStep = forwardRef<HTMLInputElement, TextStepProps>(
  function TextStep({ question, value, onChange, id }, ref) {
    return (
      <input
        ref={ref}
        id={id}
        type="text"
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder ?? "Type your answer here..."}
        autoComplete="off"
        aria-label={question.question}
      />
    );
  }
);

export default TextStep;
