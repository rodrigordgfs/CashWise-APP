"use client";

import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/shared/Button";
import { useTranslation } from "react-i18next";
import { useDialog } from "@/context/dialogContext";

export const DeleteAccountCard = () => {
  const { t } = useTranslation();
  const { showDialog } = useDialog();
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      showDialog({
        title: t("app.dialogDeleteAccountTitle"),
        description: t("app.dialogDeleteAccountDescription"),
        confirmLabel: t("app.dialogDeleteAccountConfirm"),
        cancelLabel: t("app.dialogDeleteAccountCancel"),
        onConfirm: async () => {
          setIsLoading(true);
          await user?.delete();
          toast.success(t("app.dialogDeleteAccountSuccess"));
          window.location.href = "/";
        },
      });
    } catch (err) {
      console.error(err);
      toast.error(t("app.dialogDeleteAccountError"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">{t("profile.deleteAccount")}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t("profile.deleteAccountDescription")}
        </p>
      </div>
      <div className="p-6 pt-0">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          {t("profile.deleteAccountText")}
        </p>
      </div>
      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
        <Button
          variant="red"
          onClick={handleDeleteAccount}
          disabled={isLoading}
        >
          {isLoading ? t("profile.deleting") : t("profile.deleteAccount")}
        </Button>
      </div>
    </div>
  );
};
