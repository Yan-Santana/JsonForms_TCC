// Mensagens de erro padrão
export const defaultErrorMessages = {
  'error.required': 'é um campo obrigatório',
  'error.type': 'deve ser do tipo correto',
  'error.minimum': 'deve ser maior ou igual a',
  'error.maximum': 'deve ser menor ou igual a',
  'error.minLength': 'deve ter pelo menos',
  'error.maxLength': 'deve ter no máximo',
  'error.format': 'deve estar no formato correto',
  'error.enum': 'deve ser um dos valores permitidos',
  'error.const': 'deve ser igual ao valor constante',
  'error.multipleOf': 'deve ser múltiplo de',
  'error.pattern': 'deve corresponder ao padrão',
  'error.additionalProperties': 'não deve ter propriedades adicionais',
  'error.dependencies': 'deve ter as dependências',
  'error.propertyNames': 'nome da propriedade inválido',
  'error.uniqueItems': 'não deve ter itens duplicados',
  'error.custom': 'deve atender à validação personalizada',
  'is a required property': 'é um campo obrigatório',
};

// Traduções genéricas da UI
export const defaultUiMessages = {
  label: 'Campo',
  description: 'Descrição',
  required: 'Obrigatório',
};

// Função para gerar traduções de campos condicionais
export const generateConditionalFieldTranslations = (fieldConfig) => {
  const translations = {};

  Object.entries(fieldConfig).forEach(([field, config]) => {
    if (config.label) {
      translations[`${field}.label`] = config.label;
    }
    if (config.description) {
      translations[`${field}.description`] = config.description;
    }
    if (config.errorMessage) {
      translations[`${field}.error.custom`] = config.errorMessage;
    }

    // Condicionais
    if (config.conditions) {
      config.conditions.forEach((condition) => {
        const { dependsOn, value, operator, message } = condition;
        const key = `${field}.condition.${dependsOn}${operator}${value}`;
        translations[key] = message;
      });
    }
  });

  return translations;
};

// Exemplo de uso:
export const exampleFieldConfig = {
  foo: {
    label: 'Valor',
    description: 'Se maior que 10, Bar é obrigatório. Se menor que 10, Baz é obrigatório.',
  },
  bar: {
    label: 'Bar',
    description: 'Este campo é obrigatório quando o Valor for maior que 10',
    errorMessage: 'Campo obrigatório quando Valor > 10',
    conditions: [
      {
        dependsOn: 'foo',
        operator: '>',
        value: 10,
        message: 'Campo obrigatório quando Valor > 10',
      },
    ],
  },
  baz: {
    label: 'Baz',
    description: 'Este campo é obrigatório quando o Valor for menor que 10',
    errorMessage: 'Campo obrigatório quando Valor < 10',
    conditions: [
      {
        dependsOn: 'foo',
        operator: '<',
        value: 10,
        message: 'Campo obrigatório quando Valor < 10',
      },
    ],
  },
};
