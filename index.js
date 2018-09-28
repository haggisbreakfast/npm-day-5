var chalk = require('chalk');

var message = 'Hello ' + chalk.blue('World');
console.log(message);
console.log(
  chalk.green('I am a green line ' + chalk.blue.underline.bold('with a blue substring') + ' that becomes green again!')
);
const error = chalk.bold.red;
const warning = chalk.keyword('orange');

console.log(error('Wrong'));
console.log(warning('Warning!'));
const ignoreChars = /[^!-~]/;

function rainbow(str, offset) {
  if (!str || str.length === 0) {
    return str;
  }

  const hueStep = 360 / str.replace(ignoreChars, '').length;

  let hue = offset % 360;
  const chars = [];
  for (const c of str) {
    if (c.match(ignoreChars)) {
      chars.push(c);
    } else {
      chars.push(chalk.hsl(hue, 100, 50)(c));
      hue = (hue + hueStep) % 360;
    }
  }

  return chars.join('');
}

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function animateString(str) {
  console.log();
  for (let i = 0; i < 360 * 5; i++) {
    console.log('\u001B[1F\u001B[G ', rainbow(str, i));
    await sleep(2); // eslint-disable-line no-await-in-loop
  }
}

console.log();
animateString('this is siiiiiiiiiiiiiick').then(() => console.log());
