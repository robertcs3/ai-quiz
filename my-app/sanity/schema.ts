import { type SchemaTypeDefinition } from 'sanity'
import questions from './questions'
import modules from './modules'
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [questions, modules],
}
