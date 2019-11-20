module.exports.rules = {
  "jsx-custom-uses-vars": {
    create(context) {
      return {
        JSXOpeningElement(node) {
          if (["Host", "Fragment", "TagType"].includes(node.name.name)) {
            const variable = node.name.name;
            context.markVariableAsUsed(variable);
          }
        }
      };
    }
  }
};
