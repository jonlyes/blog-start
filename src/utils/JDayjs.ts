import { dayjs } from "element-plus";

// 处理时间
const JDayjs = (timestamp: string | number) => {
  timestamp = new Date(timestamp).getTime();
  const timeDifference = Date.now() - timestamp;

  let time: string;

  const minutes = Math.floor(timeDifference / (1000 * 60));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  switch (true) {
    case minutes < 60:
      time = minutes + "分钟前";
      break;
    case hours < 24:
      time = hours + "小时前";
      break;
    case days < 3:
      time = days + 1 + "天前";
      break;
    default:
      time = dayjs(timestamp).format("YYYY-MM-DD HH:mm");
      break;
  }
  return time;
};

export default JDayjs;
