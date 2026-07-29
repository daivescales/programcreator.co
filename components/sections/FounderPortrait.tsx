"use client";

import Image from "next/image";
import { useState } from "react";

export default function FounderPortrait() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-white/10 bg-navy-800">
      {!failed ? (
        <Image
          src="/founder.png"
          alt="ProgramCreator founder"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 90vw, 40vw"
          priority
          onError={() => setFailed(true)}
        />
      ) : null}
    </div>
  );
}
