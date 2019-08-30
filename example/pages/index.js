import React from 'react'
import Head from 'next/head'
import {
  Pane,
  Paragraph,
  Heading,
  Link
} from 'evergreen-ui'
import Nav from '../components/nav'
import {
  Login,
  ExtendedMenuItem,
  Pagination,
  TableWithSingle,
  TabContentView,
  Table,
  StateAction
} from 'evermut'
import testJson from '../Test/test';
import logo from "../logo-light.svg";
import logoDark from "../logo-dark.svg";

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

    const extraStyle = {
      marginBottom: 30,
      display: 'flex'
    }

    const linkStyle = {
      marginTop: 28,
      marginBottom: 16,
      display: 'flex',
      fontSize: 28,
      textDecoration: 'none',
      color: 'inherit',
      outline: 'none'
    };

    return (
      <>
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
              style={{
                textDecoration: 'none',
                outline: 'none'
              }}
              href="#index"
              name="index"
            >
              <Heading
                size={800}
              >Components</Heading>
            </Link>
            <Pane
              paddingTop={30}
            >
              <Link
                style={linkStyle}
                href="#pagination"
                name="pagination"
              >Pagination</Link>
              <Paragraph
                {...extraStyle}
              >Component renders the pagination to help user to spread data into multiple pages</Paragraph>
              <Pagination
                count={testJson.data.length}
                pageLimit={limit}
                currentPage={offset}
                onClick={this.click}
              />
            </Pane>
            <Pane
              paddingTop={30}
            >
              <Link
                style={linkStyle}
                href="#simple-table-with-pagination"
                name="simple-table-with-pagination"
              >Table</Link>
              <Paragraph
                {...extraStyle}
              >Component displays the data in table. Features include `pagination`.</Paragraph>
              <Table
                header={{name: 'Name', id: 'Id'}}
                body={dataArray}
                pagination={{totalCount: testJson.data.length, offset , limit , click: this.click}}
                onClick={this.tableClick}
              />
            </Pane>
            <Pane
              paddingTop={30}
            >
              <Link
                style={linkStyle}
                href="#advanced-table"
                name="advanced-table"
              >Advanced Table</Link>
              <Paragraph
                {...extraStyle}
              >Component displays the data in table. Feature includes advanced view of the row.</Paragraph>
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
            </Pane>
            <Pane
              paddingTop={30}
            >
              <Link
                style={linkStyle}
                href="#login-form"
                name="login-form"
              >Login Form</Link>
              <Paragraph
                {...extraStyle}
              >Equipped form for user login.</Paragraph>
              <Login
                rounded
                buttonName="Login Button"
                logo={logoDark}
                logoBackground="white"
                login={() => {}}
                style={{
                  margin: 'auto',
                  transform: 'rotate(-45deg) translateX(1px)'
                }}
              />
            </Pane>
            <Pane
              paddingTop={30}
            >
              <Link
                style={linkStyle}
                href="#sticky-menu"
                name="sticky-menu"
              >Sticky Menu</Link>
              <Paragraph
                {...extraStyle}
              >Component displays two lists of choices ( primary and secondary ) sticked on the left of the surface.</Paragraph>
            </Pane>
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
      </>
    )
  }
}

export default Home
