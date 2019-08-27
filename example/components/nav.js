import React from 'react'
import Link from 'next/link'
import { StickyMenu } from 'evermut'

const primaryMenu = [
  {
    // logo: <Logo src={logo} />,
    props: {
      href: '/',
      target: '_blank',
      paddingTop: 10
    }
  },
  {
    name: 'Stacks',
    icon: 'stacked-chart',
    props: {
      href: '/',
      target: '_blank',
      paddingTop: 10
    }
  }
];

const secondaryMenu = [
  {
    name: 'Account Settings',
    icon: 'settings',
    props: {
      href: '/',
      target: '_blank',
      paddingTop: 10
    }
  },
  {
    name: 'Log-out',
    icon: 'log-out',
    props: {
      href: '#',
      paddingTop: 10,
      onSelect: () => onSelect('Logout')
    }
  },
]

const onSelect = (item) => {
  console.log('item', item)
}

const Nav = () => (
  <StickyMenu
    primaryMenu={primaryMenu}
    secondaryMenu={secondaryMenu}
  />
)

export default Nav
