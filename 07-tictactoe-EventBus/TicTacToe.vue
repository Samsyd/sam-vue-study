<template>
	<div>
		<table-component v-bind:table-data="tableData" />
		<div>{{turn}}'s turn</div>
		<div v-show="win">
			<h1>the winner is {{winner}}</h1>
			<button v-on:click="resetTable">reStart</button>
		</div>
	</div>

</template>

<script>
	import TableComponent from './TableComponent.vue';
	import EventBus from './EventBus.js';

export default {
	components:{
		TableComponent,
	},

	data() {
		return{
			winner:'',
			win: false,
			tableData:[
				['','',''],
				['','',''],
				['','',''],
			],
			turn: 'O',
		};
	},
	computed: {},
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

		onClickTd(rowIndex, cellIndex){
				//const this= this.$root.$data;  
        //이부분이 이해 잘 안됨. 부모 변수 값을 선언하여 저장하였는데, 아래에서 변수 값을 수정하니 부모값이 변경. 
        // $를 사요하면 객체를 저장하는 것 같다.
        	console.log(this.tableData[rowIndex][cellIndex]);
        	this.$set(this.tableData[rowIndex], cellIndex, this.turn);

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

        if(win){
          	this.win= win;
          	this.winner = this.turn;
          //this.$root.resetTable();
          
        }else{
          let all = true;
          	this.tableData.forEach((row) => {
            row.forEach((cell)=>{
              if(!cell){
                all=false;
              }
            })
          });

          if(all){
            this.$root.resetTable();
          }
          	this.turn = this.turn === 'O' ? 'X' : 'O';
        }
		}
	},
	created(){
		EventBus.$on('clickTd', this.onClickTd);
	}
};
</script>

<style>
</style>