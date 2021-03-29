const Dababy = () => {
  const refs = {};
  const evalExpression = (expression, data) => {
    return new Function('__data', 'refs', `with(__data) { return ${expression} }`)(
      data || {},
      refs
    );
  };

  document.querySelectorAll('[ref]').forEach((el) => {
    refs[el.getAttribute('ref')] = el;
  });

  document.querySelectorAll('[data]').forEach((el) => {
    const data = evalExpression(el.getAttribute('data'));
    const nodes = el.querySelectorAll('[bind]');

    nodes.forEach((node) => {
      const props = evalExpression(node.getAttribute('bind'), data);
      Object.entries(props).forEach(([key, value]) => {
        node[key] = value;
      });
    });
  });
};

document.addEventListener('DOMContentLoaded', Dababy);
