### Evermut
<img src="https://github.com/mutable/evermut/blob/master/logos.png" />
Mutable with 🌲 Evergreen React UI Framework by Segment https://evergreen.segment.com/

### Install and use components
```
$ npm install --save evermut
# or
$ yarn add evermut
```

A working version looks like:
```
import React from 'react'
import ReactDOM from 'react-dom'
import { Logo } from 'evergreen-ui'

ReactDOM.render(
  <Logo src={<source_path>} />,
  document.getElementById('root')
)
```

### Components



#### ExtendedMenuItem

###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### details

Type: `object`, required

Basic structure:
```
{
  id: `string` or `number`, # required
  title: `string`, # required
  description: `string`,
  tags: `array`,
  actions: `array`, # required
  menu: `object of objects 'list' and 'onClick'`
}
```

Example:
```
{
  id: 1,
  title: "Here Is Your Title",
  description: "Here Is Your Description",
  tags: ['some', 'tags', ...],
  actions: [
    <StateAction actions={['running']} onClick={this.click} tooltip />,
    'waiting',
    ...
  ],
  menu: {
    list: [
      {name: 'Something', link: '/some'},
      ...
    ],
    onClick: () => {}
  }
}

```



#### Loader

###### style

Type: `object` # based on ui-box, not required
Default: `{}`




#### Login

###### logoBackground

Type: `string`
Default: `#f7f8fa`

###### logo

Type: `string`

Default: null

Basic structure: `"./logo.svg"`

###### rounded

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### buttonName

Type: `string`

Default: 'Login'

###### title

Type: `string`

Default: `''`

###### login

Type: `func`, required

Basic structure: () => {}




#### Logo


###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### src

Type: `string`, required

Basic structure: `"./logo.svg"`

###### style

Type: `object`

Default: 
```
# based on ui-box, not required
{
  height: 60,
  transform: 'rotate(-45deg) translateX(1px)'
}
```



#### Pagination


###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### count

Type: `number`, required

Basic structure: `999`

###### pageLimit

Type: `number`

Default: `10`

Basic structure: `999`


###### currentPage

Type: `number`,
Default: `1`
Basic structure: `999`

###### onClick

Type: `func`, required

Basic structure: () => {}



#### StateAction


###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### actions

Type: `array`, required

Possible values: `'running'`, `'waiting'`, `'warning'`, `'stopped'`

Basic structure: `['running']`

###### onClick

Type: `func`, required

Basic structure: () => {}

###### tooltip

Type: `bool`

Default: `false`

Basic structure: `true` or `false`



#### StickyMenu


###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### primaryMenu

Type: `array`, required

Basic structure: 
```
[
  {
    logo: <Component />,
    props: {
      href: '#',
      target: '_blanket',
      onSelect: () => {}, # not required
      ...style # style props based on ui-box
    }
  },
  #or
  {
    name: 'Name',
    icon: 'icon-name', # based on ui-box, not required
    props: {
      href: '#',
      target: '_blanket',
      onSelect: () => {}, # not required
      ...style # style props based on ui-box
    }
  },
  ...
]
```
###### secondaryMenu

Type: `array`

Default: `[]`

Basic structure: Same as `primaryMenu`


###### stickBottom

Type: `bool`

Default: `false`

Basic structure: `true` or `false`




#### TabContentView # Coming Soon

###### tabs

Type: `array`, required

Basic structure: 
```
[
  {
    name: 'Some menu item',
    link: '/some-menu-item-link'
  }
  ...
]
```



#### Table


###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### header

Type: `object`, required

Example: 
```
{
  "id-key": '`id` column header name',
  "country-key": "`country` column header name",
  ...
}
```

###### body

Type: `array`, required

Example:
```
{
  "id": 1,
  "name": "Taylor",
  "surname": "Davis",
  "country": "Netherlands",
  "position": "DevOps",
  "email": "taylor.davis@fancygrid.com"
},
```

###### pagination

Type: `object`

Look at `Pagination` component for details



#### TableWithSingle

###### basis

Type: `number`

Default: `300`

###### rows

Type: `array`, required

Example:
```
[
  {
    id: 1,
    title: "Here Is Your Title",
    description: "Here Is Your Description",
    tags: ['some', 'tags', ...],
    actions: [
      <StateAction actions={['running']} onClick={this.click} />,
      'waiting',
      ...
    ],
    menu: {
      list: [
        {name: 'Something', link: '/some'},
        ...
      ],
      onClick: () => {}
    }
  },
  ...
]
```

###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`


###### listItem

Type: `elementType`, required


###### singleComponent # Coming soon




#### ToggleMenu

###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### menuList

Type: `array`, required

Basic structure: 
```
[
  {
    name: 'Component name',
    component: <Component />
  },
  ...
]
```
###### onClick

Type: `func`, required

Basic structure: () => {}





## Development

* `yarn build:prod` or `npm run build:prod` transpiles the JavaScript files for production usage
* `yarn build:dev` or `npm run build:dev` transpiles the JavaScript files for development usage
* `yarn prepublish` or `npm run prepublish` transpiles the JavaScript files for production usage

# License
Evergreen is released under the MIT license.

Copyright © 2019  [mutable.io](https://www.mutable.io/)
