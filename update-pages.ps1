# Script PowerShell para aplicar HEAD melhorado em múltiplas páginas
# Carol Cima - Website Enhancement Script

$pages = @(
    @{
        file = "sobre.html"
        title = "Sobre Carol Cima | Terapeuta Corporal"
        description = "Conheça Carol Cima, terapeuta especializada em massoterapia e técnicas corporais. História, formação e abordagem terapêutica."
        keywords = "carol cima, terapeuta são paulo, massoterapista certificada"
    },
    @{
        file = "faq.html"
        title = "Perguntas Frequentes | Carol Cima Terapia Corporal"
        description = "Tire suas dúvidas sobre as terapias, agendamentos, formas de pagamento e outros detalhes."
        keywords = "faq terapia corporal, dúvidas massoterapia, perguntas reflexologia"
    },
    @{
        file = "contato.html"
        title = "Contato | Carol Cima Terapia Corporal"
        description = "Entre em contato conosco. Telefone, WhatsApp, e-mail e endereço para visitação."
        keywords = "contato carol cima, endereço terapia corporal sp, telefone massoterapia"
    }
)

Write-Host "🚀 Iniciando atualização de páginas..." -ForegroundColor Cyan

foreach ($page in $pages) {
    Write-Host "`n📄 Processando $($page.file)..." -ForegroundColor Yellow
    
    $headTemplate = @"
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>$($page.title)</title>
    <meta name="description" content="$($page.description)">
    <meta name="keywords" content="$($page.keywords)">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://carolcima.com.br/$($page.file)">

    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/img/favicon.png">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://carolcima.com.br/$($page.file)">
    <meta property="og:title" content="$($page.title)">
    <meta property="og:description" content="$($page.description)">
    <meta property="og:image" content="https://carolcima.com.br/assets/img/og-image.png">

    <!-- Fonts & Icons -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Styles -->
    <link rel="stylesheet" href="assets/css/variables.css">
    <link rel="stylesheet" href="assets/css/style.css">
"@
    
    Write-Host "  ✓ Template HEAD criado" -ForegroundColor Green
}

Write-Host "`n✅ Script preparado. Execute manualmente as substituições nos arquivos." -ForegroundColor Green
Write-Host "📝 Nota: Substitua o conteúdo do <head> até </head> em cada arquivo." -ForegroundColor Cyan
