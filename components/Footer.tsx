"use client";

export default function Footer() {
  return (
    <footer className="relative border-t border-ink/10 pt-20 pb-10 mt-10 bg-canvas">
      <div className="mx-auto max-w-[1320px] px-5">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="display text-[44px] md:text-[64px] leading-[0.95]">
              AutoWorkflows<span className="text-forge-500">.</span>
            </div>
            <p className="mt-5 max-w-[420px] text-[14.5px] text-ink/60 leading-[1.6]">
              An operations-first AI studio. We design, build, and run AI
              workflows for the people who actually run companies.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              <span className="chip"><span className="chip-dot" /> Brooklyn · NY</span>
              <span className="chip"><span className="chip-dot" /> Lisbon · PT</span>
              <span className="chip"><span className="chip-dot" /> Bangalore · IN</span>
            </div>
          </div>

          <div className="lg:col-span-2 lg:col-start-7">
            <div className="eyebrow mb-5">Studio</div>
            <ul className="space-y-3 text-[14px]">
              <li><a href="#services" className="hover:text-forge-600">What we build</a></li>
              <li><a href="#process" className="hover:text-forge-600">Process</a></li>
              <li><a href="#results" className="hover:text-forge-600">Case work</a></li>
              <li><a href="#stack" className="hover:text-forge-600">The stack</a></li>
            </ul>
          </div>
          <div className="lg:col-span-2">
            <div className="eyebrow mb-5">Library</div>
            <ul className="space-y-3 text-[14px]">
              <li><a href="#" className="hover:text-forge-600">Field notes</a></li>
              <li><a href="#" className="hover:text-forge-600">Open-source</a></li>
              <li><a href="#" className="hover:text-forge-600">Hiring · 3 roles</a></li>
              <li><a href="#" className="hover:text-forge-600">Press kit</a></li>
            </ul>
          </div>
          <div className="lg:col-span-3">
            <div className="eyebrow mb-5">Reach</div>
            <ul className="space-y-3 text-[14px]">
              <li><a href="mailto:hello@autoworkflows.ai" className="hover:text-forge-600">hello@autoworkflows.ai</a></li>
              <li><a href="#" className="hover:text-forge-600">@autoworkflows on X</a></li>
              <li><a href="#" className="hover:text-forge-600">LinkedIn</a></li>
              <li><a href="#" className="hover:text-forge-600">Status · all systems normal</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-20 grid lg:grid-cols-12 gap-6 items-center pt-6 border-t border-ink/10 mono text-[11px] text-ink/50">
          <div className="lg:col-span-4">© 2026 AutoWorkflows Inc. All rights reserved.</div>
          <div className="lg:col-span-4 lg:text-center">SOC2 Type II · Q3 2026 · Audited by Drata</div>
          <div className="lg:col-span-4 lg:text-right">
            <a className="hover:text-ink" href="#">Privacy</a>
            <span className="mx-2 text-ink/20">·</span>
            <a className="hover:text-ink" href="#">Terms</a>
            <span className="mx-2 text-ink/20">·</span>
            <a className="hover:text-ink" href="#">Subprocessors</a>
          </div>
        </div>

        {/* Big watermark wordmark */}
        <div
          aria-hidden
          className="mt-12 select-none overflow-hidden text-center"
          style={{
            fontSize: "clamp(72px, 18vw, 240px)",
            lineHeight: 0.85,
            fontWeight: 300,
            letterSpacing: "-0.04em",
            color: "rgba(14,20,17,0.045)",
          }}
        >
          autoworkflows
        </div>
      </div>
    </footer>
  );
}
