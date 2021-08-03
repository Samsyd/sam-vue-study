import { shuffle } from 'lodash';
import { debug } from 'loglevel';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE ={
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 다 opened
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row*cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while(candidate.length > row*cell -mine){
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for(let i = 0; i < row; i++){
    const rowData = [];
    data.push(rowData);
    for(let j = 0; j < cell; j++){
      rowData.push(CODE.NORMAL);
    }
  }
  for (let k = 0; k < shuffle.length; k++){
    const ver = Math.floor(shuffle[k]/cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};


export default new Vuex.Store({
  state:{
    tableData:[],
    data:{
      row: 0,
      cell: 0,
      mine:0,
    },
    timer:0,
    halted:true,
    result:'',
  }, //vue's data
  getters:{

  },// vue's computed
  mutations:{
    [START_GAME] (state, { row, cell, mine }){
      state.data = {
        row, 
        cell, 
        mine,
      };
      state.tableData = plantMine(row, cell, mine);
      state.timer = 0;
      state.halted=false;
    }, 
    [OPEN_CELL] (state, {row, cell}){
      function checkAround(){
        let around=[];
        if(state.tableData[row-1]){
          around = around.concat([
            state.tableData[row-1][cell-1], state.tableData[row-1][cell], state.tableData[row-1][cell+1]
          ]);
          // console.log(state.tableData[row-1][cell-1], state.tableData[row-1][cell], state.tableData[row-1][cell+1]);
        }
        
          around = around.concat([
            state.tableData[row][cell-1], state.tableData[row][cell+1]
          ]);
          // console.log(state.tableData[row][cell-1], state.tableData[row][cell+1]);
        
        if(state.tableData[row+1]){
          around = around.concat([
            state.tableData[row+1][cell-1], state.tableData[row+1][cell], state.tableData[row+1][cell+1]
          ]);
          // console.log(state.tableData[row+1][cell-1], state.tableData[row+1][cell], state.tableData[row+1][cell+1]);
        };
        const counted = around.filter(function(v){
          // console.log(CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE);
          // console.log(v);
          // console.log(around);
          
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        });
        console.log(counted);
        return counted.length;
      }
      const count=checkAround();
      Vue.set(state.tableData[row],cell, count);

    },  
    [CLICK_MINE] (state, {row, cell}){
      state.halted=true;
      Vue.set(state.tableData[row],cell, CODE.CLICKED_MINE);
    },   
    [FLAG_CELL] (state, {row, cell}){
      if(state.tableData[row][cell]===CODE.MINE){
        Vue.set(state.tableData[row], cell, CODE.FLAG_MINE);
      }else{
        Vue.set(state.tableData[row], cell, CODE.FLAG);
      }
    },  
    [QUESTION_CELL] (state, {row, cell}){
      if(state.tableData[row][cell]===CODE.FLAG_MINE){
        Vue.set(state.tableData[row], cell, CODE.QUESTION_MINE);
      }else{
        Vue.set(state.tableData[row], cell, CODE.QUESTION);
      }

    }, 
    [NORMALIZE_CELL] (state, {row, cell}){
      if(state.tableData[row][cell]===CODE.QUESTION_MINE){
        Vue.set(state.tableData[row], cell, CODE.MINE);
      }else{
        Vue.set(state.tableData[row], cell, CODE.NORMAL);
      }
    },
    [INCREMENT_TIMER] (state){
      state.timer +=1;
    },

  }, // edit state.  동기적으로 
  actions:{

  }, // 비동기를 사용할때, 또는 여러 뮤테이션을 연달아 실행할때.
});