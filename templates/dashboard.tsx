"use client"

import * as React from "react"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarItem,
  SidebarFooter,
  SidebarTrigger
} from "@/components/monta-ui/sidebar"
import { Navbar } from "@/components/monta-ui/navbar"
import { Statistic } from "@/components/monta-ui/statistic"
import { Chart } from "@/components/monta-ui/chart"
import { Badge } from "@/components/monta-ui/badge"
import { Button } from "@/components/monta-ui/button"
import {
  LayoutDashboard,
  ShoppingCart,
  Users,
  CreditCard,
  BarChart2,
  Download,
  Plus
} from "lucide-react"

export default function DashboardPage() {
  return (
    <SidebarProvider defaultCollapsed={false}>
      <div className="flex h-screen w-full bg-background text-foreground">
        {/* Barra Lateral (Sidebar) */}
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#753399] text-white font-bold text-xs">
                M
              </div>
              <span className="font-heading text-sm font-bold">Monta Tech</span>
            </div>
            <SidebarTrigger />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
              <SidebarItem icon={<LayoutDashboard className="h-4 w-4" />} active>
                Dashboard
              </SidebarItem>
              <SidebarItem
                icon={<ShoppingCart className="h-4 w-4" />}
                badge={<Badge variant="success" size="sm">Novo</Badge>}
              >
                Vendas & NF-e
              </SidebarItem>
              <SidebarItem icon={<Users className="h-4 w-4" />}>
                Clientes
              </SidebarItem>
              <SidebarItem icon={<CreditCard className="h-4 w-4" />}>
                Financeiro
              </SidebarItem>
              <SidebarItem icon={<BarChart2 className="h-4 w-4" />}>
                Relatórios DRE
              </SidebarItem>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <div className="flex items-center gap-2.5 p-1">
              <div className="h-7 w-7 rounded-full bg-[#753399] text-white flex items-center justify-center font-bold text-xs">
                MU
              </div>
              <div className="space-y-0.5 text-left">
                <p className="text-xs font-bold leading-none">Monta UI</p>
                <p className="text-[10px] text-muted-foreground leading-none">admin@montaui.com.br</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>

        {/* Conteúdo Principal com Top Navbar */}
        <main className="flex-1 flex flex-col overflow-y-auto bg-muted/20">
          <Navbar
            searchPlaceholder="Buscar no sistema (⌘K)..."
            user={{
              name: "Monta UI",
              role: "Administrador",
              fallback: "MU"
            }}
            actions={
              <div className="flex items-center gap-2">
                <Button size="sm" variant="secondary" className="gap-1.5">
                  <Download className="h-3.5 w-3.5" />
                  <span>Exportar</span>
                </Button>
                <Button size="sm" className="gap-1.5 bg-[#753399] hover:bg-[#622981]">
                  <Plus className="h-3.5 w-3.5" />
                  <span>Novo Lançamento</span>
                </Button>
              </div>
            }
          />

          <div className="p-6 space-y-6">
            {/* 4 Cards de KPI Executivo */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Statistic title="Faturamento Mês" value="R$ 489.250,00" change="+14.8%" trend="up" />
              <Statistic title="Transações Aprovadas" value="3.420" change="+8.2%" trend="up" />
              <Statistic title="Clientes Ativos" value="1.280" change="+12.4%" trend="up" />
              <Statistic title="Taxa de Conversão" value="4.92%" change="+1.1%" trend="up" />
            </div>

            {/* Linha de Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
                <h3 className="font-heading text-sm font-bold">Evolução de Receita & Conciliação</h3>
                <Chart
                  type="bar"
                  data={[
                    { label: "Mar", value: 320, target: 300 },
                    { label: "Abr", value: 390, target: 350 },
                    { label: "Mai", value: 450, target: 400 },
                    { label: "Jun", value: 410, target: 400 },
                    { label: "Jul", value: 520, target: 480 },
                    { label: "Ago", value: 580, target: 500 }
                  ]}
                />
              </div>

              <div className="p-5 rounded-xl border border-border bg-card shadow-sm space-y-3">
                <h3 className="font-heading text-sm font-bold">Canais de Recebimento</h3>
                <Chart
                  type="donut"
                  data={[
                    { label: "Pix", value: 54, color: "#753399" },
                    { label: "Cartão", value: 32, color: "#10b981" },
                    { label: "Boleto", value: 14, color: "#f59e0b" }
                  ]}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}