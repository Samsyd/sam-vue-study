<template>
	<div>
		<table-component />
		<div>{{turn}}'s turn</div>
		<div v-show="win">
			<h1>the winner is {{winner}}</h1>
			<button v-on:click="resetTable">reStart</button>
		</div>
	</div>

</template>

<script>
	import {mapState} from 'vuex';

	import store from './store';
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
};
</script>

<style>
</style>