import fs from "fs"

/**
 * This file is used to convert our special .md format to MDX.
 * It replaces all uses of $ug{...} and $gmbh{...} with the <Hide/> component:
 * <Hide showIf={props.legalForm == "ug"}>...</Hide>
 * 🚨 Warning 🚨 There are some issues when multiple linebreaks are inside the <Hide/>
 * component, which have to be fixed manually. Check every conversion before commiting!
 */

var files = fs.readdirSync('./');
files.filter(filename => filename.endsWith(".md")).forEach(filename => {
  let file = fs.readFileSync(filename).toString();
  
  file = file.replaceAll(/\$gmbh\{(.*?)\}/gms, "<Hide showIf={props.legalForm == \"gmbh\"}> $1 </Hide>");
  file = file.replaceAll(/\$ug\{(.*?)\}/gms, "<Hide showIf={props.legalForm == \"ug\"}> $1 </Hide>");

  fs.writeFileSync(
    filename.split(".")[0] + ".mdx",  "import Hide from \"./Hide\"\n\n" + file)
})