export const TesteFailWhenUndefined = {
  name: 'Teste 6: failWhenUndefined',
  introduction: `Neste teste, você deve criar um formulário que demonstra o comportamento da propriedade "failWhenUndefined" em condições.

TAREFA: Configure o formulário para que:
1. O campo "Endereço de Entrega" apareça apenas quando "Tipo de Entrega" for "Endereço"
2. Use "failWhenUndefined: false" para que a condição não falhe quando o campo "Tipo de Entrega" ainda não foi selecionado
3. O campo "Ponto de Retirada" apareça apenas quando "Tipo de Entrega" for "Retirada"

DICA: A propriedade "failWhenUndefined" controla se uma condição falha quando o campo referenciado não existe ou é undefined.`,
  schema: {
    type: 'object',
    properties: {
      nome: {
        type: 'string',
        title: 'Nome do Cliente',
        minLength: 3,
      },
      tipoEntrega: {
        type: 'string',
        title: 'Tipo de Entrega',
        enum: ['Endereço', 'Retirada'],
        default: '',
      },
      enderecoEntrega: {
        type: 'object',
        title: 'Endereço de Entrega',
        properties: {
          rua: {
            type: 'string',
            title: 'Rua',
            minLength: 3,
          },
          numero: {
            type: 'string',
            title: 'Número',
            minLength: 1,
          },
          bairro: {
            type: 'string',
            title: 'Bairro',
            minLength: 3,
          },
          cidade: {
            type: 'string',
            title: 'Cidade',
            minLength: 3,
          },
        },
        required: ['rua', 'numero', 'bairro', 'cidade'],
      },
      pontoRetirada: {
        type: 'string',
        title: 'Ponto de Retirada',
        enum: ['Loja Centro', 'Loja Norte', 'Loja Sul', 'Loja Leste'],
      },
    },
    required: ['nome', 'tipoEntrega'],
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/nome',
        label: 'Nome do Cliente',
      },
      {
        type: 'Control',
        scope: '#/properties/tipoEntrega',
        label: 'Tipo de Entrega',
      },
      {
        type: 'Group',
        label: 'Endereço de Entrega',
        elements: [
          {
            type: 'Control',
            scope: '#/properties/enderecoEntrega/properties/rua',
            label: 'Rua',
          },
          {
            type: 'Control',
            scope: '#/properties/enderecoEntrega/properties/numero',
            label: 'Número',
          },
          {
            type: 'Control',
            scope: '#/properties/enderecoEntrega/properties/bairro',
            label: 'Bairro',
          },
          {
            type: 'Control',
            scope: '#/properties/enderecoEntrega/properties/cidade',
            label: 'Cidade',
          },
        ],
        rule: {
          effect: 'SHOW',
          condition: {
            scope: '#/properties/tipoEntrega',
            schema: { const: 'Endereço' },
            failWhenUndefined: false, // TODO: Adicionar esta propriedade
          },
        },
      },
      {
        type: 'Control',
        scope: '#/properties/pontoRetirada',
        label: 'Ponto de Retirada',
        rule: {
          effect: 'SHOW',
          condition: {
            scope: '#/properties/tipoEntrega',
            schema: { const: 'Retirada' },
            failWhenUndefined: false, // TODO: Adicionar esta propriedade
          },
        },
      },
    ],
  },
  data: {
    nome: '',
    tipoEntrega: '',
    enderecoEntrega: {
      rua: '',
      numero: '',
      bairro: '',
      cidade: '',
    },
    pontoRetirada: '',
  },
};

export default TesteFailWhenUndefined;
