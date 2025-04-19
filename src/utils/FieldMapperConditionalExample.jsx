export const SimpleConditionalExample = {
  name: 'Exemplo if/then/else',
  schema: {
    type: 'object',
    properties: {
      foo: {
        type: 'number',
        title: 'Valor',
        description: 'Se maior que 10, Bar é obrigatório. Se menor que 10, Baz é obrigatório.',
      },
      bar: {
        type: 'string',
        title: 'Bar',
        description: 'Obrigatório quando Valor > 10',
      },
      baz: {
        type: 'string',
        title: 'Baz',
        description: 'Obrigatório quando Valor < 10',
      },
    },
    if: {
      properties: {
        foo: { minimum: 10 },
      },
      required: ['foo'],
    },
    then: {
      required: ['bar'],
    },
    else: {
      required: ['baz'],
    },
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/foo',
        label: 'Valor',
      },
      {
        type: 'Control',
        scope: '#/properties/bar',
        label: 'Bar (obrigatório se Valor > 10)',
      },
      {
        type: 'Control',
        scope: '#/properties/baz',
        label: 'Baz (obrigatório se Valor < 10)',
      },
    ],
  },
  data: {
    foo: 5,
    baz: 'Sou obrigatório porque foo < 10',
  },
};

export default SimpleConditionalExample;
