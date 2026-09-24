const SB_URL  = 'https://thcjrzluhsbgtbirdoxl.supabase.co';
const SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoY2pyemx1aHNiZ3RiaXJkb3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNTM1MjcsImV4cCI6MjA4ODkyOTUyN30.DdhrLvq1G0b0MrPkMBr4jP0pkzzM1JVsUBnR9V7s8dU';
const BUCKET  = 'project-images';

window.__v2db = {
  url: SB_URL,
  anon: SB_ANON,
  bucket: BUCKET,

  imgUrl(path){ return path ? `${SB_URL}/storage/v1/object/public/${BUCKET}/${path}` : ''; },

  async fetchProjects(){
    const res = await fetch(`${SB_URL}/rest/v1/projects?select=*&order=sort_order.asc,created_at.desc`, {
      headers: { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}` }
    });
    if(!res.ok) return [];
    return res.json();
  },

  async fetchProject(slug){
    const res = await fetch(`${SB_URL}/rest/v1/projects?slug=eq.${encodeURIComponent(slug)}&select=*`, {
      headers: { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}` }
    });
    if(!res.ok) return null;
    const arr = await res.json();
    return arr[0] || null;
  }
};
