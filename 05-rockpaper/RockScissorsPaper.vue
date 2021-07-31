<template>
	<div>
		<div id="computer" :style="computedStyleObject"></div>
		<div>
			<button @click="onClickButton('rock')">rock</button>
			<button @click="onClickButton('scissors')"> scissors</button>
			<button @click="onClickButton('paper')">paper</button>
		</div>
		<div>{{result}}</div>
		<div> Score is {{score}}</div>
	</div>
</template>

<script>
	const rspCoords = {
		rock:'0',
		scissors:'-142px',
		paper: '-284px',
	};

	const scores = {
		rock:0,
		scissors: 1,
		paper: -1,
	};

	const computerChoice = (imgCoord) => {
		return Object.entries(rspCoords).find(function(v){
			return v[1] ===imgCoord;
		})[0];
	};


	let interval = null;

export default {
	data() {
		return{
			imgCoord: rspCoords.rock,
			result:'',
			score:0,
		};
	},
	computed: {
		computedStyleObject(){
			return{
				background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${this.imgCoord} 0`,
			}
		}
	},
	methods: {
		changeHand(){
			interval = setInterval(() => {
				if (this.imgCoord === rspCoords.rock){
					this.imgCoord = rspCoords.scissors;
					console.log("rock -> scissor");
				}else if (this.imgCoord === rspCoords.scissors){
					this.imgCoord = rspCoords.paper;
					console.log("scissor -> Paper");
				}else if (this.imgCoord === rspCoords.paper){
					this.imgCoord = rspCoords.rock;
					console.log("Paper - Rock");
				}
			}, 1000);
		},
		onClickButton(choice){
			clearInterval(interval); // to compare the result.

			
			const myScore = scores[choice];
			const cpuScore = scores[computerChoice(this.imgCoord)];
			const diff = myScore - cpuScore;

			console.log("I choose " + choice + " Interval:" + interval);

			if(diff ===0){
				this.result = 'draw';
			}else if([-1, 2].includes(diff)){
				this.result = 'WON';
				this.score += 1;
			}else {
				this.result = 'lose';
				this.score -= 1;
			}

			setTimeout(() => { this.changeHand();}, 1000);
			
		},
	},

	created(){
		console.log('created');
	},
	mounted(){
		this.changeHand();
	},
	beforeDestroy(){
		//clearInterval(this.interval);
		clearInterval(interval);
	},
	destroyed(){
		console.log('destroyed');
	},
};
</script>
<style>
	#computer{
		width: 142px;
		height:200px;
		background-position: 0 0;
	}
</style>