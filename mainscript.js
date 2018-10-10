// ==UserScript==
// @name         谦喜长龙下注助手
// @namespace    http://colin-chang.site
// @version      1.2
// @description  汇总长龙数据并辅助下注
// @author       Colin Chang
// @match        https://qxbet.com/pc/member/index.html*
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

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

    //程序入口
    setTimeout(function(){
        //添加跟投按钮
        appendBetBtn();
        $('.lotterys a').on('click',function(){appendBetBtn()});
        function appendBetBtn(){
            setTimeout(function(){
                let longDragonList= $('#stat_play_list tr');
                if(!longDragonList)
                    return;
                if(longDragonList.first().children().length<2)
                    return;

                if($('#stat_play_list_desc #btnBet').length<=0)
                    $('<button id="btnBet">跟投</button>').appendTo('#stat_play_list_desc');

                $('#btnBet').on('click',function(){
                    $('#stat_play_list tr').each(function(){
                        var play= $(this).children('th').text().trim();
                        var dragon=$(this).children('td').text().trim().replace('期','')-0;

                        autoBet(play,dragon);
                    });
                    //下注
                    $('.btn-submit').first().click();
                })
            },1000);
        }
    },2000);

    function autoBet(play,dragon){
        //计算下注金额
        let betMoney;
        if(dragon>=config.beginPeriodL&&dragon<=config.endPeriodL)
        {
           betMoney= config.beginBetMoneyL*config.formula[dragon-config.beginPeriodL];
        }
        else if(dragon>=config.beginPeriodH&&dragon<=config.endPeriodH)
        {
            betMoney= config.beginBetMoneyH*config.formula[dragon-config.beginPeriodH];
        }
        else
            return;

        let parts= play.split('-');
        if(parts.length<2)
            return;//暂不支持和值

        //长龙取反
        parts[1]=reverse(parts[1]);

        //定位表单
        let tb;
         $('.game_view:visible .cont-list1 table.u-table2 thead th').each(function(){
            if($(this).text()===parts[0])
               tb= $(this).parentsUntil('td').last();
         });
         let tr;
         tb.find('tbody tr td.name').each(function(){
             if($(this).text()===parts[1])
                tr= $(this).parent();
         });
         tr.children().addClass('bg_yellow').last().children().val(betMoney);
    }

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

})();


