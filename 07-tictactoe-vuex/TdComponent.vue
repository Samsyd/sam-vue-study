<template>
  <td @click="onClickTd"> {{cellData}}

  </td>
</template>

<script >
  import {mapState} from './vuex';
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

    methods:{
      onClickTd(){
        // 이미 값이 있으면 중단하기.
        if(this.cellData) return;
        console.log('TdComponent start');
        //this.$store.commit('CLICK_CELL'); // <- Vuex 방법으로  this.$set(this.tableData[rowIndex], cellIndex, this.turn);
        //오타를 막기 위해 변수로 지정하여 사용.
        this.$store.commit(CLICK_CELL,{row: this.rowIndex, cell: this.cellIndex});

        let win = false;
        	if(this.tableData[this.rowIndex][0] === this.turn &&this.tableData[this.rowIndex][1] === this.turn && this.tableData[this.rowIndex][2] === this.turn){
          win = true;
        }
        	if(this.tableData[0][this.cellIndex] === this.turn && this.tableData[1][this.cellIndex] === this.turn && this.tableData[2][this.cellIndex] === this.turn){
          win = true;
        }
        	if(this.tableData[0][0] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][2] === this.turn){
          win = true;
        }
        	if(this.tableData[0][2] === this.turn && this.tableData[1][1] === this.turn && this.tableData[2][0] === this.turn){
          win = true;
        }
        console.log('TdComponent check win ->' + win);
        if(win){ 
            this.$store.commit(SET_WINNER, this.turn);
            this.$store.commit(RESET_GAME);
        }else{
          let all = true;
          	this.tableData.forEach((row) => {
            row.forEach((cell)=>{
              if(!cell){
                all=false;
              }
            })
          });
          console.log('TdComponent check all ->' + win);
          if(all){
            this.$store.commit(NO_WINNER); // <-this.$root.resetTable();
            this.$store.commit(RESET_GAME);
          }
          	this.$store.commit(CHANGE_TURN);  //  <- this.turn = this.turn === 'O' ? 'X' : 'O';
        }
      }
    }

  };
</script>
