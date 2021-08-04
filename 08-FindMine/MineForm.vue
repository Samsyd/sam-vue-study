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
      placeholder="mine"
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
      // console.log("row: ", e.target.value);
      this.row = e.target.value;
    },
    onChangeCell(e) {
      // console.log("Cell: ", e.target.value);
      this.cell = e.target.value;
    },
    onChangeMine(e) {
			// console.log("Mine: ", e.target.value);
      this.mine = e.target.value;
    },
    onClickBtn() {
      // console.log("MindeForm:", this.row, this.cell, this.mine);
      this.$store.commit(START_GAME, {
        row: this.row,
        cell: this.cell,
        mine: this.mine,
      });
    },
  },
};
</script>
