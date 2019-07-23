const { zip } = require('zip-a-folder');
const FileSet = require('file-set');
const extract = require('extract-zip');
const replace = require('replace-in-file');
const { exec } = require('child_process');

class ZipAFolder {

    static async main() {

      // get arguments
      var p = process.argv[2];        // path

      console.log(p);
      const regexp1 = new RegExp('/', 'g');
      p = p.replace(regexp1,'\\');

      // unzip
      await unzipFiles(p) ;
      console.log('wait for unzip');

      // replace
      setTimeout(function(){
        replaceInFiles(p);
        console.log('wait for replace');

        // create folder
        setTimeout(function(){
            const new_folder = "modified_zip" ;
            createFolder(p,new_folder);

            // zip
            setTimeout(function(){
              zipFiles(p,new_folder);
            },2000);

          },2000);
        },2000);

    }


}

// ------------------- UNZIP -------------------------------
async function unzipFiles(path)
{
  console.log('------------ Start unzip -------------')
  let filesToUnzip = new FileSet(path + '/*.zip') ;
  for(let i=0;i<filesToUnzip.files.length;i++)
  {
    // get current zip
    let dir=filesToUnzip.files[i];
    // get the new name for the unzip directory
    let dirName = '';
    for(let j=0; j<dir.length-4 ; j++)
    {
      dirName = dirName + dir[j] ;
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

      // ---- REGEX for what there is to change
      const regex1 = new RegExp('Expandable 3.0.0', 'g');
      const regex2 = new RegExp('Enabler.requestFullscreenExpand', 'g');
      const regex3 = new RegExp('Enabler.queryFullscreenSupport', 'g');
      const regex4 = new RegExp('Enabler.queryFullscreenDimensions', 'g');
      const regex5 = new RegExp('Enabler.finishFullscreenExpand', 'g');
      const regex6 = new RegExp('Enabler.requestFullscreenCollapse', 'g');
      const regex7 = new RegExp('Enabler.finishFullscreenCollapse', 'g');

      // ---- REPLACE with the following string
      const to1 = 'Banner 3.0.0';
      const to2 = 'Enabler[\'requestFull\' + \'screenExpand\']';
      const to3 = 'Enabler[\'queryFull\' + \'screenSupport\']';
      const to4 = 'Enabler[\'queryFull\' + \'screenDimensions\']';
      const to5 = 'Enabler[\'finishFull\' + \'screenExpand\']';
      const to6 = 'Enabler[\'requestFull\' + \'screenCollapse\']';
      const to7 = 'Enabler[\'finishFull\' + \'screenCollapse\']';


      // ---- find/replace
      var results = await replace({files:file,from:regex1,to: to1});
      //console.log('Replacement results:', results);
      results = await replace({files:file,from:regex2,to:to2});
      //console.log('Replacement results:', results);
      results = await replace({files:file,from:regex3,to: to3});
      //console.log('Replacement results:', results);
      results = await replace({files:file,from:regex4,to:to4});
      //console.log('Replacement results:', results);
      results = await replace({files:file,from:regex5,to: to5});
      //console.log('Replacement results:', results);
      results = await replace({files:file,from:regex6,to:to6});
      //console.log('Replacement results:', results);
      results = await replace({files:file,from:regex7,to: to7});
      //console.log('Replacement results:', results);

      console.log('Replacement done');

    }
    catch (error) {
      console.error('Error occurred:', error);
    }
  }
}

// --------------------- CREATE FOLDER  ---------------------------
async function createFolder(path,new_folder)
{
  console.log('------------ Start creating folder -------------')
  // create the directory destination
  let cmd = 'create_folder.cmd ' + path + ' ' + new_folder ;
  exec( cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
      return;
    }
  });
  console.log('Folder '+ new_folder + ' created');
}

// --------------------- ZIP ---------------------------
async function zipFiles(path,new_folder)
{
  console.log('------------ Start zip -------------')
  let filesToZip = new FileSet(path +'/*') ;

  for(let i=0;i<filesToZip.dirs.length;i++)
  {
    // get the file to zip
    let dir=filesToZip.dirs[i];
    console.log('file to zip : '+dir);
    // get the name of the new zip
    let dirName = '';
    for(let j=0; j<dir.length-1 ; j++)
    {
      if (dir[j]=='/')
      {
        dirName = '';
      }
      else
      {
        dirName = dirName + dir[j] ;
      }
    }

    // Zip and then delete the folder ONLY if it is NOT the new folder we created
    if(dirName!=new_folder)
    {
      zipName = dirName + '.zip' ;
      console.log('name of the new zip : '+zipName);


      // zip the directory
      let dirDest = path + '/' + new_folder +'/' + zipName ;
      console.log('zipping '+ dirDest);
      await zip(dir,dirDest) ;
      console.log('zip done');

      // delete the not zipped directory
      console.log('deleting the useless folders');
      cmd = 'delete_useless_folder.cmd ' + path + ' ' + dirName ;
      exec( cmd, (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return;
         }
        });
      console.log('deleting done');

    }

  }



}



ZipAFolder.main();
