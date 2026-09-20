import { ACT_PHASE_STYLES } from "@/lib/site";

export function ActBadge({ phase }: { phase: string }) {
  const style = ACT_PHASE_STYLES[phase] ?? {
    label: phase,
    className: "bg-zinc-700/40 text-zinc-300 border-zinc-600",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${style.className}`}
    >
      {style.label}
    </span>
  );
}
