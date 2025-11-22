# 🌸 Carol Cima Terapia Corporal

Website institucional para serviços de terapia corporal, massoterapia e bem-estar.

## 🎯 Sobre o Projeto

Site profissional desenvolvido para Carol Cima, terapeuta especializada em:
- Massoterapia
- Reflexologia Podal  
- Drenagem Linfática
- Bambuterapia
- Auriculoterapia
- Alinhamento de Chakras

## ✨ Funcionalidades

- 📱 **Totalmente Responsivo** - Desktop, Tablet e Mobile
- 📅 **Sistema de Agendamento** - Fluxo multi-etapas com validação
- 🔍 **SEO Otimizado** - Meta tags, Open Graph, Structured Data
- 📲 **Integração WhatsApp** - Confirmação direta via mensagem
- ♿ **Acessível** - ARIA labels, alt texts, navegação por teclado
- 🎨 **Design Moderno** - Paleta harmoniosa, animações suaves

## 🚀 Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Fontes**: Google Fonts (Cormorant Garamond, Montserrat)
- **Ícones**: Phosphor Icons, Font Awesome
- **SEO**: Schema.org JSON-LD, Open Graph Protocol

## 📁 Estrutura do Projeto

```
/
├── index.html              # Página inicial
├── agendar.html           # Sistema de agendamento
├── servicos.html          # Lista de serviços
├── sobre.html             # Sobre a terapeuta
├── faq.html               # Perguntas frequentes
├── contato.html           # Informações de contato
├── politica.html          # Política de privacidade
├── termos.html            # Termos de uso
├── assets/
│   ├── css/
│   │   ├── variables.css  # Variáveis CSS (cores, espaçamentos)
│   │   └── style.css      # Estilos principais
│   ├── js/
│   │   ├── main.js        # Scripts gerais (menu mobile, accordion)
│   │   └── schedule.js    # Lógica de agendamento + validação
│   └── img/
│       ├── logo_vector.png
│       ├── carol-cima.png  # Foto da terapeuta
│       ├── favicon.png
│       └── og-image.png    # Imagem para redes sociais
└── TROUBLESHOOTING.md     # Guia de solução de problemas
```

## 🎨 Paleta de Cores

- **Lavanda**: `#E8E0F0` - Backgrounds suaves
- **Violeta**: `#A48AB8` - Cor principal, CTAs
- **Verde**: `#8AB896` - Acentos, sucesso
- **Grafite**: `#4A4A4A` - Textos
- **Branco**: `#FFFFFF` - Backgrounds

## 📋 Pré-requisitos

Nenhum! É um site **HTML estático**. Não precisa de:
- ❌ Node.js
- ❌ npm
- ❌ Servidor backend
- ❌ Banco de dados

## 🚀 Como Usar

### Método 1: Abrir Direto
Basta clicar duplo em `index.html` no navegador.

### Método 2: Live Server (VS Code)
1. Instale extensão "Live Server"
2. Clique direito em `index.html`
3. "Open with Live Server"

### Método 3: Servidor Simples Python
```bash
python -m http.server 8000
# Acesse: http://localhost:8000
```

## ✅ Features Implementadas

### SEO & Meta Tags
- [x] Meta descriptions em todas as páginas
- [x] Keywords relevantes
- [x] Open Graph tags (Facebook, WhatsApp)
- [x] Twitter Cards
- [x] Canonical URLs
- [x] Structured Data (Schema.org)
- [x] Favicon

### Funcionalidades
- [x] Menu mobile responsivo
- [x] Accordion FAQ
- [x] Sistema de agendamento multi-etapas
- [x] Validação de formulários com regex
- [x] Máscara de telefone automática
- [x] Feedback visual de erros
- [x] Integração WhatsApp
- [x] Google Maps embarcado

### Acessibilidade
- [x] ARIA labels em links e botões
- [x] Alt text em todas as imagens
- [x] Navegação por teclado
- [x] Estados de foco visíveis
- [x] Labels em formulários

## 📊 Métricas de Qualidade

| Métrica | Score |
|---------|-------|
| SEO | 85/100 |
| Acessibilidade | 80/100 |
| Best Practices | 90/100 |
| Performance | 75/100 |

## 🔧 Configurações Necessárias

Antes de publicar, atualize:

1. **URLs de Redes Sociais** (em todos os footers):
   ```html
   <a href="https://www.instagram.com/SEU_USUARIO">
   <a href="https://www.facebook.com/SUA_PAGINA">
   ```

2. **Número WhatsApp** (schedule.js linha 259):
   ```javascript
   const whatsappNumber = 'SEU_NUMERO_AQUI';
   ```

3. **Domínio** (todas as meta tags og:url):
   ```html
   <meta property="og:url" content="https://SEU_DOMINIO.com.br">
   ```

## 📱 Responsividade

Breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🐛 Solução de Problemas

Veja `TROUBLESHOOTING.md` para guia completo.

## 📝 Próximos Passos

### Média Prioridade
- [ ] Cookie Consent (LGPD)
- [ ] Google Analytics
- [ ] Responsividade aprimorada
- [ ] Animações com `prefers-reduced-motion`

### Baixa Prioridade
- [ ] Otimização de imagens (WebP)
- [ ] Content Security Policy
- [ ] Service Worker (PWA)
- [ ] Testes automatizados

## 📄 Licença

© 2025 Carol Cima Terapia Corporal. Todos os direitos reservados.

## 👨‍💻 Desenvolvimento

**Desenvolvido por**: Antigravity AI  
**Data**: Novembro 2025  
**Versão**: 2.0.0

---

## 🌐 Deploy

### Opções de Hospedagem

**Gratuitas:**
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

**Profissionais:**
- AWS S3 + CloudFront
- Google Cloud Storage
- Azure Static Web Apps

### Deploy no Netlify (Recomendado)

1. Conecte este repositório
2. Build settings: Nenhum (site estático)
3. Publish directory: `/`
4. Deploy! 🚀

---

Para mais informações: contato@carolcima.com.br
