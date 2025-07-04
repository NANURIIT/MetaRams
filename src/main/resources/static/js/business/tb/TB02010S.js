/**
 * ====================================
 * 파일명  : TB02010S.js
 * 설 명   : 오늘의 할 일 관련 JavaScript
 *
 * 화면 ID     : TB02010S
 * 담당 기능   : 오늘의 할 일 조회, 결제진행사태에 따른 화면 연동 등
 *
 * @Author      : nanuri
 * @Date        : 2025.05.27
 * @Version     : 1.0.0
 * @History     :
 *   - 2025.05.27 nanuri 최초작성
 * ====================================
 */
const TB02010Sjs = (function(){

	let pqGridObj_TB02010S;				//PQGRID OBJECT

	$(document).ready(function() {

		sessionStorage.clear();
		setPqGrid_TB02010S();

	});

	// function getAthCd_TB02010S(){
	// 	var empno = $('#userEno').val();

	// }

	
	function setPqGrid_TB02010S(){

		// let colM_TB02010S = [
		// 	{ 	
		// 		title    : "요청일시", 
		// 		dataType : "string",
		// 		dataIndx : "aprvDttm",
		// 		halign	 : "center", 
		// 		align    : "center", 
		// 		filter   : { crules: [{ condition: 'range' }] },
		// 		render: function (ui) {

		// 			var cellData = ui.cellData;
		// 			var aprvDt = cellData.substring(0,8);

		// 			if (aprvDt && aprvDt.length === 8) {
		// 				var year = cellData.substring(0, 4);
		// 				var month = cellData.substring(4, 6);
		// 				var day = cellData.substring(6, 8);
		// 				return year + "-" + month + "-" + day;
		// 			}
		// 			return cellData;
		// 		}
		// 	},
		// 	{ 	
		// 		title    : "요청부서", 
		// 		dataType : "string",
		// 		dataIndx : "rqsDpt",
		// 		halign	 : "center", 
		// 		align    : "center", 
		// 		filter   : { crules: [{ condition: 'range' }] },
		// 	},
		// 	{ 	
		// 		title    : "요청자", 
		// 		dataType : "string",
		// 		dataIndx : "aprvEmpNm",
		// 		halign	 : "center", 
		// 		align    : "center", 
		// 		filter   : { crules: [{ condition: 'range' }] },
		// 	},
		// 	{ 	
		// 		title    : "업무구분", 
		// 		dataType : "string",
		// 		dataIndx : "wfMapNm",
		// 		halign	 : "center", 
		// 		align    : "left", 
		// 		filter   : { crules: [{ condition: 'range' }] },
		// 	},
		// 	{ 	
		// 		title    : "내역", 
		// 		dataType : "string",
		// 		dataIndx : "jobCnts",
		// 		halign	 : "center", 
		// 		align    : "left", 
		// 		filter   : { crules: [{ condition: 'range' }] },
		// 	},
		// 	// {
		// 	// 	dataType: "string",
		// 	// 	dataIndx: "wfId",
		// 	// 	hidden: true
		// 	// },
		// 	// {
		// 	// 	dataType: "string",
		// 	// 	dataIndx: "wfMapId",
		// 	// 	hidden: true
		// 	// },
		// 	// {
		// 	// 	dataType: "string",
		// 	// 	dataIndx: "wfMapNm",
		// 	// 	hidden: true
		// 	// },
		// 	// {
		// 	// 	dataType: "string",
		// 	// 	dataIndx: "etc",
		// 	// 	hidden: true
		// 	// }
		// ]

		let colM_TB02010S = [
			
			{
				title: "요청일시",
				dataType: "string",
				dataIndx: "rqstDtm",
				align: "center",
				filter: { crules: [{ condition: "range" }] },
				render: function (ui) {
				  if(ui.cellData){
					let result = ui.cellData.replace('T', ' ').slice(0, 19);
					return result;
				  }
				},
			  },
			{ 	
				title    : "요청부서", 
				dataType : "string",
				dataIndx : "dprtNm",
				halign	 : "center", 
				align    : "center", 
				filter   : { crules: [{ condition: 'range' }] },
			},
			{ 	
				title    : "요청자", 
				dataType : "string",
				dataIndx : "apvlRqstPNm",
				halign	 : "center", 
				align    : "center", 
				filter   : { crules: [{ condition: 'range' }] },
			},
			{ 	
				title    : "업무구분", 
				dataType : "string",
				dataIndx : "decdJobDcd",
				halign	 : "center", 
				align    : "left", 
				filter   : { crules: [{ condition: 'range' }] },
			},
			{ 	
				title    : "결재진행상태",
				dataType : "string",
				dataIndx : "decdSttsDcd",
				halign	 : "center",
				align    : "center",
				filter   : { crules: [{ condition: 'range' }] },
			},
			{ 	
				title    : "내역",
				dataType : "string",
				dataIndx : "dealNm",
				halign	 : "center",
				align    : "left",
				filter   : { crules: [{ condition: 'range' }] },
			},
			{
				/**
				 * 결재번호를 이용하여 데이터 받고 그에 맞는 화면으로 이동 -> 조회
				 */
				title	 : "결재번호",
				dataType : "string",
				dataIndx : "decdSn",
				hidden 	 : true,
			}
		]

		let pqGridObjs_TB02010S = [
			{
				height: 500
				, maxHeight: 500
				, id: 'wfGrid_TB02010S'
				, numberCell: { show: false }
				, colModel: colM_TB02010S 	
				, rowDblClick: function ( evt, ui ) {
					justWork(ui.rowData.decdSn);
				},
				rowClick: function(evt, ui) {
					pqGridSelectHandler ( ui.rowIndx, "wfGrid_TB02010S" );
				},
			},
		]

		setPqGrid(pqGridObjs_TB02010S);

		pqGridObj_TB02010S = $("#wfGrid_TB02010S").pqGrid('instance');	

		selInfo();

	}

	/**
	 * 할일하러가기
	 * @discription
	 * 영어를 못해서 죄송합니다
	 */
	function justWork (decdSn) {

		paramData = {
			decdSn: decdSn
		}
		
		$.ajax({
			type: "POST",
			url: "/TB02010S/justWork",
			contentType: "application/json; charset=UTF-8",
      		data: JSON.stringify(paramData),
			success: function(data) {
				/**
				 * DEAL_NO 딜번호(화면에 따라 딜번호가 아닌경우가 있음)
				 * PRDT_CD 종목번호
				 * SCRN_NO 화면번호
				 * EXC_SEQ 실행일련번호
				 * RQST_SQ 등록일련번호
				 * TR_SEQ  거래일련번호
				 */
				sessionStorage.setItem("isFromApvl", true);
				sessionStorage.setItem("wfDealNo", data.dealNo);
				sessionStorage.setItem("wfPrdtCd", data.prdtCd);
				sessionStorage.setItem("excSeq", data.excSeq);
				sessionStorage.setItem("rqstSq", data.rqstSq);
				sessionStorage.setItem("trSeq", data.trSeq);
				callPage(data.scrnNo);
			}
		});
	}

	// 오늘의할일 조회
	function selInfo() {

		$.ajax({
			type: "POST",
			url: "/TB02010S/myJob",
			beforeSend: function () {
				$("#wfGrid_TB02010S").pqGrid("setData", []);
				$("#wfGrid_TB02010S").pqGrid("option", "strNoRows", "조회 중입니다...");
				$("#wfGrid_TB02010S").pqGrid("refreshDataAndView");
			},
			success: function(data) {

				var $ulElement = $("#TB02010S_appvPrgrsCnt");

				if (!data || data === undefined) {
					$ulElement.text( 0 + "건");
				}
				else if ( data.length > 0 ) {
					$('#wfGrid_TB02010S').pqGrid('instance').setData(data);
					$ulElement.text(data.length + "건");
				}
				// var workFlowList = data.workFlowList;
				// var wfCntList = data.length;


				$("#wfGrid_TB02010S").pqGrid("option", "strNoRows", "조회된 데이터가 없습니다.");

				// if(workFlowList.length > 0){
				// 	$("#wfGrid_TB02010S").pqGrid("setData", workFlowList);

				// 	pqGridObj_TB02010S.option("rowDblClick", function(event, ui) {
				// 		callPage(ui.rowData);
				// 	});
				// }

				// if(wfCntList.length > 0){
				// 	setWfCntList(wfCntList);
				// }
				
			}
			
		});
		
	}

	function setWfCntList(wfCntList){
		var $ulElement = $("#TB02010S_wfCnt");

		// data 배열의 각 항목을 기반으로 li 요소 생성 및 추가
		$.each(wfCntList, function(index, item) {
			// li 요소 생성 및 추가할 HTML
			var $liElement = $(`
				<li>
					<div class="list-title">${item.wfMapNm}</div>
					<div>
						<span class="num-pd">${item.wfMapCnt}</span>건
					</div>
				</li>
			`);

			// ul에 li 요소 추가
			$ulElement.append($liElement);
		});
	}


	function moveToJobPage(rowData){
		//alert(rowData.wfMapId);
		var wfMapNm = rowData.wfMapNm;

		// var menuId;
		// var pageName;

		//todo: 권환관리 추가 후 수정해야함

		var menuId;
		var menuNm;

		if(wfMapNm == "딜정보등록승인"){
			menuId = "TB03020S";
			menuNm = "Deal정보 등록";
		}else{

		}


		sessionStorage.setItem("ibDealNo_TB02010S", rowData.etc);
		sessionStorage.setItem("wfID_TB02010S", rowData.wfId);



		callPage(menuId, menuNm);
	}
	
	/**
	 * 페이지 이동
	 * @param {String} menuId 
	 * @param {String} pageName 
	 */
	function sendPage(menuId, pageName) {
	
		const getMenuId = menuId.split('/');
		const getPageName = pageName.split(') ');
		
		callPage(getMenuId[1], getPageName[1]);
		
	}

	return {

		//	함수
		sendPage : sendPage
	}
})();
