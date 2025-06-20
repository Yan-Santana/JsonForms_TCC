export const SolucaoTesteVisibilidadeSimples = {
  name: 'Solução: Teste 1 - Visibilidade Condicional Simples',
  introduction: `Esta é a solução correta para o Teste 1.

SOLUÇÃO IMPLEMENTADA:
- Adicionada regra "rule" no campo "Telefone"
- Usado "effect: HIDE" para esconder o campo
- Condição verifica se "receberLigacoes" é diferente de "Sim"
- Campo aparece apenas quando "receberLigacoes" = "Sim"

EXPLICAÇÃO:
A propriedade "rule" permite controlar a visibilidade de campos baseado em condições.
"effect: HIDE" esconde o campo quando a condição é verdadeira.
A condição usa "scope" para referenciar outro campo e "schema" para definir o valor esperado.`,
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
        pattern: '^\\([0-9]{2}\\) [0-9]{4,5}-[0-9]{4}$',
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
        rule: {
          effect: 'HIDE',
          condition: {
            scope: '#/properties/receberLigacoes',
            schema: { not: { const: 'Sim' } },
          },
        },
      },
    ],
  },
  data: {
    nome: '',
    receberLigacoes: 'Não',
    telefone: '',
  },
};

export default SolucaoTesteVisibilidadeSimples;
