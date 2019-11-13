import React from 'react';
import { storiesOf, forceReRender } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { withKnobs, number, array, object } from "@storybook/addon-knobs";

import Table from '../components/Table';

const list = [
  {name: "Taylor", position: "DevOps", visibleId: 1, id: 1},
  {name: "Isabella", position: "PHP Developer", visibleId: 2, id: 2},
  {name: "Chloe", position: "C++ Developer", visibleId: 3, id: 3},
  {name: "Ivan", position: "C++ Developer", visibleId: 4, id: 4},
  {"name": "Ivan", "position": "Data Science Engineer", visibleId: 5, id: 5},
  {"name": "Ella", "position": "ASP.NET Developer", visibleId: 6, id: 6},
  {"name": "Elizabeth", "position": "iOS Developer", visibleId: 7, id: 7},
  {"name": "Peter", "position": "C++ Developer", visibleId: 8, id: 8},
  {"name": "Randy", "position": "C++ Developer", visibleId: 9, id: 9},
  {"name": "Michael", "position": "Software Tester", visibleId: 10, id: 10},
  {"name": "Ed", "position": "Python Developer", visibleId: 11, id: 11},
  {"name": "Luis", "position": "Software Tester", visibleId: 12, id: 12},
  {"name": "Ed", "position": "ASP.NET Developer", visibleId: 13, id: 13},
  {"name": "Gavin", "position": "DevOps", visibleId: 14, id: 14},
  {"name": "Taylor", "position": "JavaScript Developer", visibleId: 15, id: 15},
  {"name": "Orlando", "position": "Frontend Developer", visibleId: 16, id: 16},
  {"name": "Chloe", "position": "Java Developer", visibleId: 17, id: 17},
  {"name": "Jacob", "position": "Python Developer", visibleId: 18, id: 18},
  {"name": "Paula", "position": "Data Science Engineer", visibleId: 19, id: 19},
  {"name": "Lily", "position": "JavaScript Developer", visibleId: 20, id: 20}
];

let _count = list.length;
const _offset = 1;
const _limit = 5;

let _list = [];
for(let i = _offset-1; i < _limit; i++) {
  _list.push(list[i]);
}

function click(offset, limit = _limit, count = list.length) {
  const array = [];

  for(let i = (offset-1)*limit; (i < offset*limit) && (i < count); i++) {
    if(offset + limit <= count) {
      array.push(list[i]);
    } else break;
  }
  _list = array;
  forceReRender();
}

function search(value) {
  let filtered =  list.filter(item => item.name.startsWith(value));
  let filteredLength = filtered.length
  if (filtered.length === list.length) {
    filtered = list;
    filteredLength = list.length;
  }

  _list = filtered;
  _count = filteredLength;
  forceReRender();
}

storiesOf("Table", module)
.addDecorator(withKnobs)
.add("default", () => {

  const ht = [
    {name: 'Position'},
    {name: 'Id'}
  ]

  const pagination = {
    count: _count,
    pageIndex: _offset,
    limit: _limit,
    onClick: (index) => click(index)
  };

  return (
    <Table
      loading={false}
      headerNames={ht}
      list={_list}
      onClick={action('on Click')}
      search={(item) => search(item)}
      pagination={pagination}
    />
  )
})