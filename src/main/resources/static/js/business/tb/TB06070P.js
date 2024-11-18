
let pqGridTB0670Info;
let selectBoxP;
let grdSelectP = {};
let TB06070P_gridState = 1;

$(document).ready(function() {
	//pqGridTB0670Info = TB06070P_colModelData();	// 그리드 렌더링
	fnSelectBoxP();
	createSelectTagP();
});


/*
 *  =====================PQGRID=====================
 */

/*
 *  pqGrid colModel
 */
function TB06070P_colModelData() {

    const TB06070P_colModel = [
        {
            title: "상품코드",
            dataType: "string",
            dataIndx: "prdtCd",
            halign: "center",
            align: "right",
            width: "100",
            filter: { crules: [{ condition: 'range' }] },
            
        }
        , {
            title: "상품명",
            dataType: "string",
            dataIndx: "prdtName",
            halign: "center",
            align: "right",
            width: "100",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "신용공여계정과목코드",
            dataType: "string",
            dataIndx: "crdtGrntActsCd",
            halign: "center",
            align: "right",
            width: "180",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "자산분류코드",
            dataType: "string",
            dataIndx: "asstClsfCd",
            halign: "center",
            align: "right",
            width: "120",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "자산대분류코드",
            dataType: "string",
            dataIndx: "asstLclsCd",
            halign: "center",
            align: "right",
            width: "140",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "상품유형코드",
            dataType: "string",
            dataIndx: "prdtTypeCd",
            halign: "center",
            align: "right",
            width: "120",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "신용공여중분류코드",
            dataType: "string",
            dataIndx: "crdtGrntMclsCd",
            halign: "center",
            align: "right",
            width: "140",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "신용공여유형코드",
            dataType: "string",
            dataIndx: "crdtGrntTypeCd",
            halign: "center",
            align: "right",
            width: "140",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "SPPI여부",
            dataType: "string",
            dataIndx: "sppiYn",
            halign: "center",
            align: "right",
            width: "120",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "운용펀드금융상품분류코드",
            dataType: "string",
            dataIndx: "utlzFundFnncPrdtClsfCd",
            halign: "center",
            align: "right",
            width: "180",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "대출만기코드",
            dataType: "string",
            dataIndx: "loanExpdCd",
            halign: "center",
            align: "right",
            width: "140",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "프로젝트대출여부",
            dataType: "string",
            dataIndx: "prctLoanYn",
            halign: "center",
            align: "right",
            width: "140",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "인수금융여부",
            dataType: "string",
            dataIndx: "udwtFnncYn",
            halign: "center",
            align: "right",
            width: "140",
            filter: { crules: [{ condition: 'range' }] }
        }
        
        , {
            title: "인수금융여부",
            dataType: "string",
            dataIndx: "udwtFnncYn",
            halign: "center",
            align: "right",
            width: "140",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "부동산관련여부",
            dataType: "string",
            dataIndx: "rlesReltYn",
            halign: "center",
            align: "right",
            width: "140",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "상품판매상태코드",
            dataType: "string",
            dataIndx: "prdtSaleStatCd",
            halign: "center",
            align: "right",
            width: "140",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "판매시작일자",
            dataType: "string",
            dataIndx: "saleStrtDt",
            halign: "center",
            align: "right",
            width: "100",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "판매종료일자",
            dataType: "string",
            dataIndx: "saleEndDt",
            halign: "center",
            align: "right",
            width: "140",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "이자선후급구분코드",
            dataType: "string",
            dataIndx: "intAnapDvsnCd",
            halign: "center",
            align: "right",
            width: "180",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "중도상환수수료여부",
            dataType: "string",
            dataIndx: "mrdpFeeYn",
            halign: "center",
            align: "right",
            width: "140",
            filter: { crules: [{ condition: 'range' }] }
        }
        , {
            title: "외화대출여부",
            dataType: "string",
            dataIndx: "frcrLoanYn",
            halign: "center",
            align: "right",
            width: "140",
            filter: { crules: [{ condition: 'range' }] }
        }
        
        
    ]

    return TB06070P_colModel;
}

/*
 *  PQGRID SETTING
 */
