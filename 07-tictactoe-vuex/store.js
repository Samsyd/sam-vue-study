import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export default new Vuex.Store({
  state:{
    tableData:[
      ['','',''],
      ['','',''],
      ['','',''],
    ],
    turn: 'O',
    winner:'',
    win: false,
  }, //vue's data
  getters:{

  },// vue's computed
  mutations:{
    [SET_WINNER](state, winner){
      state.winner = winner;
    },
    [CLICK_CELL](state, {row, cell}){
      console.log('CLICK_CELL', row, cell);
      Vue.set(state.tableData[row], cell, state.turn);

    },
    [CHANGE_TURN](state){
      console.log('CHANGE_TURN before ', state.turn);
      state.turn = state.turn ==='O' ? 'X': 'O';
      console.log('CHANGE_TURN after ', state.turn);
    },
    [RESET_GAME](state){
      state.turn='O';
      state.tableData = [
        ['','',''],
        ['','',''],
        ['','',''],
      ]
    },
    [NO_WINNER](state){
      state.winner='';
    }
  }, // edit state.  동기적으로 
  actions:{

  }, // 비동기를 사용할때, 또는 여러 뮤테이션을 연달아 실행할때.
});