import { Button } from "@/components/shared/Button";
import { InputField } from "@/components/shared/InputField";
import { useState } from "react";

export interface User {
  name: string;
  email: string;
}

interface PersonalInfoCardProps {
  user: User;
  onSave: (data: User) => void;
}

export const PersonalInfoCard = ({ user, onSave }: PersonalInfoCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
      <div className="p-6">
        <h3 className="text-lg font-semibold">Informações Pessoais</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Gerencie suas informações pessoais
        </p>
      </div>
      <div className="p-6 pt-0">
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Nome"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="E-mail"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Nome</label>
              <p className="text-sm">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">E-mail</label>
              <p className="text-sm">{user.email}</p>
            </div>
          </div>
        )}
      </div>
      <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
        {isEditing ? (
          <div className="flex gap-2">
            <Button type="submit" onClick={handleSubmit}>
              Salvar
            </Button>
            <Button
              type="button"
              variant="blue"
              onClick={() => setIsEditing(false)}
            >
              Cancelar
            </Button>
          </div>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Editar</Button>
        )}
      </div>
    </div>
  );
};
