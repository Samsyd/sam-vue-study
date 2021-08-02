<template>
  <td @click="onClickTd"> {{cellData}}

  </td>
</template>

<script >
  import {mapState} from 'vuex';
  import {CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER, CHANGE_TURN} from './store.js';
  // import EventBus from './EventBus.js';

  export default {
    props:{
      //cellData: String,
      rowIndex: Number,
      cellIndex: Number,
    },
    computed:{  //Vuex의 $store의 데이터를 사용하기 위해 연결.
      ...mapState({
        tableData: state => state.tableData,
        turn: state => state.turn,
        cellData(state){
          return state.tableData[this.rowIndex][this.cellIndex];
        }
      }),
      // cellData(){
      //   return this.$store.state.tableData[this.rowIndex][this.cellIndex];
      // },
      // tableData(){  
      //   return this.$store.state.tableData;
      // },
      // turn(){
      //   return this.$store.state.turn;
      // },
    },

    

  };
</script>
