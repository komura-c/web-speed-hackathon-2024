import fg from 'fast-glob';
import sharp from 'sharp';

const folder = './tools/image-resize/';
const inputFilePath = folder + 'input/**.png';
const outputFolderPath = 'output/';

fg(inputFilePath).then((strings: string[])=>{
  strings.map(async (path: string) => {
    console.log(path)
    const outputFilePath = path.replace("input/", outputFolderPath).replace(".png", ".webp")
    console.log(outputFilePath)
    await sharp(path)
      .resize(538, 760)
      .webp()
      .toFile(outputFilePath);
  })
})

// rm ./output/*/*.png