const SB_URL  = 'https://thcjrzluhsbgtbirdoxl.supabase.co';
const SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoY2pyemx1aHNiZ3RiaXJkb3hsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzNTM1MjcsImV4cCI6MjA4ODkyOTUyN30.DdhrLvq1G0b0MrPkMBr4jP0pkzzM1JVsUBnR9V7s8dU';

const HEADERS = { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}` };

window.__v2db = {
  async fetchProjects(){
    const res = await fetch(
      `${SB_URL}/rest/v1/projects?select=*&published=eq.true&order=order_index.asc`,
      { headers: HEADERS }
    );
    if(!res.ok) return [];
    return res.json();
  },

  async fetchProject(slug){
    const res = await fetch(
      `${SB_URL}/rest/v1/projects?slug=eq.${encodeURIComponent(slug)}&select=*`,
      { headers: HEADERS }
    );
    if(!res.ok) return null;
    const arr = await res.json();
    return arr[0] || null;
  }
};
