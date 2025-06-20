# Testes para Pesquisa de Technical Writing - JSONForms Rules

Este diretório contém os testes criados para avaliar a eficácia da documentação técnica em comparação com a documentação oficial do JSONForms.

## Estrutura dos Testes

Cada teste segue a seguinte estrutura:

- **name**: Nome identificador do teste
- **introduction**: Texto explicativo que aparece antes do schema, contendo:
  - Descrição da tarefa
  - Objetivos específicos
  - Dicas para resolução
- **schema**: Schema JSON com validações e propriedades
- **uischema**: Interface do usuário com regras condicionais
- **data**: Dados iniciais do formulário

## Lista de Testes

### 1. TesteVisibilidadeSimples.jsx

**Objetivo**: Testar visibilidade condicional básica
**Conceito**: Campo aparece/desaparece baseado em valor de outro campo
**Dificuldade**: Fácil
**Conceitos testados**: `rule`, `effect: HIDE`, `condition`

### 2. TesteValidacaoCondicional.jsx

**Objetivo**: Testar validação condicional usando if/then/else
**Conceito**: Campos obrigatórios dependem de valores de outros campos
**Dificuldade**: Médio
**Conceitos testados**: `if/then/else`, `required` condicional

### 3. TesteMultiplasCondicoes.jsx

**Objetivo**: Testar múltiplas condições simultâneas
**Conceito**: Campo aparece apenas quando múltiplas condições são atendidas
**Dificuldade**: Médio
**Conceitos testados**: `allOf`, `anyOf`, múltiplas condições

### 4. TesteCalculoDinamico.jsx

**Objetivo**: Testar campos que aparecem baseado em cálculos
**Conceito**: Campo aparece quando valores numéricos são válidos
**Dificuldade**: Médio
**Conceitos testados**: Condições numéricas, `effect: SHOW`

### 5. TesteValidacaoComplexa.jsx

**Objetivo**: Testar validações complexas com múltiplas regras
**Conceito**: Diferentes validações baseadas em idade e situação
**Dificuldade**: Difícil
**Conceitos testados**: Múltiplas validações condicionais, `if/then/else` aninhados

### 6. TesteFailWhenUndefined.jsx

**Objetivo**: Testar especificamente a propriedade `failWhenUndefined`
**Conceito**: Controle de falha quando campos não existem
**Dificuldade**: Avançado
**Conceitos testados**: `failWhenUndefined: false/true`

### 7. TesteRulesAvancadas.jsx

**Objetivo**: Testar combinações avançadas de regras
**Conceito**: Múltiplos tipos de condições e efeitos
**Dificuldade**: Avançado
**Conceitos testados**: Combinações complexas de regras, `allOf`, diferentes efeitos

## Métricas de Avaliação

Para cada teste, serão coletadas as seguintes métricas:

1. **Tempo de resolução**: Tempo desde o início até o primeiro envio bem-sucedido
2. **Número de tentativas**: Quantidade de tentativas antes do sucesso
3. **Tipos de erro**: Categorização dos erros cometidos
4. **Uso de documentação**: Se o participante consultou a documentação
5. **Estratégia de resolução**: Abordagem utilizada para resolver o problema

## Grupos de Participantes

### Grupo A (Com Technical Writing)

- Receberá documentação técnica escrita especificamente para este estudo
- Foco em clareza, exemplos práticos e explicações passo-a-passo

### Grupo B (Documentação Oficial)

- Usará apenas a documentação oficial do JSONForms
- Documentação mais técnica e menos didática

## Análise Esperada

A pesquisa visa determinar se:

1. A documentação técnica personalizada melhora o tempo de resolução
2. Reduz o número de tentativas e erros
3. Melhora a compreensão dos conceitos
4. Aumenta a confiança dos desenvolvedores

## Como Usar

1. Os testes são carregados automaticamente no Playground
2. Cada teste mostra sua introdução antes do schema
3. Os participantes devem implementar as regras conforme solicitado
4. O sistema registra automaticamente métricas de uso
5. Os dados são analisados no dashboard de analytics
