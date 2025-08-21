"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Paper, Typography, TextField, Button } from "@mui/material";

export default function LoginPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const API_URL = "http://localhost:3001/usuarios/login";

  const handleLogin = async () => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, senha }),
      });

      if (!res.ok) {
        const data = await res.json();
        setErro(data.error || "Erro ao logar");
        return;
      }

      const usuario = await res.json();
      router.push("/pessoas");
    } catch (err) {
      setErro("Erro de conexão");
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", bgcolor: "#f5f5f5" }}>
      <Paper sx={{ p: 5, width: 360, borderRadius: 3, boxShadow: 4, bgcolor: "#ffffff" }}>
        <Typography variant="h4" sx={{ mb: 3, color: "#6a1b9a", textAlign: "center" }}>Login</Typography>
        <TextField
          label="Nome"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <TextField
          label="Senha"
          type="password"
          fullWidth
          variant="outlined"
          sx={{ mb: 2 }}
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        {erro && <Typography color="error" sx={{ mb: 1 }}>{erro}</Typography>}
        <Button variant="contained" fullWidth sx={{ bgcolor: "#6a1b9a", mb: 1 }} onClick={handleLogin}>
          Entrar
        </Button>
        <Button variant="text" fullWidth sx={{ color: "#ab47bc" }} onClick={() => router.push("/usuarios")}>
          Cadastrar-se
        </Button>
      </Paper>
    </Box>
  );
}
