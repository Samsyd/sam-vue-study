<template>
	<div>
		<div>{{turn}}'s turn</div>
		<table-component>
			<tr v-for="(rowData, rowIndex) in tableData" v-bind:key="rowIndex">
				<td v-for="(cellData, cellIndex) in rowData" v-bind:key="cellIndex"  @click="onClickTd(rowIndex, cellIndex)">{{cellData}}</td>
			</tr>
		</table-component>
		<div v-if="winner">the winner is {{winner}}</div>
	</div>

</template>

<script>
	import {mapState} from 'vuex';
	import store, {CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER, CHANGE_TURN} from './store.js';
	// import store from './store';
	import TableComponent from './TableComponent.vue';
	//import EventBus from './EventBus.js';

export default {
	store,
	components:{
		TableComponent,
	},
	computed:{
		...mapState(['winner', 'turn', 'tableData', 'win']),  // 아래 주석문을 짧게 가능.
		// winner(){
		// 	return this.$store.state.winner;
		// },
		// turn(){
		// 	return this.$store.state.turn;
		// },
		// tableData(){
		// 	return this.$store.state.tableData;
		// },
		// win(){
		// 	return this.$store.state.win;
		// },

	},
	// data() {
	// 	return{
	// 		winner:'',
	// 		win: false,
	// 		tableData:[
	// 			['','',''],
	// 			['','',''],
	// 			['','',''],
	// 		],
	// 		turn: 'O',
	// 	};
	// },
		methods: {
		onChangeData(){
			//this.tableData[0],[0] = 'X'; 
			// 값은 저장되나 화면변경이 일어나지 않는다.
			// => 해결방법, Vue.set과 동일한 방법.
			this.$set(this.tableData[0], 0, 'X');  
		},

		resetTable(){
      this.turn = "O";
			this.tableData=[['','','',],['','','',],['','','',]];
			this.win=false;
			this.winner = '';
		},
	},
	methods:{
      onClickTd(rowIndex, cellIndex){
        // 이미 값이 있으면 중단하기.
        if(this.cellData) return;
        console.log('TdComponent start');
        //this.$store.commit('CLICK_CELL'); // <- Vuex 방법으로  this.$set(this.tableData[rowIndex], cellIndex, this.turn);
        //오타를 막기 위해 변수로 지정하여 사용.
        this.$store.commit(CLICK_CELL,{row: rowIndex, cell: cellIndex});

        let win = false;
        	if(this.tableData[rowIndex][0] === this.turn &&this.tableData[rowIndex][1] === this.turn && this.tableData[rowIndex][2] === this.turn){
          win = true;
        }
        	if(this.tableData[0][cellIndex] === this.turn && this.tableData[1][cellIndex] === this.turn && this.tableData[2][cellIndex] === this.turn){
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

<style>
  table{
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>