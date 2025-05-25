"use client"

import type React from "react"
import { useState } from "react"

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "João Silva",
    email: "joao.silva@exemplo.com",
  })

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ ...user })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setUser(formData)
    setIsEditing(false)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Perfil</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Informações Pessoais</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Gerencie suas informações pessoais</p>
          </div>
          <div className="p-6 pt-0">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nome
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                    />
                  </div>
                </div>
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
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                >
                  Salvar
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancelar
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                Editar
              </button>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Segurança</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Gerencie sua senha</p>
          </div>
          <div className="p-6 pt-0">
            <form className="space-y-4">
              <div>
                <label htmlFor="current-password" className="block text-sm font-medium mb-2">
                  Senha atual
                </label>
                <input
                  id="current-password"
                  type="password"
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="block text-sm font-medium mb-2">
                  Nova senha
                </label>
                <input
                  id="new-password"
                  type="password"
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block text-sm font-medium mb-2">
                  Confirmar nova senha
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-700 rounded-md bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-emerald-500 dark:focus:ring-emerald-600"
                />
              </div>
            </form>
          </div>
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
            <button className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-600">
              Alterar senha
            </button>
          </div>
        </div>

        <div className="md:col-span-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-sm">
          <div className="p-6">
            <h3 className="text-lg font-semibold">Excluir conta</h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Exclua permanentemente sua conta e todos os seus dados
            </p>
          </div>
          <div className="p-6 pt-0">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Ao excluir sua conta, todos os seus dados serão permanentemente removidos. Esta ação não pode ser
              desfeita.
            </p>
          </div>
          <div className="p-6 border-t border-zinc-200 dark:border-zinc-800">
            <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600">
              Excluir conta
            </button>
          </div>
        </div>
      </div>

      <div className="h-px bg-zinc-200 dark:bg-zinc-800 my-4"></div>

      <div className="flex justify-between">
        <button className="px-4 py-2 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800">
          Voltar
        </button>
        <button className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600">
          Sair
        </button>
      </div>
    </div>
  )
}
