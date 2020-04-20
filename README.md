### Evermut
<img src="https://raw.githubusercontent.com/mutable/evermut/master/logos.png" />
Mutable with 🌲 Evergreen React UI Framework by Segment

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
import { Logo } from 'evermut'

ReactDOM.render(
  <Logo src={<source_path>} />,
  document.getElementById('root')
)
```
<br />
<br />

### Components


#### BackButton

###### name

Type: `string`

Default: `Back`

Basic structure: `Back to somewhere`

###### goBack

Type: `func`, required

Basic structure: () => {}

<br />

#### BreadCrumbs

###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### disable

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### crumbs

Type: `array`, required

Basic structure:
```
{
  crumb: `string` or `array`, # required
  route: `string` or `object`, # required
}
```
Basic structure of `crumb` if

* string
```
  crumb: `string`, # required 
```
* object
```
  crumb: [
    {
      name: `string`, # required ,
      id: `string` or `number`, # required 
    }, 
    ...
  ]
```

Basic structure of `route` if

* string
```
 route: `string`, # required 
```
* object
```
  route: {
    name: `string`, # required ,
    id: `string` or `number`, # required 
  }
```

###### onClick

Type: `func`, required

Basic structure: () => {}

<br />

#### CircularProgressBar

###### size

Type: `number`, required

Basic structure: `999`

###### strokeWidth

Type: `number`, required

Basic structure: `999`

###### strokeColor

Type: `string`, required

Basic structure: `#525F7F`

###### secondaryStrokeColor

Type: `string`, required

Basic structure: `#99a5c2`

###### percentage

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### step 

Type: `object`, required

Basic structure: 
```
{
  current: `number`, # required
  count: `number`, # required
}
```

Example:
```
{
  current: 2,
  count: 10
}
```

<br />


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

<br />

#### HorizontalMenu

###### primaryMenu

Type: `array`, required

Basic structure:
```
[
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

###### selectedColor

Type: `string`

Default: `#f5f6f7`

Basic structure: `#f5f6f7`

###### logo

Type: `elementType`

Default: none

Basic structure: <Logo src={logo} />

###### listLogo

Type: `elementType`

Default: none

Basic structure: <Logo src={logo-dark} />

<br />

#### LeftSideList

###### list

Type: `array`, required

Basic structure:

```
[
  {
    name: 'Sam',
    id: '123',
    ... # anything that is neccessary
  },
  ...
]
```

###### selected

Type: `number`  or `string`, required

Basic struncture: `123`

###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### header

Type: `function`

Default: none

Basic structure: () => {} # some function that will return a view

###### body

Type: `function`

Default: none

Basic structure: () => {} # some function that will return a view

###### footer

Type: `function`

Default: none

Basic structure: () => {} # some function that will return a view

###### selectItem

Type: `function`

Default: none

Basic structure: () => {}

###### backButtonName

Type: `string`

Default: `Back`

Basic structure: `Back to somewhere`

###### backButtonClick

Type: `function`

Default: none

Basic structure: () => {}

###### selectedColor

Type: `string`

Default: `#f5f6f7`

Basic structure: `#f5f6f7`

###### defaultBackground

Type: `string`

Default: `white`

Basic structure: `white`

###### backButtonStyle

Type: `object`

Default: {}

Basic structure: `{ margin: 10 }`

###### itemStyle

Type: `object`

Default: {}

Basic structure: `{ margin: 10 }`

###### containerStyle

Type: `object`

Default: {}

Basic structure: `{ margin: 10 }`


<br />

#### Loader

###### style

Type: `object` # based on ui-box, not required
Default: `{}`

###### height

Type: `string`
Default: `100vh`


you can add other styles regarding the Loader container other than `height` property


<br />


#### Login

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


<br />


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

<br />


#### Pagination


###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### count

Type: `number`, required

Basic structure: `999`

###### limit

Type: `number`

Default: `10`

Basic structure: `999`


