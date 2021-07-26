<template>
	<div>
		<div id="screen" v-bind:class="state" v-on:click="onClickScreen" >{{ message }}</div>
		<template v-show="result.length">
      <div>Average time aaa:{{ result || 0 }}</div>
			<div>Average time aaa:{{ avgtime}}</div>
			<button @click="onReset"> reset</button>
		</template>
	</div>
</template>

<script>
let startTime = 0;
let endTime = 0;
let timeout = null;

	export default {
		data(){
		  return{
        result : [],
        state  : 'waiting',
        message: 'Click to start',
      };
		},
    computed:{
      avgtime(){
        return Math.round(this.result.reduce((a,c) => a+c,0)/ this.result.length)/100 ||0;
      }
    },
		methods: {
			onReset() {
			  this.result=[];
			},
			onClickScreen(){
				if(this.state==='waiting') {
					this.state = 'ready';
					this.message = 'click when it turn to green';
					timeout = setTimeout(()=>{
					  this.state = 'now';
            this.message = 'Click NOW';
            startTime = new Date();

          }, Math.floor(Math.random()*1000) + 2000); //2~3 second
				}else if(this.state==='ready'){
				  clearTimeout(timeout);
					this.state = 'waiting';
          this.message = 'its too early, click when it turn to green';
				}else if(this.state==='now'){
				  endTime = new Date();
					this.state = 'waiting';
          this.message = 'start to click';
          this.result.push(endTime - startTime);

				}
			},
		},
	};
</script>
<style>
#screen {
	width: 300px;
	height: 200px;
	text-align: center;
	user-select: none;
}

#screen.waiting {
	background-color: aqua;
}

#screen.ready {
	background-color: red;
	color: white;
}

#screen.now {
	background-color: greenyellow;
}
</style>