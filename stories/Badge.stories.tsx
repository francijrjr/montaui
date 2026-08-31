import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "../registry/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "Feedback/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "brand", "success", "warning", "danger", "info", "outline"],
    },
    size: {
      control: "select",
      options: ["sm", "default", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    children: "Badge Padrão",
    variant: "default",
  },
};

export const Brand: Story = {
  args: {
    children: "Monta UI",
    variant: "brand",
  },
};

export const Success: Story = {
  args: {
    children: "Aprovado",
    variant: "success",
  },
};

export const Warning: Story = {
  args: {
    children: "Pendente",
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: "Cancelado",
    variant: "danger",
  },
};
