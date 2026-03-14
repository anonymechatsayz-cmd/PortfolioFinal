const { execSync } = require('child_process');
try {
  console.log(execSync('git status').toString());
  console.log('---');
  console.log(execSync('git log -n 3 --oneline').toString());
} catch (e) {
  console.error(e.toString());
}
