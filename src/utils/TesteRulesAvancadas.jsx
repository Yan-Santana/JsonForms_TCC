export const TesteRulesAvancadas = {
  name: 'Teste 7: Regras Avançadas',
  introduction: `Neste teste, você deve criar um formulário com regras avançadas que combinam múltiplas condições e efeitos.

TAREFA: Configure o formulário para que:
1. O campo "Desconto Especial" apareça apenas para "Clientes VIP" com "Tipo de Produto" = "Premium"
2. O campo "Prazo de Entrega" seja editável apenas quando "Tipo de Entrega" for "Expresso"
3. O campo "Observações" seja obrigatório apenas quando "Valor Total" for maior que R$ 1000
4. Use "failWhenUndefined: true" para o campo "Desconto Especial" (deve falhar se os campos não existirem)

DICA: Combine diferentes tipos de condições e use "allOf" para múltiplas condições simultâneas.`,
  schema: {
    type: 'object',
    properties: {
      nomeCliente: {
        type: 'string',
        title: 'Nome do Cliente',
        minLength: 3,
      },
      tipoCliente: {
        type: 'string',
        title: 'Tipo de Cliente',
        enum: ['Comum', 'VIP', 'Premium'],
        default: 'Comum',
      },
      tipoProduto: {
        type: 'string',
        title: 'Tipo de Produto',
        enum: ['Básico', 'Standard', 'Premium'],
        default: 'Básico',
      },
      valorTotal: {
        type: 'number',
        title: 'Valor Total (R$)',
        minimum: 0,
        maximum: 100000,
      },
      tipoEntrega: {
        type: 'string',
        title: 'Tipo de Entrega',
        enum: ['Normal', 'Expresso', 'Super Expresso'],
        default: 'Normal',
      },
      descontoEspecial: {
        type: 'number',
        title: 'Desconto Especial (%)',
        minimum: 0,
        maximum: 50,
        default: 0,
      },
      prazoEntrega: {
        type: 'integer',
        title: 'Prazo de Entrega (dias)',
        minimum: 1,
        maximum: 30,
        default: 5,
      },
      observacoes: {
        type: 'string',
        title: 'Observações',
        minLength: 10,
        maxLength: 500,
      },
    },
    required: ['nomeCliente', 'tipoCliente', 'tipoProduto', 'valorTotal', 'tipoEntrega'],
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/nomeCliente',
        label: 'Nome do Cliente',
      },
      {
        type: 'Control',
        scope: '#/properties/tipoCliente',
        label: 'Tipo de Cliente',
      },
      {
        type: 'Control',
        scope: '#/properties/tipoProduto',
        label: 'Tipo de Produto',
      },
      {
        type: 'Control',
        scope: '#/properties/valorTotal',
        label: 'Valor Total (R$)',
      },
      {
        type: 'Control',
        scope: '#/properties/tipoEntrega',
        label: 'Tipo de Entrega',
      },
      {
        type: 'Control',
        scope: '#/properties/descontoEspecial',
        label: 'Desconto Especial (%)',
        // TODO: Adicionar regra para mostrar apenas quando tipoCliente = "VIP" E tipoProduto = "Premium"
      },
      {
        type: 'Control',
        scope: '#/properties/prazoEntrega',
        label: 'Prazo de Entrega (dias)',
        // TODO: Adicionar regra para tornar editável apenas quando tipoEntrega = "Expresso"
      },
      {
        type: 'Control',
        scope: '#/properties/observacoes',
        label: 'Observações (obrigatório para valores > R$ 1000)',
        // TODO: Adicionar regra para tornar obrigatório quando valorTotal > 1000
      },
    ],
  },
  data: {
    nomeCliente: '',
    tipoCliente: 'Comum',
    tipoProduto: 'Básico',
    valorTotal: 0,
    tipoEntrega: 'Normal',
    descontoEspecial: 0,
    prazoEntrega: 5,
    observacoes: '',
  },
};

export default TesteRulesAvancadas;
