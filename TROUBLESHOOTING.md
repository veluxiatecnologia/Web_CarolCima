# 🔧 Guia de Troubleshooting - Site Carol Cima

## ❓ Como Visualizar o Site

Este é um site **HTML estático** - não precisa de servidor Node.js!

### Método 1: Abrir Direto no Navegador
1. Navegue até: `d:\00 - WebApps\Página - Carol Cima\app\`
2. Clique duplo em `index.html`
3. ✅ Pronto! O site abre no navegador padrão

### Método 2: VS Code Live Server (Recomendado)
1. Instale extensão "Live Server" no VS Code
2. Clique direito em `index.html`
3. Selecione "Open with Live Server"
4. Site abre em `http://localhost:5500`

---

## 🐛 Problemas Comuns

### Erro: "Cannot GET /"
**Causa**: Tentando usar servidor Node desnecessário  
**Solução**: Use método 1 ou 2 acima

### Erro: Imagens não aparecem
**Verificar**:
```powershell
# Verifique se as imagens existem
Test-Path "d:\00 - WebApps\Página - Carol Cima\app\assets\img\carol-cima.png"
Test-Path "d:\00 - WebApps\Página - Carol Cima\app\assets\img\favicon.png"
Test-Path "d:\00 - WebApps\Página - Carol Cima\app\assets\img\og-image.png"
```

**Solução**: Copiar as imagens da pasta de artifacts para assets/img/

### Erro: CSS não carrega
**Verificar**:
```powershell
Test-Path "d:\00 - WebApps\Página - Carol Cima\app\assets\css\style.css"
Test-Path "d:\00 - WebApps\Página - Carol Cima\app\assets\css\variables.css"
```

### Erro: JavaScript não funciona
**Verificar**:
```powershell
Test-Path "d:\00 - WebApps\Página - Carol Cima\app\assets\js\main.js"
Test-Path "d:\00 - WebApps\Página - Carol Cima\app\assets\js\schedule.js"
```

---

## 📋 Checklist de Verificação

Executar no PowerShell:

```powershell
# 1. Verificar estrutura de pastas
Get-ChildItem -Path "d:\00 - WebApps\Página - Carol Cima\app" -Recurse -Directory | Select-Object FullName

# 2. Verificar todos os HTMLs
Get-ChildItem -Path "d:\00 - WebApps\Página - Carol Cima\app\*.html" | Select-Object Name

# 3. Verificar imagens
Get-ChildItem -Path "d:\00 - WebApps\Página - Carol Cima\app\assets\img\*" | Select-Object Name

# 4. Abrir index.html no navegador padrão
Start-Process "d:\00 - WebApps\Página - Carol Cima\app\index.html"
```

---

## 🚨 Se o Erro Persiste

**Por favor, forneça:**

1. **Screenshot do terminal** com a mensagem de erro
2. **OU copie e cole o erro completo aqui**
3. **Qual comando você executou** que gerou o erro

**Exemplo de erro útil:**
```
PS> npm start
npm : O termo 'npm' não é reconhecido...
```

---

## ✅ Teste Rápido

Execute este comando para abrir o site:

```powershell
Start-Process "d:\00 - WebApps\Página - Carol Cima\app\index.html"
```

Se abrir no navegador → **Tudo funcionando!** ✅

---

## 📞 Próximos Passos

Depois de visualizar o site:
1. Testar formulário de agendamento
2. Verificar se favicon aparece
3. Compartilhar link no WhatsApp para testar OG image
4. Atualizar URLs reais das redes sociais
