import { createGlobalStyle } from "styled-components";
import { TextBase, StyledH4 } from "./Text";

export const ResetStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
    box-sizing: border-box;
  }
  address, caption, cite, code, dfn, em, strong, th, var, b {
    font-weight: normal;
    font-style: normal;
  }
  abbr, acronym {
    border: 0;
  }
  article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
    display: block;
  }
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }
  html {
    text-size-adjust: 100%;
    box-sizing: border-box;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote {
    &:before,   &:after {
      content: '';
      content: none;
    }
  }
  q {
    &:before,   &:after {
      content: '';
      content: none;
    }
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  caption, th {
    text-align: left;
  }
  a {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
  }
  button {
    padding: 0;
    border: none;
    background: none;
  }
`;

export const GlobalStyle = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }
  html {
    overflow-y: scroll;
  }
  body {
    font-family: 'Lato', 'Red Hat Display', -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Microsoft JhengHei", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
      "Droid Sans", "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    ${TextBase}
    color: ${({ theme }) => theme.color.black};
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.2;
    white-space: pre-wrap;
    word-break: break-word;
  }
  p {
    white-space: pre-wrap;
    word-break: break-word;
  }
  ol {
    list-style: decimal inside;
    ${StyledH4}
  }
  ul {
    list-style: square inside;
    ${StyledH4}
  }
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
  button,
  input,
  select,
  textarea {
    outline: none;
    line-height: inherit;
    background: transparent;
  }
  :focus {
    outline: none;
  }
  button, input[type=submit] {
    cursor: pointer;
  }
`;
