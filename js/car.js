/*
 * @Descripttion:
 * @version:
 * @Author: surui
 * @Date: 2021-01-19 13:42:52
 * @LastEditors: surui
 * @LastEditTime: 2021-01-27 19:16:54
 */
$(function () {
    // 购物车全选按钮
    $(".checkall").change(function () {
        // 全选与全不选
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
        // 选中商品添加背景
        if ($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item")
        }
        getSum();
    });
    // 小checked 点击即选中
    $(".j-checkbox").change(function () {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        // 选中商品添加背景
        if ($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item")
        }
        getSum()
    });

    // 商品数量
    // 增加
    $(".increment").click(function () {
        let n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        sum($(this), n);
        getSum();
    })
    // 减少
    $(".decrement").click(function () {
        let n = $(this).siblings(".itxt").val();
        if (n != 1) {
            n--;
            $(this).siblings(".itxt").val(n);
        } else {
            return false
        }
        sum($(this), n);
        getSum();
    });
    // 小计跟随数量变化
    function sum(obj, n) {
        let p = obj.parents(".p-num").siblings(".p-price").html();
        obj.parents(".p-num").siblings(".p-sum").text("￥" + (p.substr(1) * n).toFixed(2));
    }
    // 用户修改文本框的值   计算小计模块
    $(".itxt").change(function () {
        sum($(this), $(this).val());
        getSum();
    })

    // 总计 
    function getSum() {
        let count = 0;
        let money = 0;
        // 数量
        $(".itxt").each(function (i, ele) {
            if ($(ele).parents(".p-num").siblings(".p-checkbox").children(".j-checkbox").prop("checked")) {
                count += parseFloat($(ele).val());
                i++;
            }
        })
        // 总额
        $(".p-sum").each(function (i, ele) {
            if ($(ele).siblings(".p-checkbox").children(".j-checkbox").prop("checked")) {
                money += parseFloat($(ele).text().substr(1));
                i++;
            }

        })
        $(".amount-sum em").text(count);
        $(".price-sum em").text("￥" + money.toFixed(2));
    }

    // 删除
    // 商品后面的删除按钮
    $(".p-action a").click(function () {
        $(this).parents(".cart-item").remove();
        getSum();
    })
    // 删除选中的商品
    $(".remove-batch").click(function () {
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    // 清空购物车
    $(".clear-all").click(function () {
        $(".cart-item-list").empty();
        getSum();
    })

})