import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { Pane } from 'evergreen-ui'
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
    return (
      <Pane>
        <Head>
          <title>Home</title>
        </Head>

        <Nav />

        <Pane>
          <Login
           rounded
           buttonName="buttonName"
           logo={logo}
           logoBackground="black"
           login={() => {}}
           // WARNING! to have not rotated icon add style={{transform: 'rotate(-45deg) translateX(1px)'}} in new version of evermoot 1.0.10
          />
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
          <Table
            header={{name: 'Name', id: 'Id'}}
            body={dataArray}
            pagination={{totalCount: testJson.data.length, offset , limit , click: this.click}}
            onClick={this.tableClick}
          />
        </Pane>
      </Pane>
    )
  }
}

export default Home

/*
<style jsx>{`
          .hero {
            width: 100%;
            color: #333;
          }
          .title {
            margin: 0;
            width: 100%;
            padding-top: 80px;
            line-height: 1.15;
            font-size: 48px;
          }
          .title,
          .description {
            text-align: center;
          }
          .row {
            max-width: 880px;
            margin: 80px auto 40px;
            display: flex;
            flex-direction: row;
            justify-content: space-around;
          }
          .card {
            padding: 18px 18px 24px;
            width: 220px;
            text-align: left;
            text-decoration: none;
            color: #434343;
            border: 1px solid #9b9b9b;
          }
          .card:hover {
            border-color: #067df7;
          }
          .card h3 {
            margin: 0;
            color: #067df7;
            font-size: 18px;
          }
          .card p {
            margin: 0;
            padding: 12px 0 0;
            font-size: 13px;
            color: #333;
          }
        `}</style>
*/