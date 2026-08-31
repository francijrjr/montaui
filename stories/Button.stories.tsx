import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../registry/ui/button";
import { Check, Trash2, ArrowRight, Loader2 } from "lucide-react";

const meta: Meta<typeof Button> = {
  title: "Ações/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "ghost", "danger", "dangerGhost", "success", "link"],
      description: "Variante visual do botão",
    },
    size: {
      control: "select",
      options: ["default", "xs", "sm", "lg", "icon", "iconSm", "iconLg"],
      description: "Tamanho do botão",
    },
    fullWidth: {
      control: "boolean",
      description: "Ocupar 100% da largura",
    },
    isLoading: {
      control: "boolean",
      description: "Exibir estado de carregamento com spinner",
    },
    disabled: {
      control: "boolean",
      description: "Desabilitar interação",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: "Botão Principal",
    variant: "default",
    size: "default",
  },
};

export const Secondary: Story = {
  args: {
    children: "Botão Secundário",
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    children: "Botão Ghost",
    variant: "ghost",
  },
};

export const Danger: Story = {
  args: {
    children: "Excluir Registro",
    variant: "danger",
  },
};

export const WithIcon: Story = {
  render: (args) => (
    <Button {...args}>
      <Check className="h-4 w-4" />
      <span>Confirmar Operação</span>
    </Button>
  ),
};

export const Loading: Story = {
  args: {
    children: "Salvando Dados...",
    isLoading: true,
  },
};
