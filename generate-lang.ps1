# generate-lang.ps1
# Génération multilingue + correction des liens internes

$root = Resolve-Path ".."
$langDir = Join-Path $root "lang"

$sourcePages = @(
    "index.html",
    "pages/bio.html",
    "pages/competences.html",
    "pages/contact.html"
)

$languages = @("fr","en","es","de","mg")

foreach ($lang in $languages) {

    $targetBase = Join-Path $langDir $lang

    foreach ($page in $sourcePages) {

        $sourceFile = Join-Path $root $page
        $relativeDir = Split-Path $page -Parent
        $fileName = Split-Path $page -Leaf

        $targetDir = if ($relativeDir -eq "") {
            $targetBase
        } else {
            Join-Path $targetBase $relativeDir
        }

        if (!(Test-Path $targetDir)) {
            New-Item -ItemType Directory -Path $targetDir -Force | Out-Null
        }

        $content = Get-Content $sourceFile -Raw

        if ($lang -ne "fr") {
            $content = $content `
                -replace 'href="/index.html"', "href=`"/lang/$lang/index.html`"" `
                -replace 'href="../index.html"', "href=`"/lang/$lang/index.html`"" `
                -replace 'href="/pages/', "href=`"/lang/$lang/pages/" `
                -replace 'href="../pages/', "href=`"/lang/$lang/pages/" `
                -replace 'href="/portfolio/', "href=`"/lang/$lang/portfolio/" `
                -replace 'href="../portfolio/', "href=`"/lang/$lang/portfolio/"
        }

        Set-Content -Path (Join-Path $targetDir $fileName) -Value $content -Encoding UTF8

        Write-Host "[OK] $lang → $page"
    }
}

Write-Host "Liens multilingues corrigés." -ForegroundColor Green
