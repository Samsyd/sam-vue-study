<template>
<div>
    <h1> {{result}}</h1>

    <form @submit.prevent="onSubmitForm">
        <input ref="answer" minlength='4' maxlength="4" v-model="value" />
        <button type="submit">GO</button>
    </form>

    <div> try: {{tries.length}} times</div>
    <ul>
        <li v-for="tt in tries" v-bind:key="tt.indexOf">
            <div>{{tt.try}}</div>
            <div>{{tt.result}}</div>
        </li>
    </ul>

</div>
</template>

<script>
    const getNumbers=() =>{
        const candidates=[1,2,3,4,5,6,7,8,9];
        const array=[];
        for(let i=0; i<4; i +=1){
            const chosen=candidates.splice(Math.floor(Math.random()*(9-i)),1)[0];
            array.push(chosen);
        }
        return array;
    };

    export default{
        data(){
            return{
                answer: getNumbers(),
                tries:[],
                value:'',
                result:'',
            }
        },
        methods:{
            setDataInit(){
                this.answer=getNumbers();
                this.tries=[],
                this.value=''

            },
            onSubmitForm(e){
                this.result=this.answer;
                if(this.value === this.answer.join('')){
                    this.tries.push({
                        try:this.value,
                        result:'homerun',
                    });
                    this.result='Homerun Answer is ' + this.answer + ' tries: '+ this.tries.length;
                    this.setDataInit();
                }else{
                    if(this.tries.length>=9){
                        this.result=`wrong 10 times. The answer was ${this.answer}`;
                        alert('fail');
                        this.setDataInit();
                    }else{
                        let strike=0;
                        let ball=0;
                        const answerArray=this.value.split('').map(v=> parseInt(v)); //문자열을 숫자배열로 바꾸는 방식.

                        for(let i = 0; i<4; i+=1){
                            if(answerArray[i] === this.answer[i]){  //숫자, 자리수 모두 정답.
                                strike++;
                            }else if(this.answer.includes(answerArray[i])){ //숫자만 정답.
                                ball++;
                            }
                        }
                        
                        this.tries.push({
                            try:this.value,
                            result:`${strike}strike ${ball}ball`,
                        })
                    }
                }
                this.value='';
                this.$refs.answer.focus();
            }
        }
    };
</script>
<style>
</style>