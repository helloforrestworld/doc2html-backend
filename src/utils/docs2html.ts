import fs from 'fs';
import mammoth from 'mammoth';

interface I2HtmlProps {
  filePath: string;
  targetPath: string;
  name: string;
  styles: string[];
  scripts: string[];
}

export default function ({
  filePath,
  targetPath,
  name,
  styles = [],
  scripts = [],
}: I2HtmlProps) {
  return new Promise((resolve) => {
    let scriptStr = scripts
      .map((item) => `<script>${item}</script>`)
      .join('');
    let stylesStr = styles
    .map((item) => `<style type="text/css">${item}</style>`)
    .join('');

    mammoth.convertToHtml({ path: filePath }).then(function (result) {
      var html = result.value; // The generated HTML
      const readHtml = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>${name}</title>
          ${stylesStr}
        </head>
        <body>${html}</body>
        ${scriptStr}
      </html>`;
      fs.writeFileSync(`${targetPath}/${name}.html`, readHtml, {
        encoding: 'utf-8',
      });
      resolve(true);
    });
  });
}
