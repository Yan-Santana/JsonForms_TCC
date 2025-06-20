export const TesteValidacaoCondicional = {
  name: 'Teste 2: Validação Condicional',
  introduction: `Neste teste, você deve criar um formulário onde a validação de um campo depende do valor de outro campo.

TAREFA: Configure o campo "CPF" para ser obrigatório apenas quando o usuário selecionar "Brasil" como país. Para outros países, o campo "Passaporte" deve ser obrigatório.

DICA: Use a propriedade "if/then/else" no schema para definir validações condicionais.`,
  schema: {
    type: 'object',
    properties: {
      nome: {
        type: 'string',
        title: 'Nome Completo',
        minLength: 3,
      },
      pais: {
        type: 'string',
        title: 'País',
        enum: ['Brasil', 'Estados Unidos', 'Canadá', 'Argentina'],
        default: 'Brasil',
      },
      cpf: {
        type: 'string',
        title: 'CPF',
        pattern: '^[0-9]{3}\\.[0-9]{3}\\.[0-9]{3}-[0-9]{2}$',
      },
      passaporte: {
        type: 'string',
        title: 'Número do Passaporte',
        minLength: 6,
      },
    },
    required: ['nome', 'pais'],
    // TODO: Adicionar validação condicional usando if/then/else
  },
  uischema: {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/nome',
        label: 'Nome Completo',
      },
      {
        type: 'Control',
        scope: '#/properties/pais',
        label: 'País',
      },
      {
        type: 'Control',
        scope: '#/properties/cpf',
        label: 'CPF (obrigatório para brasileiros)',
      },
      {
        type: 'Control',
        scope: '#/properties/passaporte',
        label: 'Passaporte (obrigatório para estrangeiros)',
      },
    ],
  },
  data: {
    nome: '',
    pais: 'Brasil',
    cpf: '',
    passaporte: '',
  },
};

export default TesteValidacaoCondicional;