function roadPqGrid() {
	
	arrPqGriInfoList = $("#TB06070P_colModel").pqGrid( 'instance' );
	
	if(typeof arrPqGriInfoList == "undefined") {
		// 그리드 옵션 생성
        let pqGridObjs = [
            {
                height: 580
                , maxHeight: 580
                , id: 'TB06070P_colModel'
                , colModel: TB06070P_colModelData()
                , scrollModel: { autoFit: false }     
                , selectionModel: { type: 'row' }
                , showTitle: false
				, showToolbar: false
				, collapsible: false
				, wrap: false
				, hwrap: false
				, numberCell: { show: false, width: 40, resizable: true, title: "<p class='text-center'>순번</p>" }
				, editable: false
				, strNoRows: '데이터가 없습니다.'
            }
        ];
        setPqGrid(pqGridObjs);
        arrPqGriInfoList = $("#TB06070P_colModel").pqGrid('instance');
	} else {
		arrPqGriInfoList.setData([]);
	}
    
}

//그리드에 데이터 넣기 (CRUD)
function dataInfoSetGrid(data){
	
	arrPqGriInfoList.setData(data);
	arrPqGriInfoList.option("strNoRows", '조회된 데이터가 없습니다.');
	arrPqGriInfoList.on("cellDblClick", function (event, ui) 
    {
        var rowData = ui.rowData;
        setInfo(rowData);
    });
}


/**
 * dblclick event function
 */
function setInfo(e) {
	
	var tr = $(e);
	var td = $(tr).children();
	// 종목정보
	var mrtgMngmNo		= td.eq(0).text();
	var mrtgNm			= td.eq(1).text();
	var mrtgStupKndCd	= td.eq(2).text();
	var mrtgLclsCd		= td.eq(3).text();
	var mrtgMdclCd		= td.eq(4).text();
	var mrtgAmt			= td.eq(5).text();
	var rgstDt			= td.eq(6).text();
	var mrtgCclcDt		= td.eq(7).text();
	// 페이지 항목
	var pagePrdtCd		= '#' + $('#TB06070P_prefix').val() + '_prdtCd';
	var pagePrdtName	= '#' + $('#TB06070P_prefix').val() + '_prdtName';
	
	
	//console.log("e pagePrdtCd------->"+pagePrdtCd);
	//console.log("e pagePrdtName------->"+pagePrdtName);
	// 값 전달
	$(pagePrdtCd).val(e.prdtCd);
	$(pagePrdtName).val(e.prdtName);
	
	//getMrtgInfoDetails();
	modalClose_TB06070P();
}
/*
 *  ====================PQGRID변환====================
 */


/**
 * show modal
 */
function callTB06070P(prefix) {
	//TB06070P_gridState = 0;
	//TB06070P_pf = prefix;
	
	
	$('#TB06070P_prefix').val(prefix);
	$('#modal-TB06070P').modal('show');
	roadPqGrid();
	setTimeout(() => roadGrid_TB06070P(), 300);
}

function roadGrid_TB06070P(){
	clearTB06070P();
	roadPqGrid();
}

/**
 * hide modal
 */
function modalClose_TB06070P() {
	//TB06070P_gridState = 1;
	//if (typeof fnltPgGrid != "undefined") arrPqGridPrdtCdList.setData([]);
	clearTB06070P();
	$('#modal-TB06070P').modal('hide');
};

/**
 * clear modal
 */
function clearTB06070P() {
	
	$("#TB06070P_colModel").pqGrid("option", "strNoRows", "");
	$("#TB06070P_colModel").pqGrid("setData", []);
	
	$('#TB06070P_prdtNm').val("");            //상풍명
    $('#TB06070P_actCd').val("");             //계정과목
    $('#TB06070P_fncGdsDvdCd').val("");       //금융상품분류
    $('#TB06070S_sppiYn').val("");            //SPPI 결과
    $('#TB06070P_loanExpdCd').val("");        //대출만기
    $('#TB06070P_rlesReltYn').val("");        //부동산여부
    $('#TB06070P_udwtFnncYn').val("");         //인수금융
}



/*
 *  SELECT TB06070P(조회) 상품정보 조회
 */
