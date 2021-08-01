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
		}

	},
};
</script>

<style>
</style>