import {
  enableDevelopmentMode,
  registerCardImage
} from "https://cdn.jsdelivr.net/npm/@frontmatter/extensibility/+esm";

registerCardImage(async (filePath, metadata) => {

  const { title, description } = metadata;

  const url = `https://frontmatter.codes/api/og?type=Docs&title=${title}&description=${description}`;

  return `<img src="${url}" class="absolute inset-0 h-full w-full object-cover object-left-top group-hover:brightness-75" />`;
});