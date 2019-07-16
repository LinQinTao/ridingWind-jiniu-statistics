import axios from 'axios';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function request(options) {
  const { url, method, data } = options;
  const headers = {
    'Content-Type': 'application/json',
  };
  return axios({
    timeout: 3000,
    headers,
    url,
    method,
    data,
  })
    .then(checkStatus)
    .catch((error) => {
      if (error) {
        // TOAST.show('网络故障.'); // TODO, show error
      }
    });
}

/*
 * 签到
 * apiUrl：  String    接口地址  （ default：http://api.test.jiniutech.cn ）
 * appid：   String    产品id   （ default：'' ）
 * channel： String    渠道     （ default：官方渠道 ）
*/
export const jnSignin = (obj = {}) => {
  const {
    apiUrl = 'http://api.test.jiniutech.cn',
    appid = '',
    // channel = '官方渠道',
    channel = 'channel1',
  } = obj;
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = (today.getMonth() + 1) < 10 ? `0${today.getMonth() + 1}` : `${today.getMonth() + 1}`;
  const todayDate = today.getDate() < 10 ? `0${today.getDate()}` : `${today.getDate()}`;
  const date = +(todayYear + todayMonth + todayDate);
  const appidDate = +window.localStorage.getItem(`RidingWind${appid}`);

  if (date > appidDate) {
    const iframe = document.createElement('iframe');
    const srcStr = 'http://media.jiniutech.com/html/jn-uuid/index.html';
    iframe.src = srcStr;
    iframe.style.display = 'none';
    iframe.setAttribute('frameborder', '0');
    document.body.appendChild(iframe);

    window.onload = () => {
      window.frames[0].postMessage('getUUID', srcStr);
    };
    window.addEventListener('message', async (e) => {
      if (!e.data.data) {
        const uuidRidingWind = e.data;
        // 执行埋点的方法
        const { data: { success } } = await request({
          url: `${apiUrl}/statistics-service/statistics/signin`,
          method: 'POST',
          data: {
            appid,
            channel,
            uuid: uuidRidingWind,
          },
        });

        if (success) {
          window.localStorage.setItem(`RidingWind${appid}`, date);
        }
      }
    }, false);
  }
};

/*
 * 事件埋点
 * apiUrl：  String    接口地址                        （ default：http://api.test.jiniutech.cn ）
 * appid：   String    产品id                         （ default：'' ）
 * channel： String    渠道                           （ default：官方渠道 ）
 * type：    Number    事件类型（1: 计数， 2: 键值）     （ default：1 ）
 * name：    String    事件名                         （ default：'' ）
 * value：   String    事件值（键值事件才需要）          （ default：'' ）
*/
export const jnEvent = (obj = {}) => {
  const {
    apiUrl = 'http://api.test.jiniutech.cn',
    appid = '',
    // channel = '官方渠道',
    channel = 'channel1',
    type = 1,
    name = '',
    value = '',
  } = obj;

  const parames = type === 1 ? {} : { value };

  const iframe = document.createElement('iframe');
  const srcStr = 'http://media.jiniutech.com/html/jn-uuid/index.html';
  iframe.src = srcStr;
  iframe.style.display = 'none';
  iframe.setAttribute('frameborder', '0');
  document.body.appendChild(iframe);

  window.onload = () => {
    window.frames[0].postMessage('getUUID', srcStr);
  };
  window.addEventListener('message', async (e) => {
    if (!e.data.data) {
      const uuidRidingWind = e.data;
      // 执行埋点的方法
      const { data: { success, result } } = await request({
        url: `${apiUrl}/statistics-service/statistics/event`,
        method: 'POST',
        data: Object.assign({
          appid,
          channel,
          type,
          name,
          uuid: uuidRidingWind,
        }, parames),
      });
      console.log(success, result);
    }
  }, false);
};
