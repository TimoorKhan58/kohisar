"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";

function recommendType(maxRent: number) {
  if (maxRent < 22000) return "Studio / compact 1-bed in FMC or outer B17";
  if (maxRent < 32000) return "1-bed flat Multi Gardens B17 or FMC";
  if (maxRent < 48000) return "2-bed flat MPCHS Multi Gardens";
  if (maxRent < 65000) return "3-bed family flat in B17 blocks";
  return "Premium 3-bed or ground-floor commercial near markaz";
}

export function RentCalculator() {
  const [salary, setSalary] = useState(120000);
  const maxRent = useMemo(() => Math.round(salary * 0.3), [salary]);
  const suggestion = useMemo(() => recommendType(maxRent), [maxRent]);

  return (
    <div className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm md:p-8">
      <h3 className="text-lg font-bold text-primary md:text-xl">
        What can I afford in Multi Gardens B17?
      </h3>
      <p className="mt-2 text-sm text-muted">
        Uses the 30% rule for monthly rent vs gross salary — a starting point
        for MPCHS Multi Gardens and FMC budgets. Always confirm with viewings.
      </p>
      <label className="mt-6 block text-sm font-medium text-body">
        Monthly salary (PKR)
        <span className="mt-2 flex items-center gap-4">
          <input
            type="range"
            min={20000}
            max={300000}
            step={5000}
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="h-2 w-full cursor-pointer accent-accent"
          />
          <span className="min-w-[7rem] text-right font-semibold text-primary">
            Rs. {salary.toLocaleString("en-PK")}
          </span>
        </span>
      </label>
      <motion.div
        key={maxRent}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="mt-6 rounded-xl bg-surface p-4"
      >
        <p className="text-sm font-medium text-muted">Recommended max rent</p>
        <p className="text-2xl font-bold text-primary">
          Rs. {maxRent.toLocaleString("en-PK")}
          <span className="text-base font-normal text-muted"> / month</span>
        </p>
        <p className="mt-3 text-sm text-body">
          <span className="font-semibold text-primary">Suggested at Kohisar Plaza: </span>
          {suggestion}
        </p>
      </motion.div>
    </div>
  );
}
