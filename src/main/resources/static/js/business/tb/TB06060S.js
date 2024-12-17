const TB06060Sjs = (function(){
    let prdtInfoGridIns;

    let colM_TB06060S = [

        {
            title: "딜번호",
            dataType: "string",
            dataIndx: "dealNo",
            align: "center",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: 'range' }] } 
        },
        {
            title: "딜명",
            dataType: "string",
            dataIndx: "dealNm",
            align: "center",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: 'range' }] } 
        },
        {
            title: "안건명",
            dataType: "string",
            dataIndx: "mtrNm",
            align: "center",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: 'range' }] } 
        },
        {
            title: "종목코드",
            dataType: "string",
            dataIndx: "prdtCd",
            align: "center",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: 'range' }] } 
        },
        {
            title: "종목명",
            dataType: "string",
            dataIndx: "prdtNm",
            align: "left",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: 'range' }] } 
        },
        {
            title: "진행상태",
            dataType: "string",
            //dataIndx: "mtrPrgSttsNm",
            dataIndx: "prgSttsNm",
            align: "center",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: 'range' }] } 
        },
        {
            title: "거래상대방명",
            dataType: "string",
            dataIndx: "entpNm",
            align: "center",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: 'range' }] } 
        },
        {
            title: "상품대분류",
            dataType: "string",
            dataIndx: "invPrdtLclsNm",
            align: "center",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: 'range' }] } 
        },
        {
            title: "종목승인금액",
            dataIndx: "eprzCrdlApvlAmt",
            dataType: "integer",
            align: "right",
            halign: "center",
            width: "",
            //filter: { crules: [{ condition: 'range' }] },
            format: "#,###" 
        },
        {
            title: "약정금액",
            dataIndx: "eprzCrdlCtrcAmt",
            dataType: "integer",
            align: "right",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: 'range' }] },
            format: "#,###" 
        },
        {
            title: "잔액",
            dataIndx: "dealExcBlce",
            dataType: "integer",
            align: "right",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: 'range' }] },
            format: "#,###" 
        },
        {
            title: "상환회차",
            dataIndx: "rdmpTmrd",
            dataType: "String",
            align: "center",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: 'range' }] }
        },
        {
            title: "mtrDcd",
            dataIndx: "mtrDcd",
            dataType: "String",
            align: "right",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: 'range' }] },
            hidden: true
        }

    ]

    $(document).ready(function() {
        setGrid_TB06060S();
    });


    function setGrid_TB06060S(){

        var obj = {
            height: 160,
            maxHeight: 160,
            showTitle: false,
            showToolbar: false,
            collapsible: false,
            editable: false,
            wrap: false,
            hwrap: false,
            numberCell: { show: false },
            scrollModel: { autoFit: true },
            colModel: colM_TB06060S,
            strNoRows : '조회된 데이터가 없습니다.',
            cellDblClick: function(event, ui){
                var rowData = ui.rowData;
                //setFlow(parseInt(rowData.mtrPrgSttsDcd));
                setFlow(parseInt(rowData.prgSttsCd));
                
                showDetailData(rowData);
            },
            cellClick: function(event,ui){
                //클릭시 선택한 열 볼드처리
                console.log(ui.rowData)
                $("#TB06060S_prdtInfoGrid .pq-grid-row").css("font-weight",'');
                //var row = $("#TB09060S_grid1").pqGrid("getRow", { rowIndx: ui.rowIndx});
                $("#pq-body-row-u0-"+ui.rowIndx+"-right").css("font-weight",'bold');
            }
        }

        $("#TB06060S_prdtInfoGrid").pqGrid(obj);
        $("#TB06060S_prdtInfoGrid").pqGrid("refreshDataAndView");
        prdtInfoGridIns = $("#TB06060S_prdtInfoGrid").pqGrid('instance');

    }

    /*********************
     * 240614 초기화 추가 * 
     *********************/
    function resetAll() {
        $('#TB06060S_ibDealNo').val('');              
        $('#TB06060S_ibDealNm').val('');             
        $('#TB06060S_prdtCd').val('');        
        $('#TB06060S_prdtNm').val('');        
        $('#TB06060S_cnsbNm').val('');
        $('#TB06060S_jdgmRsltDcd').val('');        
        $('#TB06060S_jdgmRsltRgstDt').val('');        
        $('#TB06060S_jdgmRsltCtns').val('');     
        var waitHtml = '<span class="status-desc">상태 : <span class="status -wait">미완료</span></span>';
        $(".flow-status p").removeClass("-check");
        $(".flow-status div").html(waitHtml);
        prdtInfoGridIns.setData([]);

    };

    function getWorkflowList(){

        if($('#TB06060S_ibDealNo').val()=="" && $('#TB06060S_prdtCd').val()==""){
            console.log("필수입력항목!!!");
            return 0;
        }

        const paramData = {
            dealNo : $('#TB06060S_ibDealNo').val(),
            prdtCd : $('#TB06060S_prdtCd').val()
        }

        console.log(paramData);

        $.ajax({
            type: "POST",
            url: "/TB06060S/getWorkflowInfoList",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(paramData),
            dataType: "json",
            success: function(data) {
                if(data){
                    console.log(data);
                    prdtInfoGridIns.setData(data);
                    if(data.length==0){
                        $('#TB06060S_cnsbNm').val('');
                        $('#TB06060S_jdgmRsltDcd').val('');        
                        $('#TB06060S_jdgmRsltRgstDt').val('');        
                        $('#TB06060S_jdgmRsltCtns').val('');  
                        var waitHtml = '<span class="status-desc">상태 : <span class="status -wait">미완료</span></span>';
                        $(".flow-status p").removeClass("-check");
                        $(".flow-status div").html(waitHtml);
                    }else{
                        setFlow(parseInt(data[0].prgSttsCd));
                        showDetailData(data[0]); 
                    }
                }else{
                    Swal.fire({
                        icon: 'warning'
                        , title: "warning!"
                        , text: "?"
                        , confirmButtonText: "확인"
                    }).then((result) => {
                        resetAll();
                    });
                }
            },
            error: function(e){
                console.log(e);
                Swal.fire({
                    icon: 'error'
                    , title: "error!"
                    , text: "???"
                    , confirmButtonText: "확인"
                }).then((result) => {
                resetAll();
                });
            }
        }); 
    }


    function showDetailData(rowData){

        
        const paramData = {
            dealNo : rowData.dealNo,	
            mtrDcd : rowData.mtrDcd
        }

        console.log(paramData);

        $.ajax({
            type: "POST",
            url: "/TB06060S/getWorkflowDetail",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(paramData),
            dataType: "json",
            success: function(data) {
                if(data){
                    console.log("-=-=-=-=-=-=-=-=-=-=-=-");
                    console.log(data);
                    $('#TB06060S_cnsbNm').val(data.cnsbNm);
                    $('#TB06060S_jdgmRsltDcd').val(data.jdgmRsltDcdNm);
                    $('#TB06060S_jdgmRsltRgstDt').val(formatDate(data.jdgmRsltRgstDt));
                    $('#TB06060S_jdgmRsltCtns').val(data.jdgmRsltCtns);

                }else{
                    Swal.fire({
                        icon: 'warning'
                        , title: "warning!"
                        , text: "데이터가 없습니다."
                        , confirmButtonText: "확인"
                    }).then((result) => {
                        $('#TB06060S_cnsbNm').val("");
                        $('#TB06060S_jdgmRsltDcd').val("");
                        $('#TB06060S_jdgmRsltRgstDt').val("");
                        $('#TB06060S_jdgmRsltCtns').val("");
                        var waitHtml = '<span class="status-desc">상태 : <span class="status -wait">미완료</span></span>';
                        $(".flow-status p").removeClass("-check");
                        $(".flow-status div").html(waitHtml);
                    });
                }
            },
            error: function(e){
                console.log(e);
              Swal.fire({
                    icon: 'error'
                    , title: "error!"
                    , text: "데이터를 불러오지 못 했습니다."
                    , confirmButtonText: "확인"
                }).then((result) => {
                    $('#TB06060S_cnsbNm').val("");
                    $('#TB06060S_jdgmRsltDcd').val("");
                    $('#TB06060S_jdgmRsltRgstDt').val("");
                    $('#TB06060S_jdgmRsltCtns').val("");
                }); 
                $('#TB06060S_cnsbNm').val("");
                    $('#TB06060S_jdgmRsltDcd').val("");
                    $('#TB06060S_jdgmRsltRgstDt').val("");
                    $('#TB06060S_jdgmRsltCtns').val("");
            }
        }); 
    }


    $('#TB06060S_prdtCd').on('change', function() {
        $('#TB06060S_prdtNm').val('');
    });

    $('#TB06060S_ibDealNo').on('change', function() {
        $('#TB06060S_ibDealNm').val('');
    });

    function setFlow(index){

        var flow =  Math.floor(index / Math.pow(10, String(index).length - 1));

        var waitHtml = '<span class="status-desc">상태 : <span class="status -wait">미완료</span></span>';
        var registHtml = '<span class="status-desc">상태 : <span class="status -regist">완료</span></span>';
        $(".flow-status p").removeClass("-check");
        $(".flow-status div").html(waitHtml);
        

        for(var i = 0;i<flow;i++){
            var indexNm = "[name = flow0"+i+"]";
            $(indexNm+" p").addClass("-check");
            $(indexNm+" div").html(registHtml);
        }
    }

    return {
        getWorkflowList : getWorkflowList
        , resetAll : resetAll
        
    }
})();