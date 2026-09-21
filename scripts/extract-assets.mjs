import fs from "node:fs";
import path from "node:path";
import AdmZip from "adm-zip";
const zipPath=path.join(process.cwd(),"assets","folktales-assets.zip");
const outDir=path.join(process.cwd(),"public","media");
if(fs.existsSync(zipPath)){fs.mkdirSync(outDir,{recursive:true});new AdmZip(zipPath).extractAllTo(outDir,true);console.log("Extracted book media");}