###### pageIndex

Type: `number`

Default: `1`

Basic structure: `999`

###### onClick

Type: `func`, required

Basic structure: () => {}


<br />

#### ResponsiveMenu

###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### isHorizontal

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### stickBottom

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### primaryMenuSticky

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
  # or
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

###### secondaryMenuSticky

Type: `array`

Default: `[]`

Basic structure: Same as `primaryMenuSticky`

###### primaryMenuHorizontal

Type: `array`, required

Basic structure: 
```
[
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

###### secondaryMenuHorizontal

Type: `array`

Default: `[]`

Basic structure: Same as `primaryMenuHorizontal`

###### selectedColorSticky

Type: `string`

Default: `#f5f6f7`

Basic structure: `#f5f6f7`

###### selectedColorHorizontal

Type: `string`

Default: `#f5f6f7`

Basic structure: `#f5f6f7`

###### logo

Type: `elementType`

Default: none

Basic structure: <Logo src={logo} />

###### listLogo

Type: `elementType`

Default: none

Basic structure: <Logo src={logo-dark} />

###### stickyStyle

Type: `object`

Basic structure: `{ margin: 10 }`

###### horizontalStyle

Type: `object`

Basic structure: `{ margin: 10 }`


<br />

#### ResponsiveSideSheet

###### isFullWidth

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### component

Type: `elementType`, required

Basic structure: () => {} # function that will return a view

###### onClose

Type: `func`, required

Basic structure: () => {}

###### isOpen

Type: `bool`, required

Basic structure: `true` or `false`

###### closeButtonStyle

Type: `object`, required

Default: `{}`

Basic structure: { margin: 10 }


<br  />

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


<br />


#### Stepper

###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### show

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### steps

Type: `array`, required


Basic structure: 
```
[
  {
    link: {
      name: `string`,
      path: `string`
    },
    component: <Component />,
    func: `func`,
  },
  ...
]
```

Examples: 
```
[
  {
    link: {
      name: 'Sme name',
      path: '#name'
    },
    component: 'Name Component',
    func: this.nameFunction
  },
  ...
]

```
###### func

Type: `func`, required

Basic structure: () => {}

<br />


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
  # or
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


<br />


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

<br />


#### Table


###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### headerNames

Type: `array`

Default: `[]`

Example: 
```
[
  {name: 'Owner', icon: 'arrow-up', func: (item) => this.sort(item)},
  {name: 'Containers', helper: 'min/max'},
  {name: 'Id'},
  ...
]
```

###### list

Type: `array`, required

Example:
```
[
  {
    "id": itemId,
    "visibleId": itemId, # please note that if you need the ID to be visible in the table you need to pass it with different property name, as word 'id' is reserved
    "name": "itemName",
    ...
  },
  ...
]
```

###### pagination

Type: `object`

Look at `Pagination` component for details

###### search

Type: `function`, required

Basic structure: () => {}

###### onClick

Type: `function`, required

Basic structure: () => {}

<br />

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


<br />


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


<br />

#### ToggleMenu

###### loading

Type: `bool`

Default: `false`

Basic structure: `true` or `false`

###### disabledColor

Type: `string`

Default: `#edf0f2`

Basic structure: `#edf0f2`

###### defaultBackground

Type: `string`

Default: `white`

Basic structure: `white`

###### buttonColor

Type: `string`

Default: `#1070ca`

Basic structure: `#1070ca`

###### buttonName

Type: `string`

Default: `Choose file`

Basic structure: `Any other button name`

###### acceptedFileTypes

Type: `array`

Default: `[]`

Basic structure: `[ '.tar', '.jpg' ]`

###### onChange

Type: `function`, required

Basic structure: `() => {}`



<br />



## Development

* `yarn build` or `npm run build` transpiles the JavaScript files for production usage

# License
Evermut is released under the MIT license.

Copyright © 2019  [mutable.io](https://www.mutable.io/)
