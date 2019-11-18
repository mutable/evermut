import React from 'react';
import { storiesOf, forceReRender } from '@storybook/react';
import { action } from "@storybook/addon-actions";
import { withKnobs, number, array, object } from "@storybook/addon-knobs";

import Table from '../components/Table';

const list = [
    {"id": 1, "name": "Taylor", "surname": "Davis", "country": "Netherlands", "position": "DevOps", "email": "taylor.davis@fancygrid.com"},
    {"id": 2, "name": "Isabella", "surname": "Scott", "country": "Australia", "position": "PHP Developer", "email": "isabella.scott@fancygrid.com"},
    {"id": 3, "name": "Chloe", "surname": "Woods", "country": "Sweden", "position": "C++ Developer", "email": "chloe.woods@fancygrid.com"},
    {"id": 4, "name": "Ivan", "surname": "Richardson", "country": "Singapore", "position": "C++ Developer", "email": "ivan.richardson@fancygrid.com"},
    {"id": 5, "name": "Ivan", "surname": "Brown", "country": "Taiwan", "position": "Data Science Engineer", "email": "ivan.brown@fancygrid.com"},
    {"id": 6, "name": "Ella", "surname": "Brown", "country": "Sweden", "position": "ASP.NET Developer", "email": "ella.brown@fancygrid.com"},
    {"id": 7, "name": "Elizabeth", "surname": "Scott", "country": "USA", "position": "iOS Developer", "email": "elizabeth.scott@fancygrid.com"},
    {"id": 8, "name": "Peter", "surname": "Johnson", "country": "Taiwan", "position": "C++ Developer", "email": "peter.johnson@fancygrid.com"},
    {"id": 9, "name": "Randy", "surname": "Martin", "country": "Netherlands", "position": "C++ Developer", "email": "randy.martin@fancygrid.com"},
    {"id": 10, "name": "Michael", "surname": "Phillips", "country": "UK", "position": "Software Tester", "email": "michael.phillips@fancygrid.com"},
    {"id": 11, "name": "Ed", "surname": "Brown", "country": "San Marino", "position": "Python Developer", "email": "ed.brown@fancygrid.com"},
    {"id": 12, "name": "Luis", "surname": "Richardson", "country": "Netherlands", "position": "Software Tester", "email": "luis.richardson@fancygrid.com"},
    {"id": 13, "name": "Ed", "surname": "Johnson", "country": "Australia", "position": "ASP.NET Developer", "email": "ed.johnson@fancygrid.com"},
    {"id": 14, "name": "Gavin", "surname": "Garcia", "country": "Belgium", "position": "DevOps", "email": "gavin.garcia@fancygrid.com"},
    {"id": 15, "name": "Taylor", "surname": "Howard", "country": "Taiwan", "position": "JavaScript Developer", "email": "taylor.howard@fancygrid.com"},
    {"id": 16, "name": "Orlando", "surname": "Scott", "country": "Ireland", "position": "Frontend Developer", "email": "orlando.scott@fancygrid.com"},
    {"id": 17, "name": "Chloe", "surname": "Taylor", "country": "Finland", "position": "Java Developer", "email": "chloe.taylor@fancygrid.com"},
    {"id": 18, "name": "Jacob", "surname": "Hill", "country": "Japan", "position": "Python Developer", "email": "jacob.hill@fancygrid.com"},
    {"id": 19, "name": "Paula", "surname": "Scott", "country": "Netherlands", "position": "Data Science Engineer", "email": "paula.scott@fancygrid.com"},
    {"id": 20, "name": "Lily", "surname": "Miller", "country": "Austria", "position": "JavaScript Developer", "email": "lily.miller@fancygrid.com"}
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
    {name: 'Last Name'},
    {name: 'Country'},
    {name: 'Position'},
    {name: 'Email'}
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
      // search={action('search filtering')}
      pagination={pagination}
    />
  )
})