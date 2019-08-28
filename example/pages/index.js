import React from 'react'
// import Link from 'next/link'
import Head from 'next/head'
import { Pane, Link } from 'evergreen-ui'
import Nav from '../components/nav'
import { Login, TableWithSingle, ExtendedMenuItem, TabContentView, Table, StateAction } from 'evermut'
import testJson from '../Test/test';
import logo from "../logo-light.svg";

class Home extends React.Component {
  constructor() {
    super();

    const _dataArray = [];
    const _offset = 1;
    const _limit = 6;
    for(let i = _offset-1; i < _limit; i++) {
      _dataArray.push(testJson.data[i]);
    }

    this.state = {
      dataArray: _dataArray,
      limit: _limit,
      offset: _offset
    }
  }

  selectedMenuItem(item) {
    console.log('clicked menu', item)
  }

  selectItem(item) {
    console.log('clicked item', item)
  }

  tableClick(item) {
    console.log('clicked table item', item)
  }

  stateActionClick(item) {
    console.log('clicked action', item)
  }

  click = (offset, limit, count = testJson.data.length) => {
    const array = [];
    for(let i = (offset-1)*limit; (i < offset*limit) && (i < count); i++) {
      if(offset + limit <= count) {
        array.push(testJson.data[i]);
      } else break;
    }
    this.setState({dataArray: array})
  }

  render() {
    const companies = [
      {id: 1, title: "title 1", description: "description 1", tags: ['some', 'tags'], actions: [<StateAction actions={['running']} onClick={this.click} tooltip />, 'waiting'], menu: { list: [{name: 'Something', link: '/some'}, {name: 'Logs', link: '/logs'}], onClick: this.selectedMenuItem }},
      {id: 2, title: "title 2", description: "description 2", tags: ['some', 'tags'], actions: ['waiting'], menu: { list: [{name: 'New', link: '/new'}], onClick: this.selectedMenuItem}},
      {id: 3, title: "title 3", description: "description 3", tags: ['some', 'tags'], actions: ['stopped'], menu: { list: [{name: 'delete', link: '/delete'}], onClick: this.selectedMenuItem}},
      {id: 4, title: "title 4", description: "description 4", tags: ['some', 'tags'], actions: ['warning'], menu: { list: [{name: 'edit', link: '/edit'}], onClick: this.selectedMenuItem}}
    ]
    const { dataArray, limit, offset } = this.state;

    const loading = false;

    const onSelect = (name) => {
      console.log('onSelect', name);
    }

    const linkStyle = {
      textDecoration: 'none',
      color: 'inherit',
      outline: 'none'
    };

    return (
      <div>
        <Pane
          display="flex"
        >
          <Head>
            <title>Evermut components</title>
          </Head>
          <Nav />

          <Pane
            style={{
              width: 'calc(100% - 80px)',
              display: 'inline-block',
              verticalAlign: 'top',
              padding: '20px'
            }}
          >
            <Link
              style={linkStyle}
              href="#simple-table-with-pagination"
              name="simple-table-with-pagination"
            >Simple Table with pagination</Link>
            <Table
              header={{name: 'Name', id: 'Id'}}
              body={dataArray}
              pagination={{totalCount: testJson.data.length, offset , limit , click: this.click}}
              onClick={this.tableClick}
            />
            <Link
              style={linkStyle}
              href="#advanced-table"
              name="advanced-table"
            >Advanced Table</Link>
            <TableWithSingle
              rows={companies}
              loading={loading}
              selectItem={this.selectItem}
              listItem={ExtendedMenuItem}
              singleComponent={{
               type: TabContentView,
               props: {
                 tabs: [
                   {name: 'Services', component: 'Services' },
                   {name: 'Collaborators', component: 'Collaborators' }
                 ],
               }
              }}
            />
            <Link
              style={linkStyle}
              href="#login-form"
              name="login-form"
            >Login Form</Link>
            <Login
             rounded
             buttonName="buttonName"
             logo={logo}
             logoBackground="black"
             login={() => {}}
             // WARNING! to have not rotated icon add style={{transform: 'rotate(-45deg) translateX(1px)'}} in new version of evermoot 1.0.10
            />
          </Pane>
        </Pane>
        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
          }
          a:focus {
            box-shadow: none!important;
          }
        `}</style>
      </div>
    )
  }
}

export default Home
