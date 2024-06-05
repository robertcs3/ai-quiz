export default {
    name: 'modules',
    title: "Modules",
    type: 'document',
    fields: [
      {
        name: 'title',
        title: "Title",
        type: "string"
      },
      {
        name: "summary",
        title: "Summary",
        type: "string"
      },
      {
        name: 'sections',
        title: "Sections",
        type: 'array',
        of: [{type: 'string'}]
      },
      
      {
        name: "moduleId",
        title: "Module Id",
        type: "string"
      },
    ]
  }

  