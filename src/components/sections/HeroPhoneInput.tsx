"use client";

export function HeroPhoneInput() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="mt-8 flex max-w-[420px] flex-col gap-3 sm:flex-row"
    >
      <div className="relative flex-1">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-base font-medium text-[#1E1E1E]/70">
          +91
        </span>
        <input
          type="tel"
          placeholder="81234 56789"
          className="h-[52px] w-full rounded-xl border border-[#E4E7E5] bg-[#FAFAFA] pl-[57px] pr-4 text-base font-medium text-[#1E1E1E] placeholder:text-[#1E1E1E]/30 focus:border-[#7C3AED] focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="h-[52px] shrink-0 rounded-xl bg-[#1E1E1E] px-8 text-base font-medium text-white hover:bg-[#1E1E1E]/90"
      >
        Try Now
      </button>
    </form>
  );
}
