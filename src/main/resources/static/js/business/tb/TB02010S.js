const TB02010Sjs = (function(){

	let pqGridObj_TB02010S;				//PQGRID OBJECT

	$(document).ready(function() {

		sessionStorage.clear();
		//console.log(JSON.stringify(colM_TB02010S));
		//getAthCd_TB02010S();
		setPqGrid_TB02010S();

	});

	// function getAthCd_TB02010S(){
	// 	var empno = $('#userEno').val();

	// }

	
	function setPqGrid_TB02010S(){

		let colM_TB02010S = [
			{ 	
				title    : "요청일시", 
				dataType : "string",
				dataIndx : "aprvDttm",
				halign	 : "center", 
				align    : "center", 
				filter   : { crules: [{ condition: 'range' }] },
				render: function (ui) {

					var cellData = ui.cellData;
					var aprvDt = cellData.substring(0,8);

					if (aprvDt && aprvDt.length === 8) {
						var year = cellData.substring(0, 4);
						var month = cellData.substring(4, 6);
						var day = cellData.substring(6, 8);
						return year + "-" + month + "-" + day;
					}
					return cellData;
				}
			},
			{ 	
				title    : "요청부서", 
				dataType : "string",
				dataIndx : "rqsDpt",
				halign	 : "center", 
				align    : "center", 
				filter   : { crules: [{ condition: 'range' }] },
			},
			{ 	
				title    : "요청자", 
				dataType : "string",
				dataIndx : "aprvEmpNm",
				halign	 : "center", 
				align    : "center", 
				filter   : { crules: [{ condition: 'range' }] },
			},
			{ 	
				title    : "업무구분", 
				dataType : "string",
				dataIndx : "wfMapNm",
				halign	 : "center", 
				align    : "left", 
				filter   : { crules: [{ condition: 'range' }] },
			},
			{ 	
				title    : "내역", 
				dataType : "string",
				dataIndx : "jobCnts",
				halign	 : "center", 
				align    : "left", 
				filter   : { crules: [{ condition: 'range' }] },
			},
			{
				dataType: "string",
				dataIndx: "wfId",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "wfMapId",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "wfMapNm",
				hidden: true
			},
			{
				dataType: "string",
				dataIndx: "etc",
				hidden: true
			}
		]

		let pqGridObjs_TB02010S = [
			{
				height: 500
				, maxHeight: 500
				, id: 'wfGrid_TB02010S'
				, numberCell: { show: false }
				, colModel: colM_TB02010S 	
				// , rowDblClick: moveToJobPage()	
			},
		]

		setPqGrid(pqGridObjs_TB02010S);

		pqGridObj_TB02010S = $("#wfGrid_TB02010S").pqGrid('instance');	

		selInfo();

	}

	// 오늘의할일 조회
	function selInfo() {
		

		var empno = $('#userEno').val();
		//console.log("wfAuthId: " + wfAuthId);

		var param = {
			empno
		}

		$.ajax({
			type: "GET",
			url: "/TB02010S/selInfo",
			data: param,
			dataType: "json",
			beforeSend: function () {
				$("#wfGrid_TB02010S").pqGrid("setData", []);
				$("#wfGrid_TB02010S").pqGrid("option", "strNoRows", "조회 중입니다...");
				$("#wfGrid_TB02010S").pqGrid("refreshDataAndView");
				// settlementObj.option("strNoRows", "조회 중입니다...");
				// settlementObj.refreshDataAndView();
			},
			success: function(data) {
				// console.log(JSON.stringify(data));

				var workFlowList = data.workFlowList;
				var wfCntList = data.wfCntList;

				var $ulElement = $("#TB02010S_appvPrgrsCnt");
				$ulElement.text(workFlowList.length + "건");

				console.log(JSON.stringify(wfCntList));

				$("#wfGrid_TB02010S").pqGrid("option", "strNoRows", "조회된 데이터가 없습니다.");

				if(workFlowList.length > 0){
					$("#wfGrid_TB02010S").pqGrid("setData", workFlowList);

					

					pqGridObj_TB02010S.option("rowDblClick", function(event, ui) {
						moveToJobPage(ui.rowData);
					});
				}

				if(wfCntList.length > 0){
					
					setWfCntList(wfCntList);
				}
				
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

		if(wfMapNm == "딜기본정보등록"){
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
		console.log(getMenuId[1]);
		console.log(getPageName[1]);
		
		callPage(getMenuId[1], getPageName[1]);
		
	}

	return {

		//	함수
		sendPage : sendPage
	}
})();
