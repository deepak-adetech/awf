import Image from "next/image";

export function JourneyEngineSection() {
  return (
    <section className="dynamic-section-padding">
      <div className="mx-auto max-w-[1204px] px-6">
        <div className="flex items-center justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#1E1E1E]">
            <Image src="/callers/section-icons/lightning.svg" alt="" width={16} height={16} />
            See it in Action
          </span>
        </div>
        <h2 className="text-center text-[32px] leading-[1.2] font-medium tracking-[-0.06em] text-[#1E1E1E] md:text-[60px]">
          The customer journey engine
        </h2>

        {/* Dashboard mockup with pink gradient frame */}
        <div className="mt-12 lg:mt-16 mx-auto max-w-[1100px] hidden md:block">
          <div
            className="rounded-[28px] p-3 lg:p-5"
            style={{
              background:
                "linear-gradient(180deg, #FF8FBA 0%, #FFC2DA 35%, #FFE3EE 100%)",
            }}
          >
            <DashboardMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="rounded-2xl bg-white shadow-xl overflow-hidden">
      <div className="grid grid-cols-[200px_1fr] min-h-[500px]">
        {/* Sidebar */}
        <div className="border-r border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center gap-2 mb-6">
            <div className="size-7 rounded-md bg-[#1E1E1E] flex items-center justify-center">
              <span className="text-white text-xs font-bold">M</span>
            </div>
            <span className="text-sm font-medium text-[#1E1E1E]">CometLab</span>
            <span className="ml-auto size-4 rounded-full bg-gray-200" />
          </div>
          <nav className="space-y-1">
            {[
              { label: "Campaigns", active: true },
              { label: "Knowledge Bases" },
              { label: "Phone numbers" },
              { label: "App Center" },
              { label: "Analytics" },
              { label: "Settings" },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${item.active ? "bg-white shadow-sm font-medium text-[#1E1E1E]" : "text-[#1E1E1E]/60"}`}
              >
                <span className="size-3 rounded-sm bg-current opacity-20" />
                {item.label}
              </div>
            ))}
          </nav>
        </div>

        {/* Main panel */}
        <div className="p-6 lg:p-8">
          <div className="flex items-center justify-between mb-6">
            <button className="text-sm text-[#1E1E1E]/60 flex items-center gap-1">
              <svg className="size-4" viewBox="0 0 24 24" fill="none">
                <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Back to Campaigns
            </button>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="size-10 rounded-lg bg-[#7C3AED]/10 flex items-center justify-center">
                <svg className="size-5 text-[#7C3AED]" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 5.5C3 14.06 9.94 21 18.5 21h2v-3.5l-4-1-2 2c-2-1-4-3-5-5l2-2-1-4H7v-3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-[#1E1E1E]">New Campaign</h3>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 text-green-700 px-2.5 py-0.5 text-xs font-medium">
                <span className="size-1.5 rounded-full bg-green-500" />
                Running
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium">Edit</button>
              <button className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium">▷ Test</button>
              <button className="rounded-full bg-[#7C3AED] text-white px-3 py-1.5 text-xs font-medium">+ Add Contacts</button>
            </div>
          </div>

          <div className="border-b border-gray-100 mb-5">
            <div className="flex gap-6 -mb-px">
              <button className="border-b-2 border-[#7C3AED] py-2 text-sm font-medium text-[#1E1E1E]">All (301)</button>
              <button className="py-2 text-sm text-[#1E1E1E]/60">Archived (2)</button>
            </div>
          </div>

          <div className="grid grid-cols-[1fr_180px] gap-6">
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <div>
                  <h4 className="text-base font-semibold text-[#1E1E1E]">Total Contacts</h4>
                  <p className="text-xs text-[#1E1E1E]/55">First Attempt: 21 Jun 2025</p>
                </div>
                <span className="text-xl font-semibold text-[#1E1E1E]">301</span>
              </div>
              <div className="flex h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                <span className="h-full bg-green-500" style={{ width: "12%" }} />
                <span className="h-full bg-yellow-400" style={{ width: "44%" }} />
                <span className="h-full bg-orange-400" style={{ width: "20%" }} />
                <span className="h-full bg-red-400" style={{ width: "12%" }} />
              </div>
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                <Stat color="bg-green-500" label="Interested" value="4" />
                <Stat color="bg-yellow-400" label="Not interested" value="114" />
                <Stat color="bg-orange-400" label="Unreached" value="18" />
                <Stat color="bg-red-400" label="Failed" value="72" />
                <Stat color="bg-gray-300" label="Calling" value="51" />
                <Stat color="bg-gray-200" label="Pending" value="42" />
              </div>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs text-[#1E1E1E]/55">Total Attempts: 3,000</p>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div>
                  <p className="text-[11px] text-[#1E1E1E]/55">Connect Rate</p>
                  <p className="text-lg font-semibold text-[#1E1E1E]">39%</p>
                  <p className="text-[10px] text-[#1E1E1E]/55">⌐ 118</p>
                </div>
                <div>
                  <p className="text-[11px] text-[#1E1E1E]/55">Interest Rate</p>
                  <p className="text-lg font-semibold text-[#1E1E1E]">3%</p>
                  <p className="text-[10px] text-[#1E1E1E]/55">⌐ 4</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className={`size-1.5 rounded-full ${color}`} />
      <span className="text-[#1E1E1E]/70">{label}:</span>
      <span className="font-medium text-[#1E1E1E]">{value}</span>
    </div>
  );
}
