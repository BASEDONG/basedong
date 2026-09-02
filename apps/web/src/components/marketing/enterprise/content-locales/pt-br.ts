import type { EnterpriseStrings } from "../content-types";

export const ptBR: EnterpriseStrings = {
  introCards: [
    {
      title: "Operação unificada de compute, modelos e apps",
      description:
        "Observe, otimize e recupere compute, modelos e aplicações em um único plano — mantendo operações estáveis e sustentáveis a longo prazo.",
    },
    {
      title: "Console visual mais APIs padrão",
      description:
        "Um console visual junto com APIs padrão reduz a barreira técnica e conecta rapidamente a diversos cenários de negócio.",
    },
    {
      title: "Modelos principais prontos para uso, profundamente ajustáveis",
      description:
        "Soluções maduras para os principais modelos open source, otimizadas continuamente em treinamento e inferência — encurtando o caminho da seleção à produção.",
    },
    {
      title: "Pool multi-arquitetura e agendamento inteligente",
      description:
        "Acesso unificado e agendamento inteligente em GPU, NPU e compute multi-fornecedor — sem dependência de um único fabricante de chips — para desempenho e operação consistentes sobre investimentos existentes.",
    },
  ],
  archLayers: [
    {
      kind: "apps",
      title: "Aplicações setoriais",
      modules: [
        "Internet",
        "Educação",
        "Finanças",
        "Telecomunicações",
        "Governo",
        "智算",
        "Energia",
      ],
    },
    {
      kind: "divider",
      title: "API / Aplicações",
    },
    {
      kind: "section",
      title: "Desenvolvimento de aplicações de modelos",
      modules: [
        "Cadeia de ferramentas de desenvolvimento",
        "Debug e release de apps",
        "Engenharia de prompts",
        "Agent",
        "RAG",
        "Frameworks de aplicações",
        "Bancos de dados vetoriais",
      ],
    },
    {
      kind: "section",
      title: "Implantação e inferência de modelos",
      modules: [
        "Gestão de modelos",
        "Monitoramento",
        "Configuração de recursos",
        "Geração de vídeo",
        "Otimização end-to-end",
        "Aceleração de inferência",
        "Implantação de modelos",
      ],
    },
    {
      kind: "section",
      title: "Treinamento e ajuste de modelos",
      modules: [
        "Gestão de jobs",
        "Ajuste de desempenho",
        "Alinhamento de modelos",
        "Fine-tuning",
        "Treinamento de modelos",
        "Processamento de dados",
        "Ingestão de dados",
      ],
    },
    {
      kind: "vendors",
      title: "Modelos",
      vendors: [
        "DeepSeek",
        "Qwen",
        "Llama",
        "GLM",
        "Mistral",
        "InternLM",
        "Gemma",
        "Kimi",
      ],
    },
    {
      kind: "section",
      title: "Gestão de recursos de compute",
      modules: [
        "Administração de usuários e sistemas",
        "Agendamento de jobs",
        "Agendamento de workflows",
        "Gestão containerizada de compute",
        "Pool de compute",
        "Cotas de compute",
        "Adaptação de recursos heterogêneos",
      ],
    },
    {
      kind: "vendors",
      title: "Chips",
      vendors: [
        "NVIDIA",
        "Ascend",
        "AMD",
        "Cambricon",
        "Intel",
        "Hygon",
        "Moore Threads",
        "MetaX",
        "Enflame",
        "Kunlun",
      ],
    },
  ],
  advantageCards: [
    {
      title: "Seguro · Proteção end-to-end, conformidade auditável",
      description:
        "Segurança de dados e conformidade end-to-end — risco de vazamento drasticamente menor. Bloqueio de ameaças em tempo real com 99 %+ de precisão em segurança de conteúdo.",
    },
    {
      title: "Controle de custos · Gasto inteligente, ROI ampliado",
      description:
        "Agendamento fino de compute e memória reduz o custo unitário. Quantização dinâmica sem perda reduz o consumo de compute por inferência.",
    },
    {
      title: "Fácil de usar · Curva de aprendizado baixa para todos",
      description:
        "Visão unificada de compute heterogêneo com implantação e agendamento automatizados. Configuração visual em menos de 3 minutos. 30+ templates — início sem ajuste manual.",
    },
    {
      title: "Escolha certa · Seleção científica, qualidade e segurança",
      description:
        "Catálogo de modelos com tags para pré-seleção rápida. 20+ métricas de benchmark integradas para apoiar decisões.",
    },
    {
      title: "Estável em escala · Desempenho de produção para cargas críticas",
      description:
        "Otimização profunda de inferência: até 70 % menos latência, 3–5× mais throughput. Balanceamento inteligente entre compute e serviços de modelos. Elasticidade em segundos equilibrando desempenho e custo.",
    },
    {
      title: "Implantação rápida · Entrega mais curta, resposta ágil ao negócio",
      description:
        "100+ modelos principais pré-integrados e prontos. Imagens de modelos atualizadas continuamente com prioridade para novas versões. Cadeia de ferramentas em treinamento, inferência, fine-tuning e implantação.",
    },
  ],
  scenarios: [
    {
      tab: "Setor de energia",
      title: "Setor de energia",
      description:
        "Baseado na colaboração de modelos grandes e pequenos, oferece serviços de IA do treinamento e fine-tuning à implantação de aplicações — impulsionando digitalização e eficiência operacional no setor de energia.",
      advantages: [
        "Diagnóstico inteligente de falhas de equipamentos: fusionar logs e condições operacionais para encurtar ciclos de detecção e resolução",
        "Análise de anomalias e carga elétrica: identificar padrões anômalos para apoiar despacho e decisões de economia de energia",
        "Assistentes de conhecimento de compras e operações: conhecimento setorial na intranet — dados de produção nunca saem do domínio",
      ],
    },
    {
      tab: "Plataforma aberta de centro 智算",
      title: "Plataforma aberta de centro 智算",
      description:
        "A fusão de compute heterogêneo permite agendamento unificado cross-arquitetura e fornecimento elástico — resolvendo governança em larga escala, integração de modelos open source e estabilidade de serviços de IA de alta concorrência.",
      advantages: [
        "Cotas multi-tenant mais agendamento cross-datacenter — fornecimento elástico de compute por projeto",
        "Acesso tipo marketplace com gray release multi-versão — tenants escolhem modelos e encurtam entrega",
        "Rate limiting, circuit breaking e escalonamento horizontal — APIs externas de alta concorrência com disponibilidade comprometida",
      ],
    },
    {
      tab: "Transporte",
      title: "Transporte",
      description:
        "Combina modelos CV em edge para processamento em tempo real com compreensão semântica multimodal na nuvem — gestão inteligente de tráfego com avaliação semântica de acidentes, infrações e eventos complexos.",
      advantages: [
        "Recomendações estruturadas de ação em acidentes e infrações — avaliação e despacho mais rápidos em campo",
        "Colaboração edge-nuvem reduz falsos positivos e omissões — tempos de resposta estáveis mesmo em horários de pico",
        "Implantação local em rede privada atende conformidade de tráfego — integração contínua de novos fine-tunes multimodais",
      ],
    },
    {
      tab: "Plataforma empresarial de compute heterogêneo",
      title: "Plataforma empresarial de compute heterogêneo",
      description:
        "Apoia transformação digital e inteligente com a cadeia completa da governança de compute ao treinamento e inferência — agendamento de alto desempenho e arquitetura modular para colaboração fluida.",
      advantages: [
        "Acesso e pooling unificado GPU/NPU multi-marca — utilização, filas e cotas cross-datacenter em uma visão",
        "Pools compartilhados e agendamento para treinamento e inferência — balanceamento pico/vale, menos capacidade ociosa",
        "Integração OpenAPI padrão com DevOps e sistemas de negócio — novos modelos sem reconstruir do zero",
      ],
    },
    {
      tab: "Operadoras de telecomunicações",
      title: "Operadoras de telecomunicações",
      description:
        "Motor de inferência de alto desempenho para cenários de alta concorrência e baixa latência — mudanças mínimas em sistemas existentes, valor do compute heterogêneo e aceleração comercial de capacidades de IA.",
      advantages: [
        "SLAs operacionais e capacidade elástica para chamadas de alta concorrência e baixa latência orientadas ao cliente",
        "Mudanças mínimas em API/gateway para integrar BSS/OSS ao vivo e modelos próprios",
        "Ativar inventário de aceleradores multi-fornecedor — encurtar tempo comercial de serviços de IA",
      ],
    },
    {
      tab: "Manufatura",
      title: "Manufatura",
      description:
        "Modelos grandes analisam dados complexos de testes e produção, identificando automaticamente padrões-chave e anomalias — análise mais rápida, melhores decisões e alívio de revisão manual lenta e propensa a erros.",
      advantages: [
        "Análise automatizada de dados de testes e QC — anomalias críticas em minutos, menos omissões e retrabalho",
        "Resultados gravados de volta em nós MES/QC/agendamento — menos monitoramento manual, loops fechados mais rápidos",
        "Atualizações hot de modelos sem downtime — implantação de novas capacidades com linhas de produção ativas",
      ],
    },
  ],
  scenarioDiagramSpecs: {
    enterprise: {
      layout: "enterpriseFlow",
      title: "Plataforma empresarial de compute heterogêneo",
      training: {
        title: "Treinamento de modelos grandes",
        steps: ["Pré-processamento de dados", "Desenvolvimento e treinamento", "Otimização de treinamento"],
      },
      inference: {
        title: "Inferência de modelos grandes",
        steps: ["Seleção de modelos", "Avaliação de modelos", "Implantação rápida"],
      },
      apps: {
        title: "Cenários de aplicações inteligentes empresariais",
        items: [
          "Redação inteligente de propostas",
          "Desenvolvimento e treinamento",
          "Q&A inteligente de dados",
          "Suporte à decisão inteligente",
          "Compras inteligentes",
          "Cotação inteligente",
        ],
      },
      apiUp: "Chamadas API de modelos",
      apiDown: "Interfaces padronizadas",
      platform: "Governança de compute heterogêneo",
      supportLeft: "Escalonamento elástico",
      supportRight: "Chamadas de alta concorrência",
    },
    aicenter: {
      layout: "aiCenterStack",
      title: "Plataforma aberta de centro 智算",
      leftAudience: "Para usuários empresariais",
      rightAudience: "Para usuários desenvolvedores",
      axisLeft: "Impulsionar aplicações de IA",
      axisRight: "OpenAPI",
      capabilityChips: [
        "Invocação de modelos",
        "Instâncias dedicadas",
        "Fine-tuning de modelos",
        "Hospedagem de modelos",
        "Integração multi-modelo",
        "Teste gratuito",
        "Chamadas de baixo custo",
        "Integração rápida",
      ],
      modelServiceTitle: "Serviços de modelos — amplo fornecimento de modelos grandes",
      models: [
        "Modelos de texto",
        "Modelos de voz",
        "Modelos de imagem",
        "Modelos de vídeo",
        "Modelos de código",
        "Modelos de dados",
        "Modelos OCR",
        "Embedding",
      ],
      sidePanels: ["Centro de experiência", "Cobrança por tokens"],
      integrateBar: "Mais capacidades comerciais e open source integradas",
      poolTitle: "Pool de recursos de compute heterogêneo",
      vendors: [
        "NVIDIA",
        "AMD",
        "Ascend",
        "MetaX",
        "Enflame",
        "Hygon",
        "Iluvatar CoreX",
        "Cambricon",
        "Kunlun",
      ],
    },
    energy: {
      layout: "industryFunnel",
      title: "Setor de energia",
      topMode: "apps",
      topItems: [
        "Suporte inteligente pós-venda de usinas solares",
        "Diagnóstico inteligente de falhas em equipamentos elétricos",
        "Cotação inteligente de projetos eólicos",
        "Compras inteligentes de matérias-primas solares",
        "Geração inteligente de atas de reuniões",
        "Análise inteligente de anomalias elétricas comerciais e industriais",
      ],
      hub: "Plataforma MaaS",
      arc: [
        "Desenvolvimento de aplicações Agent",
        "Gestão do conhecimento",
        "Serviços de inferência e MaaS",
        "Treinamento / fine-tuning de modelos",
      ],
      left: "Governança heterogênea",
      right: "Aceleração de inferência",
      platform: "GPUs multi-tipo",
    },
    manufacturing: {
      layout: "industryFunnel",
      title: "Manufatura",
      topMode: "service",
      topTitle: "Model-as-a-Service privado",
      topItems: [
        "Análise de fluxos de dados de testes complexos",
        "Reconhecimento de informações-chave e padrões anômalos",
        "Melhoria de eficiência analítica e qualidade de decisões",
      ],
      hub: "Colaboração de modelos grandes e pequenos",
      left: "Modelos grandes",
      right: "Modelos de machine learning",
      engine: "Motor de aceleração de inferência",
      platform: "GPUs multi-tipo",
    },
    transport: {
      layout: "transportFlow",
      title: "Transporte",
      trainingTitle: "Plataforma de treinamento de modelos grandes",
      trainingSteps: ["Dados de tráfego", "Treinamento de modelos", "Avaliação de modelos", "Implantação de modelos"],
      edgeTitle: "Dispositivos de edge computing",
      edgeChip: "Modelos grandes em dispositivo",
      centerTitle: "Plataforma central de inferência",
      businessTitle: "Plataforma de aplicações de negócio",
      flowEdgeToCenter: "Dados de reconhecimento de modelos pequenos",
      flowModelDown: "Distribuição de modelos",
      flowDataUp: "Retorno de dados",
      flowToBusiness: "Reconhecimento secundário de modelos grandes",
      flowFromBusiness: "Dados de revisão de negócio",
    },
    carrier: {
      layout: "industryFunnel",
      title: "Operadoras de telecomunicações",
      topMode: "service",
      topTitle: "Model-as-a-Service privado",
      topItems: ["Baixa latência", "Alto throughput", "Contexto longo"],
      hub: "Modelos",
      left: "Modelos grandes próprios",
      right: "Modelos grandes open source",
      engine: "Motor de aceleração de inferência",
      platform: "GPUs multi-tipo",
    },
  },
  testimonials: [
    {
      title: "Uma grande empresa de energia",
      body: "Implantamos com sucesso um modelo grande específico do setor na plataforma. A forte gestão de compute heterogêneo e a colaboração de modelos grandes e pequenos trouxeram ganhos de eficiência mensuráveis em diagnóstico inteligente de falhas, assistência em compras e análise de anomalias elétricas. A implantação privada mantém dados do negócio central seguros e conformes, e a estabilidade de longo prazo da plataforma fornece uma base de IA confiável para transformação digital.",
      role: "Responsável por transformação digital",
    },
    {
      title: "Uma empresa de TI de transporte",
      body: "Ao construir um sistema de tráfego inteligente colaborativo cloud-edge, a plataforma de modelos grandes da basedong trouxe inteligência cognitiva confiável às nossas soluções. Sua capacidade de aprender dados de cenários verticais e suportar tarefas multimodais se alinha com terminologia setorial e contexto de negócio. Implantamos aplicações de suporte à decisão inteligente que melhoram eficiência e velocidade de resposta em avaliação de falhas e despacho.",
      role: "Responsável por soluções",
    },
    {
      title: "Um provedor de serviços de compute em nuvem",
      body: "Fizemos parceria com a basedong para construir uma plataforma de serviços de compute orientada a empresas. Seu framework de inferência agnóstico ao hardware e orquestração multi-fornecedor nos permitiu manter estabilidade do serviço enquanto nos liberávamos do lock-in de um único fornecedor GPU — agendando cargas flexivelmente em diversos aceleradores. Aceleração de inferência, roteamento dinâmico e otimização de memória melhoraram significativamente a utilização do cluster e reduziram custos de inferência.",
      role: "Responsável por engenharia de plataforma",
    },
    {
      title: "Uma empresa de software e integração de sistemas",
      body: "A plataforma empresarial de modelos grandes da basedong apoia fortemente nosso trabalho com clientes de diversos setores. Interfaces de desenvolvimento unificadas, fine-tuning flexível e cadeia de ferramentas completa encurtaram significativamente ciclos de entrega em finanças, governo, educação e outros setores. Alta eficiência de inferência e conveniente implantação privada reduzem barreiras de implementação para clientes.",
      role: "Responsável por serviços de integração",
    },
  ],
  faqItems: [
    {
      question: "Quanto tempo leva normalmente da implantação à produção? Qual suporte contínuo há?",
      answer:
        "Para aceleradores mainstream existentes e ambientes de compute misto, oferecemos planos de implantação padronizados validados — entrega típica em semanas. A basedong oferece suporte técnico de ciclo completo incluindo implantação, treinamento, garantia operacional e atualizações contínuas de versão.",
    },
    {
      question: "A plataforma suporta cenários verticais setoriais profundos?",
      answer:
        "Sim. Além de capacidades gerais de modelos grandes, a plataforma suporta combinar conhecimento setorial para construir modelos específicos de domínio. Em eletricidade, petróleo e gás, manufatura e outros setores, implantamos com sucesso diagnóstico de falhas, produção segura, assistência em P&D e otimização operacional.",
    },
    {
      question: "Pode suportar implantações em larga escala de pesquisa, construção e uso?",
      answer:
        "Sim. A plataforma MaaS privada da basedong é projetada para habilitação de IA empresarial em larga escala — com agendamento heterogêneo de 10.000 cartões, garantias de estabilidade de alta concorrência e gestão fina de recursos da P&D de modelos à inferência massiva em endpoints.",
    },
    {
      question: "Usuários de negócio podem implantar aplicações de IA de forma independente?",
      answer:
        "Sim. Fluxos visuais end-to-end — da seleção, implantação e teste de modelos ao lançamento de serviço — tudo via interfaces gráficas, reduzindo enormemente a barreira. Após breve treinamento, usuários de negócio podem invocar modelos e construir aplicações de forma autônoma.",
    },
    {
      question: "Como a segurança de dados é garantida em implantação privada?",
      answer:
        "A implantação privada garante que todos os dados e modelos rodam dentro do ambiente empresarial. Também oferecemos defesa em profundidade: isolamento multi-tenant, controle de acesso fino, auditoria de cadeia completa e detecção de segurança de conteúdo em tempo real — atendendo requisitos rigorosos em finanças, energia, governo e outras indústrias reguladas.",
    },
    {
      question: "Como equilibram desempenho e custo?",
      answer:
        "Nosso motor de inferência de alto desempenho (com separação PD, quantização KV Cache e mais) melhora significativamente throughput e reduz latência — menos compute por tarefa. Gateways de serviço inteligentes e elasticidade em segundos alocam recursos dinamicamente conforme carga ao vivo, evitando compute ocioso — melhor TCO mantendo cargas críticas estáveis.",
    },
    {
      question: "Como selecionar modelos eficientemente em múltiplos cenários de negócio?",
      answer:
        "Marketplace de modelos com tags — filtrar por tipo de tarefa, modalidade, contagem de parâmetros e mais. Mais importante: usar nossa cadeia de ferramentas de avaliação com dados de negócio para comparar candidatos em qualidade e desempenho, depois aplicar tuning com um clique para adaptação de baixo custo.",
    },
    {
      question: "Quais chips são suportados? O desempenho pode permanecer estável entre fornecedores?",
      answer:
        "Arquitetura agnóstica ao hardware suportando NVIDIA, AMD e outras GPUs mainstream mais diversos NPUs e aceleradores — sem lock-in a nenhum fornecedor de chips. Framework de inferência unificado e orquestração de compute rodam de forma estável em ambientes existentes ou multi-fornecedor, com adaptação e otimização para 100+ modelos mainstream.",
    },
    {
      question: "Quais dimensões-chave devem guiar a seleção de MaaS privado?",
      answer: `Avaliar em cinco dimensões:

① Agilidade técnica (biblioteca rica de modelos, incorporação rápida de novos modelos);
② Precisão de seleção (ferramentas de avaliação e otimização com dados próprios);
③ Desempenho de produção (latência de inferência, throughput, elasticidade de recursos);
④ Segurança e conformidade (isolamento multi-tenant, logs de auditoria, filtragem de conteúdo e outras proteções empresariais);
⑤ Facilidade de uso e operabilidade (interfaces visuais e agendamento unificado que reduzem a barreira).`,
    },
    {
      question: "Quando uma empresa deveria construir MaaS privado?",
      answer: `Considere MaaS privado quando sua organização enfrentar qualquer um dos seguintes:

① O negócio envolve dados sensíveis (produção energética, transações financeiras, dados de P&D) com requisitos rigorosos de manter dados na rede corporativa;
② A IA deve escalar para muitos endpoints ou cenários de negócio com requisitos extremamente altos de desempenho e estabilidade de inferência;
③ Compute heterogêneo de diferentes marcas e arquiteturas em regiões ou unidades de negócio precisa de governança unificada e utilização eficiente;
④ Você quer acompanhar avanços em IA mas carece de uma equipe de engenharia para adaptação e otimização contínua de modelos.`,
    },
  ],
};
