"use client";
import { useEffect } from "react";

interface ResendCodeButtonProps {
  onResend: () => void;
  countdown: number;
  isResending: boolean;
  disabled?: boolean;
  labelTexts: {
    resendCode: string;
    resending: string;
    resendCountdown: (seconds: number) => string;
  };
}

export function ResendCodeButton({
  onResend,
  countdown,
  isResending,
  disabled,
  labelTexts,
}: ResendCodeButtonProps) {
  useEffect(() => {
    // Optional: side effects can go here if needed
  }, [countdown]);

  return (
    <button
      type="button"
      onClick={onResend}
      disabled={disabled || countdown > 0 || isResending}
      className="text-sm text-emerald-600 dark:text-emerald-500 hover:underline disabled:text-zinc-400 disabled:no-underline disabled:cursor-not-allowed cursor-pointer"
    >
      {countdown > 0
        ? labelTexts.resendCountdown(countdown)
        : isResending
        ? labelTexts.resending
        : labelTexts.resendCode}
    </button>
  );
}
