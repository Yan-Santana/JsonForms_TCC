export const FieldMapperExample = {
  name: 'Exemplo de Mapeamento de Campos',
  schema: {
    type: 'array',
    items: {
      type: 'object',
      properties: {
        source: {
          type: 'array',
          items: {
            type: 'string',
            oneOf: [
              { title: 'My_First_Name__c', const: 'My_First_Name__c' },
              { title: 'My_Last_Name__c', const: 'My_Last_Name__c' },
              { title: 'My_Email__c', const: 'My_Email__c' },
              { title: 'My_Phone__c', const: 'My_Phone__c' },
            ],
          },
        },
        concatenationCharacter: {
          type: 'string',
          description: 'Se você selecionar múltiplos campos fonte, concatene-os com este caractere',
        },
        destination: {
          type: 'string',
          oneOf: [
            { title: 'Nome Completo', const: 'fullname' },
            { title: 'Endereço de Email', const: 'email' },
            { title: 'Número de Telefone', const: 'phn' },
          ],
        },
      },
      required: ['source', 'destination'],
    },
  },
  uischema: {
    type: 'Control',
    label: 'Mapeador de Campos Salesforce Lead <> Acme Sale',
    scope: '#',
    options: {
      elementLabelProp: 'destination',
      detail: {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'Group',
            label: 'Campo(s) Fonte',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/source',
                label: 'Campos Fonte',
              },
              {
                type: 'Control',
                scope: '#/properties/concatenationCharacter',
                options: {
                  showUnfocusedDescription: true,
                },
              },
            ],
          },
          {
            type: 'Group',
            label: 'Campo Destino',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/destination',
                options: {
                  autocomplete: true,
                },
              },
            ],
          },
        ],
      },
    },
  },
  data: [
    {
      source: ['My_First_Name__c', 'My_Last_Name__c'],
      concatenationCharacter: ' ',
      destination: 'fullname',
    },
    {
      source: ['My_Email__c'],
      destination: 'email',
    },
  ],
};

export default FieldMapperExample;
