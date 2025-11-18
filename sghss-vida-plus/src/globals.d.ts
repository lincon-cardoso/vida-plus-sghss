// Declarações globais para arquivos de estilos (SCSS, CSS) — evita erro de módulo em TypeScript
declare module "*.scss" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}

// Caso use módulos CSS (ex.: styles.module.scss)
declare module "*.module.scss" {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module "*.module.css" {
  const classes: { readonly [key: string]: string };
  export default classes;
}
