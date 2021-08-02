<template>
  <div>
    <input
      type="number"
      placeholder="row"
      v-bind:value="row"
      v-on:change="onChangeRow"
    />
    <input
      type="number"
      placeholder="cell"
      v-bind:value="cell"
      v-on:change="onChangeCell"
    />
    <input
      type="number"
      placeholder="cell"
      v-bind:value="mine"
      v-on:change="onChangeMine"
    />
    <button @click="onClickBtn">START</button>
  </div>
</template>

<script>
import { START_GAME } from "./store";

export default {
  data() {
    return {
      row: 10,
      cell: 10,
      mine: 20,
    };
  },
  methods: {
    onChangeRow(e) {
      this.row = e.target.value;
    },
    onChangeCell(e) {
      this.Cell = e.target.value;
    },
    onChangeMine(e) {
      this.Mine = e.target.value;
    },
    onClickBtn() {
      this.$store.commit(START_GAME, {
        row: this.row,
        cell: this.cell,
        mine: this.mine,
      });
    },
  },
};
</script>
