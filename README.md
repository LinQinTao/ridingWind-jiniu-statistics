# [ridingWind-jiniu-statistics](https://gitee.com/LinQinTao/ridingWind-jiniu-statistics.git)

# 当前版本 0.0.5

# 简介
1. 绩牛统计埋点

# 使用说明

一. 安装

```sh
npm install --save ridingwind-jiniu-statistics
```

二. 使用

1、签到

# 参数说明：

```js
 * apiUrl：  String    接口地址  （ default：http://api.test.jiniutech.cn ）
 * appid：   String    产品id   （ default：'' ）
 * channel： String    渠道     （ default：'official' ）
```

```js
import { jnSignin } from 'ridingwind-jiniu-statistics';

jnSignin({ apiUrl, appid, channel })
```

2、事件埋点

# 参数说明：

```js
 * apiUrl：  String    接口地址                        （ default：http://api.test.jiniutech.cn ）
 * appid：   String    产品id                         （ default：'' ）
 * channel： String    渠道                           （ default：'official' ）
 * type：    Number    事件类型（1: 计数， 2: 键值）     （ default：1 ）
 * name：    String    事件名                         （ default：'' ）
 * value：   String    事件值（键值事件才需要）          （ default：'' ）
```

```js
import { jnEvent } from 'ridingwind-jiniu-statistics';

jnEvent({ apiUrl, appid, channel, .... })
```

