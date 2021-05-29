type Refs = Record<string, HTMLElement>;
type Data = Record<string, unknown>;

interface IDababy {
  refs: Refs;
  init(): void;
}

const evalExpression = (
  expression: string = '{}',
  data: Data = {},
  refs: Refs = {}
): any => {
  return new Function('__data', 'refs', `with(__data) { return ${expression} }`)(data, refs);
};

const renderProps = (nodes: NodeListOf<HTMLElement>, data?: Data, refs?: Refs) => {
  nodes.forEach((node) => {
    const props = evalExpression(node.getAttribute('bind') ?? undefined, data, refs);
    Object.entries(props).forEach(([key, value]) => {
      // @ts-ignore-error: prop may be undefined, but that's okay for our case
      node[key] = value;
    });
  });
};

class Dababy implements IDababy {
  public refs: Refs;

  constructor() {
    this.refs = {}
  }

  public init() {
    document.querySelectorAll<HTMLElement>('[ref]').forEach((el) => {
      const name = el.getAttribute('ref');
      if (name) this.refs[name] = el;
    });

    document.querySelectorAll<HTMLElement>('[data]').forEach((el) => {
      const data = evalExpression(el.getAttribute('data') ?? undefined, {});
      const nodes = el.querySelectorAll<HTMLElement>('[bind]');

      renderProps(nodes, data, this.refs)
    });
  }
}

document.addEventListener('DOMContentLoaded', () => new Dababy().init());
