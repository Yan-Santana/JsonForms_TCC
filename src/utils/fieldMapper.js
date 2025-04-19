// FieldMapperExample.js

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
          description: 'If you select multiple source fields, concatenate them with this character',
        },
        destination: {
          type: 'string',
          oneOf: [
            { title: 'Full Name', const: 'fullname' },
            { title: 'Email Address', const: 'email' },
            { title: 'Phone Number', const: 'phn' },
          ],
        },
      },
      required: ['source', 'destination'],
    },
  },
  uischema: {
    type: 'Control',
    label: 'Salesforce Lead <> Acme Sale Field Mapper',
    scope: '#',
    options: {
      elementLabelProp: 'destination',
      detail: {
        type: 'VerticalLayout',
        elements: [
          {
            type: 'Group',
            label: 'Source Field(s)',
            elements: [
              {
                type: 'Control',
                scope: '#/properties/source',
                label: 'Source Fields',
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
            label: 'Destination Field',
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
