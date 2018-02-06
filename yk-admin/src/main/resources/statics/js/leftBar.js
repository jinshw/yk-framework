// 左侧导航
var MENU_LIST = []
layui.use(['element', 'layer', 'jquery', 'tree'], function () {
    var element = layui.element;
    var layer = layui.layer;
    var $ = layui.jquery;

    /*function addTab($this){
        var tabTit = $this.html();
        var tabUrl = $this.attr('href').replace('#','');
        var tabId = $this.attr('data-id');
        var tabCon = $.ajax({
            type: 'get',
            url: tabUrl,
            dataType: 'html',
            success: function(data){
                console.log(typeof(data))
                return data;
            }

        });
        element.on('tab(demo)',function(ele){
            console.log(ele)
        })
        element.tabAdd('demo', {
            title: tabTit
            ,content: tabCon //支持传入html
            ,id: tabId
        });
        element.tabChange('demo', tabId);

    }*/
    var activeTab = {
        //$this  : $('.layui-nav-tree a'),
        tabTit: '',
        tabUrl: '',
        tabId: '',
        tabCon: function () {
            var result;
            $.ajax({
                type: 'get',
                url: this.tabUrl,
                dataType: 'html',
                success: function (data) {
                    result = data;
                    toMenuList(data)
                }
            })
            return result;
        },
        addTab: function () {
            element.tabAdd('demo', {
                title: this.tabTit
                , content: '<iframe src = ' + this.tabUrl + ' ></iframe>' //支持传入html
                , id: this.tabId
            })
        },
        changeTab: function () {
            element.tabChange('demo', this.tabId);
        },
        ishasTab: function () {
            var _this = this;
            var dataId, isflag;
            var arrays = $('.layui-tab-title li');
            $.each(arrays, function (idx, ele) {
                dataId = $(ele).attr('lay-id');
                if (dataId === _this.tabId) {
                    isflag = true
                    return false
                } else {
                    isflag = false
                }
            })
            return isflag
        },
        init: function (tabtit, taburl, tabid) {
            var _this = this;
            _this.tabUrl = taburl;
            _this.tabId = tabid;
            _this.tabTit = tabtit;
            if (taburl) {
                if (!_this.ishasTab()) {
                    _this.addTab();
                }
                _this.changeTab();
            } else {
                return false
            }


            //监听左侧导航点击
            /*element.on('nav(test)', function(elem){
                var $a = $(elem).find('a');
                _this.tabUrl = $a.attr('href').replace('#','');
                _this.tabId = $a.attr('data-id');
                _this.tabTit = $a.html();
                if(_this.tabId){
                    if(!_this.ishasTab()){
                        _this.addTab();
                    }
                    _this.changeTab();
                }else{
                    return false
                }
            });*/
        }
    }

    ajaxRequest.getSysMenuNav({}).then(function (data) {
        console.log("000000000000")
        console.log(data)
        layui.tree({
            elem: '#demo' //传入元素选择器
            , skin: 'sidebar'
            , nodes: data.menuList
             /*   [ //节点
                    {
                        name: '基础数据管理'
                        , menuId: '1'
                        , list: [
                        {
                            name: '企业平台数据管理'
                            , menuId: '11'
                            , url: 'modules/sys/menu.html'
                        }, {
                            name: '行政区划设置'
                            , menuId: '12'
                            , url: 'xzqlsz.html'
                        }, {
                            name: '基础编码设置'
                            , menuId: '13'
                            , url: 'jcbmsz.html'
                        }, {
                            name: '线路注册'
                            , menuId: '14'
                            , children: [
                                {
                                    name: '路段注册'
                                    , menuId: '141'
                                    , url: 'ldzc.html'
                                },
                                {
                                    name: '路线注册'
                                    , menuId: '142'
                                    , url: 'lxzc.html'
                                }
                            ]
                        }
                    ]
                    },
                ]*/
            , click: function (node, item) {
                //node即为当前点击的节点数据,item就是被点击的a标签对象了
                $('#demo a').removeClass('active');
                $(item).addClass('active');
                $(item).siblings('.layui-tree-spread').click();
                activeTab.init(node.name, node.url, node.menuId);
            }
        });
    })


})
