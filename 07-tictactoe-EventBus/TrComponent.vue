<template>
  <tr>
    <td-component 
      v-for = "(cellData, index) in rowDdata" 
      :row-index="rowIindex" 
      :cell-data="cellData" 
      :cell-index="index" 
      :key="index"> 
    </td-component>
  </tr>
</template>

<script>
  import TdComponent from './TdComponent';

  export default {
    components: {
      TdComponent,
    },
    props:{
      rowDdata: Array,
      rowIindex: Number,
    },
  };

</script>