#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const path = require('path');
const webfontsGenerator = require('webfonts-generator');

const queryAllSvg = (src) => {
  const realSrc = path.join(process.cwd(), src);
  const svgs = [];
  const dirInfo = fs.readdirSync(src);
  for (let i = 0; i < dirInfo.length; i++) {
    let location = path.join(src, dirInfo[i]);
    if (fs.statSync(path.join(process.cwd(), location)).isDirectory()) {
      svgs.push(...queryAllSvg(location))
    } else {
      if (/.svg$/.test(location)) {
        svgs.push(path.join(process.cwd(), location))
      }
    }
  }
  return svgs;
}

const createFont = (src, dest, fontName) => {
  let files = queryAllSvg(src);
  webfontsGenerator({
    files,
    dest: path.join(process.cwd(), dest),
    fontName: fontName || 'mileage-font',
    html: true,
    templateOptions: {
      classPrefix: `${fontName}-` || 'mileage-font',
      baseSelector: `.${fontName}` || '.mileage-font'
    },
    types: ['woff2', 'woff', 'ttf']
  }, function (error) {
    if (error) {
      console.log('Fail!', error);
    } else {
      console.log('Done!');
    }
  })
}
program
  .version('0.0.1')
  .option('-d --dest <path>', '设置目录')
  .option('-i --input <path>', '输入目录')
  .option('-n --name <path>', 'font name')
  .action(function (cmd) {
    createFont(cmd.input, cmd.dest, cmd.name)
  })
program.parse(process.argv);

