// 将间隔时间(毫秒)转成显示时间
export const timeHandle = function (duration: number): any {
  return `${
    new Date(duration).getMinutes() < 10
      ? `0${new Date(duration).getMinutes()}`
      : new Date(duration).getMinutes()
  }:${
    new Date(duration).getSeconds() < 10
      ? `0${new Date(duration).getSeconds()}`
      : new Date(duration).getSeconds()
  }`;
};

export const timeFormat = function (time: number) {
  // 分钟
  const minutes = Math.floor(time / 60);

  // 秒
  const seconds = Math.floor(time % 60);

  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};
