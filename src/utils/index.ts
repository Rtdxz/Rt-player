/* eslint-disable func-names */
// 将间隔时间(毫秒)转成显示时间分钟和秒
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

// 将间隔时间(秒)换算成24小时显示方式分钟和秒
export const timeFormat = function (time: number) {
  // 分钟
  const minutes = Math.floor(time / 60);

  // 秒
  const seconds = Math.floor(time % 60);

  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;
};

// 将时间戳换算成年月日
export const dateFormat = function (time: number) {
  const dt = new Date(time);

  const y = dt.getFullYear();
  const m = `${dt.getMonth() + 1}`.padStart(2, '0');
  const d = `${dt.getDate()}`.padStart(2, '0');

  // const hh = `${dt.getHours()}`.padStart(2, '0');
  // const mm = `${dt.getMinutes()}`.padStart(2, '0');
  // const ss = `${dt.getSeconds()}`.padStart(2, '0');

  // return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
  return `${y}-${m}-${d}`;
};

// 将24小时分钟秒显示转换成秒
export const formatToMinute = function (time: string) {
  if (time === '') return '';

  const minutes = Number(time.split(':')[0]);

  const seconds = Number(time.split(':')[1].split('.')[0]);

  const millisecond = Number(time.split(':')[1].split('.')[1]);

  const result = minutes * 60 + seconds + millisecond * 0.001;
  // console.log(result);
  return result;
};

// 序号显示
export const Rank = function (index: number) {
  return index < 10 ? `0${index}` : index;
};

// 防抖
export const debounce = function (
  this: any,
  fun: any,

  delay = 500,
) {
  let timer: NodeJS.Timer | null = null;

  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fun.apply(this, args);
    }, delay);
  };
};

// 节流
export const throttle = function (
  this: any,
  fun: any,

  delay = 500,
) {
  let timer: NodeJS.Timer | null = null;

  return (...args: any) => {
    if (!timer) {
      timer = setTimeout(() => {
        fun.apply(this, args);
        timer = null;
      }, delay);
    }
  };
};
