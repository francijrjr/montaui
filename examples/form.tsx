"use client";

import {
  Form,
  FormHeader,
  FormSection,
  FormRow,
  FormDivider,
  FormActions,
} from "@/components/monta-ui/form";
import { Field, FieldLabel } from "@/components/monta-ui/field";
import { Input } from "@/components/monta-ui/input";
import { Button } from "@/components/monta-ui/button";

export default function CadastroFornecedor() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário enviado com sucesso!");
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="max-w-lg p-6 border rounded-xl bg-card shadow-sm"
    >
      <FormHeader
        title="Cadastro de Fornecedor"
        description="Preencha os dados cadastrais da empresa."
      />

      <FormSection title="1. Identificação Fiscal">
        <FormRow>
          <Field>
            <FieldLabel required>Razão Social</FieldLabel>
            <Input required placeholder="Alpha Logística Ltda" />
          </Field>
          <Field>
            <FieldLabel required>CNPJ</FieldLabel>
            <Input required placeholder="00.000.000/0000-00" />
          </Field>
        </FormRow>

        <FormRow>
          <Field>
            <FieldLabel required>E-mail Financeiro</FieldLabel>
            <Input required type="email" placeholder="financeiro@empresa.com" />
          </Field>
          <Field>
            <FieldLabel>Telefone</FieldLabel>
            <Input placeholder="(11) 99999-9999" />
          </Field>
        </FormRow>
      </FormSection>

      <FormActions>
        <Button variant="secondary" type="button">
          Cancelar
        </Button>
        <Button type="submit">Salvar Cadastro</Button>
      </FormActions>
    </Form>
  );
}
