"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Paper } from "@mui/material";

type Pessoa = { id: number; nome: string; idade: number; telefone: string; };

export default function PessoasPage() {
  const router = useRouter();
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Pessoa>({ id: 0, nome: "", idade: 0, telefone: "" });
  const API_URL = "http://localhost:3001/pessoas";

  useEffect(() => {
    fetch(API_URL).then(r => r.json()).then(setPessoas).catch(console.error);
  }, []);

  const abrirModal = (p?: Pessoa) => {
    setForm(p || { id: 0, nome: "", idade: 0, telefone: "" });
    setOpen(true);
  };
  const fecharModal = () => setOpen(false);

  const salvar = async () => {
    if (form.id === 0) {
      const res = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const nova = await res.json();
      setPessoas([...pessoas, nova]);
    } else {
      const res = await fetch(`${API_URL}/${form.id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const atualizada = await res.json();
      setPessoas(pessoas.map(p => p.id === atualizada.id ? atualizada : p));
    }
    fecharModal();
  };

  const deletar = async (id: number) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    setPessoas(pessoas.filter(p => p.id !== id));
  };

  return (
    <Box sx={{ p: 5, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      
      {/* Título e botão alinhados */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ color: "#6a1b9a" }}>Lista de Pessoas</Typography>
        <Button variant="contained" sx={{ bgcolor: "#ab47bc" }} onClick={() => router.push("/login")}>
          Sair
        </Button>
      </Box>

      <Button variant="contained" sx={{ mb: 3, bgcolor: "#6a1b9a" }} onClick={() => abrirModal()}>Adicionar Pessoa</Button>

      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        {pessoas.map(p => (
          <Box key={p.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography>{p.nome} - {p.idade} anos - {p.telefone}</Typography>
            <Box>
              <Button size="small" sx={{ mr: 1 }} onClick={() => abrirModal(p)}>Editar</Button>
              <Button size="small" color="error" onClick={() => deletar(p.id)}>Excluir</Button>
            </Box>
          </Box>
        ))}
      </Paper>

      <Dialog open={open} onClose={fecharModal}>
        <DialogTitle>{form.id === 0 ? "Adicionar Pessoa" : "Editar Pessoa"}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField label="Nome" value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })} />
          <TextField label="Idade" value={form.idade === 0 ? "" : form.idade} onChange={e => setForm({ ...form, idade: Number(e.target.value) || 0 })} />
          <TextField label="Telefone" value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={fecharModal}>Cancelar</Button>
          <Button variant="contained" sx={{ bgcolor: "#6a1b9a" }} onClick={salvar}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
