"use client";

import { forwardRef } from "react";
import type { Question } from "@/content/questions";
import { inputClass } from "./shared";
import { cn } from "@/lib/utils";

type LongTextStepProps = {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  id: string;
};

const LongTextStep = forwardRef<HTMLTextAreaElement, LongTextStepProps>(
  function LongTextStep({ question, value, onChange, id }, ref) {
    return (
      <textarea
        ref={ref}
        id={id}
        className={cn(inputClass, "min-h-[140px] resize-none leading-relaxed")}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={question.placeholder ?? "Type your answer here..."}
        rows={4}
        aria-label={question.question}
      />
    );
  }
);

export default LongTextStep;
