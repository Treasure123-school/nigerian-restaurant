import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Nigerian Restaurant',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'zrej33jn',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})
