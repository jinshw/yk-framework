var baseURL = "/ykadmin/";
;
(function ($) {
    var ajaxRequest = {};

    ajaxRequest.getSysMenuNav = function (obj) {// 获取桩号
        var dtd = $.Deferred();
        $.ajax({
            url: baseURL + 'sys/menu/nav?_' + $.now(),
            data: obj,
            type: 'post',
            dataType: 'json',
            success: function (data) {
                if (data.code == 0) {
                    dtd.resolve(data);
                } else if (data.code == 500) {
                    dtd.reject(data.msg);
                }
            },
            error: function () {
                dtd.reject();
            }
        });
        return dtd.promise();
    }

    window.ajaxRequest = ajaxRequest;
})($);