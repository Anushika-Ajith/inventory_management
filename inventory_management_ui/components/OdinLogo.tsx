export default function OdinLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* ODIN Brand Icon matching reference screenshot */}
      <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white shadow-xs">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bold dark navy squircle with circular center cutout forming the ODIN 'O' */}
          <rect x="2" y="2" width="20" height="20" rx="6" fill="#1a2d6b" />
          <circle cx="12" cy="12" r="4.5" fill="white" />
        </svg>
      </div>

      <div className="flex flex-col">
        <span className="text-lg font-bold tracking-wider text-white leading-tight">
          ODIN
        </span>
        <span className="text-[11px] font-normal text-white/60 leading-none">
          Item Management
        </span>
      </div>
    </div>
  );
}
