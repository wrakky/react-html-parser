declare module "react-html-parser" {

  type Transform = (
    node: object,
    index: any
  ) => null | undefined | ReactElement;

  interface Options {
    decodeEntities?: boolean
    transform?: Transform
    preprocessNodes?: (nodes: object[]) => any
  }

  export function convertNodeToElement(
    node?: object,
    index?: any,
    transform?: Transform
  ): any;

  export function processNodes(nodes: object[], transform: Transform): React.Element[]

  export default function HtmlParser(html: string, options?: Options): React.Element[];
}
