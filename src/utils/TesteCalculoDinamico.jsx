export const TesteCalculoDinamico = {
  name: 'Teste 4: Cálculo Dinâmico',
  introduction: `Neste teste, você deve criar um formulário onde um campo calcula automaticamente baseado em outros campos.

TAREFA: Configure o campo "Total" para calcular automaticamente a soma de "Quantidade" × "Preço Unitário". O campo "Total" deve aparecer apenas quando ambos os campos tiverem valores válidos.

DICA: Use a propriedade "rule" com "effect: SHOW" e uma condição que verifica se ambos os campos têm valores maiores que zero.`,
  schema: {
    type: 'object',
    properties: {
      produto: {
        type: 'string',
        title: 'Nome do Produto',
        minLength: 3,
      },
      quantidade: {
        type: 'number',
        title: 'Quantidade',
        minimum: 1,
        maximum: 100,
      },
      precoUnitario: {
        type: 'number',
        title: 'Preço Unitário (R$)',
        minimum: 0.01,
        maximum: 10000,
      },
      total: {
        type: 'number',
        title: 'Total (R$)',
        readOnly: true,
      },
      desconto: {
        type: 'number',
        title: 'Desconto (%)',
        minimum: 0,
        maximum: 100,
        default: 0,
      },
    },
    required: ['produto', 'quantidade', 'precoUnitario'],
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/produto',
        label: 'Nome do Produto',
      },
      {
        type: 'Control',
        scope: '#/properties/quantidade',
        label: 'Quantidade',
      },
      {
        type: 'Control',
        scope: '#/properties/precoUnitario',
        label: 'Preço Unitário (R$)',
      },
      {
        type: 'Control',
        scope: '#/properties/total',
        label: 'Total (R$)',
        // TODO: Adicionar regra para mostrar apenas quando quantidade > 0 E precoUnitario > 0
      },
      {
        type: 'Control',
        scope: '#/properties/desconto',
        label: 'Desconto (%)',
        // TODO: Adicionar regra para mostrar apenas quando total > 0
      },
    ],
  },
  data: {
    produto: '',
    quantidade: 0,
    precoUnitario: 0,
    total: 0,
    desconto: 0,
  },
};

export default TesteCalculoDinamico;
