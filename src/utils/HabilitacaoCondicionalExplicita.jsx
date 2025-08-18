export const TesteHabilitacaoCondicionalExplicita = {
  name: 'Teste 3: Habilitação Condicional Explícita',
  introduction: `Neste teste, você deve criar um formulário onde um campo fica desabilitado por padrão e só é habilitado quando uma condição específica é atendida.

TAREFA: Configure o campo "Email" para ficar desabilitado por padrão, mas ser habilitado apenas quando o usuário selecionar "Sim" no campo "Aceita receber comunicações?".

DICA: Use a propriedade "rule" com "effect: ENABLE" e uma condição que verifica se "aceitaComunicacoes" é igual a "Sim".
O campo deve começar desabilitado e só ser habilitado quando a condição for satisfeita.

IMPORTANTE: Este teste demonstra o uso do efeito "ENABLE" do JSONForms, que é menos conhecido mas muito útil para cenários de segurança e fluxo de preenchimento.`,
  schema: {
    type: 'object',
    properties: {
      nome: {
        type: 'string',
        title: 'Nome Completo',
        minLength: 3,
      },
      aceitaComunicacoes: {
        type: 'string',
        title: 'Aceita receber comunicações?',
        enum: ['Sim', 'Não'],
        default: 'Não',
      },
      email: {
        type: 'string',
        title: 'Email',
        format: 'email',
      },
    },
    required: ['nome', 'aceitaComunicacoes'],
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
        scope: '#/properties/aceitaComunicacoes',
        label: 'Aceita receber comunicações?',
      },
      {
        type: 'Control',
        scope: '#/properties/email',
        label: 'Email',
        // TODO: Adicionar regra para habilitar apenas quando aceitaComunicacoes = "Sim"
        // O campo deve começar desabilitado e só ser habilitado quando a condição for atendida
      },
    ],
  },
  data: {
    nome: '',
    aceitaComunicacoes: 'Não',
    email: '',
  },
};

export default TesteHabilitacaoCondicionalExplicita;