function selectTB06070P() {
    
	/*
    if (!$('#TB07080S_prdtCd').val()) {
        Swal.fire({
            icon: 'warning'
            , text: "종목코드를 입력해주세요!"
            , confirmButtonText: "확인"
        });
        return;
    } else if (!$('#TB07080S_prdtNm').val()) {
        Swal.fire({
            icon: 'warning'
            , text: "상품명을 입력해주세요!"
            , confirmButtonText: "확인"
        });
        return;
    } else if (!$('#TB07080S_excSn').val()) {
        Swal.fire({
            icon: 'warning'
            , text: "실행순번을 지정해주세요!"
            , confirmButtonText: "확인"
        });
        return;
    } else if (excResult === 2 || intrtResult === 2) {
        Swal.fire({
            icon: 'warning'
            , text: "조회된 데이터가 없습니다"
            , confirmButtonText: "확인"
        });
    } else if (excResult === 0 && intrtResult === 0) {
        Swal.fire({
            icon: 'error'
            , text: "정보조회 실패!"
            , confirmButtonText: "확인"
        });
    }
    */
  
    let result;

    let prdtNm      = $('#TB06070P_prdtNm').val();            //상풍명
    let actCd       = $('#TB06070P_actCd').val();             //계정과목
    let fncGdsDvdCd = $('#TB06070P_fncGdsDvdCd').val();       //금융상품분류
    let sppiYn      = $('#TB06070P_sppiYn').val();            //SPPI 결과
    let loanExpdCd  = $('#TB06070P_loanExpdCd').val();        //대출만기
    let rlesReltYn  = $('#TB06070P_rlesReltYn').val();        //부동산여부
    let udwtFnncYn  = $('#TB06070P_udwtFnncYn').val();         //인수금융

    let paramData;
    paramData = {
          prdtName: prdtNm                                                //상풍명
        , crdtGrntActsCd: actCd                                           //계정과목
        , utlzFundFnncPrdtClsfCd: fncGdsDvdCd                             //금융상품분류
        , sppiYn: sppiYn                                                  //SPPI 결과
        , loanExpdCd: loanExpdCd                                          //대출만기
        , rlesReltYn: rlesReltYn                                          //부동산여부
        , udwtFnncYn: udwtFnncYn                                          //인수금융
    }

		
	/* ajax strat*/
    $.ajax({
          type: "POST"
        , url: "/TB06070S/getResultData"
        , contentType: "application/json; charset=UTF-8"
        , data: JSON.stringify(paramData)
        //, data: paramData
        , dataType: "json"
        , beforeSend: function(){
			$("#TB06070P_colModel").pqGrid("option", "strNoRows", "조회 중입니다...");
		}
		, success: function (data) {
			//console.log(JSON.stringify(data));
            TB06070S_pqGridLength = data.length
            //let detail = $('#TB06070S_colModel').pqGrid('instance')
            //detail.setData(data);
            //detail.getData();
            
            //$('#TB06070P_colModel').pqGrid("setData", data);
            
            var options = [
				{
					gridNm		: "TB06070P_colModel"
					, data 		: data
				}
			]
			
			//dataInfoSetGrid(options);
			dataInfoSetGrid(data);
        }
        , error: function () {
            result = 0
        }
    });
	/*ajax end*/
    
}


/*
 *  =====================OptionBox데이터 SET=====================
 */
function fnSelectBoxP() {
    selectBoxP = getSelectBoxList("TB06070",
        "/A005"   //계정과목코드
        + "/F007" //금융상품분류코드
        + "/L013" //대출만기코드
        , false);

    grdSelectP.A005 = selectBoxP.filter(function (item) { return item.cmnsGrpCd === 'A005'; });		//	계정과목코드
    grdSelectP.F007 = selectBoxP.filter(function (item) { return item.cmnsGrpCd === 'F007'; });		//	금융상품분류코드
    grdSelectP.L013 = selectBoxP.filter(function (item) { return item.cmnsGrpCd === 'L013'; });		//	대출만기코드
}

function createSelectTagP() {
	
    //  계정과목코드
    let a005Html;
    grdSelectP.A005.forEach(item => {
        a005Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
    });
    $('#TB06070P_actCd').append(a005Html);
    
    //  금융상품분류코드
    let a007Html;
    grdSelectP.F007.forEach(item => {
        a007Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
    });
    $('#TB06070P_fncGdsDvdCd').append(a007Html);
    
    //  대출만기코드
    let l013Html;
    grdSelectP.L013.forEach(item => {
        l013Html += `<option value="${item.cdValue}">${item.cdName} (${item.cdValue})</option>`
    });
    $('#TB06070P_loanExpdCd').append(l013Html);

}

/*
 *  =====================OptionBox데이터 SET=====================
 */
