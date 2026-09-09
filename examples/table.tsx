"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/monta-ui/table";

export default function TabelaClientes() {
  const dados = [
    {
      id: "CLI-1024",
      nome: "Hospital das Clínicas",
      status: "Ativo",
      valor: "R$ 24.500,00",
    },
    {
      id: "CLI-1025",
      nome: "Logística Express S/A",
      status: "Pendente",
      valor: "R$ 8.900,00",
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Código</TableHead>
          <TableHead>Cliente</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dados.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-mono">{c.id}</TableCell>
            <TableCell className="font-semibold">{c.nome}</TableCell>
            <TableCell>{c.status}</TableCell>
            <TableCell className="text-right font-mono">{c.valor}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
