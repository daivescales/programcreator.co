"use client";

import { forwardRef } from "react";
import type { Question } from "@/content/questions";
import { inputClass } from "./shared";

type EmailStepProps = {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  id: string;
};

const EmailStep = forwardRef<HTMLInputElement, EmailStepProps>(
  function EmailStep({ question, value, onChange, id }, ref) {
    return (
      <input
        ref={ref}
        id={id}
        type="email"
        className={inputClass}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder ?? "name@example.com"}
        autoComplete="email"
        inputMode="email"
        aria-label={question.question}
      />
    );
  }
);

export default EmailStep;
