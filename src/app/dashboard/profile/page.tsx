"use client";

import { Button } from "@/components/shared/Button";
import { PageHeader } from "@/components/shared/PageHeader";
import { DeleteAccountCard } from "@/components/ui/profile/DeleteAccountCard";
import {
  PersonalInfoCard,
  User,
} from "@/components/ui/profile/PersonalInfoCard";
import { SecurityCard } from "@/components/ui/profile/SecurityCard";
import { useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "João Silva",
    email: "joao.silva@exemplo.com",
  });

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader title="Perfil" />

      <div className="grid gap-4 md:grid-cols-2">
        <PersonalInfoCard
          user={user}
          onSave={(data: User) => {
            setUser(data);
          }}
        />
        <SecurityCard />
        <DeleteAccountCard />
      </div>

      <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4"></div>

      <div className="flex justify-between">
        <Button
          variant="red"
          onClick={() => {
            // Handle cancel action
            console.log("Cancel clicked");
          }}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
