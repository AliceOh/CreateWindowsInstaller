const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');
const fs = require('fs');
const path = require('path');

function setPath() {
  const wixPath = process.env['WIX'] + '\\bin';
  console.log(`adding ${wixPath} to Path`);
  process.env['Path'] = wixPath + ';' + process.env['Path'];
}

async function go_msi(version, exefile) {
  const options = {};
  options.listeners = {
    stdout: logData,
    stderr: logData,
  };

  const cwd = process.cwd();

  // go-msi was struggling with its default temp dir; it wanted something relative to the source dir
  // for some reason.
  console.log('making build path');
  const buildPath = path.join(cwd, 'build');
  fs.mkdirSync(buildPath);

  // go-msi expects things laid out in a certain way; just putting them there is easier than
  // configuring go-msi
  console.log('making bin path');
  const binPath = path.join(cwd, 'bin');
  fs.mkdirSync(binPath);
  console.log('moving exe to bin/exe');
  const appPath = path.join(cwd, 'application');
  // fs.renameSync(path.join(appPath, exefile), path.join(binPath, exefile)); // copy exe file
  fs.cpSync(appPath, binPath, {recursive: true}); // copy ./application folder which can have exe file and dependent files

  try {
    await exec.exec(
      '"C:\\Program Files\\go-msi\\go-msi.exe"',
      ['set-guid'],
      options);
  } catch(e) {
    core.setFailed(e.message);
  }
  
  try {
    await exec.exec(
      '"C:\\Program Files\\go-msi\\go-msi.exe"',
      ['make',
       '--msi', exefile+'.msi',
       '--out', buildPath,     // default build loc fails
       '--version', version],  // required
      options);
  } catch(e) {
    core.setFailed(e.message);
  }
}

function logData(data) {
  console.log(data.toString());
}

try {
  const version = core.getInput('version');
  const exefile = core.getInput('exefile');

  console.log(`Building MSI for version ${version} exe file ${exefile}`);

  setPath();

  go_msi(version, exefile);
} catch (error) {
  core.setFailed(error.message);
}