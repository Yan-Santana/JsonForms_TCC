export const schema = {
  properties: {
    enableBidirectionalSync: { type: 'boolean' },
    recordsToSync: {
      type: 'array',
      items: {
        type: 'string',
        enum: ['Conta', 'Contato', 'Oportunidade'],
      },
    },
    country: {
      type: 'string',
      enum: ['Estados Unidos', 'Canadá', 'Índia', 'Austrália'],
    },
    nomeCompleto: {
      type: 'string',
      title: 'Nome Completo',
    },
    email: {
      type: 'string',
      format: 'email',
      title: 'E-mail',
    },
    idade: {
      type: 'integer',
      minimum: 0,
      title: 'Idade',
    },
    receber: {
      type: 'boolean',
      title: 'Receber?',
    },
    interesses: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'string',
        enum: ['Tecnologia', 'Jogos', 'Música', 'Esportes', 'Livros'],
      },
      title: 'Interesses',
    },
    convertToUSD: { type: 'boolean' },
  },
  required: ['country', 'nomeCompleto'],
};

export const uiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      label: 'Sincronização Bidirecional de Dados',

      elements: [
        {
          type: 'Control',
          scope: '#/properties/nomeCompleto',
        },
        {
          type: 'Control',
          scope: '#/properties/email',
        },
        {
          type: 'Control',
          scope: '#/properties/idade',
        },
        {
          type: 'Control',
          scope: '#/properties/receber',
        },
        {
          type: 'Control',
          scope: '#/properties/interesses',
        },
        {
          type: 'Control',
          scope: '#/properties/enableBidirectionalSync',
          label: 'Sincronizar dados?',
        },
        {
          type: 'Control',
          scope: '#/properties/recordsToSync',
          label: 'Tipos de registros para sincronizar',
          rule: {
            effect: 'HIDE',
            condition: {
              scope: '#/properties/enableBidirectionalSync',
              schema: { const: false },
            },
          },
        },
      ],
    },
    {
      type: 'Group',
      label: 'Configuração de Moeda',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/country',
          label: 'País',
        },
        {
          type: 'Control',
          scope: '#/properties/convertToUSD',
          label: 'Converter para USD',
          options: { toggle: true },
          rule: {
            effect: 'SHOW',
            condition: {
              scope: '#/properties/country',
              schema: { not: { const: 'Estados Unidos' } },
            },
          },
        },
      ],
    },
  ],
};

export const initialData = {
  enableBidirectionalSync: false,
  convertToUSD: true,
};
