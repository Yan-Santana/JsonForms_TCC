export const TesteVisibilidadeSimples = {
  name: 'Teste 1: Visibilidade Condicional Simples',
  introduction: `Neste teste, você deve criar um formulário onde um campo só aparece quando outro campo tem um valor específico.

TAREFA: Configure o campo "Telefone" para aparecer apenas quando o usuário selecionar "Sim" no campo "Deseja receber ligações?".

DICA: Use a propriedade "rule" com "effect: HIDE" e uma condição que verifica se o valor é diferente de "Sim".`,
  schema: {
    type: 'object',
    properties: {
      nome: {
        type: 'string',
        title: 'Nome Completo',
        minLength: 3,
      },
      receberLigacoes: {
        type: 'string',
        title: 'Deseja receber ligações?',
        enum: ['Sim', 'Não'],
        default: 'Não',
      },
      telefone: {
        type: 'string',
        title: 'Telefone',  
      },
    },
    required: ['nome', 'receberLigacoes'],
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
        scope: '#/properties/receberLigacoes',
        label: 'Deseja receber ligações?',
      },
      {
        type: 'Control',
        scope: '#/properties/telefone',
        label: 'Telefone',
        // TODO: Adicionar regra para mostrar apenas quando receberLigacoes = "Sim"
      },
    ],
  },
  data: {
    nome: '',
    receberLigacoes: 'Não',
    telefone: '',
  },
};

export default TesteVisibilidadeSimples;
