import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeStringify from "rehype-stringify";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import * as shiki from "shiki";
import fs from "fs";
import path from "path";

class ShikiFm {
  public static highlighter: shiki.Highlighter | undefined = undefined;

  public static async get() {
    if (!ShikiFm.highlighter) {
      const theUnnamed = JSON.parse(
        fs.readFileSync(
          path.join(process.cwd(), "public/themes/the-unnamed.json"),
          "utf-8"
        )
      );

      ShikiFm.highlighter = await shiki.getHighlighter({
        theme: theUnnamed,
        langs: ["yaml", "json", "markdown", "bash", "js", "javascript", "go"],
      });
    }

    return ShikiFm.highlighter;
  }
}

const remarkFm = ({
  highlighter = undefined,
}: {
  highlighter: shiki.Highlighter | undefined;
}) => {
  return async (tree: any) => {
    visit(tree, "code", (node) => {
      if (highlighter) {
        const lang = node.lang || "";
        let meta = node.meta || "";
        const code = node.value || "";

        let titleElement = "";
        if (meta) {
          meta = meta.replace(/{{/, "{");
          meta = meta.replace(/}}/, "}");
          const parsed = JSON.parse(meta);

          if (parsed.title) {
            titleElement = `
            <div className="code__wrapper__title bg-vulcan-200 flex items-center justify-between px-4 py-2">
              <div className="text-lg font-bold text-whisper-500">
                ${parsed.title}
              </div>
              <div className="text-sm text-whisper-50">
                ${parsed.description || ""}
              </div>
            </div>`;
          }
        }

        let html = highlighter.codeToHtml(code, {
          lang,
        });

        node.type = "html";
        node.value = `<div class="code__wrapper group">
  ${titleElement}
  <div>
    ${html}
  </div>       
</div>`;
        node.children = [];
      }
    });

    visit(tree, "heading", (node) => {
      let lastChild = node.children[node.children.length - 1];
      if (lastChild && lastChild.type === "text") {
        let string = lastChild.value.replace(/ +$/, "");
        const hId = string.toLowerCase().replace(/\s/g, "-");
        if (!node.data) node.data = {};
        if (!node.data.hProperties) node.data.hProperties = {};
        node.data.id = node.data.hProperties.id = hId;
        node.data.class = node.data.hProperties.class =
          "header__offset scroll-mt-24 group";
      }
    });

    visit(tree, "table", (node, index, parent) => {
      const wrapper = {
        type: "div",
        depth: 0,
        children: [node],
        data: {
          hName: "div",
          hProperties: {
            class: "table__wrapper",
          },
        },
      };

      parent.children.splice(index, 1, wrapper);
    });

    visit(tree, "html", (node) => {
      let value = node.value;

      if (value.includes(`data-vscode=`)) {
        const match = value.match(/data-vscode="([^"]*)"/);
        const dataVscodeValue = match ? match[1] : "";

        // Replace href value with data-vscode value
        value = value.replace(/href="([^"]*)"/, `href="${dataVscodeValue}"`);
        node.value = value;
      }
    });
  };
};

export default async function markdownToHtml(markdown: string) {
  const highlighter = await ShikiFm.get();

  const parser = unified().use(remarkParse);

  parser.use(remarkGfm);
  parser.use(remarkFm, { highlighter });
  parser.use(remarkRehype, { allowDangerousHtml: true, passThrough: [] });
  parser.use(rehypeRaw);
  parser.use(rehypeStringify, { allowDangerousHtml: true });

  return (await parser.process(markdown)).toString();
}
