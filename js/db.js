/* ============================================================
   SYNTAX — Supabase data loader
   Carrega projetos do banco e popula window.PROJECTS
   Fallback para os dados locais se offline
   ============================================================ */
(function () {
  const SUPABASE_URL = 'https://jnfpulrlnrnuwnbtdbzt.supabase.co';
  const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuZnB1bHJsbnJudXduYnRkYnp0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3NjA2OTksImV4cCI6MjA5ODMzNjY5OX0.B82byMTlkV5Lif4aZrhwnU5bMyBlfxcRW5BwIOMio-g';

  // Normaliza row do banco para o formato que os componentes React esperam
  function normalize(row) {
    return {
      slug:      row.slug,
      title:     row.title,
      subtitle:  row.subtitle  || '',
      tags:      row.tags      || [],
      year:      row.year      || '',
      accent:    row.accent    || 'var(--green)',
      accentHex: row.accent_hex|| '#3fbf6a',
      mock:      row.mock      || 'dashboard',
      role:      row.role      || '',
      duration:  row.duration  || '',
      team:      row.team      || '',
      summary:   row.summary   || '',
      gallery:    row.gallery      || [],
      coverUrl:   row.cover_url   || null,
      galleryUrls: row.gallery_urls || [],
    };
  }

  window.__dbReady = fetch(
    `${SUPABASE_URL}/rest/v1/projects?select=*&order=order_index.asc&published=eq.true`,
    { headers: { apikey: SUPABASE_ANON, Authorization: `Bearer ${SUPABASE_ANON}` } }
  )
    .then(r => r.ok ? r.json() : Promise.reject(r.status))
    .then(rows => {
      if (rows && rows.length) {
        window.PROJECTS = rows.map(normalize);
      }
      // se não veio nada do banco, mantém window.PROJECTS do data.js
    })
    .catch(() => { /* mantém fallback local */ });
})();
