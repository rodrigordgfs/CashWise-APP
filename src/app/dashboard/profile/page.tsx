"use client";

import { Button } from "@/components/shared/Button";
import { PageHeader } from "@/components/shared/PageHeader";
import { DeleteAccountCard } from "@/components/ui/profile/DeleteAccountCard";
import { PersonalInfoCard } from "@/components/ui/profile/PersonalInfoCard";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const { t } = useTranslation();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title={t("profile.title")} />

      <div className="grid gap-4 md:grid-cols-2">
        <PersonalInfoCard />
        <DeleteAccountCard />
      </div>

      <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4"></div>

      <div className="flex justify-between">
        <Button variant="red" onClick={handleLogout}>
          {t("profile.logout")}
        </Button>
      </div>
    </div>
  );
}
