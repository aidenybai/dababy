const Dababy = {
  refs: {},
  evalExpression(expression, data) {
    return new Function('__data', 'refs', `with(__data) { return ${expression} }`)(
      data || {},
      this.refs
    );
  },
  init() {
    document.querySelectorAll('[ref]').forEach((el) => {
      this.refs[el.getAttribute('ref')] = el;
    });

    document.querySelectorAll('[data]').forEach((el) => {
      const data = this.evalExpression(el.getAttribute('data'));
      const nodes = el.querySelectorAll('[bind]');

      nodes.forEach((node) => {
        const props = this.evalExpression(node.getAttribute('bind'), data);
        Object.entries(props).forEach(([key, value]) => {
          node[key] = value;
        });
      });
    });
  },
};

document.addEventListener('DOMContentLoaded', () => Dababy.init());
