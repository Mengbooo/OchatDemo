<script setup>
import { UserOutlined, CommentOutlined } from '@ant-design/icons-vue';
import { ref } from 'vue';
import { message as ant_message } from 'ant-design-vue';
import axios from 'axios';

const message = ref('');
const username = ref('');

const messageList = ref([]);

const handleClickSubmit = async () => {

  try {
    const res = (
      await axios.request({
        url: 'http://localhost:5577/message/send',
        method: "POST",
        data: {
          username: username.value,
          message: message.value,
        },
      })
    ).data;
    console.log(res);
    if (res.statusbar == 200) {
      ant_message.success('提交成功');
    }
  } catch (err) {
    console.log(err);
    ant_message.error('提交失败');
  }finally{
    getMessages();
  }
}

// 获取消息列表
const getMessages = async () => {
  const res = (
    await axios.request({
      url: 'http://localhost:5577/message',
      method: "GET",
    })
  ).data
  messageList.value = res;
};


getMessages();
setInterval(() => {
  getMessages();
}, 1000)
</script>

<template>
  <a-list size="small" bordered :data-source="messageList" style="margin-top: 5vh;">
    <template #renderItem='{ item }'>
      <a-list-item>{{ item.username }} : {{ item.message }}</a-list-item>
    </template>
    <template #header>
      <div style="color: #00ffed;font-size: 2vw;">
        <img src="/logoooo.jpg" alt="" style="width: 2vw;margin-right:1vw; border-radius: 5px;">
        <strong>Ochat聊天室</strong>
      </div>
    </template>
    <template #footer>
      <div style="color: #00ffed;"><strong>Powered by <a href="https://github.com/Mengbooo">Bolaxious</a></strong></div>
    </template>
  </a-list>
  <a-row style="margin-top: 20px">
    <a-col span='4'>
      <a-input v-model:value="username" placeholder="用户名" style="height: 3vh; align-items: center;justify-content: center;display: flex; font-size: 1vh;">
        <template #prefix>
          <UserOutlined />
        </template>
      </a-input>

    </a-col>
    <a-col span='14' offset="1">
      <a-input v-model:value="message" placeholder="" style="height: 3vh;">
        <template #afterfix>
          <CommentOutlined />
        </template>
      </a-input>
    </a-col>
    <a-col span="4" offset="1">
      <a-button type="primary" style="width: 13vw;height: 3vh;background: #00ffed;align-items: center;justify-content: center;display: flex;" @click="handleClickSubmit" ><strong style="font-size: 1.5vh;">提交</strong></a-button>
    </a-col>
  </a-row>
</template>

<style scoped></style>
