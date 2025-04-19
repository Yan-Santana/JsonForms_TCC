export const FORM_EXAMPLES = [
  {
    name: 'Exemplo Básico',
    schema: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: {
          type: 'string',
          title: 'Nome',
          minLength: 3,
        },
        email: {
          type: 'string',
          title: 'Email',
          format: 'email',
        },
        age: {
          type: 'integer',
          title: 'Idade',
          minimum: 0,
          maximum: 120,
        },
      },
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
          scope: '#/properties/email',
          label: 'Endereço de Email',
        },
        {
          type: 'Control',
          scope: '#/properties/age',
          label: 'Idade',
        },
      ],
    },
  },
  {
    name: 'Formulário Avançado',
    schema: {
      type: 'object',
      required: ['fullName', 'profession', 'skills'],
      properties: {
        fullName: {
          type: 'string',
          title: 'Nome Completo',
          minLength: 5,
        },
        profession: {
          type: 'string',
          title: 'Profissão',
          enum: ['Desenvolvedor', 'Designer', 'Gerente de Projeto', 'Analista de Dados', 'Outro'],
        },
        skills: {
          type: 'array',
          title: 'Habilidades',
          items: {
            type: 'string',
          },
          minItems: 2,
        },
        experience: {
          type: 'integer',
          title: 'Anos de Experiência',
          minimum: 0,
          maximum: 50,
        },
        available: {
          type: 'boolean',
          title: 'Disponível para Projetos',
        },
      },
    },
    uischema: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/fullName',
          label: 'Nome Completo',
        },
        {
          type: 'Control',
          scope: '#/properties/profession',
          label: 'Profissão',
          options: {
            format: 'radio',
          },
        },
        {
          type: 'Control',
          scope: '#/properties/skills',
          label: 'Habilidades',
          options: {
            showSortButtons: true,
          },
        },
        {
          type: 'Control',
          scope: '#/properties/experience',
          label: 'Anos de Experiência',
        },
        {
          type: 'Control',
          scope: '#/properties/available',
          label: 'Disponível para Projetos',
        },
      ],
    },
  },
];
