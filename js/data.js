/* SYNTAX — project data (shared by grid + case pages) */
window.PROJECTS = [
  {
    slug:"roger",
    title:"Roger",
    subtitle:"Dashboard B2B para gestão de viagens corporativas",
    tags:["Product Design","Dashboard","Design System"],
    year:"2025", accent:"var(--green)", accentHex:"#3fbf6a", mock:"dashboard",
    role:"UX/UI · Design System · Handoff",
    duration:"14 semanas",
    team:"2 designers · 4 devs",
    summary:"Centralizamos reservas, políticas e relatórios de viagem em um único painel que reduziu o tempo de aprovação em 62%.",
    problem:"Times financeiros gerenciavam viagens corporativas em planilhas e e-mails. Aprovar uma viagem levava dias, sem visibilidade de gastos, políticas ou compliance. A Roger precisava de um produto que substituísse esse caos por controle em tempo real.",
    goals:["Reduzir o tempo de aprovação de viagens","Dar visibilidade total de gastos por time e centro de custo","Padronizar políticas de viagem em uma camada de regras"],
    process:[
      {k:"Discovery",t:"Imersão & entrevistas",d:"12 entrevistas com gestores financeiros e viajantes frequentes. Mapeamos o fluxo de ponta a ponta e isolamos 4 momentos de fricção crítica."},
      {k:"Arquitetura",t:"Estrutura de informação",d:"Reorganizamos o produto em torno de 3 pilares — Reservar, Aprovar, Analisar — eliminando 40% das telas do protótipo legado."},
      {k:"Design System",t:"Base de componentes",d:"Construímos um DS com tokens semânticos e 60+ componentes, garantindo consistência entre dashboard, e-mails e app."},
      {k:"Validação",t:"Testes de usabilidade",d:"3 rodadas de teste com protótipo navegável. A taxa de conclusão da tarefa de aprovação subiu de 54% para 91%."}
    ],
    metrics:[["62%","menos tempo de aprovação"],["91%","conclusão de tarefa"],["4,8/5","satisfação interna"],["60+","componentes no DS"]],
    solution:"Um dashboard com hierarquia clara: KPIs de gasto no topo, fila de aprovações acionável e relatórios que exportam direto para o ERP. Políticas viraram regras visuais — o sistema sinaliza violações antes da reserva.",
    gallery:["Visão geral do painel financeiro","Fila de aprovações com regras","Relatório de gastos por centro de custo"]
  },
  {
    slug:"human-academy",
    title:"Human Academy",
    subtitle:"Ecossistema de site institucional para educação",
    tags:["Web Design","CMS","Branding"],
    year:"2025", accent:"var(--violet)", accentHex:"#9a7bff", mock:"web",
    role:"Web · CMS · Conteúdo",
    duration:"10 semanas",
    team:"2 designers · 2 devs",
    summary:"Reposicionamos uma escola de tecnologia com um site editorial e um CMS que o time publica sem depender de devs.",
    problem:"A Human Academy crescia rápido mas tinha um site estático, difícil de atualizar e que não comunicava sua metodologia. Cada nova turma exigia retrabalho de código.",
    goals:["Comunicar a metodologia de ensino com clareza","Dar autonomia editorial ao time de marketing","Aumentar a conversão de inscrições"],
    process:[
      {k:"Estratégia",t:"Posicionamento",d:"Workshops de marca para traduzir a metodologia 'aprender fazendo' em uma narrativa visual e verbal coerente."},
      {k:"Design",t:"Sistema editorial",d:"Layouts modulares que combinam imagem, vídeo e prova social. Cada bloco é um componente reutilizável no CMS."},
      {k:"CMS",t:"Autonomia de conteúdo",d:"Modelamos coleções (cursos, turmas, mentores, depoimentos) para o time publicar landing pages em minutos."},
      {k:"Lançamento",t:"Migração & SEO",d:"Migração de conteúdo com redirecionamentos e estrutura semântica que melhorou o ranqueamento orgânico."}
    ],
    metrics:[["+38%","inscrições/mês"],["0","dependência de dev"],["1,9s","tempo de carga"],["12","modelos de página"]],
    solution:"Um site editorial vivo: hero com vídeo, blocos de metodologia, vitrine de cursos alimentada por CMS e páginas de turma geradas automaticamente. O marketing virou dono do próprio conteúdo.",
    gallery:["Home editorial com vídeo","Página de curso modular","Painel de coleções no CMS"]
  },
  {
    slug:"zouti",
    title:"Zouti",
    subtitle:"Plataforma de checkout e pagamentos para e-commerce",
    tags:["Product Design","Web App","Identidade"],
    year:"2024", accent:"var(--blue)", accentHex:"#5aa9ff", mock:"checkout",
    role:"Branding · Product · Web",
    duration:"16 semanas",
    team:"3 designers · 6 devs",
    summary:"Criamos do zero a marca e o produto de checkout da Zouti — da identidade ao fluxo de pagamento de uma página.",
    problem:"A Zouti entrava num mercado dominado por gateways genéricos. Precisava de uma identidade memorável e de um checkout que convertesse melhor que os concorrentes.",
    goals:["Construir uma identidade de marca distintiva","Desenhar um checkout de alta conversão","Criar um painel de lojista claro e acionável"],
    process:[
      {k:"Marca",t:"Identidade visual",d:"Sistema de marca completo: logo, paleta, tipografia e motion. Tom confiante e tecnológico, sem ser frio."},
      {k:"Conversão",t:"Checkout de 1 página",d:"Reduzimos o fluxo a uma única tela com validação em tempo real e múltiplos meios de pagamento."},
      {k:"Lojista",t:"Painel de gestão",d:"Dashboard de vendas, antifraude e conciliação desenhado para decisões rápidas."},
      {k:"Escala",t:"Design System",d:"Componentização para suportar white-label e dezenas de lojistas com identidades próprias."}
    ],
    metrics:[["+27%","taxa de conversão"],["1 tela","checkout completo"],["-45%","abandono de carrinho"],["99,9%","uptime do fluxo"]],
    solution:"Um checkout de página única com brand forte, validação instantânea e PIX/cartão/boleto lado a lado. O painel do lojista transforma dados de venda em ação.",
    gallery:["Checkout de página única","Painel de vendas do lojista","Sistema de identidade Zouti"]
  },
  {
    slug:"fundsy",
    title:"Fundsy",
    subtitle:"App de investimentos com carteira inteligente",
    tags:["Mobile App","Fintech","Data Viz"],
    year:"2025", accent:"var(--orange)", accentHex:"#f0a24a", mock:"app",
    role:"Product · Mobile · Data Viz",
    duration:"12 semanas",
    team:"2 designers · 5 devs",
    summary:"Um app de investimentos que explica para onde seu dinheiro vai — com gráficos legíveis e linguagem humana.",
    problem:"Apps de investimento intimidam iniciantes com jargão e gráficos densos. A Fundsy queria atrair quem nunca investiu, sem abrir mão de profundidade para o usuário avançado.",
    goals:["Desmistificar investimento para iniciantes","Apresentar dados complexos de forma legível","Manter profundidade para o usuário avançado"],
    process:[
      {k:"Pesquisa",t:"Modelos mentais",d:"Entrevistas revelaram que iniciantes pensam em metas, não em ativos. Reorganizamos o app em torno de objetivos."},
      {k:"Data Viz",t:"Gráficos legíveis",d:"Desenhamos uma biblioteca de visualizações com foco em clareza — cada gráfico responde a uma pergunta."},
      {k:"Onboarding",t:"Primeiro investimento",d:"Fluxo guiado que leva o usuário do cadastro ao primeiro aporte em menos de 3 minutos."},
      {k:"Sistema",t:"Modo claro/escuro",d:"Tokens adaptativos e componentes acessíveis (WCAG AA) em ambos os temas."}
    ],
    metrics:[["3 min","até o 1º aporte"],["+52%","ativação de novos"],["AA","acessibilidade"],["4,9","nota na loja"],],
    solution:"Um app organizado por metas, com gráficos que respondem perguntas reais e um onboarding que tira o medo do primeiro investimento. Profundidade fica a um toque de distância.",
    gallery:["Carteira por metas","Detalhe de ativo com gráficos","Onboarding do primeiro aporte"]
  },
  {
    slug:"atlas-health",
    title:"Atlas Health",
    subtitle:"Plataforma de telemedicina e agendamento",
    tags:["Product Design","Health","Web App"],
    year:"2024", accent:"var(--pink)", accentHex:"#ff7ab0", mock:"health",
    role:"UX · Service Design · UI",
    duration:"18 semanas",
    team:"3 designers · 7 devs",
    summary:"Conectamos pacientes e médicos em uma jornada de agendamento, consulta e acompanhamento sem fricção.",
    problem:"A Atlas operava telemedicina em ferramentas desconectadas — agendamento num lugar, vídeo em outro, prontuário em terceiro. Pacientes se perdiam e médicos perdiam tempo.",
    goals:["Unificar a jornada do paciente","Reduzir faltas e remarcações","Dar ao médico um prontuário contextual"],
    process:[
      {k:"Service Design",t:"Mapa de jornada",d:"Blueprint completo do serviço expôs 7 pontos de quebra entre canais. Redesenhamos a jornada ponta a ponta."},
      {k:"Fluxos",t:"Agendar & consultar",d:"Agendamento em 4 passos com confirmação inteligente e lembretes que reduziram faltas."},
      {k:"Clínico",t:"Prontuário contextual",d:"Interface do médico que reúne histórico, exames e notas no mesmo lugar da chamada de vídeo."},
      {k:"Confiança",t:"Acessível & seguro",d:"Padrões de privacidade, linguagem clara e estados de erro humanos em momentos sensíveis."}
    ],
    metrics:[["-41%","faltas em consulta"],["7→1","canais unificados"],["+33%","retorno de pacientes"],["AA","acessibilidade"]],
    solution:"Uma plataforma única: o paciente agenda, entra na consulta por vídeo e recebe receita no mesmo fluxo. O médico vê tudo em contexto. Lembretes inteligentes cortaram faltas pela metade.",
    gallery:["Agendamento em 4 passos","Sala de consulta com prontuário","Acompanhamento pós-consulta"]
  },
  {
    slug:"norte-studio",
    title:"Norte Studio",
    subtitle:"Portfólio criativo com motion e CMS",
    tags:["Web Design","Motion","Branding"],
    year:"2024", accent:"var(--green)", accentHex:"#3fbf6a", mock:"portfolio",
    role:"Art Direction · Web · Motion",
    duration:"8 semanas",
    team:"1 designer · 2 devs",
    summary:"Um portfólio com personalidade forte e transições cinematográficas que viraram a vitrine do estúdio.",
    problem:"O Norte Studio fazia trabalho premiado mas tinha um site genérico que não refletia a ousadia do estúdio. Precisavam de uma vitrine à altura do portfólio.",
    goals:["Traduzir a ousadia do estúdio no site","Mostrar projetos com impacto cinematográfico","Manter atualização simples via CMS"],
    process:[
      {k:"Direção",t:"Linguagem visual",d:"Definimos uma direção de arte ousada — tipografia gigante, grid quebrado e motion como assinatura."},
      {k:"Motion",t:"Transições",d:"Transições de página contínuas e reveals on-scroll que dão ritmo cinematográfico à navegação."},
      {k:"Cases",t:"Páginas de projeto",d:"Templates flexíveis que combinam vídeo full-bleed, antes/depois e prova de resultado."},
      {k:"CMS",t:"Vitrine viva",d:"O estúdio publica novos cases sem código, mantendo o padrão visual."}
    ],
    metrics:[["+3x","tempo na página"],["+64%","contatos de lead"],["8 sem","do briefing ao ar"],["100","Lighthouse perf."]],
    solution:"Um site-manifesto: tipografia em escala, motion contínuo e páginas de case que parecem trailers. O CMS mantém tudo vivo sem quebrar a direção de arte.",
    gallery:["Home com tipografia em escala","Case com vídeo full-bleed","Grade de projetos do estúdio"]
  }
];
