export default function Glow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <div className="animate-blob absolute -top-40 -left-40 h-[32rem] w-[32rem] rounded-full bg-orange/45 blur-[110px]" />
      <div className="animate-blob absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-pastel-cyan/35 blur-[110px] [animation-delay:5s]" />
      <div className="animate-blob absolute bottom-0 left-1/4 h-[26rem] w-[26rem] rounded-full bg-pastel-peach/50 blur-[110px] [animation-delay:9s]" />
    </div>
  )
}
