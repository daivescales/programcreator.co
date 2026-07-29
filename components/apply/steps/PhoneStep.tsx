"use client";

import { forwardRef } from "react";
import type { Question } from "@/content/questions";
import { inputClass } from "./shared";

type PhoneStepProps = {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  id: string;
};

const PhoneStep = forwardRef<HTMLInputElement, PhoneStepProps>(
  function PhoneStep({ question, value, onChange, id }, ref) {
    return (
      <input
        ref={ref}
        id={id}
        type="tel"
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder ?? "+1 555 000 0000"}
        autoComplete="tel"
        inputMode="tel"
        aria-label={question.question}
      />
    );
  }
);

export default PhoneStep;
