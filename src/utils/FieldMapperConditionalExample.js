export const SimpleConditionalExample = {
  name: 'Example if/then/else',
  schema: {
    type: 'object',
    properties: {
      foo: { type: 'number' },
      bar: { type: 'string' },
      baz: { type: 'string' },
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
      { type: 'Control', scope: '#/properties/foo' },
      { type: 'Control', scope: '#/properties/bar' },
      { type: 'Control', scope: '#/properties/baz' },
    ],
  },
  data: {
    foo: 5,
    baz: 'Sou obrigatório porque foo < 10',
  },
};

export default SimpleConditionalExample;
