<template>
  <tr>
    <td-component 
      v-for = "(cellData, index) in rowData" 
      :row-index="rowIindex" 
      
      :cell-index="index" 
      :key="index"> 
    </td-component>
  </tr>
</template>

<script>
  import { mapState } from 'vuex';
  import TdComponent from './TdComponent';

  export default {
    components: {
      TdComponent,
    },
    computed:{
      ...mapState({
      rowData(state){
        return state.tableData[this.rowIindex];
      }
        // turn: state => state.turn,
        // cellData(state){
        //   return state.tableData[this.rowIndex][this.cellIndex];
        // }
      }),
      // rowData(){
      //   return this.$store.state.tableData[this.rowIndex];
      // }
    },
    props:{
      //rowDdata: Array,
      rowIindex: Number,
    },
  };

</script>