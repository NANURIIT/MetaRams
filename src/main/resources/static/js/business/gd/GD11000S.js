/**
 * GD11000S.js
 */
const GD11000Sjs = (function(){
	
	$(document).ready(function () {
    // 조회조건 수정시 초기화
    $("#GD11000S__srchForm").find('input, select').on('input', function () {
        resetPGgrids("GD11000S");
      })
      resetAll();
	});	

    // 그룹코드 그리드
    let groupCdListTbObj;

    const Yn = [
        { "Y": "Y" }
        , { "N": "N" }
    ]

    let colModel_groupCdListTb = [
        {
            title: "그룹코드",
            dataType: "string",
            dataIndx: "cmnsCdGrp",
            editable: false,
            width: "7%",
            align: "center",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "그룹명",
            dataType: "string",
            dataIndx: "cmnsCdNm",
            editable: false,
            width: "10%",
            align: "left",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "설명",
            dataType: "string",
            dataIndx: "cmnsCdGrpExpl",
            width: "15%",
            align: "left",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "코드길이",
            dataType: "string",
            dataIndx: "cdLngth",
            width: "7%",
            align: "right",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "사용여부",
            dataIndx: "useYn",
            align: "center",
            halign: "center",
            width: "7%",
            editable: "true",
            editor: {
                type: "select",
                options: Yn
            },
        },
        {
            title: "등록일",
            dataType: "string",
            dataIndx: "rgstDt",
            editable: false,
            align: "center",
            halign: "center",
            width: "7%",
            filter: { crules: [{ condition: "range" }] },
            render: function (ui) {
                return formatDate(ui.cellData);
            },
        },
        {
            title: "처리일시",
            dataType: "string",
            dataIndx: "hndDetlDtm",
            editable: false,
            align: "center",
            halign: "center",
            width: "10%",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "처리자 사원번호",
            dataType: "string",
            dataIndx: "hndEmpno",
            editable: false,
            align: "center",
            halign: "center",
            width: "7%",
            filter: { crules: [{ condition: "range" }] },
        },
    ];


    // 추가코드 그리드
    let addCdListTbObj;

    const addYn = [
        { "Y": "Y" }
        , { "N": "N" }
    ]

    let colModel_addCdListTbObj = [
        {
            title: "그룹코드",
            dataType: "string",
            dataIndx: "cmnsCdGrp",
            editable: false,
            width: "7%",
            align: "center",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "코드ID",
            dataType: "string",
            dataIndx: "cdVlId",
            editable: false,
            width: "10%",
            align: "left",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "코드값명",
            dataType: "string",
            dataIndx: "cdVlNm",
            width: "15%",
            align: "left",
            halign: "center",
            editable: true,
            width: "",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "변환후코드ID",
            dataType: "string",
            dataIndx: "rsltCdVl",
            width: "7%",
            align: "right",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "등록일",
            dataIndx: "rgstDt",
            align: "center",
            halign: "center",
        },
        {
            title: "등록사원번호",
            dataType: "string",
            dataIndx: "rgstEmpno",
            editable: false,
            align: "center",
            halign: "center",
            width: "7%",
            filter: { crules: [{ condition: "range" }] },
            render: function (ui) {
                return formatDate(ui.cellData);
            },
        },
        {
            title: "코드일련번호",
            dataType: "string",
            dataIndx: "cdSq",
            editable: false,
            align: "center",
            halign: "center",
            width: "10%",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "사용여부",
            dataIndx: "useYn",
            align: "center",
            halign: "center",
            width: "7%",
            editable: "true",
            editor: {
                type: "select",
                options: Yn
            },
        },
        {
            title: "삭제여부",
            dataIndx: "useYn",
            align: "center",
            halign: "center",
            width: "7%",
            editable: "true",
            editor: {
                type: "select",
                options: Yn
            },
        },
        {
            title: "조작사원번호",
            dataType: "string",
            dataIndx: "hndEmpno",
            width: "15%",
            align: "left",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: "range" }] },
        },
        {
            title: "조작사원명",
            dataType: "string",
            dataIndx: "hndEmpnm",
            width: "15%",
            align: "left",
            halign: "center",
            width: "",
            filter: { crules: [{ condition: "range" }] },
        },
    ];

    $(function () {
        //select박스 코드 그룹 호출 함수
        getCommonCodeInfo();
        //코드구분 select박스 선택
        selectCommonCode();
    
        //그리드 세팅
        setGrid_GD11000S();

        // 추가코드 그리드 세팅
        setAddGrid_GD11000S();

    });

    function setGrid_GD11000S() {
        //그룹코드
        var obj_groupCdListTb = {
            height: 240,
            maxHeight: 240,
            showTitle: false,
            showToolbar: false,
            collapsible: false,
            wrap: false,
            hwrap: false,
            editable: false,
            numberCell: { show: false },
            scrollModel: { autoFit: true },
            colModel: colModel_groupCdListTb,
            strNoRows: "조회된 데이터가 없습니다.",
        };
    
        $("#GD11000S_groupCodeListTable").pqGrid(obj_groupCdListTb);
        groupCdListTbObj = $("#GD11000S_groupCodeListTable").pqGrid("instance");
    }

    function setAddGrid_GD11000S() {
        //추가코드
        var obj_addCdListTb = {
            height: 240,
            maxHeight: 240,
            showTitle: false,
            showToolbar: false,
            collapsible: false,
            wrap: false,
            hwrap: false,
            editable: false,
            numberCell: { show: false },
            scrollModel: { autoFit: true }, 
            colModel: colModel_addCdListTbObj,
            strNoRows: "조회된 데이터가 없습니다.",
        };
    
        $("#GD11000S_addCodeListTable").pqGrid(obj_addCdListTb);
        addCdListTbObj = $("#GD11000S_addCodeListTable").pqGrid("instance");
    }

    function GD11000S_saveCd() {
        // console.log("탔나요?");
        //사실은 여기에 그리드 상태 체크 함수가 있었어야함. (변경점 없으면 alert/return false로 함수 닫기.)
        
        let checkedRows = [];                                                                       // 화면에서 넘어가는 리스트 저장용도
        let gridData = $("#GD11000S_addCodeListTable").pqGrid("option", "dataModel.data");          // 추가코드 그리드 

        let paramData = {};

        for (let i = 0; i < gridData.length; i++) {

            // 그리드 돌면서 바뀐 그리드 데이터 푸쉬하고 파라미터에 추가
            let rowData = gridData[i];
            checkedRows.push(rowData);
            
        }      
        paramData = {
            addList: checkedRows                                        // 바뀐 그리드 
            , cmnsCdGrp: $("#GD11000S_commonCodeInfo").val()            // 판단하기 위한 코드구분
            , cmnsCdGrpExpl: $("#GD11000S_commonCodeGrpExpl").val()     // 판단하기 위한 코드설명

        }
           
        console.log("paramData ::: ", paramData);

        


        $.ajax({
			type: "POST",
			url: "/GD11000S/saveCodeInfo",
			data: JSON.stringify(paramData),
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			success: function(data) {
				if (data === 1){                                        //업데이트할 행 없음
                    console.log("업데이트할 행이 없어요!!");
                    Swal.fire({
                        icon: "warning"
                        , title: "Warning!" 
                        , text: "업데이트 할 행이 없습니다."
                      })

                }else if(data === 2){                                   //업데이트한 행이 있고 오류도 안남.
                    console.log("업데이트한 행이 있고 오류도 안남.");
                    Swal.fire({
                        icon: "success"
                        , title: "Success!" 
                        , text: "업데이트에 성공했습니다!"
                      })

                }else if (data === 0){  
                    Swal.fire({
                        icon: "warning"
                        , title: "Warning!" 
                        , text: "조회된 데이터가 없습니다."
                      })                                              
                }
			},
			error: function() {
				
			},
		});
    }

    /**
   * select박스 코드 그룹 호출 함수
   */
    var getCommonCodeInfo = function () {
        $.ajax({
            url: "/GD11000S/commonCodeInfo",
            method: "GET",
            dataType: "json",
        }).done(function (commonCodeInfo) {
            let commonCodeOption = '<option value="">전체</option>';
            for (let i = 0; i < commonCodeInfo.length; i++) {
                let commonCode = commonCodeInfo[i];
                commonCodeOption +=
                '<option value="' +
                commonCode.cmnsCdGrp +
                '">' +
                commonCode.cmnsCdGrpExpl +
                " (" +
                commonCode.cmnsCdGrp +
                ")</option>";
            }
            $("#GD11000S_commonCodeInfo").html(commonCodeOption);
        });
    };

    var getCommonCodeInfo = function () {
        $.ajax({
            url: "/GD11000S/commonCodeInfo",
            method: "GET",
            dataType: "json",
        }).done(function (commonCodeInfo) {
            let commonCodeOption = '<option value="">전체</option>';
            for (let i = 0; i < commonCodeInfo.length; i++) {
                let commonCode = commonCodeInfo[i];
                commonCodeOption +=
                '<option value="' +
                commonCode.cmnsCdGrp +
                '">' +
                commonCode.cmnsCdGrpExpl +
                " (" +
                commonCode.cmnsCdGrp +
                ")</option>";
            }
            $("#GD11000S_commonCodeInfo").html(commonCodeOption);
        });
    };

        /**
     * 코드구분 select박스 선택
     */
    function selectCommonCode() {
        $(document).on("click", "#GD11000S_commonCodeSearch", function () {
            let cmnsCdGrp = $("#GD11000S_commonCodeInfo option:selected").val();
            getCodeInfo(cmnsCdGrp);
        });
    }

    
    // 통합 코드조회
    function getCodeInfo (cmnsCdGrp) {

        let test = {
            $bottom: ""
            , hi: function ( amt ) {
                return "test" + String(amt);
            }
        }

        let instance = $('#GD11000S_groupCodeListTable').pqGrid('instance');

        instance.$bottom;

        $($('#GD11000S_groupCodeListTable').pqGrid('instance').$header).prev('div').find('')
        
        .css({
            "background-color": "red !important;"
        })
        // $('#GD11000S_groupCodeListTable').pqGrid('instance').refresh();

        console.log(
            $('#GD11000S_groupCodeListTable').pqGrid('instance')
        );
        
        // console.log(test.hi( test.amt ));
        // console.log(test.amt);
        

        let paramData = {
            cmnsCdGrp: cmnsCdGrp,
            cmnsCdGrpExpl: $("#GD11000S_commonCodeGrpExpl").val()
            
        }

        $.ajax({
            url: "/GD11000S/codeInfo",
            method: "post",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(paramData),
            dataType: "json",
            success: function(data) {
            
                let groupCodeList = data.grpList;      // 그룹코드 리스트
                let addCodeList = data.addList;        // 추가코드 리스트


                $('#GD11000S_groupCodeListTable').pqGrid('instance').setData(groupCodeList);
                $('#GD11000S_addCodeListTable').pqGrid('instance').setData(addCodeList);

            },
            error: function () {
                Swal.fire({
                    icon: 'warning'
                    , title: 'Warning!'
                    , text: "조회된 데이터가 없습니다!"
                })
            }
        })
    }

    // 전체 초기화
    function resetAll() {
        $("#GD11000S_commonCodeInfo").val("")
        $("#GD11000S_commonCodeGrpExpl").val("")
        resetPGgrids("GD11000S");
    }


    // 계산기
    function listCalculator() {
        $.ajax({
            url: "/GD11000S/listCalculator",
            method: "get",
            contentType: "application/json; charset=UTF-8",
            // data: JSON.stringify(),
            dataType: "json",
            success: function(data) {
                console.log("ArrayList 체크 ::: " + data);
                
            },
            error: function () {
                
            }
        })

    }





    return {
        resetAll: resetAll,
        GD11000S_saveCd: GD11000S_saveCd,
        listCalculator: listCalculator
    };

})();