"use client";

import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const fieldClasses =
  "w-full border bg-background px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-ring";

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(fieldClasses, className)} {...props} />;
}

export function Textarea({ className, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={cn(fieldClasses, "min-h-[80px]", className)} {...props} />;
}

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("mb-1.5 block text-xs font-bold uppercase tracking-widest", className)}
      {...props}
    />
  );
}

type SelectOption = { value: string; label: string };

type SelectProps = {
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
  onBlur?: (e: { target: unknown; type?: unknown }) => void;
  children: React.ReactNode;
  className?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(function Select(
  { value, onChange, onBlur, children, className, id, name, disabled, "aria-label": ariaLabel },
  ref,
) {
  const [open, setOpen] = React.useState(false);
  const [highlight, setHighlight] = React.useState(0);
  const [listId] = React.useState(() => `${id ?? "select"}-list`);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const options = React.useMemo<SelectOption[]>(
    () =>
      React.Children.toArray(children)
        .filter(
          (child): child is React.ReactElement<React.OptionHTMLAttributes<HTMLOptionElement>> =>
            React.isValidElement(child) && child.type === "option",
        )
        .map((child) => ({
          value: String(child.props.value ?? ""),
          label:
            typeof child.props.children === "string"
              ? child.props.children
              : String(child.props.value ?? ""),
        })),
    [children],
  );

  const selected = options.find((o) => o.value === value) ?? null;
  const blurEvent = React.useMemo(() => ({ target: {}, type: "blur" }), []);

  React.useEffect(() => {
    if (!open) return;

    const onMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.(blurEvent);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        onBlur?.(blurEvent);
      }
    };
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onBlur, blurEvent]);

  function selectOption(opt: SelectOption) {
    onChange?.({ target: { value: opt.value } });
    setOpen(false);
    onBlur?.(blurEvent);
  }

  function onTriggerKeyDown(e: React.KeyboardEvent) {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const start = Math.max(0, options.findIndex((o) => o.value === value));
        setHighlight(start);
        setOpen(true);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlight((h) => Math.min(h + 1, options.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlight((h) => Math.max(h - 1, 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setHighlight(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setHighlight(options.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const opt = options[highlight];
      if (opt) selectOption(opt);
    } else if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      onBlur?.(blurEvent);
    }
  }

  return (
    <span ref={containerRef} className={cn("relative block", className)}>
      <button
        ref={ref}
        type="button"
        id={id}
        name={name}
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        onBlur={onBlur}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        className={cn(fieldClasses, "flex items-center justify-between gap-2 pr-9 disabled:opacity-50")}
      >
        <span className={cn("truncate text-left", !selected && "text-muted-foreground")}>
          {selected ? selected.label : "Seleccionar…"}
        </span>
        <ChevronDown
          className={cn(
            "pointer-events-none absolute right-3 h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute left-0 right-0 z-50 mt-1 max-h-64 overflow-auto border bg-card py-1 shadow-card-hover"
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={isSelected}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectOption(opt)}
                onMouseEnter={() => setHighlight(i)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-2 px-3 py-2 text-sm transition-colors",
                  isSelected
                    ? "bg-primary/10 font-semibold text-primary"
                    : i === highlight
                      ? "bg-muted"
                      : "hover:bg-muted",
                )}
              >
                <span className="truncate">{opt.label}</span>
                {isSelected && <Check className="h-4 w-4 shrink-0" />}
              </li>
            );
          })}
        </ul>
      )}
    </span>
  );
});

export function Checkbox({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <span className={cn("relative inline-flex h-4 w-4 shrink-0", className)}>
      <input type="checkbox" className="peer sr-only" {...props} />
      <span
        aria-hidden="true"
        className="pointer-events-none block h-4 w-4 cursor-pointer border bg-background transition-colors peer-checked:border-primary peer-checked:bg-primary peer-focus-visible:outline-2 peer-focus-visible:outline-offset-1 peer-focus-visible:outline-ring peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
      />
      <Check
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100"
      />
    </span>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1 text-xs font-medium text-destructive">{message}</p>;
}