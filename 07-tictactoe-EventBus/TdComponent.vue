<template>
  <td @click="onClickTd"> {{cellData}}

  </td>
</template>

<script >
  import EventBus from './EventBus.js';

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

        EventBus.$emit('clickTd', this.rowIndex, this.cellIndex);
      }
    }

  };
</script>
