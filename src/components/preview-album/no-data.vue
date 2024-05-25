<template>
  <div class="no-data">
    <span class="tip">没有数据 换一个吧~</span>
    <input
      class="input-box"
      v-model.trim="kw"
      placeholder="请输入相册ID"
      @keyup.enter="jumpToDetail"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  const kw = ref('');
  const jumpToDetail = () => {
    if (kw.value) {
      window.location.href = window.location.origin + window.location.pathname + `?id=${kw.value}`;
    }
  };
</script>

<style lang="scss" scoped>
  .no-data {
    position: absolute;
    top: 40%;
    z-index: 10;
    display: flex;
    flex-direction: column;
  }

  .tip {
    margin-bottom: 16px;
    font-size: 18px;
    text-align: center;
  }

  .input-box {
    display: flex;
    width: 200px;
    height: 50px;
    padding: 8px 12px;
    color: #eee;
    font-size: 24px;
    text-align: center;
    background: #45454599;
    border: 1px solid #5d5d5d;
    border-radius: 50px;
    box-shadow: inset 0 0 4px #333;
    transition: all 0.3s;

    &:focus {
      border-color: #607d8b;
      box-shadow: inset 0 0 4px #607d8b;
    }

    &::placeholder {
      color: #999;
      font-size: 20px;
      font-style: italic;
    }
  }
</style>
