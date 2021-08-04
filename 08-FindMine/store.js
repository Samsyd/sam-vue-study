import { shuffle } from 'lodash';
import { debug } from 'loglevel';
//import { checkServerIdentity } from 'tls';
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
  // console.log("Plant Mine :", row, cell, mine);
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

  // console.log(data);
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
    halted: true,
    result: '',
    openedCount: 0,
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
      state.openedCount = 0;
      state.result='';
    }, 
    [OPEN_CELL] (state, {row, cell}){
      let opendCount = 0;
      const checked=[];
      let halted=false;
      let result='';
      
      function checkAround(row, cell){
        
        //console.log("opend: " + state.openedCount);
        // console.log("Start Check = "+row+ ", " + cell);
        // console.log(checked);

        //게임 밖을 row와 Cell을 지정한 경우.
        let checkOutOfBound = row < 0 || row >= state.tableData.length || cell < 0 || cell >= state.tableData[0].length;
        if(checkOutOfBound){
          return;
        }
        
        //셀이 열여있거나 깃발, 지뢰깃발, 물음표일 경우 진행안함.
        if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][cell])){
          return;
        }

        // 한번 검사한 셀이면 다시 검사 안함.
        if(checked.includes(row + '/' +cell)){
          // console.log("XXX checked Cell: "+ row +", "+cell);
          return;
        }else{
          checked.push(row + '/' +cell);
        }
        // console.log("checked => "+ checked);

        let around=[];

        if(state.tableData[row-1]){
          around = around.concat([
            state.tableData[row-1][cell-1], state.tableData[row-1][cell], state.tableData[row-1][cell+1]
          ]);
        }
        
        around = around.concat([
          state.tableData[row][cell-1], state.tableData[row][cell+1]
        ]);
      
        if(state.tableData[row+1]){
          around = around.concat([
            state.tableData[row+1][cell-1], state.tableData[row+1][cell], state.tableData[row+1][cell+1]
          ]);
        };

        // console.log(row + "-" + cell +"counted => "+ counted);
        const counted = around.filter(function(v){
          return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
        });
        
        // console.log(state.tableData[row][cell], CODE.NORMAL, opendCount);
        if(state.tableData[row][cell] === CODE.NORMAL){
          //opendCount +=1;
          // if(opendCount===)
          state.openedCount += 1;
          if(state.data.row*state.data.cell - state.data.mine === state.openedCount){
            halted=true;
            result = `${state.timer}  Win`;
          }
        }

        //체크 요청 받은 셀에 값을 기록.
        Vue.set(state.tableData[row],cell, counted.length);


        // 아래부분은 관련 주위 셀의 값을 준비 & 체크한다.
        if(counted.length===0 && row > -1){
          const near=[];
          if(row-1>-1){
            if(cell-1>-1){
              near.push([row-1, cell-1]);
            }
            
            near.push([row-1, cell]);
            
            if(cell+1< state.tableData[row-1].length){
              near.push([row-1, cell+1]);
            }
          };

            if(cell-1>-1){          
              near.push([row, cell-1]);
            }
            
            if(cell+1< state.tableData[row].length){
              near.push([row, cell+1]);
            }
          
          
          if(row+1 < state.tableData.length){
            if(cell-1>-1){
              near.push([row+1, cell-1]);
            }
            
            near.push([row+1, cell]);
            
            if(cell+1 < state.tableData[row+1].length){
              near.push([row+1, cell+1]);
            }
          };

          // console.log(row + "-" + cell +" Near => " + near);
          near.forEach( (n) => {
            // console.log(n);
            // console.log("near check" + n[0]+"-"+n[1] + "  cell value: " + state.tableData[n[0]][n[1]] );
            // console.log(state.tableData[n[0]][n[1]] !== CODE.OPENED);
            if(state.tableData[n[0]][n[1]] !== CODE.OPENED){  //
              // console.log("near check => "+ n[0] + ", " + n[1] );
              checkAround(n[0],n[1]);

            }
          });
        };
        //return counted.length;
        // Vue.set(state.tableData[row],cell, counted.length);
      }
      // const count=checkAround();
      // Vue.set(state.tableData[row],cell, count);
      checkAround(row,cell);
      
      // let halted=false;
      // let result='';

      // if(state.data.row*state.data.cell - state.data.mine === state.openeddCount + opendCount){
      //   halted=true;
      //   result = `${state.timer}  Win`;
      // }
      // state.openedCount += opendCount;
      state.halted = halted;
      state.result = result;
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