import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const Highlight = ({
  children,
  className,
  color = "indigo",
}: {
  children: React.ReactNode;
  className?: string;
  color?: "indigo" | "amber";
}) => {
  const bg =
    color === "amber"
      ? "linear-gradient(to right, var(--highlight-amber-from), var(--highlight-amber-to))"
      : "linear-gradient(to right, var(--highlight-indigo-from), var(--highlight-indigo-to))";

  return (
    <motion.span
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
      style={{
        background: bg,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
        padding: "0.15em 0.4em",
        borderRadius: "4px",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone" as never,
      }}
      className={cn(className)}
    >
      {children}
    </motion.span>
  );
};
