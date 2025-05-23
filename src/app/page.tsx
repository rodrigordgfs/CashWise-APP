"use client"

import { Button } from "@/components/shared/Button"
import { Plus } from "lucide-react"

export default function Home() {

  return (
    <div className="">
      <Button variant="emerald" size="md" icon={Plus}>Nova Transação</Button>
    </div>
  )
}
