interface IDababy {
  refs: Record<string, HTMLElement>;
  evalExpression(expression: string, data?: Record<string, unknown>): any;
  init(): void;
}

const Dababy: IDababy = {
  refs: {},
  evalExpression(expression: string, data: Record<string, unknown> = {}): any {
    return new Function('__data', 'refs', `with(__data) { return ${expression} }`)(data, this.refs);
  },
  init() {
    document.querySelectorAll<HTMLElement>('[ref]').forEach((el) => {
      this.refs[el.getAttribute('ref')!] = el;
    });

    document.querySelectorAll<HTMLElement>('[data]').forEach((el) => {
      const data = this.evalExpression(el.getAttribute('data')!);
      const nodes = el.querySelectorAll<HTMLElement>('[bind]');

      nodes.forEach((node) => {
        const props = this.evalExpression(node.getAttribute('bind')!, data);
        Object.entries(props).forEach(([key, value]) => {
          // @ts-ignore-error: prop may be undefined, but that's okay for our case
          node[key] = value;
        });
      });
    });
  },
};

document.addEventListener('DOMContentLoaded', () => Dababy.init());
