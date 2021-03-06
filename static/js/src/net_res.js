/**
 * Created by TaoHu on 2017/1/22.
 */

var chart;
var chart_bw;
function initChart() {
    chart = echarts.init(document.getElementById("ip_res"), 'macarons');
    chart_bw = echarts.init(document.getElementById("band_width"), 'macarons');
}

function renderChart(data) {
    //console.log(data);
    var legend_data = [];
    for (var i = 0; i < data.length; i++) {
        legend_data.push(data[i].name)
    }

    var option = {
        title: {
            text: '机房占用比率',
            x: 'center'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: legend_data
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: false},
                dataView: {show: true, readOnly: false},
                magicType: {
                    show: true,
                    type: ['pie', 'funnel'],
                    option: {
                        funnel: {
                            x: '25%',
                            width: '50%',
                            funnelAlign: 'left',
                            max: 1548
                        }
                    }
                },
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        series: [
            {
                name: '机房占用比率',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: data,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    chart.hideLoading();
    chart.clear();
    chart.setOption(option);
}

function renderChart_bw(data) {
    var xAxis_data = [];
    var series_data = [];
    for (var i = 0; i < data.length; i++) {
        xAxis_data.push(data[i].name);
        series_data.push(data[i].value);
    }

    var option = {
        title: {
            text: '机房带宽(Mb)',
            x: 'center'
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['最大带宽']
        },
        toolbox: {
            show: true,
            feature: {
                mark: {show: false},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        calculable: true,
        xAxis: [
            {
                type: 'category',
                data: xAxis_data
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '最大带宽',
                type: 'bar',
                stack: 'sum',
                barCategoryGap: '50%',
                data: series_data,
                itemStyle: {
                    normal: {
                        color: '#B9D3EE',
                        //barBorderColor: '#B9D3EE',
                        //barBorderWidth: 6,
                        //barBorderRadius: 0,
                        label: {
                            show: true, position: 'insideTop'
                        }
                    }
                }
            }
        ]
    };
    chart_bw.hideLoading();
    chart_bw.clear();
    chart_bw.setOption(option);
}

function getData() {
    var url = '/eyes/get_idc_list/';
    $.getJSON(
        url,
        function (data) {
            chart.showLoading({text: "正在努力加载数据中..."});
            renderChart(data);
        }
    );

    var url_bw = '/eyes/get_idc_bw/';
    $.getJSON(
        url_bw,
        function (data) {
            chart_bw.showLoading({text: "正在努力加载数据中..."});
            renderChart_bw(data);
        }
    )
}

$(document).ready(function () {
    //$("#assets").removeClass("hiding");
    //$("#idc_info").addClass("sub_item");
    initChart();
    getData();
});