export const SimpleExample = {
  name: "Simple Example",
  schema: {
    type: "object",
    properties: {
      name: { type: "string" },
      age: { type: "number" },
    },
    required: ["name"],
  },
  uischema: {
    type: "VerticalLayout",
    elements: [
      { type: "Control", scope: "#/properties/name" },
      { type: "Control", scope: "#/properties/age" },
    ],
  },
  data: { name: "", age: 0 },
};

export default SimpleExample;
