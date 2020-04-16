import React from 'react'
import Head from 'next/head'
import {
  Pane,
  Paragraph,
  Heading,
  Link,
  Button,
  Text,
  Tooltip,
  Icon
} from 'evergreen-ui'
import Nav from '../components/nav'
import {
  UploadForm,
  LeftSideList,
  Logo,
  HorizontalMenu,
  BackButton,
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
} from 'evermut';
import testJson from '../Test/test';
import logo from "../logo-light.svg";
import logoDark from "../logo-dark.svg";


const FONT_SIZE = 14;
const FONT_SIZE_SMALL = 10;
const BUTTON_HEIGHT = 22;
const MARGIN = 22;
const SECONDARY = 'rgba(66,90,112,0.5)';

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

  goBack = () => {
    console.log('back button clicked');
  }

  _getLeftSideListHeader = (item) =>  {
    return (
      <Pane display="flex" justifyContent="space-between">
        <Pane>
          <Heading fontSize={FONT_SIZE}>{item.name}</Heading>
          <Paragraph color={SECONDARY} fontSize={FONT_SIZE_SMALL}>{item.id}</Paragraph>
        </Pane>
        <Button
          iconBefore="settings"
          fontSize={FONT_SIZE_SMALL}
          height={BUTTON_HEIGHT}
          appearance='minimal'
          color='default'
          onClick={(e) => this._settingOpen(e, item)}
        >Settings</Button>
      </Pane>
    );
  }

  _getLeftSideListBody(item) {
    return <Text>{item.email}</Text>;
  }

  _getLeftSideListFooter(item) {
    return (
      <Pane display='flex' justifyContent='space-between' marginTop={MARGIN}>
        <Tooltip content="Country">
          <Text
            fontSize={FONT_SIZE-2}
            display="flex"
            alignItems="center"
          ><Icon icon="heat-grid" marginRight={MARGIN} />{item.country}</Text>
        </Tooltip>
      </Pane>
    );
  }

  selectItem(id) {
    console.log('left side list click with ', id);
  }

  _settingOpen(e, item) {
    if(e) e.stopPropagation();

    console.log('_settingOPen clicked with ', item)
  }

  uploadFormClick(state, data, fileName) {
    console.log('uploadFormClick', state, data, fileName)
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

    const primaryMenu = [
      {
        name: 'Table',
        icon: 'applications',
        props: {
          onClick: () => console.log('table clicked'),
          paddingTop: 10
        },
        active: true
      },
      {
        name: 'Circular Progress',
        icon: 'doughnut-chart',
        props: {
          onClick: () => console.log('Circular clicked'),
          paddingTop: 10
        },
        active: false
      },
    ];

    const secondaryMenu = [
      {
        name: 'Sticky Menu',
        icon: 'list-detail-view',
        props: {
          onClick: () => console.log('Sticky clicked'),
          paddingTop: 10
        },
        active: false
      },
      {
        name: 'Stepper',
        icon: 'exchange',
        props: {
          onClick: () => console.log('Stepper clicked'),
          paddingTop: 10
        },
        active: false
      },
    ]

    const leftList = filteredArray.map(item => {
      return (({ name, email, id, country }) => ({ name, email, id, country }))(item);
    })
    const leftLoading = false;

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
              display: 'inline-block',
              verticalAlign: 'top',
              padding: '20px',
              width: '100%'
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
                href="#backButton"
                name="backButton"
              >Back Button</Link>
              <Paragraph {...extraStyle}>Back Button</Paragraph>
              <BackButton goBack={() => this.goBack()} />
            </Pane>
            <Pane
              paddingTop={30}
            >
              <Link
                style={linkStyle}
                href="#uploadForm"
                name="uploadForm"
              >Upload Form</Link>
              <Paragraph {...extraStyle}>Upload form that also supports Drag-n-drop feature.</Paragraph>
              <UploadForm
                acceptedFileTypes={[".tar", ".zip", ".jpg"]}
                onChange={(state, data, fileName) => this.uploadFormClick(state, data, fileName)}
              />
            </Pane>
            <Pane
              paddingTop={30}
            >
              <Link
                style={linkStyle}
                href="#leftSideList"
                name="leftSideList"
              >Left Side List</Link>
              <Paragraph {...extraStyle}>This component can be used as a list on the left with relevant Content on the right</Paragraph>
              <LeftSideList
                list={leftList}
                selected={1}
                loading={leftLoading}
                header={(item) => this._getLeftSideListHeader(item)}
                body={(item) => this._getLeftSideListBody(item)}
                footer={(item) => this._getLeftSideListFooter(item)}
                selectItem={(id) => this.selectItem(id)}
                backButtonName='Back to prev page'
                backButtonClick={() => this.goBack()}
              />
            </Pane>

            <Pane
              paddingTop={30}
            >
              <Link
                style={linkStyle}
                href="#horizontalMenu"
                name="horizontalMenu"
              >Horizontal Menu</Link>
              <Paragraph {...extraStyle}>This menu is more convenient to use in mobile views.</Paragraph>
              <HorizontalMenu
                logo={<Logo src={logo} style={{ height: 40 }}/>}
                listLogo={<Logo src={logoDark} style={{ height: 40, margin: 15 }}/>}
                primaryMenu={primaryMenu}
                secondaryMenu={secondaryMenu}
                selectedColor='#f5f6f7'
              />
            </Pane>
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
