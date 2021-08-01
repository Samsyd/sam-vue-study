<template>
  <td @click="onClickTd"> {{cellData}}

  </td>
</template>

<script >
  export default {
    props:{
      cellData: String,
      rowIndex: Number,
      cellIndex: Number,
    },

    methods:{
      onClickTd(){
        // 이미 값이 있으면 중단하기.
        if(this.cellData) return;


        //console.log(this.$root.$data.tableData, this.$root.$data.turn);
        

        // console.log(this.$parent.$data);
        // this.set(this.$root.$data.tableData[this.rowIndex], this.cellIndex, this.$root.$data.turn);
        // this.$root.$data.turn = this.$root.$data.turn === 'O' ? 'X' : 'O';

        const rootData= this.$root.$data;  
        //이부분이 이해 잘 안됨. 부모 변수 값을 선언하여 저장하였는데, 아래에서 변수 값을 수정하니 부모값이 변경. 
        // $를 사요하면 객체를 저장하는 것 같다.
        console.log(rootData.tableData[this.rowIndex][this.cellIndex]);
        this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);

        let win = false;
        if(rootData.tableData[this.rowIndex][0] === rootData.turn &&rootData.tableData[this.rowIndex][1] === rootData.turn && rootData.tableData[this.rowIndex][2] === rootData.turn){
          win = true;
        }
        if(rootData.tableData[0][this.cellIndex] === rootData.turn && rootData.tableData[1][this.cellIndex] === rootData.turn && rootData.tableData[2][this.cellIndex] === rootData.turn){
          win = true;
        }
        if(rootData.tableData[0][0] === rootData.turn &&rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][2] === rootData.turn){
          win = true;
        }
        if(rootData.tableData[0][2] === rootData.turn &&rootData.tableData[1][1] === rootData.turn && rootData.tableData[2][0] === rootData.turn){
          win = true;
        }

        if(win){
          rootData.win= win;
          rootData.winner = rootData.turn;
          //this.$root.resetTable();
          
        }else{
          let all = true;
          rootData.tableData.forEach((row) => {
            row.forEach((cell)=>{
              if(!cell){
                all=false;
              }
            })
          });

          if(all){
            this.$root.resetTable();
          }
          rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
        }
      }
    }

  };
</script>
