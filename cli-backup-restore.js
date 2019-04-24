#!/usr/bin/env node
const commander = require(`commander`);
const path = require(`path`);

const { version } = require(`./package`);
const componentService = require(`./services/component`);
const config = require(`./config`);
const storyService = require(`./services/story`);
// const unpaginate = require(`./utils/unpaginate`);

async function start() {
  commander
    .version(version)
    .parse(process.argv);

  const filePath = path.resolve(process.cwd(), process.argv[2]);
  // eslint-disable-next-line import/no-dynamic-require, global-require
  const file = require(filePath);

  if (file.components) {
    // eslint-disable-next-line no-restricted-syntax
    for (const component of file.components) {
      if (config.dryRun) {
        // eslint-disable-next-line no-console
        console.info(`Component "${component.display_name}" would've been restored`);
        // eslint-disable-next-line no-continue
        continue;
      }

      // eslint-disable-next-line no-await-in-loop
      await componentService.createOrUpdate({ component });
      // eslint-disable-next-line no-console
      console.info(`Restored component "${component.display_name}"`);
    }
  }

  if (file.stories) {
    // eslint-disable-next-line no-restricted-syntax
    for (const story of file.stories) {
      if (config.dryRun) {
        // eslint-disable-next-line no-console
        console.info(`Story "${story.name}" would've been restored`);
        // eslint-disable-next-line no-continue
        continue;
      }

      // eslint-disable-next-line no-await-in-loop
      await storyService.createOrUpdate({ story });
      // eslint-disable-next-line no-console
      console.info(`Restored story "${story.name}"`);
    }
  }
}

start();