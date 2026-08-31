"use client"

import * as React from "react"
import { Navbar } from "@/components/monta-ui/navbar"
import { Button } from "@/components/monta-ui/button"
import { Badge } from "@/components/monta-ui/badge"
import { ArrowRight, Terminal, ShieldCheck, Zap, Layout } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* 1. Navbar Superior */}
      <Navbar
        brand={
          <img
            src="https://cdn.dribbble.com/userupload/48878224/file/2fbdb62ff72fa4698957846c2ac8c9a9.png?resize=1024x308&vertical=center"
            alt="Monta UI"
            className="h-7 w-auto object-contain"
          />
        }
        links={[
          { label: "Recursos", href: "#recursos", active: true },
          { label: "Componentes", href: "#componentes" },
          { label: "Templates", href: "#templates" },
          { label: "Preços", href: "#precos" },
        ]}
        actions={
          <Button size="sm" className="bg-[#753399] hover:bg-[#622981]">
            Começar Agora
          </Button>
        }
      />

      {/* 2. Hero Section */}
      <section className="py-20 px-6 sm:px-12 text-center max-w-4xl mx-auto space-y-6">
        <Badge variant="brand" className="px-3.5 py-1 gap-2 text-xs">
          <span className="h-2 w-2 rounded-full bg-[#753399] animate-pulse" />
          Monta UI Release v2.4 — 44 Componentes Corporativos
        </Badge>

        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
          O Design System Enterprise Feito para Alta Performance
        </h1>

        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Biblioteca de componentes 100% autorais em React, TypeScript e Tailwind CSS, sem amarras do Radix UI. Ideal para sistemas SaaS, ERPs e fintechs.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Button size="lg" className="gap-2 bg-[#753399] hover:bg-[#622981]">
            <span>Criar Projeto Grátis</span>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="lg" variant="secondary" className="gap-2 font-mono text-xs">
            <Terminal className="h-4 w-4 text-[#753399]" />
            <span>pnpm dlx monta-ui init</span>
          </Button>
        </div>
      </section>

      {/* 3. Grid de Funcionalidades */}
      <section className="border-t border-border py-16 px-6 sm:px-12 bg-muted/10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2 p-6 rounded-xl border border-border bg-card shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-[#753399]/15 flex items-center justify-center text-[#753399]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-base font-bold">100% Zero Radix</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sem dependências pesadas. Código limpo e transparente diretamente no seu repositório.
            </p>
          </div>

          <div className="space-y-2 p-6 rounded-xl border border-border bg-card shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-600">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-base font-bold">Ultra Performance</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Renderização imediata sem sobrecarga de wrappers ou transições lentas.
            </p>
          </div>

          <div className="space-y-2 p-6 rounded-xl border border-border bg-card shadow-sm">
            <div className="h-9 w-9 rounded-lg bg-sky-500/15 flex items-center justify-center text-sky-600">
              <Layout className="h-5 w-5" />
            </div>
            <h3 className="font-heading text-base font-bold">Templates Prontos</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Telas completas de Login, Home e Dashboard SaaS prontas para uso em produção.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}