const { spawn } = require('child_process');
const print = data => console.log(data.toString());

// Start main process
main();

// Main process
function main () {
  const $ = {};
  const { log } = console;
  const showDevTools = process.argv.includes('--dev');
  const electronArgv = showDevTools ? ['--', '--dev'] : [];

  log('✨ Starting react! ✨');
  $.react = spawn('npm', ['run', 'start-react-dev']);
  
  $.react.on('error', print);
  $.react.stderr.on('data', print);
  $.react.stdout.on('data', data => {
    print(data);

    if(data.toString().includes('Compiled successfully')) {
      log(`💫 Starting electron! 💫`);

      $.electron = spawn('npm', ['run', 'start-electron-dev', ...electronArgv]);

      $.electron.on('error', print);
      $.electron.stderr.on('data', print);
      $.electron.stdout.on('data', print);
    }
  });
}