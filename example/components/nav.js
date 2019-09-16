import React from 'react'
import Link from 'next/link'
import { StickyMenu, Logo } from 'evermut'
import logo from "../logo-light.svg";

const primaryMenu = [
  {
    logo: <Logo src={logo} />,
    props: {
      href: '#index',
      paddingTop: 10
    }
  },
  {
    name: 'Circular Progress',
    icon: 'doughnut-chart',
    props: {
      href: '#circularProgress',
      paddingTop: 10
    }
  },
  {
    name: 'Stepper',
    icon: 'exchange',
    props: {
      href: '#stepper',
      paddingTop: 10
    }
  },
  {
    name: 'Pagination',
    icon: 'numerical',
    props: {
      href: '#pagination',
      paddingTop: 10
    }
  },
  {
    name: 'Breadcrumbs',
    icon: 'layout-linear',
    props: {
      href: '#bread-crumbs',
      paddingTop: 10
    }
  },
  {
    name: 'Table',
    icon: 'join-table',
    props: {
      href: '#simple-table-with-pagination',
      paddingTop: 10
    }
  },
  {
    name: 'Advanced Table',
    icon: 'panel-table',
    props: {
      href: '#advanced-table',
      paddingTop: 10
    }
  },
  {
    name: 'Login Form',
    icon: 'log-in',
    props: {
      href: '#login-form',
      paddingTop: 10
    }
  }
];

const secondaryMenu = [
  {
    name: 'Sticky Menu',
    icon: 'list-detail-view',
    props: {
      href: '#sticky-menu',
      paddingTop: 10
    }
  }
]

const onSelect = (item) => {
  console.log('item', item)
}

const Nav = () => (
  <StickyMenu
    style={{
      width: "80px",
      display: 'inline-block',
      verticalAlign: 'top'
    }}
    primaryMenu={primaryMenu}
    secondaryMenu={secondaryMenu}
  />
)

export default Nav
