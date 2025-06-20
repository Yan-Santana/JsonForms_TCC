export const TesteValidacaoComplexa = {
  name: 'Teste 5: Validação Complexa',
  introduction: `Neste teste, você deve criar um formulário com validações complexas que dependem de múltiplos campos.

TAREFA: Configure o formulário para que:
1. Se o usuário for "Menor de idade" (< 18), o campo "Responsável" seja obrigatório
2. Se o usuário for "Maior de idade" (≥ 18), o campo "RG" seja obrigatório
3. Se o usuário selecionar "Estudante", o campo "Instituição de Ensino" seja obrigatório
4. Se o usuário selecionar "Empregado", o campo "Empresa" seja obrigatório

DICA: Use combinações de "if/then/else" e "required" condicionais no schema.`,
  schema: {
    type: 'object',
    properties: {
      nome: {
        type: 'string',
        title: 'Nome Completo',
        minLength: 3,
      },
      idade: {
        type: 'integer',
        title: 'Idade',
        minimum: 0,
        maximum: 120,
      },
      responsavel: {
        type: 'string',
        title: 'Nome do Responsável',
        minLength: 3,
      },
      rg: {
        type: 'string',
        title: 'RG',
        pattern: '^[0-9]{2}\\.[0-9]{3}\\.[0-9]{3}$',
      },
      situacao: {
        type: 'string',
        title: 'Situação Atual',
        enum: ['Estudante', 'Empregado', 'Desempregado', 'Aposentado'],
        default: 'Estudante',
      },
      instituicaoEnsino: {
        type: 'string',
        title: 'Instituição de Ensino',
        minLength: 3,
      },
      empresa: {
        type: 'string',
        title: 'Empresa',
        minLength: 3,
      },
    },
    required: ['nome', 'idade', 'situacao'],
    // TODO: Adicionar validações condicionais complexas
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
        scope: '#/properties/idade',
        label: 'Idade',
      },
      {
        type: 'Control',
        scope: '#/properties/responsavel',
        label: 'Nome do Responsável (obrigatório para menores)',
      },
      {
        type: 'Control',
        scope: '#/properties/rg',
        label: 'RG (obrigatório para maiores)',
      },
      {
        type: 'Control',
        scope: '#/properties/situacao',
        label: 'Situação Atual',
      },
      {
        type: 'Control',
        scope: '#/properties/instituicaoEnsino',
        label: 'Instituição de Ensino (obrigatório para estudantes)',
      },
      {
        type: 'Control',
        scope: '#/properties/empresa',
        label: 'Empresa (obrigatório para empregados)',
      },
    ],
  },
  data: {
    nome: '',
    idade: 18,
    responsavel: '',
    rg: '',
    situacao: 'Estudante',
    instituicaoEnsino: '',
    empresa: '',
  },
};

export default TesteValidacaoComplexa;
