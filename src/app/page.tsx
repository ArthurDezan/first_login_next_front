"use client";
import { useRouter } from "next/navigation";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#666362",
      dark: "#333",
    },
    background: {
      default: "#f5f5f5",
    },
  },
});

export default function LoginPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = () => {
    if (nome && senha) {
      router.push("/pessoas");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            borderRadius: 2,
            boxShadow: 3,
            p: 3,
            bgcolor: "white",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <TextField
              label="Senha"
              type="password"
              variant="outlined"
              fullWidth
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <Button variant="contained" fullWidth onClick={handleLogin}>
              Entrar
            </Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
