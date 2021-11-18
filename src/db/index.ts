import mongoose from 'mongoose';

const DB_ADDRESS = 'mongodb://127.0.0.1:27017/?gssapiServiceName=mongodb';

const connect = () => {
  // 重连次数
  let connectTimes = 0;
  // 最大重连次数
  const MAX_CONNECT_TIMES = 3;
  // 断线重连
  const reconnect = () => {
    if (connectTimes < MAX_CONNECT_TIMES) {
      mongoose.connect(DB_ADDRESS, {
        dbName: 'dww',
      });
      connectTimes += 1;
    }
  }
};
