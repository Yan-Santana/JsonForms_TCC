export const SimpleExample = {
  name: 'Exemplo Simples',
  schema: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: 'Nome',
        minLength: 3,
      },
      age: {
        type: 'number',
        title: 'Idade',
        minimum: 0,
        maximum: 120,
      },
    },
    required: ['name'],
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/name',
        label: 'Nome Completo',
      },
      {
        type: 'Control',
        scope: '#/properties/age',
        label: 'Idade',
      },
    ],
  },
  data: { name: '', age: 0 },
};

export default SimpleExample;
