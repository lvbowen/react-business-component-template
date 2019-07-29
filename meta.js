module.exports = [
  {
    name: 'name',
    type: 'input',
    required: true,
    message: 'Project name',
  },
  {
    name: 'cName',
    type: 'input',
    required: true,
    message: 'Project chinese name'
  },
  {
    name: 'description',
    type: 'input',
    required: false,
    message: 'Project description',
    default: 'A ZCY react business component template project',
  },
  {
    name: 'author',
    type: 'input',
    message: 'Author',
  },
  {
    name: 'gitRemote',
    type: 'input',
    message: 'git remote',
  }
]