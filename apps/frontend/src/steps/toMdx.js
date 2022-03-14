import fs from "fs"

var files = fs.readdirSync('./');

files.filter(filename => filename.endsWith(".md")).forEach(filename => {
  let file = fs.readFileSync(filename).toString();
  
  file = file.replaceAll(/\$gmbh\{(.*?)\}/gms, "<Hide showIf={props.legalForm == \"gmbh\"}> $1 </Hide>");
  file = file.replaceAll(/\$ug\{(.*?)\}/gms, "<Hide showIf={props.legalForm == \"ug\"}> $1 </Hide>");

  fs.writeFileSync(
    filename.split(".")[0] + ".mdx",  "import Hide from \"./Hide\"\n\n" + file)
})

// fs.writeFile()