/**
 * GD11000S.js
 */
const GD11000Sjs = (function(){
	
	$(document).ready(function () {
		
	});	

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

    $(function () {
        //select박스 코드 그룹 호출 함수
        getCommonCodeInfo();
        //코드구분 select박스 선택
        selectCommonCode();
    
        //그리드 세팅
        setGrid_GD11000S();
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
    
        $("#GD90000S_groupCodeListTable").pqGrid(obj_groupCdListTb);
        groupCdListTbObj = $("#GD90000S_groupCodeListTable").pqGrid("instance");
    }

    /**
   * select박스 코드 그룹 호출 함수
   */
    var getCommonCodeInfo = function () {
        $.ajax({
            url: "/TB10010S/commonCodeInfo",
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
            $("#GD90000S_commonCodeInfo").html(commonCodeOption);
        });
    };

        /**
     * 코드구분 select박스 선택
     */
    function selectCommonCode() {
        $(document).on("click", "#GD90000S_commonCodeSearch", function () {
            let cmnsCdGrp = $("#GD90000S_commonCodeInfo option:selected").val();
            getGroupCodeInfoList(cmnsCdGrp);
        });
    }

    /**
   * 그룹코드 리스트 호출
   * @param {string} cmnsCdGrp 그룹코드
   */
    var getGroupCodeInfoList = function (cmnsCdGrp) {
        //let _url = "/TB10010S/groupCodeInfoList"; << API CONTROLLER URL

        paramData = {
            // cmnsCdGrp: cmnsCdGrp
            // , cmnsCdGrpExpl: $('#commonCodeGrpExpl').val()
        }

        $.ajax({
            url: _url,
            method: "post",
            contentType: "application/json; charset=UTF-8",
            data: JSON.stringify(paramData),
            dataType: "json",
        }).done(function (groupCodeInfoList) {
            if (groupCodeInfoList.length > 0) {
                $('#groupCodeListTable').pqGrid('instance').setData(groupCodeInfoList);
                groupCdListTbObj.refreshDataAndView();
            } else {
                groupCdListTbObj.option("strNoRows", "조회된 데이터가 없습니다.");
            }
        });
    };

})();