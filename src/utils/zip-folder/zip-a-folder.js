
const { zip } = require('zip-a-folder');
const FileSet = require('file-set');
const extract = require('extract-zip');
const replace = require('replace-in-file');
const fs = require('fs');



// ---- REGEX for what there is to change
const from = [
  new RegExp('Expandable 3.0.0', 'g'),
  new RegExp('Enabler.requestFullscreenExpand', 'g'),
  new RegExp('Enabler.queryFullscreenSupport', 'g'),
  new RegExp('Enabler.queryFullscreenDimensions', 'g'),
  new RegExp('Enabler.finishFullscreenExpand', 'g'),
  new RegExp('Enabler.requestFullscreenCollapse', 'g'),
  new RegExp('Enabler.finishFullscreenCollapse', 'g'),
  new RegExp('&thumbnail=')
];

// ---- REPLACE with the following string
const to = [
    'Banner 3.0.0',
    'Enabler[\'requestFull\' + \'screenExpand\']',
    'Enabler[\'queryFull\' + \'screenSupport\']',
    'Enabler[\'queryFull\' + \'screenDimensions\']',
    'Enabler[\'finishFull\' + \'screenExpand\']',
    'Enabler[\'requestFull\' + \'screenCollapse\']',
    'Enabler[\'finishFull\' + \'screenCollapse\']',
    '&size=&thumbnail='
];


class ZipAFolder {

    static async main() {

      // get argument
      if(process.argv.length < 3)
      {
        console.log('Arguments needed : [path]');
        return ;
      }
      var p = process.argv[2];        // path

      console.log(p);
      const regexp1 = new RegExp('\\\\', 'g');
      p = p.replace(regexp1,'\\');

      // create folder

      const new_folder = "modified_zip" ;
      await createFolder(p +'/'+ new_folder);
      setTimeout(function(){
        // unzip
        unzipFiles(p,new_folder) ;
        console.log('wait for unzip');

        // replace
        const newPath = p +'/'+ new_folder ;
         setTimeout(function(){
            replaceInFiles(newPath);
            console.log('wait for replace');
            // zip
            setTimeout(function(){
              zipFiles(newPath,new_folder);
              },2000);

            },2000);
         },2000);
    }
}

// ------------------- UNZIP -------------------------------
async function unzipFiles(path, newFolder)
{
  console.log('------------ Start unzip -------------')
  let filesToUnzip = new FileSet(path + '/*.zip') ;

  for(let i=0;i<filesToUnzip.files.length;i++)
  {
    // get current zip path
    let dir=filesToUnzip.files[i];

    //get the name of the zip
    var nameOfZip = '';
    var regex = new RegExp('/[a-zA-z0-9_]+\\.zip');
    var posOfZip = dir.search(regex);

    for(let j=posOfZip+1; j<dir.length ; j++)
    {
      nameOfZip = nameOfZip + dir[j];
    }

    // get the new name for the unzip directory
    let dirName = path +'/' + newFolder +'/';

    for(let j=0; j<(nameOfZip.length-4) ; j++)
    {
      dirName = dirName + nameOfZip[j] ;
    }

    console.log('unzip ' + dir + ' to ' + dirName);
    // unzip the directory
    await extract(dir,  {dir: dirName},function (err) {
      console.log(err);
   })
    console.log('unzip done') ;
  }
}

// ------------------ REPLACE IN FILES ---------------------
async function replaceInFiles(path)
{
  console.log('------------ Start replace -------------')
  let filesToReplace = new FileSet(path + '/*/*.html') ;
  console.log('Replacement in the following files');
  console.log(filesToReplace.files);
  for(let i=0;i<filesToReplace.files.length;i++)
  {
    // get the file to replace
    let file = filesToReplace.files[i];
    // replace occurence in the file
    try {

      // ---- find/replace
      for (let i=0; i<from.length; i++)
      {
        let results = await replace({files:file,from: from[i],to: to[i]});
        console.log(from[i]);
        console.log(to[i]);
      }
      console.log('Replacement done');
    }
    catch (error) {
      console.error('Error occurred:', error);
    }
  }
}

// --------------------- CREATE FOLDER  ---------------------------
async function createFolder(path)
{
  console.log('------------ Start creating folder -------------');
  // create the directory destination
  if (fs.existsSync(path))
  {
    console.log('Folder already exists');
  }
  else
  {
    fs.mkdir(path, (err) => {
      if (err) throw err;
    });
    console.log('Folder created');
  }
}

// --------------------- ZIP ---------------------------
async function zipFiles(path) {
  console.log('------------ Start zip -------------')
  let filesToZip = new FileSet(path + '/*');

  for (let i = 0; i < filesToZip.dirs.length; i++) {
    // get the file to zip
    let dir = filesToZip.dirs[i];
    console.log('file to zip : ' + dir);
    // get the name of the new zip
    let dirName = '';
    for (let j = 0; j < dir.length - 1; j++) {
      if (dir[j] == '/') {
        dirName = '';
      } else {
        dirName = dirName + dir[j];
      }
    }

    // Zip and then delete the folder
    zipName = dirName + '.zip';
    console.log('name of the new zip : ' + zipName);


    // zip the directory
    let dirDest = path +  '/' + zipName;
    console.log('zipping ' + dirDest);
    await zip(dir, dirDest);
    console.log('zip done');

    // delete the not zipped directory
    await deleteFolder(path, dirName);
    console.log('deleting done');
  }
}

// --------------------- DELETE FOLDER ---------------------------
async function deleteFolder(path,dirName) {

  console.log('deleting the useless folders');

  let fileToDel = new FileSet(path +'/'+ dirName +'/*') ;
  for(let j=0 ; j<fileToDel.files.length ; j++)
  {
    await fs.unlink(fileToDel.files[j] , (err) => {
      if (err) throw err;
    });
  }
  setTimeout(function(){
    fs.rmdir(path +'/'+ dirName, (err) => {
      if (err) throw err;
      });
    },2000);
}



ZipAFolder.main();
