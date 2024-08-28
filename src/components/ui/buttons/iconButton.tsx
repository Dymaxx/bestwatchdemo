import { ReactNode } from "react";

export function IconButton({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <button className="btn btn-circle btn-ghost flex items-center gap-5 text-secondary">
      {icon} {text}
    </button>
  );
}
