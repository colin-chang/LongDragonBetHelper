# 彩票长龙下注助手

## 长龙下注逻辑
* 本程序可以帮助用户根据当前长龙列表进行反向下注，如出现10期大长龙，则自动选择小进行下注
* 自动下注分为两段式,默认配置支持追号从第6次长龙到第10次和第12次到第15次。如果不想使用两段式追号，可以将高段起投金额设置为0，仅使用低段追号即可
* 以下追号范围，起投金额和背投公式可以自行定制修改

```js
    let config={
        //低段-起投期数
        beginPeriodL:6,
        //地段-截止期数
        endPeriodL:10,
        //地段-起投金额
        beginBetMoneyL:3,

        //高段-起投期数
        beginPeriodH:12,
        //高段-截止期数
        endPeriodH:15,
        //高段-起投金额
        beginBetMoneyH:15,

        //倍投公式
        formula:[1,3,8,20,48,90]
    };
```

## 适用彩票平台

本程序适用于[谦喜彩票](https://qxbet.com)或同模板彩票平台此模板彩票平台很多，用户可自行搜索。本程序以谦喜平台为例，兼容其他同模板平台修改如下匹配规则即可
```js
// @match        https://qxbet.com/pc/member/index.html*
```

## 支持主要彩种

1. 北京PK10
2. 重庆时时彩
3. 重庆幸运农场
4. 广东快乐十分
5. 广东11选5
6. 秒速赛车
7. 秒速飞艇
8. 秒速时时彩

## 支持两面盘玩法

1. 大小
2. 单双
3. 龙虎
4. 尾大小
5. 合数单双

*支持彩种和玩法可以在`reverse`函数种自行扩展*
```js
function reverse(content){
    switch(content)
    {
        case '大':return '小';
        case '小':return '大';
        case '单':return '双';
        case '双':return '单';
        case '龙':return '虎';
        case '虎':return '龙';
        case '尾大':return '尾小';
        case '尾小':return '尾大';
        case '合数单':return '合数双';
        case '合数双':return '合数单';
    }
}
```

## 使用方式
* 本程序为浏览器用户脚本,可以在浏览器用户脚本插件如[Tampermonkey](https://tampermonkey.net/)中运行
* 浏览器支持安装用户脚本插件即可运行本程序，支持 Windows/mac OS/Linux等主流的操作系统，**暂不支持移动端**
* 支持 Chrome/Firefox/Microsoft Edge/Safari/Opera Next等主流浏览器

> [Tampermonkey](https://tampermonkey.net/) 是一款免费的浏览器扩展和最为流行的用户脚本管理器
