@echo off
title Push Impact Loop Website to GitHub
cd /d "%~dp0"
set LOGFILE=%~dp0push-log.txt

echo === START %date% %time% === > "%LOGFILE%"

REM Clear OneDrive-induced locks and rebuild corrupt index if needed
if exist ".git\index.lock" del /f ".git\index.lock"
if exist ".git\index" (
  git fsck --no-dangling >> "%LOGFILE%" 2>&1
  if errorlevel 1 (
    echo Rebuilding corrupt git index... >> "%LOGFILE%"
    del /f ".git\index"
    git reset >> "%LOGFILE%" 2>&1
  )
)

git config user.name "Rovonn Russell" >> "%LOGFILE%" 2>&1
git config user.email "rovonn@rovonnrussell.com" >> "%LOGFILE%" 2>&1
git config core.fileMode false >> "%LOGFILE%" 2>&1
git config pull.rebase true >> "%LOGFILE%" 2>&1

git fetch lovable-dc >> "%LOGFILE%" 2>&1
git pull --rebase --autostash lovable-dc main >> "%LOGFILE%" 2>&1

git status --short >> "%LOGFILE%" 2>&1
echo. >> "%LOGFILE%"

git add -A >> "%LOGFILE%" 2>&1
git commit -m "Local-MDX blog system + ADAPT for Nonprofits article + Workbook lead magnet" -m "New blog architecture: local MDX files in content/blog/ rendered through Vite import.meta.glob. Mirrors the personal brand pattern. js-yaml + react-markdown + remark-gfm + rehype-slug + reading-time wired in." -m "Pages: Blog.tsx, BlogPost.tsx (rebuilt to use local MDX), BlogCategory.tsx (new). Old Supabase versions preserved as Blog.legacy.tsx and BlogPost.legacy.tsx. Components: PostCard, CategoryNav, MarkdownContent (with FAQ JSON-LD schema), FAQSection, RelatedPosts." -m "Article: ADAPT for Nonprofits: How to Tailor AI Without Losing the Mission (3128 words, Strategy category, published: false). Lead magnet: NonprofitAIWorkbook.tsx page at /nonprofit-ai-workbook with form + download flow. PDF: 22-page workbook in public/resources/." -m "RSS feed generator wired into npm run build. _redirects updated. App.tsx adds /blog/category/:slug + /nonprofit-ai-workbook + /workbook routes." >> "%LOGFILE%" 2>&1

git push lovable-dc main >> "%LOGFILE%" 2>&1
set PUSH_RESULT=%errorlevel%

git log --oneline -3 >> "%LOGFILE%" 2>&1
echo. >> "%LOGFILE%"

if %PUSH_RESULT%==0 (
  echo === PUSH OK === >> "%LOGFILE%"
) else (
  echo === PUSH FAILED %PUSH_RESULT% === >> "%LOGFILE%"
)

timeout /t 30 /nobreak
exit /b %PUSH_RESULT%
