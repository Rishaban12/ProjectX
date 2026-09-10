export default function RocketIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={className}>
      <div className="animate-float relative">
        {/* fire trail */}
        <div className="absolute -bottom-8 -left-4 h-64 w-24 -rotate-[32deg] rounded-full bg-gradient-to-t from-orange via-pastel-violet/70 to-transparent opacity-80 blur-2xl" />
        <div className="absolute -bottom-4 left-2 h-40 w-12 -rotate-[32deg] rounded-full bg-gradient-to-t from-yellow via-orange/70 to-transparent opacity-80 blur-xl" />

        <svg
          viewBox="0 0 320 420"
          className="relative h-auto w-full drop-shadow-sm"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="#111111" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
            {/* rider */}
            <circle cx="221" cy="52" r="15" />
            <path d="M221 67 C 213 85, 206 96, 202 116" fill="none" />
            <path d="M210 76 C 238 58, 253 38, 262 14" fill="none" />
            <path d="M208 82 C 249 74, 266 58, 274 42" fill="none" />
            <path d="M202 116 C 192 132, 206 142, 213 158" fill="none" />
            <path d="M202 116 C 183 134, 180 148, 177 164" fill="none" />

            {/* rocket nose + body */}
            <path
              d="M160 38 C 128 70, 116 112, 116 152 L 204 152 C 204 112, 192 70, 160 38 Z"
              fill="#fbfaf9"
            />
            <path
              d="M116 152 L 112 268 C 112 284, 130 292, 160 292 C 190 292, 208 284, 208 268 L 204 152 Z"
              fill="#fbfaf9"
            />

            {/* window */}
            <circle cx="160" cy="196" r="25" fill="#f6f5f3" />
            <circle cx="160" cy="196" r="14" fill="none" />

            {/* fins */}
            <path d="M120 236 L 76 302 C 94 300, 112 292, 123 276 Z" fill="#fbfaf9" />
            <path d="M200 236 L 244 302 C 226 300, 208 292, 197 276 Z" fill="#fbfaf9" />

            {/* base ring */}
            <path d="M124 276 C 138 291, 182 291, 196 276" fill="none" />

            {/* motion sparkles */}
            <path d="M56 130 L 66 130 M61 125 L 61 135" strokeWidth="4" />
            <path d="M270 190 L 282 190 M276 184 L 276 196" strokeWidth="4" />
            <circle cx="90" cy="70" r="3" fill="#111111" stroke="none" />
          </g>
        </svg>
      </div>
    </div>
  )
}
