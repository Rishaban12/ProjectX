export default function Glow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent)]" />
      <div className="animate-blob absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-violet-600/25 blur-[110px]" />
      <div className="animate-blob absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-cyan-500/20 blur-[110px] [animation-delay:4s]" />
      <div className="animate-blob absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-pink-500/20 blur-[110px] [animation-delay:8s]" />
    </div>
  )
}
