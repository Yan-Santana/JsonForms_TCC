export const TesteMultiplasCondicoes = {
  name: 'Teste 2: Múltiplas Condições',
  introduction: `Neste teste, você deve criar um formulário onde um campo aparece baseado em múltiplas condições.

TAREFA: Configure o campo "Detalhes do Evento" para aparecer apenas quando:
1. O usuário selecionar "Sim" em "Deseja participar de eventos?"
2. E selecionar "Presencial" em "Tipo de Evento"

DICA: Use a propriedade "rule" com uma condição que verifica múltiplos campos usando "allOf" ou "anyOf".`,
  schema: {
    type: 'object',
    properties: {
      nome: {
        type: 'string',
        title: 'Nome Completo',
        minLength: 3,
      },
      participarEventos: {
        type: 'string',
        title: 'Deseja participar de eventos?',
        enum: ['Sim', 'Não'],
        default: 'Não',
      },
      tipoEvento: {
        type: 'string',
        title: 'Tipo de Evento',
        enum: ['Presencial', 'Online', 'Híbrido'],
        default: 'Online',
      },
      detalhesEvento: {
        type: 'string',
        title: 'Detalhes do Evento',
        description: 'Informações sobre local, horário e programação',
        minLength: 10,
      },
      endereco: {
        type: 'string',
        title: 'Endereço para Eventos Presenciais',
        minLength: 10,
      },
    },
    required: ['nome', 'participarEventos', 'tipoEvento'],
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/nome',
        label: 'Nome Completo',
      },
      {
        type: 'Control',
        scope: '#/properties/participarEventos',
        label: 'Deseja participar de eventos?',
      },
      {
        type: 'Control',
        scope: '#/properties/tipoEvento',
        label: 'Tipo de Evento',
      },
      {
        type: 'Control',
        scope: '#/properties/detalhesEvento',
        label: 'Detalhes do Evento',
        // TODO: Adicionar regra para mostrar apenas quando participarEventos = "Sim" E tipoEvento = "Presencial"
      },
      {
        type: 'Control',
        scope: '#/properties/endereco',
        label: 'Endereço para Eventos Presenciais',
        // TODO: Adicionar regra para mostrar apenas quando tipoEvento = "Presencial"
      },
    ],
  },
  data: {
    nome: '',
    participarEventos: 'Não',
    tipoEvento: 'Online',
    detalhesEvento: '',
    endereco: '',
  },
};

export default TesteMultiplasCondicoes;
