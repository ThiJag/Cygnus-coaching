/**
* This configuration file lets you run `$ sanity [command]` in this folder
* Go to https://www.sanity.io/docs/cli to learn more.
**/
import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({ 
  api: { projectId: 'lfh6q0eb', dataset: 'production' },
  deployment: {
    appId: 'wf3il4s7xam9xzcnzzjn4g7d',
  }
})