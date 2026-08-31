"use client"

import * as React from "react"
import { Field, FieldLabel } from "@/components/monta-ui/field"
import { Input } from "@/components/monta-ui/input"
import { Checkbox } from "@/components/monta-ui/checkbox"
import { Button } from "@/components/monta-ui/button"
import { Spinner } from "@/components/monta-ui/loading"
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [showPassword, setShowPassword] = React.useState(false)
  const [rememberMe, setRememberMe] = React.useState(true)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      alert("Autenticado com sucesso!")
    }, 1500)
  }

  return (
    <div className="min-h-screen w-full grid grid-cols-1 lg:grid-cols-2 bg-background text-foreground">
      {/* Coluna Esquerda: Formulário de Autenticação */}
      <div className="flex flex-col justify-between p-8 sm:p-14">
        {/* Marca & Logo */}
        <div className="flex items-center gap-2.5">
          <img
            src="https://cdn.dribbble.com/userupload/48878224/file/2fbdb62ff72fa4698957846c2ac8c9a9.png?resize=1024x308&vertical=center"
            alt="Monta UI"
            className="h-8 w-auto object-contain"
          />
        </div>

        {/* Bloco Central */}
        <div className="my-8 max-w-sm w-full mx-auto space-y-6">
          <div className="space-y-1.5">
            <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
              Bem-vindo de volta
            </h1>
            <p className="text-xs text-muted-foreground">
              Digite suas credenciais corporativas para acessar o painel.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field>
              <FieldLabel required>E-mail Corporativo</FieldLabel>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="email"
                  required
                  placeholder="usuario@empresa.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9"
                />
              </div>
            </Field>

            <Field>
              <div className="flex items-center justify-between">
                <FieldLabel required>Senha</FieldLabel>
                <a href="#recuperar" className="text-[11px] font-semibold text-[#753399] hover:underline">
                  Esqueceu a senha?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-9"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </Field>

            <div className="flex items-center gap-2">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(!!checked)}
              />
              <label className="text-xs text-muted-foreground cursor-pointer select-none">
                Lembrar desta sessão por 30 dias
              </label>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full gap-2">
              {isLoading && <Spinner size="sm" className="text-white" />}
              <span>{isLoading ? "Autenticando..." : "Entrar na Plataforma"}</span>
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>
        </div>

        <p className="text-[11px] text-muted-foreground text-center">
          Monta UI Design System · Todos os direitos reservados.
        </p>
      </div>

      {/* Coluna Direita: Banner Hero Corporativo */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-[#753399] via-[#4d1f66] to-zinc-950 text-white relative overflow-hidden">
        <div className="flex items-center justify-between z-10">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 backdrop-blur px-3 py-1 text-xs font-semibold text-white border border-white/15">
            <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
            Sistemas 100% Operacionais
          </span>
          <span className="text-xs text-white/70 font-mono">v2.4.0</span>
        </div>

        <div className="space-y-4 z-10 max-w-md">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur border border-white/20">
            <ShieldCheck className="h-5 w-5 text-white" />
          </div>
          <h2 className="font-heading text-2xl font-bold leading-tight">
            "O Monta UI garantiu a estabilidade e velocidade na entrega de todas as nossas plataformas financeiras."
          </h2>
          <p className="text-xs text-white/80 font-bold">Engenharia de Produto · Monta Tech</p>
        </div>

        <div className="grid grid-cols-2 gap-4 border-t border-white/15 pt-6 z-10">
          <div>
            <p className="text-lg font-extrabold text-white">44 Componentes</p>
            <p className="text-[11px] text-white/70">100% Zero-Radix Nativo</p>
          </div>
          <div>
            <p className="text-lg font-extrabold text-emerald-300">99.9% Uptime</p>
            <p className="text-[11px] text-white/70">SLA Corporativo</p>
          </div>
        </div>
      </div>
    </div>
  )
}