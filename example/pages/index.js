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
  Loader,
  Login,
  ExtendedMenuItem,
  Pagination,
  TableWithSingle,
  TabContentView,
  Table,
  StateAction,
  BreadCrumbs,
  Stepper,
  CircularProgressBar
} from 'evermut'
import testJson from '../Test/test';
import logo from "../logo-light.svg";
import logoDark from "../logo-dark.svg";

class Home extends React.Component {
  constructor() {
    super();

    const _dataArray = [];
    const _offset = 1;
    const _limit = 4;
    for(let i = _offset-1; i < _limit; i++) {
      _dataArray.push(testJson.data[i]);
    }

    this.state = {
      dataArray: _dataArray,
      filteredArray: _dataArray,
      limit: _limit,
      offset: _offset,
      overallCount: testJson.data.length
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

  breadCrumbsClick(item) {
    console.log('breadCrumbsClick', item)
  }
  
  stepperFunc(item) {
    console.log('stepperFunc', item)
  }

  stepFunc(item) {
    console.log('stepFunc', item)
  }

  searchTable(value) {
    const { dataArray } = this.state;
    let filtered =  testJson.data.filter(item => item.name.startsWith(value));
    let filteredLength = filtered.length
    if (filtered.length === testJson.data.length) {
      filtered = dataArray;
      filteredLength = testJson.data.length;
    }
    this.setState({ filteredArray: filtered, overallCount: filteredLength });
  }

  click = (offset, limit = this.state.limit, count = testJson.data.length) => {
    const array = [];
    for(let i = (offset-1)*limit; (i < offset*limit) && (i < count); i++) {
      if(offset + limit <= count) {
        array.push(testJson.data[i]);
      } else break;
    }
    this.setState({filteredArray: array})
  }

  render() {
    const companies = [
      {id: 1, title: "title 1", description: "description 1", tags: ['some', 'tags'], actions: [<StateAction key='stateActionkey' actions={['running']} onClick={this.click} tooltip />, 'waiting'], menu: { list: [{name: 'Something', link: '/some'}, {name: 'Logs', link: '/logs'}], onClick: this.selectedMenuItem }},
      {id: 2, title: "title 2", description: "description 2", tags: ['some', 'tags'], actions: ['waiting'], menu: { list: [{name: 'New', link: '/new'}], onClick: this.selectedMenuItem}},
      {id: 3, title: "title 3", description: "description 3", tags: ['some', 'tags'], actions: ['stopped'], menu: { list: [{name: 'delete', link: '/delete'}], onClick: this.selectedMenuItem}},
      {id: 4, title: "title 4", description: "description 4", tags: ['some', 'tags'], actions: ['warning'], menu: { list: [{name: 'edit', link: '/edit'}], onClick: this.selectedMenuItem}}
    ];

    const steps = [
      {link: {name: 'Repo with longer name', path: '#repo'}, component: 'Repo Component', func: this.stepFunc},
      {link: {name: 'Branch', path: '#branch'}, component: 'Branch Component', func: this.stepFunc},
      {link: {name: 'File', path: '#file'}, component: 'File Component', func: this.stepFunc},
      {link: {name: 'You have finished', path: '#finsih'}, component: 'Successfully finished', func: this.stepFunc},
    ];
    const { dataArray, limit, offset, filteredArray, overallCount } = this.state;

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

    const list = filteredArray.map(item => {
      return (({ name, position, id }) => ({ name, position, visibleId: id, id }))(item);
    })

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
                href="#loader"
                name="loader"
              >Loader</Link>
              <Paragraph {...extraStyle}>Loader</Paragraph>
              <Loader height='100px' />
            </Pane>
            <Pane
              paddingTop={30}
            >
              <Link
                style={linkStyle}
                href="#circularProgress"
                name="circularProgress"
              >Circular progress</Link>
              <Paragraph
                {...extraStyle}
              >Component shows a progress in circular form</Paragraph>
              <Pane display='flex' justifyContent='space-evenly'>
                <CircularProgressBar 
                  size={100}
                  strokeWidth={10}
                  strokeColor='#525F7F'
                  secondaryStrokeColor='#99a5c2'
                  percentage
                  step={{current: 1, count: 4 }}
                />
                <CircularProgressBar 
                  size={100}
                  strokeWidth={10}
                  strokeColor='#525F7F'
                  secondaryStrokeColor='#99a5c2'
                  step={{current: 2, count: 4 }}
                />
                <CircularProgressBar 
                  size={100}
                  strokeWidth={10}
                  strokeColor='#525F7F'
                  secondaryStrokeColor='#99a5c2'
                  step={{current: 5, count: 4 }}
                />
              </Pane>
            </Pane>
            <Pane
              paddingTop={30}
            >
              <Link
                style={linkStyle}
                href="#stepper"
                name="stepper"
              >Stepper</Link>
              <Paragraph
                {...extraStyle}
              >Component regulates user flow</Paragraph>
              <Pane marginBottom={16}>
                <Paragraph>#Stepper with drop-down list</Paragraph>
                <Stepper
                  func={(item) => this.stepperFunc(item)}
                  steps={steps}
                />
              </Pane>
              <Pane>
                <Paragraph>#Stepper with the list on the left</Paragraph>
                <Stepper
                  show
                  func={(item) => this.stepperFunc(item)}
                  steps={steps}
                />
              </Pane>
            </Pane>
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
                href="#bread-crumbs"
                name="bread-crumbs"
              >BreadCrumbs</Link>
              <Paragraph
                {...extraStyle}
              >Component helps to navigate between pages.</Paragraph>
              <BreadCrumbs
                crumbs={
                  [
                    {crumb: 'Stack1', route: '/stack1'},
                    {crumb: 'Stack2'},
                    {crumb: [{id: '3', name: 'Stack3'}, {id: '4', name: 'Stack4'}], route: {id: '4', name: 'Stack4'}},
                  ]
                }
                onClick={this.breadCrumbsClick}
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
                loading={loading}
                search={(value) => this.searchTable(value)}
                headerNames={[{name: 'Position' }, {name: 'Id'}]}
                list={list}
                pagination={{count: overallCount, pageIndex: offset, limit , onClick: (index) => this.click(index)}}
                onClick={(item) => this.tableClick(item)} 
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
                logoStyle={{
                  background: 'white',
                  transform: 'rotate(-45deg) translateX(1px)'
                }}
                logoBackground="white"
                login={() => {}}
                style={{
                  margin: 'auto'
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
