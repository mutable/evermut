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

-----#### ToggleMenu

##### count

Type: `number`, required
Basic structure: `999`

##### pageLimit

Type: `number`
Default: `10`
Basic structure: `999`

##### currentPage

Type: `number`,
Default: `1`
Basic structure: `999`

##### onClick

Type: `func`, required
Basic structure: () => {}
----
----


#### Pagination
----

##### count

Type: `number`, required
Basic structure: `999`

##### pageLimit

Type: `number`
Default: `10`
Basic structure: `999`

##### currentPage

Type: `number`,
Default: `1`
Basic structure: `999`

##### onClick

Type: `func`, required
Basic structure: () => {}



#### StateAction
----

##### actions

Type: `array`, required
Possible values: `'running'`, `'waiting'`, `'warning'`, `'stopped'`
Basic structure: `['running']`

##### onClick

Type: `func`, required
Basic structure: () => {}

##### tooltip

Type: `bool`
Default: `false`
Basic structure: `true` or `false`



#### StickyMenu
----

##### primaryMenu

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
##### secondaryMenu

Type: `array`
Default: `[]`
Basic structure: Same as `primaryMenu`

##### stickBottom

Type: `bool`
Default: `false`
Basic structure: `true` or `false`





## Development

* `yarn build:prod` or `npm run build:prod` transpiles the JavaScript files for production usage
* `yarn build:dev` or `npm run build:dev` transpiles the JavaScript files for development usage
* `yarn prepublish` or `npm run prepublish` transpiles the JavaScript files for production usage

# License
Evergreen is released under the MIT license.

Copyright © 2019  [mutable.io](https://www.mutable.io/)