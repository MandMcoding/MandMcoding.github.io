import { defineConfig } from 'astro/config';
import remarkDirective from 'remark-directive';
import { visit } from 'unist-util-visit';

function remarkSecretDirective() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type === 'containerDirective' && node.name === 's') {
        const data = node.data || (node.data = {});
        data.hName = 'div';
        data.hProperties = { class: 'secret-content' };
      }
      if (node.type === 'textDirective' && node.name === 's') {
        const data = node.data || (node.data = {});
        data.hName = 'span';
        data.hProperties = { class: 'secret-content' };
      }
    });
  };
}

export default defineConfig({
  site: 'https://MandMcoding.github.io',
  markdown: {
    remarkPlugins: [remarkDirective, remarkSecretDirective],
  },
});
