/*
 * @Descripttion:
 * @version:
 * @Author: surui
 * @Date: 2021-01-19 13:42:52
 * @LastEditors: surui
 * @LastEditTime: 2021-01-25 21:07:33
 */
$(function () {
    // 购物车全选按钮
    $(".checkall").change(function () {
        // 全选与全不选
        $(".j-checkbox,.checkall").prop("checked", $(this).prop("checked"));
    });
    // 小checked
    $(".j-checkbox").change(function () {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
    });

    // 购物车数量
    // 增加
    $(".increment").click(function () {
        let n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n)
    })
    // 减少
    $(".decrement").click(function () {
        let n = $(this).siblings(".itxt").val();
        if (n != 1) {
            n--;
            $(this).siblings(".itxt").val(n);
        }
    })
})