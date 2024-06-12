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
    // Log all elements
    // visit(tree, (node) => {
    //   console.log(node);
    // });

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

    visit(tree, "blockquote", (node) => {
      if (node.children.length > 0) {
        const firstChild = node.children[0];
        if (firstChild.type === "paragraph") {
          const hasImportant = node.children.some((c: any) => {
            const firstChild = c.children[0];
            if (!firstChild) return false;
            return (
              firstChild.type === "strong" &&
              firstChild.children[0].value.toLowerCase() === "important"
            );
          });

          if (hasImportant) {
            node.data = {
              hProperties: {
                class: "important",
              },
            };
          }
        }
      }
    });

    visit(tree, "heading", (node) => {
      let lastChild = node.children[node.children.length - 1];
      if (lastChild && lastChild.type === "text") {
        let string = lastChild.value.replace(/ +$/, "");
        let hId = string.toLowerCase().replace(/\s/g, "-");
        hId = hId.replace(/[^a-z0-9-]/g, "");

        if (!node.data) {
          node.data = {};
        }

        if (!node.data.hProperties) {
          node.data.hProperties = {};
        }

        node.data.id = node.data.hProperties.id = hId;
        node.data.class = node.data.hProperties.class =
          "header__offset scroll-mt-24 group";

        node.children.push({
          type: "link",
          title: string,
          url: `#${hId}`,
          data: {
            hProperties: {
              class: "hidden group-hover:inline-block",
            },
          },
          children: [
            {
              type: "html",
              value: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-4 h-6 inline-block"><path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>`,
            },
          ],
        });
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

const remarkImage = () => async (tree: any) => {
  const promises: Promise<any>[] = [];

  const getImgWidth = (filePath: string) => {
    return new Promise((resolve) => {
      require("image-size")(
        filePath,
        (err: string, dimensions: { width: number; height: number }) => {
          resolve(dimensions.width);
        }
      );
    });
  };

  visit(tree, "element", (node) => {
    if (node.tagName === "img") {
      const imgPath = node.properties.src;
      if (imgPath.startsWith("http")) return;

      const absImgPath = path.join(process.cwd(), "public", imgPath);
      if (
        fs.existsSync(absImgPath) &&
        !absImgPath.endsWith(".gif") &&
        !absImgPath.endsWith(".webp")
      ) {
        const promise = require("lqip")
          .base64(absImgPath)
          .then((lqip: any) => {
            if (lqip) {
              node.properties[`data-src`] = node.properties.src;
              node.properties[`src`] = lqip;
              node.properties[`class`] = "lazyload";
            }

            return getImgWidth(absImgPath);
          })
          .then((width: number) => {
            node.properties[`width`] = width;
          });
        promises.push(promise);
      }
    }
  });

  await Promise.all(promises);
};

export default async function markdownToHtml(markdown: string) {
  const highlighter = await ShikiFm.get();

  const parser = unified().use(remarkParse);

  parser.use(remarkGfm);
  parser.use(remarkFm, { highlighter });
  parser.use(remarkRehype, { allowDangerousHtml: true, passThrough: [] });
  parser.use(rehypeRaw);
  parser.use(remarkImage);
  parser.use(rehypeStringify, { allowDangerousHtml: true });

  return (await parser.process(markdown)).toString();
}
