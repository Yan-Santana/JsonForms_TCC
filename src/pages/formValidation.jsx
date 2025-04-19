export const validateFormData = (formData) => {
  const errors = [];

  if (!formData.schema || typeof formData.schema !== 'object') {
    errors.push('Schema inválido');
    return errors;
  }

  if (!formData.schema.type || !formData.schema.properties) {
    errors.push('Schema deve ter type e properties definidos');
    return errors;
  }

  if (!formData.uischema || typeof formData.uischema !== 'object') {
    errors.push('UISchema inválido');
    return errors;
  }

  if (!formData.uischema.type || !formData.uischema.elements) {
    errors.push('UISchema deve ter type e elements definidos');
    return errors;
  }

  validateConditionalFields(formData, errors);
  validateRequiredFields(formData, errors);
  validateFieldTypes(formData, errors);

  return errors;
};

const validateConditionalFields = (formData, errors) => {
  if (formData.schema.if && formData.schema.then) {
    const ifCondition = formData.schema.if;
    const thenRequirements = formData.schema.then;

    const conditionMet = checkCondition(ifCondition, formData.data);

    if (conditionMet && thenRequirements.required) {
      validateRequiredFieldsForCondition(
        thenRequirements.required,
        formData.data,
        errors,
        'quando a condição é satisfeita',
      );
    }
  }

  if (formData.schema.if && formData.schema.else) {
    const ifCondition = formData.schema.if;
    const elseRequirements = formData.schema.else;

    const conditionMet = checkCondition(ifCondition, formData.data);

    if (!conditionMet && elseRequirements.required) {
      validateRequiredFieldsForCondition(
        elseRequirements.required,
        formData.data,
        errors,
        'quando a condição não é satisfeita',
      );
    }
  }
};

const checkCondition = (condition, data) => {
  let conditionMet = true;
  if (condition.properties) {
    Object.entries(condition.properties).forEach(([field, condition]) => {
      const value = data[field];
      if (condition.minimum !== undefined && value < condition.minimum) {
        conditionMet = false;
      }
      if (condition.maximum !== undefined && value > condition.maximum) {
        conditionMet = false;
      }
    });
  }
  return conditionMet;
};

const validateRequiredFields = (formData, errors) => {
  if (formData.schema.required && Array.isArray(formData.schema.required)) {
    validateRequiredFieldsForCondition(formData.schema.required, formData.data, errors, '');
  }
};

const validateRequiredFieldsForCondition = (requiredFields, data, errors, condition) => {
  requiredFields.forEach((field) => {
    const value = data[field];
    if (value === undefined || value === null || value === '') {
      errors.push(`Campo ${field} é obrigatório ${condition}`.trim());
    }
  });
};

const validateFieldTypes = (formData, errors) => {
  Object.entries(formData.schema.properties).forEach(([field, prop]) => {
    const value = formData.data[field];
    if (value !== undefined && value !== null && value !== '') {
      validateFieldType(field, value, prop, errors);
    }
  });
};

const validateFieldType = (field, value, prop, errors) => {
  switch (prop.type) {
    case 'string':
      validateString(field, value, prop, errors);
      break;
    case 'number':
    case 'integer':
      validateNumber(field, value, prop, errors);
      break;
    case 'boolean':
      validateBoolean(field, value, errors);
      break;
    case 'array':
      validateArray(field, value, prop, errors);
      break;
  }
};

const validateString = (field, value, prop, errors) => {
  if (typeof value !== 'string') {
    errors.push(`Campo ${field} deve ser texto`);
  } else if (prop.minLength && value.length < prop.minLength) {
    errors.push(`Campo ${field} deve ter no mínimo ${prop.minLength} caracteres`);
  }
};

const validateNumber = (field, value, prop, errors) => {
  const numValue = Number(value);
  if (isNaN(numValue)) {
    errors.push(`Campo ${field} deve ser número`);
  } else {
    if (prop.minimum !== undefined && numValue < prop.minimum) {
      errors.push(`Campo ${field} deve ser maior ou igual a ${prop.minimum}`);
    }
    if (prop.maximum !== undefined && numValue > prop.maximum) {
      errors.push(`Campo ${field} deve ser menor ou igual a ${prop.maximum}`);
    }
  }
};

const validateBoolean = (field, value, errors) => {
  if (typeof value !== 'boolean') {
    errors.push(`Campo ${field} deve ser booleano`);
  }
};

const validateArray = (field, value, prop, errors) => {
  if (!Array.isArray(value)) {
    errors.push(`Campo ${field} deve ser uma lista`);
  } else if (prop.minItems && value.length < prop.minItems) {
    errors.push(`Campo ${field} deve ter no mínimo ${prop.minItems} itens`);
  }
};
