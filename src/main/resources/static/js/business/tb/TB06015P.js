let slctBox;				//공통코드 반환
let stdrIntrtKndCdList;		//기준금리종류코드
let aplyDnumDcdList;		//적용일수구분코드
let intrtCngeFrqcCdList;	//금리변동주기코드

//pqgrid 달력 세팅
var HucreT = function (ui) {

    var $inp = ui.$cell.find("input"),
        grid = this,
        validate = function (that) {
            var valid = grid.isValid({
                dataIndx: ui.dataIndx,
                value: $inp.val(),
                rowIndx: ui.rowIndx
            }).valid;
            if (!valid) {
                that.firstOpen = false;
            }
        };

    //initialize the editor
	//$.datepicker.setDefaults($.datepicker.regional["ko"]);
    $inp
        .on("input", function (evt) {
            /*validate(this);*/
        })
        .datepicker({
            dateFormat: 'yy-mm-dd',
            showButtonPanel: true,
            changeMonth: true,
            changeYear: true,
            showAnim: '',
            onSelect: function () {
                this.firstOpen = true;
                /*validate(this);*/
            },
            beforeShow: function (input, inst) {
                setTimeout(function () {
                    //to fix the issue of datepicker z-index when grid is in maximized state.
                    $('.ui-datepicker').css('z-index', 999999999999);
                });
                return !this.firstOpen;
            },
            onClose: function () {
                this.focus();
            }
        });
}

//그리드 컬럼 세팅 (원리금계산정보)
var colModel_rateCalcSimul = [

	{
		title: "상환회차",
		dataType: "string",
		dataIndx: "seq",
		align: "right",
		halign: "center",
		width: "7%",
		filter: { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title: "원리금유형", 
		// editable: true,
		dataType: "string", 
		dataIndx: "paiRdmpDcd", 
		align: "center", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title: "대상금액", 
		dataType: "string", 
		dataIndx: "monthlyPayment", 
		align: "right", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {
			var value = parseFloat(ui.cellData);

			var formattedValue = value.toLocaleString('ko-KR', {
				minimumFractionDigits: 0,  
				maximumFractionDigits: 2   
			});
	
			return formattedValue;
		} 
		
	},
	{ 	
		title: "시작일자", 
		dataType: "string", 
		//format: "yyyy-mm-dd",
		dataIndx: "strtDt", 
		align: "center", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {

			var cellData = ui.cellData;
			if (cellData && cellData.length === 8) {
				var year = cellData.substring(0, 4);
				var month = cellData.substring(4, 6);
				var day = cellData.substring(6, 8);
				return year + "-" + month + "-" + day;
			}
			return cellData; 
		} 
	},
	{ 	
		title: "종료일자", 
		dataType: "date", 
		dataIndx: "endDt", 
		align: "center", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {

			var cellData = ui.cellData;
			if (cellData && cellData.length === 8) {
				var year = cellData.substring(0, 4);
				var month = cellData.substring(4, 6);
				var day = cellData.substring(6, 8);
				return year + "-" + month + "-" + day;
			}
			return cellData; 
		}  
	},
	{ 	
		title: "일수", 
		dataType: "string", 
		dataIndx: "ddCnt", 
		align: "right", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] },
		// render: function (ui) {
		// 	var value = parseInt(ui.cellData, 10);
		// 	var formattedValue = value.toFixed(0);
		// 	return formattedValue;
		// } 
		
	},
	{ 	
		title: "적용이율(%)", 
		dataType: "string", 
		dataIndx: "aplyIntrtContent", 
		align: "right", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] } 
	},
	{ 	
		title: "원리금", 
		dataType: "string", 
		dataIndx: "monthlyBalancPayTotal", 
		align: "right", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {
			var value = parseFloat(ui.cellData);

			var formattedValue = value.toLocaleString('ko-KR', {
				minimumFractionDigits: 0,  
				maximumFractionDigits: 2   
			});
	
			return formattedValue;
		} 
		//hidden: true
	}

]

//그리드 최하단 페이지모델
var pageModel_TB06015P = {

	type: "local",
	rPP: 50, strRpp: "{0}",

	//customize localization strings.
	strDisplay: "{0} to {1} of {2}",
	strPage: "Page {0} / {1}",

	layout: ['first', 'prev', 'next', 'last', "|", "strPage"]

}

//colModel - 원금상환계획정보
var colModel_prnaScd = [

	// { 	
	// 	title: "상환회차", 
	// 	editable: false,
	// 	dataType: "string", 
	// 	dataIndx: "rdmpSeq", 
	// 	align: "center", 
	// 	halign: "center", 
	// 	width: "20%", 
	// 	filter: { crules: [{ condition: 'range' }] } 
	// },
	{ 
		title: "상환예정일자", 
		editable: true,
		width: "",
		dataType: "string", 
		dataIndx: "prarDt",
		align: "center",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {
			var cellData = ui.cellData;
			if (cellData) {
				var date = new Date(cellData);
				var day = String(date.getDate()).padStart(2, '0');
				var month = String(date.getMonth() + 1).padStart(2, '0');
				var year = date.getFullYear();
				return year + '-' + month + '-' + day;
			}
			return "";
		},
		editor: {
			type: 'textbox',
			init: function (ui) {
				var $input = ui.$cell.find("input");
				$input.attr("placeholder", "YYYY-MM-DD");
				$input.on("input", function () {
					this.value = this.value.replace(/[^0-9-/]/g, '');
				});
			}
		}   
	},
	{ 	
		title: "상환예정원금", 
		editable: true,
		dataType: "string", 
		dataIndx: "prarPrna", 
		align: "right", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] },
		editor: {
			type: 'textbox',
			init: function (ui) {
				var $input = ui.$cell.find("input");
				$input.on("keyup", function () {
					inputNumberFormat(this);
				});
			}
		}    
	},
	{
		title: "처리여부",
		editable: false,
		dataType: "string",
		dataIndx: "prcsCpltYn",
		align: "center",
		halign: "center",
		width: "15%",
		filter: { crules: [{ condition: 'range' }] },
		render:  function (ui) {
            var cellData = ui.cellData;
            if (cellData === "0") {
                return "미처리";
            }else if(cellData === "1"){
				return "처리";
			}
            return cellData;
        }

	},
	{
		title: "처리일자",
		dataType: "string",
		dataIndx: "prcsDt",
		hidden: true
	}

]

let rdmpCol = [
	// { 	
	// 	title: "회차", 
	// 	editable: false,
	// 	dataType: "string", 
	// 	dataIndx: "rdmpSeq", 
	// 	align: "center", 
	// 	halign: "center", 
	// 	width: "20%", 
	// 	filter: { crules: [{ condition: 'range' }] } 
	// },
	{ 
		title: "시작일", 
		editable: true,
		width: "",
		dataType: "string", 
		dataIndx: "strtDt",
		align: "center",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {
			var cellData = ui.cellData;
			if (cellData) {
				var date = new Date(cellData);
				var day = String(date.getDate()).padStart(2, '0');
				var month = String(date.getMonth() + 1).padStart(2, '0');
				var year = date.getFullYear();
				return year + '-' + month + '-' + day;
			}
			return "";
		},
		editor: {
			type: 'textbox',
			init: function (ui) {
				var $input = ui.$cell.find("input");
				$input.attr("placeholder", "YYYY-MM-DD");
				$input.on("input", function () {
					this.value = this.value.replace(/[^0-9-/]/g, '');
				});
			}
		}   
		
	},
	{ 
		title: "종료일", 
		editable: true,
		width: "",
		dataType: "string", 
		dataIndx: "endDt",
		align: "center",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {
			var cellData = ui.cellData;
			if (cellData) {
				var date = new Date(cellData);
				var day = String(date.getDate()).padStart(2, '0');
				var month = String(date.getMonth() + 1).padStart(2, '0');
				var year = date.getFullYear();
				return year + '-' + month + '-' + day;
			}
			return "";
		},
		editor: {
			type: 'textbox',
			init: function (ui) {
				var $input = ui.$cell.find("input");
				$input.attr("placeholder", "YYYY-MM-DD");
				$input.on("input", function () {
					this.value = this.value.replace(/[^0-9-/]/g, '');
				});
			}
		}   
		
	},
	{ 	
		title: "상환원금", 
		editable: true,
		dataType: "string", 
		dataIndx: "prarPrna", 
		align: "right", 
		halign: "center", 
		width: "", 
		filter: { crules: [{ condition: 'range' }] },
		editor: {
			type: 'textbox',
			init: function (ui) {
				var $input = ui.$cell.find("input");
				$input.on("keyup", function () {
					inputNumberFormat(this);
				});
			}
		}    
	},
	{
		title: "처리여부",
		editable: false,
		dataType: "string",
		dataIndx: "prcsCpltYn",
		align: "center",
		halign: "center",
		width: "15%",
		filter: { crules: [{ condition: 'range' }] },
		render:  function (ui) {
            var cellData = ui.cellData;
            if (cellData === "0") {
                return "미처리";
            }else if(cellData === "1"){
				return "처리";
			}
            return cellData;
        }

	},
	{
		title: "",
		dataType: "string",
		dataIndx: "prarDt",
		hidden: true
	},
	{
		title: "처리일자",
		dataType: "string",
		dataIndx: "prcsDt",
		hidden: true
	}
]

let intrCol = [
	{ 
		title: "시작일", 
		editable: true,
		width: "132",
		dataType: "string", 
		dataIndx: "strtDt",
		resizable: true, 
		align: "center",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {
			var cellData = ui.cellData;
			if (cellData) {
				var date = new Date(cellData);
				var day = String(date.getDate()).padStart(2, '0');
				var month = String(date.getMonth() + 1).padStart(2, '0');
				var year = date.getFullYear();
				return year + '-' + month + '-' + day;
			}
			return "";
		},
		editor: {
			type: 'textbox',
			init: function (ui) {
				var $input = ui.$cell.find("input");
				$input.attr("placeholder", "YYYY-MM-DD");
				$input.on("input", function () {
					this.value = this.value.replace(/[^0-9-/]/g, '');
				});
			}
		}   
		
	},
	{ 
		title: "종료일", 
		editable: true,
		width: "132",
		dataType: "string", 
		dataIndx: "endDt",
		resizable: true, 
		align: "center",
		halign: "center",
		filter: { crules: [{ condition: 'range' }] },
		render: function (ui) {
			var cellData = ui.cellData;
			if (cellData) {
				var date = new Date(cellData);
				var day = String(date.getDate()).padStart(2, '0');
				var month = String(date.getMonth() + 1).padStart(2, '0');
				var year = date.getFullYear();
				return year + '-' + month + '-' + day;
			}
			return "";
		},
		editor: {
			type: 'textbox',
			init: function (ui) {
				var $input = ui.$cell.find("input");
				$input.attr("placeholder", "YYYY-MM-DD");
				$input.on("input", function () {
					this.value = this.value.replace(/[^0-9-/]/g, '');
				});
			}
		}   
		
	},
	{ 	
		title: "이자율(%)", 
		editable: true,
		dataType: "string", 
		dataIndx: "aplyIrt", 
		resizable: true, 
		align: "right", 
		halign: "center", 
		width: "85", 
		filter: { crules: [{ condition: 'range' }] },
		editor: {
			type: 'textbox',
			init: function (ui) {
				var $input = ui.$cell.find("input");
				$input.on("keyup", function () {
					inputNumberFormat(this);
				});
			}
		}   
	},
	{ 	
		title: "대상금액", 
		editable: true,
		dataType: "string", 
		dataIndx: "prarPrna", 
		resizable: true, 
		align: "right", 
		halign: "center", 
		width: "132", 
		filter: { crules: [{ condition: 'range' }] },
		editor: {
			type: 'textbox',
			init: function (ui) {
				var $input = ui.$cell.find("input");
				$input.on("keyup", function () {
					inputNumberFormat(this);
				});
			}
		}    
	},
	{ 	
		title: "이자금액", 
		editable: true,
		dataType: "string", 
		dataIndx: "rdmpPrarIntr",
		resizable: true, 
		align: "right", 
		halign: "center", 
		width: "132", 
		filter: { crules: [{ condition: 'range' }] },
		editor: {
			type: 'textbox',
			init: function (ui) {
				var $input = ui.$cell.find("input");
				$input.on("keyup", function () {
					inputNumberFormat(this);
				});
			}
		}    
	},
	{
		title: "처리여부",
		editable: false,
		dataType: "string",
		dataIndx: "prcsCpltYn",
		align: "center",
		halign: "center",
		width: "73",
		filter: { crules: [{ condition: 'range' }] },
		render:  function (ui) {
            var cellData = ui.cellData;
            if (cellData === "0") {
                return "미처리";
            }else if(cellData === "1"){
				return "처리";
			}
            return cellData;
        }
	},
	{
		title: "",
		dataType: "string",
		dataIndx: "prarDt",
		hidden: true
	}
]

var toolbar_intr = {
	cls: 'pq-toolbar text-right',
	items: [
		{
			type: 'button',
			cls: 'btn btn-info btn-xs',
			label: '<i class="fa fa-download"></i>&nbsp;서식다운로드',
			listener: function() {
				var link = document.createElement("a");
				link.href = "file/Intr_Schedule.xlsx";
				link.download = "Intr_Schedule.xlsx";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		},
		{
			type: 'button',
			cls: 'btn btn-success btn-xs',
			label: '<i class="fa fa-upload"></i>&nbsp;업로드',
			listener: function() {
				$('#upload-file-input-TB06015P02').click();
			}
		},
		{
			type: 'button',
			cls: 'btn btn-default btn-xs',
			label: '<i class="fa fa-plus"></i>',
			listener: function() {
				var rowData = {
					"prcsCpltYn": "0"
				};

				$('#intrPlanGrid').pqGrid("addRow", {rowData: rowData, checkEditable: false });
			}
		},
		{
			type: 'button',
			cls: 'btn btn-default btn-xs',
			label: '<i class="fa fa-minus"></i>',
			listener: function() {

				var gridLgth =  $("#intrPlanGrid").pqGrid('option', 'dataModel.data').length;

				$("#intrPlanGrid").pqGrid("deleteRow", {rowIndx: gridLgth-1});

				// $("#intrPlanGrid").pqGrid("setData", []);
				$("#intrPlanGrid").pqGrid("refreshDataAndView");

			}
		}
		
	]
}

var toolbar_rdmp = {
	cls: 'pq-toolbar text-right',
	items: [
		{
			type: 'button',
			cls: 'btn btn-info btn-xs',
			label: '<i class="fa fa-download"></i>&nbsp;서식다운로드',
			listener: function() {
				var link = document.createElement("a");
				link.href = "file/Prna_Schedule.xlsx";
				link.download = "Prna_Schedule.xlsx";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		},
		{
			type: 'button',
			cls: 'btn btn-success btn-xs',
			label: '<i class="fa fa-upload"></i>&nbsp;업로드',
			listener: function() {
				$('#upload-file-input-TB06015P01').click();
			}
		},
		{
			type: 'button',
			cls: 'btn btn-default btn-xs',
			label: '<i class="fa fa-plus"></i>',
			listener: function() {

				var rowData = {
					"prcsCpltYn": "0"
				};

				$('#rdmpPlanGrid').pqGrid("addRow", {rowData: rowData, checkEditable: false });

			}
		},
		{
			type: 'button',
			cls: 'btn btn-default btn-xs',
			label: '<i class="fa fa-minus"></i>',
			listener: function() {
				var gridLgth =  $("#rdmpPlanGrid").pqGrid('option', 'dataModel.data').length;

				$("#rdmpPlanGrid").pqGrid("deleteRow", {rowIndx: gridLgth-1});

				//$("#rdmpPlanGrid").pqGrid("setData", []);
				$("#rdmpPlanGrid").pqGrid("refreshDataAndView");
			}
		}
	]
}

$(document).ready(function() {
	
	console.log("test");
	cloadSelectBoxContents();
	docRdySettings();

	$('#TB06015P_stdrDt').val(getToday());
	//$('#TB06015P_stdrDt').val('2024-05-15');


});

//colModel 셀렉트 박스 세팅
function sltBoxSet_pqGrid(){
	/********************************************************************
	 * S003 기준금리종류코드
	 * A007 적용일수구분코드
	 * I013 이자변동주기코드
	*******************************************************************/

	selectBox = getSelectBoxList('TB06015', 'S003/A007/I013', false);

	stdrIntrtKndCdList = selectBox.filter(function(item){
		return item.cmnsGrpCd === 'S003';
	})

	aplyDnumDcdList = selectBox.filter(function(item){
		return item.cmnsGrpCd === 'A007';
	})

	intrtCngeFrqcCdList = selectBox.filter(function(item){
		return item.cmnsGrpCd === 'I013';
	})

	// console.log("stdrIntrtKndCdList{}", stdrIntrtKndCdList);
	// console.log("aplyDnumDcdList{}", aplyDnumDcdList);
	// console.log("intrtCngeFrqcCdList{}", intrtCngeFrqcCdList);

	setIntrInfoGrid();

}

function setIntrInfoGrid(){
	//colM (금리정보)
	var colModel_intrtInfo = [
		{ 	
			title: "적용시작일자", 
			editable: true,
			dataType: "string", 
			dataIndx: "aplyStrtDt", 
			align: "center", 
			halign: "center", 
			width: "140", 
			filter: { crules: [{ condition: 'range' }] },
			editor: {
				type: 'textbox',
				init: function (ui) {
					var $input = ui.$cell.find("input");
					$input.attr("placeholder", "YYYY-MM-DD");
					$input.on("input", function () {
						this.value = this.value.replace(/[^0-9-]/g, '');
					});
				}
			}
			// editModel: {
			// 	validations: [
			// 		{ type: 'regexp', value: /^\d{4}-\d{2}-\d{2}$/, msg: "날짜 형식은 YYYY-MM-DD이어야 합니다." }
			// 	]
			// }
		},
		{ 	
			title: "적용종료일자", 
			editable: true,
			dataType: "string", 
			dataIndx: "aplyEndDt", 
			align: "center", 
			halign: "center", 
			width: "140", 
			filter: { crules: [{ condition: 'range' }] },
			editor: {
				type: 'textbox',
				init: function (ui) {
					var $input = ui.$cell.find("input");
					$input.attr("placeholder", "YYYY-MM-DD");
					$input.on("input", function () {
						this.value = this.value.replace(/[^0-9-]/g, '');
					});
				}
			} 
		},
		{ 	
			title: "기준금리종류코드", 
			editable: true,
			dataType: "string", 
			dataIndx: "stdrIntrtKndCd", 
			align: "center", 
			halign: "center", 
			width: "140", 
			filter: { crules: [{ condition: 'range' }] },
			editor: {
				type: "select",
				valueIndx: "cdValue",
				labelIndx: "cdName",
				options: stdrIntrtKndCdList
			},
			render: function (ui) {
				var options = stdrIntrtKndCdList
				// console.log("stdrIntrtKndCdList{}", stdrIntrtKndCdList);
				// console.log("options{}", options);
				var option = options.find(opt => opt.cdValue == ui.cellData);
				return option ? option.cdName : ui.cellData;
			},
		},
		{ 	
			title: "고정/기준금리(%)", 
			editable: true,
			dataType: "string", 
			dataIndx: "fxnIntrt", 
			align: "right", 
			halign: "center", 
			width: "140", 
			filter: { crules: [{ condition: 'range' }] },
			editor: {
				type: 'textbox',
				init: function (ui) {
					var $input = ui.$cell.find("input");
					$input.on("keyup", function () {
						inputNumberFormat(this);
					});
				}
			} 
		},
		{ 	
			title: "가산금리(%)", 
			editable: true,
			dataType: "string", 
			dataIndx: "addIntrt", 
			align: "right", 
			halign: "center", 
			width: "140", 
			filter: { crules: [{ condition: 'range' }] },
			editor: {
				type: 'textbox',
				init: function (ui) {
					var $input = ui.$cell.find("input");
					$input.on("keyup", function () {
						inputNumberFormat(this);
					});
				}
			}   
		},
		{ 	
			title: "적용일수구분코드", 
			editable: true,
			dataType: "string", 
			dataIndx: "aplyDnumDcd", 
			align: "center", 
			halign: "center", 
			width: "140", 
			filter: { crules: [{ condition: 'range' }] },
			editor: {
				type: "select",
				valueIndx: "cdValue",
				labelIndx: "cdName",
				options: aplyDnumDcdList
			},
			render: function (ui) {
				var options = aplyDnumDcdList
				// console.log("stdrIntrtKndCdList{}", stdrIntrtKndCdList);
				// console.log("options{}", options);
				var option = options.find(opt => opt.cdValue == ui.cellData);
				return option ? option.cdName : ui.cellData;
			}, 
		},
		{ 	
			title: "기준금리적용일수", 
			editable: true,
			dataType: "string", 
			dataIndx: "stdrIntrtAplyDnum", 
			align: "right", 
			halign: "center", 
			width: "140", 
			filter: { crules: [{ condition: 'range' }] },
			editor: {
				type: 'textbox',
				init: function (ui) {
					var $input = ui.$cell.find("input");
					$input.on("keyup", function () {
						inputNumberFormat(this);
					});
				}
			}  
		},
		{ 	
			title: "금리변동주기코드", 
			editable: true,
			dataType: "string", 
			dataIndx: "intrtCngeFrqcCd", 
			align: "center", 
			halign: "center", 
			width: "140", 
			filter: { crules: [{ condition: 'range' }] },
			editor: {
				type: "select",
				valueIndx: "cdValue",
				labelIndx: "cdName",
				options: intrtCngeFrqcCdList
			},
			render: function (ui) {
				var options = intrtCngeFrqcCdList
				// console.log("stdrIntrtKndCdList{}", stdrIntrtKndCdList);
				// console.log("options{}", options);
				var option = options.find(opt => opt.cdValue == ui.cellData);
				return option ? option.cdName : ui.cellData;
			},
		},
		{ 	
			title: "금리변동주기개월", 
			editable: true,
			dataType: "string", 
			dataIndx: "intrtCngeFrqcMnum", 
			align: "right", 
			halign: "center", 
			width: "140", 
			filter: { crules: [{ condition: 'range' }] },
			editor: {
				type: 'textbox',
				init: function (ui) {
					var $input = ui.$cell.find("input");
					$input.on("keyup", function () {
						inputNumberFormat(this);
					});
				}
			}  
		},
		{
			title: "",
			dataType: "string", 
			dataIndx: "stdrIntrtKnd",
			hidden: true 
		},
		{
			title: "",
			dataType: "string", 
			dataIndx: "aplyDnumD",
			hidden: true 
		},
		{
			title: "",
			dataType: "string", 
			dataIndx: "intrtCngeFrqc",
			hidden: true 
		},
		{
			title: "",
			dataType: "string", 
			dataIndx: "aplyIntrt",
			hidden: true
		}
	]

	//showGrid_intrtInfo(colModel_intrtInfo);

	setTimeout(function() {
		showGrid_intrtInfo(colModel_intrtInfo);
	}, 300);
}

function excSnSet(prdtCd){
	
	$('#TB06015P_seq').attr('disabled', false);

	var param = {
		"prdtCd": prdtCd
	}

	$.ajax({
		type: "GET",
		url: "/TB06015P/getExcSn",
		data: param,
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(data) {
			//alert(JSON.stringify(data));
			//var excSn = JSON.stringify(data);
			$('#TB06015P_seq').html('');
			var html = '';
			if(data.length > 0){

				data.forEach(item => {
					
					html += '<option value="' + item + '">' + item + '</option>';
					
				})

				$('#TB06015P_seq').append(html);
				
			}else{
				$('#TB06015P_seq').attr('disabled', true);
				var msg = "실행순번이 없는 종목입니다.\n해당 종목의 실행순번을 업로드하고 다시 시도해주세요.";

				option.text = msg;
				openPopup(option);
				return false;
			}
		}
	});
}


//그리드 호출 (원리금계산정보)
function showGrid(){
	var obj = {

		height: 235,
		maxHeight: 235,
		showTitle: false,
		showToolbar: false,
		collapsible: false,
		wrap: false,
		hwrap: false,
		numberCell: { show: false },
		editable: false,
		//toolbar: toolbar,
		scrollModel: { autoFit: true },
		colModel: colModel_rateCalcSimul,
		strNoRows: '데이터가 없습니다.'
		//pageModel: pageModel
	};

	$("#TB06015P_IntrCalc").pqGrid(obj);
	//$("#TB06015P_IntrCalc").pqGrid("refreshDataAndView");

}

//그리드 호출 (금리정보)
function showGrid_intrtInfo(colModel_intrtInfo){

	var obj = {

		height: 152,
		maxHeight: 152,
		showTitle: false,
		showToolbar: false,
		collapsible: false,
		wrap: false,
		hwrap: false,
		numberCell: { show: false },
		editable: true,
		//toolbar: toolbar,
		// scrollModel: { autoFit: true },
		colModel: colModel_intrtInfo,
		strNoRows: '데이터가 없습니다.'
		//dataModel: {data: data}
	};

	$("#intrtInfoTable").pqGrid(obj);
}

function showGrid_rdmp(){

	var obj = {

		height: 235,
		maxHeight: 235,
		showTitle: false,
		showToolbar: true,
		collapsible: false,
		wrap: false,
		hwrap: false,
		numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>회차</p>" },
		editable: true,
		toolbar: toolbar_rdmp,
		scrollModel: { autoFit: true },
		colModel: colModel_prnaScd,
		strNoRows: '데이터가 없습니다.'
		//pageModel: pageModel
	};

	$("#rdmpPlanGrid").pqGrid(obj);
}	

function showGrid_intr(){

	var obj = {

		height: 235,
		maxHeight: 235,
		showTitle: false,
		showToolbar: true,
		collapsible: false,
		wrap: false,
		hwrap: false,
		numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>회차</p>" },
		editable: true,
		toolbar: toolbar_intr,
		//scrollModel: { autoFit: true },
		colModel: intrCol,
		strNoRows: '데이터가 없습니다.'
		//pageModel: pageModel
	};

	$("#intrPlanGrid").pqGrid(obj);
}	

//그리드 초기화
function resetGrid(){

	$("#TB06015P_IntrCalc").pqGrid("destroy");
	$("#rdmpPlanGrid").pqGrid("destroy");
	$("#intrPlanGrid").pqGrid("destroy");
	$("#groupCodeListTable").pqGrid("destroy");
	$("#intrtInfoTable").pqGrid("destroy");
	//showGrid();

}

//그리드 데이터 조회중 "조회중입니다..." 텍스트 호출
function readyToSet(){
	$("#TB06015P_IntrCalc").pqGrid("destroy");

	var obj = {

		height: 235,
		maxHeight: 235,
		showTitle: false,
		showToolbar: false,
		collapsible: false,
		wrap: false,
		hwrap: false,
		numberCell: { show: true, width: 40, resizable: true, title: "<p class='text-center'>순번</p>" },
		editable: false,
		//toolbar: { show: false },
		scrollModel: { autoFit: true },
		colModel: colModel_rateCalcSimul,
		strNoRows: '조회중입니다...',
		//pageModel: pageModel
	};

	$("#TB06015P_IntrCalc").pqGrid(obj);
	$("#TB06015P_IntrCalc").pqGrid("refreshDataAndView");
}

//그리드에 데이터 넣기 (CRUD)
function dataSetGrid(data){

	$("#TB06015P_IntrCalc").pqGrid("setData", data);
	$("#TB06015P_IntrCalc").pqGrid("refreshDataAndView");

	//dataSet_intrCalcInfo();

}

function addRow_intrtInfoTable(){

	$("#intrtInfoTable").pqGrid("addRow", { rowData: {}, checkEditable: false });

}

function dltRow_intrtInfoTable(){

	
	var gridLgth =  $("#intrtInfoTable").pqGrid('option', 'dataModel.data').length;

	$("#intrtInfoTable").pqGrid("deleteRow", {rowIndx: gridLgth-1});


	// $("#intrtInfoTable").pqGrid("setData", []);
}


function cloadSelectBoxContents() {
	
	var item = '';
	item += 'E020';					// 상환구분코드
	item += '/' + 'E011';			// 선후취구분코드
	item += '/' + 'I017';			// 이자납입일자코드
	item += '/' + 'H001';			// 휴일처리구분코드 
	item += '/' + 'E013';			// 이자일수계산방법
	item += '/' + 'E024';			// 초일말일적용구분코드
	item += '/' + 'I019';			// 이자단수처리구분코드
	item += '/' + 'I016';			// 이자계산종료일구분코드
	item += '/' + 'E019';			// 연체이자율구분코드
	
	getSelectBoxList('TB06015P', item);
	
}

function getMapping() {

	
	$('#TB06015P_E020').val('02');		  				// 원금상환방법 원리금상환구분코드
	$('#TB06015P_dealExcBlce').val("50,000,000");	  		// 대출잔액  딜실행잔액
	$('#TB06015P_E011').val('2');		  				// 이자선후취  이자선후취구분코드
	$('#TB06015P_eqlRdmpAmt').val(0);		  			// 균등상환금액  균등상환금액
	$('#TB06015P_I017').val('15');		  				// 이자납입일  이자납입일자코드
	$('#TB06015P_intrRdmpFrqcMnum').val(1);   			// 이자상환주기(개월)  이자상환주기개월수
	$('#TB06015P_rcvbIntrAmt').val(0);	  				// 미수이자금액  미수이자금액
	$('#TB06015P_H001').val('02');		  				// 휴일처리구분  휴일처리구분코드
	$('#TB06015P_prnaRdmpFrqcMnum').val(0);   			// 원금상환주기  원금상환주기개월수
	$('#TB06015P_E013').val('1');						// 이자일수계산방법  이자일수계산방법코드
	$('#TB06015P_E024').val('1');						// 초일말일적용구분  초일말일적용구분코드
	$('#TB06015P_I019').val('01');						// 이자단수법구분  이자단수처리구분코드
	$('#TB06015P_I016').val('02');						// 이자계산종료일구분  이자계산종료일구분코드
	$('#TB06015P_E019').val('2');						// 연체이자율구분  연체이자율구분코드
	$('#TB06015P_E020_1').val('01');					// 원금리금유형  원리금상환구분코드
	$('#TB06015P_prarPrna').val('');					// 대상금액  예정원금
	$('#TB06015P_ddCnt').val('');						// 일수  일수
	$('#TB06015P_aplyIrt').val(0);						// 적용이율(%)  적용이율
	$('#TB06015P_prcsAmt').val('');						// 원리금  처리금액
	$('#TB06015P_excDt').val('2022-05-15');				// 신규일자  실행일자
	$('#TB06015P_expDt').val('2024-05-15');				// 만기일자  만기일자
	$('#TB06015P_dfrExpDt').val('');  					// 거치만기일자  거치만기일자
	$('#TB06015P_lastPrnaRdmpDt').val('');    			// 최종원금상환일자  최종원금상환일자
	$('#TB06015P_nxtIntrPymDt').val('');   				// 다음이자납입일자  다음이자납입일자
	$('#TB06015P_lastIntrClcDt').val('');    			// 최종이자계산일자  최종이자계산일자
	$('#TB06015P_strtDt').val('');    					// 시작일지  시작일자
	$('#TB06015P_endDt').val('');    					// 종료일자  종료일자
	$('#TB06015P_prdtCd').val('A000000002');    		// 상품코드
	
	
}


//이자계산 전 필수값 체크
function calcValidation(){

	var option = {}
	option.title = "Error";
	option.type = "error";

	var intrtInfoLgth = $("#intrtInfoTable").pqGrid('option', 'dataModel.data').length;		//금리정보 그리드
	
	if( isEmpty($('#TB06015P_E020').val())){					//원금상환방법 미입력 시
		option.text = "원금상환방법을 선택한 후 다시 시도해주세요.";
		openPopup(option);
		return false;

	}else if(intrtInfoLgth < 1){								//금리정보 미입력시
		option.text = "금리정보를 업로드 후 다시 시도해주세요.";
		openPopup(option);
		return false;
	
	}else if(isEmpty($('#TB06015P_dealExcBlce').val())){		//대출잔액 미입력 시
		option.text = "대출잔액을 입력한 후 다시 시도해주세요.";
		openPopup(option);
		return false;

	}else if(isEmpty($('#TB06015P_excDt').val())){				//신규일자 미입력 시
		option.text = "신규일자를 입력한 후 다시 시도해주세요.";
		openPopup(option);
		return false;

	}else if(isEmpty($('#TB06015P_expDt').val())){				//만기일자 미입력 시
		option.text = "만기일자를 입력한 후 다시 시도해주세요.";
		openPopup(option);
		return false;
		
	}else if(isEmpty($('#TB06015P_E011').val())){				//이자선후취 구분 미선택 시
		option.text = "이자선후취구분을 선택한 후 다시 시도해주세요.";
		openPopup(option);
		return false;
		
	}else if(isEmpty($('#TB06015P_I017').val())){				//이자납입일 미선택 시
		option.text = "이자납입일을 선택한 후 다시 시도해주세요.";
		openPopup(option);
		return false;
		
	}else if(isEmpty($('#TB06015P_H001').val())){				//휴일처리구분 미선택 시
		option.text = "휴일처리구분을 선택한 후 다시 시도해주세요.";
		openPopup(option);
		return false;
		
	}else if(isEmpty($('#TB06015P_E013').val())){				//이자일수 계산방법 미선택 시
		option.text = "이자일수 계산방법을 선택한 후 다시 시도해주세요.";
		openPopup(option);
		return false;
		
	}else if(isEmpty($('#TB06015P_E024').val())){				//초일말일 적용구분 미선택 시
		option.text = "초일말일 적용구분을 선택한 후 다시 시도해주세요.";
		openPopup(option);
		return false;
		
	}else if(isEmpty($('#TB06015P_I016').val())){				//이자계산 종료일구분 미선택 시
		option.text = "이자계산 종료일구분을 선택한 후 다시 시도해주세요.";
		openPopup(option);
		return false;
		
	}else if(isEmpty($('#TB06015P_intrRdmpFrqcMnum').val())){	//이자상환주기 미입력 시
		option.text = "이자상환주기를 입력한 후 다시 시도해주세요.";
		openPopup(option);
		return false;
		
	}else if(isEmpty($('#TB06015P_prnaRdmpFrqcMnum').val())){	//원금상환주기 미입력 시
		option.text = "원금상환주기를 입력한 후 다시 시도해주세요.";
		openPopup(option);
		return false;
		
	}else if(isEmpty($('#TB06015P_I019').val())){				//이자단수법구분 미선택 시
		option.text = "이자단수법구분을 선택한 후 다시 시도해주세요.";
		openPopup(option);
		return false;
		
	}else if($('#TB06015P_E020').val() == '03'){				//원금상환방법 원금불균등 선택 시
		
		var rdmpScdlLgth = $("#rdmpPlanGrid").pqGrid('option', 'dataModel.data').length;		//원금상환계획정보 길이

		if(rdmpScdlLgth < 1){			//원금불균등상환 선택 시 사용자가 원금상환계획정보 업로드 해야 함

			option.text = "원금상환계획정보를 업로드 후 다시 시도해주세요.";
			openPopup(option);
			return false;
		}
	
	}else{

		var excDt = formatDate($("#TB06015P_excDt").val());		//신규일자
		var expDt = formatDate($("#TB06015P_expDt").val());		//만기일자

		var period = $("#intrtInfoTable").pqGrid("option", "dataModel.data");



		//금리정보 유효성 확인(신규일자 ~ 만기일자 사이에 적용되는 금리가 적어도 하나는 있어야함)
		// function isDateRangeWithinPeriod(period, startDate, endDate) {
		// 	var periodStartDate = new Date(period.aplyStrtDt);
		// 	var periodEndDate = new Date(period.aplyEndDt);
		// 	return startDate >= periodStartDate && endDate <= periodEndDate;
		// }

		// // 각 기간이 기준 기간 내에 포함되는지 확인
		// function checkPeriods(periods, startDate, endDate) {
		// 	return periods.map(period => ({
		// 		id: period.id,
		// 		isWithinPeriod: isDateRangeWithinPeriod(period, startDate, endDate)
		// 	}));
		// }
		
		// var results = checkPeriods(period, excDt, expDt);

		// alert(JSON.stringify(results));

		getRateCalcSimulation();
	}

}

//이자계산
function getRateCalcSimulation() {
	
	var option = {}
	option.title = "Error";
	option.type = "error";

	$("#TB06015P_IntrCalc").pqGrid("destroy");

	showGrid();

	var intrtInfoList = [];
	var rdmpScdlList = [];
	var intrScdlList = [];

	var intrtInfoLgth = $("#intrtInfoTable").pqGrid('option', 'dataModel.data').length;		//금리정보 그리드

	for(var i=0; i < intrtInfoLgth; i++){
		var rowData = $("#intrtInfoTable").pqGrid("getRowData", { rowIndx: i } );

		var intrtInfo = {
			"aplyStrtDt"		: replaceAll(rowData.aplyStrtDt, '-', ''),
			"aplyEndDt"			: replaceAll(rowData.aplyEndDt, '-', ''),
			"stdrIntrtKndCd"	: rowData.stdrIntrtKnd,
			"fxnIntrt"			: rowData.fxnIntrt,
			"addIntrt"			: rowData.addIntrt,
			"aplyDnumDcd"		: rowData.aplyDnumD,
			"stdrIntrtAplyDnum"	: rowData.stdrIntrtAplyDnum,
			"intrtCngeFrqcCd"	: rowData.intrtCngeFrqc,
			"intrtCngeFrqcMnum"	: rowData.intrtCngeFrqcMnum,
			"aplyIntrt"			: parseFloat(rowData.fxnIntrt) + parseFloat(rowData.addIntrt)
		}

		//alert(JSON.stringify(intrtInfo));

		intrtInfoList.push(intrtInfo);

	}

		var rdmpScdlLgth = $("#rdmpPlanGrid").pqGrid('option', 'dataModel.data').length;			//원금상환 계획정보 리스트 길이
		var intrScdlLgth = $("#intrPlanGrid").pqGrid('option', 'dataModel.data').length;			//이자상환 계획정보 리스트 길이

		for(var i=0; i < rdmpScdlLgth; i++){
			var rowData =  $("#rdmpPlanGrid").pqGrid("getRowData", { rowIndx: i } );

			var prarDt = rowData.prarDt.replaceAll('-', '');
			var prarPrna = rowData.prarPrna.replaceAll(',', '');
				
			var rdmpScdl = {
				"prarPrna"	: prarPrna,
				"prarDt"	: prarDt,
				"prcsCpltYn": rowData.prcsCpltYn,
				"prcsDt"	: rowData.prcsDt
			}
				
			rdmpScdlList.push(rdmpScdl);
		}

		for(var i=0; i < intrScdlLgth; i++){
			var rowData =  $("#intrPlanGrid").pqGrid("getRowData", { rowIndx: i } );

			var prarPrna = rowData.prarPrna.replaceAll(',', '');
			var rdmpPrarIntr = rowData.rdmpPrarIntr.replaceAll(',', '');

			var intrScdl = {
				"strtDt"		: rowData.strtDt.replaceAll('-', ''),
				"endDt"			: rowData.endDt.replaceAll('-', ''),
				"aplyIrt"		: rowData.aplyIrt,
				"prarPrna"		: prarPrna,
				"rdmpPrarIntr"	: rdmpPrarIntr, 
				"prarDt"		: rowData.prarDt,
				"prcsCpltYn"	: rowData.prcsCpltYn,
				"prcsDt"		: rowData.prcsDt
			}

			intrScdlList.push(intrScdl);
		}

		var dfrExpDt = $('#TB06015P_dfrExpDt').val() == "" ? "" : replaceAll($('#TB06015P_dfrExpDt').val(), '-', '');
		var dealMrdpPrca = $('#TB06015P_dealMrdpPrca').val() == "0" ? "" : replaceAll($('#TB06015P_dealMrdpPrca').val(), ',', '');

		var paramData = {

			"paiRdmpDcd"			: $('#TB06015P_E020').val()    				  					// 원금상환방법 원리금상환구분코드
		  , "excDt" 				: replaceAll($('#TB06015P_excDt').val(), '-', '')    			// 신규일자  실행일자
		  , "dealExcBlce" 			: replaceAll($('#TB06015P_dealExcBlce').val(), ',', '')    		// 대출잔액  딜실행잔액
		  , "intrBnaoDcd" 			: $('#TB06015P_E011').val()    				  					// 이자선후취  이자선후취구분코드
		  , "mtrtDt" 				: replaceAll($('#TB06015P_expDt').val(), '-', '')    			// 만기일자  만기일자
		  , "eqlRdmpAmt" 			: replaceAll($('#TB06015P_eqlRdmpAmt').val(), ',', '')			// 균등상환금액  균등상환금액
		  , "intrPymDtCd" 			: $('#TB06015P_I017').val()    				  					// 이자납입일  이자납입일자코드
		  , "intrRdmpFrqcMnum" 		: $('#TB06015P_intrRdmpFrqcMnum').val()   						// 이자상환주기(개월)  이자상환주기개월수
		  , "rcvbIntrAmt" 			: replaceAll($('#TB06015P_rcvbIntrAmt').val(), ',', '')    		// 미수이자금액  미수이자금액
		  , "hldyPrcsDcd" 			: $('#TB06015P_H001').val()    				  					// 휴일처리구분  휴일처리구분코드
		  , "prnaRdmpFrqcMnum" 		: $('#TB06015P_prnaRdmpFrqcMnum').val()   						// 원금상환주기  원금상환주기개월수
		  , "dfrExpMnum" 			: dfrExpDt    													// 거치기간
		  , "intrDnumClcMthCd" 		: $('#TB06015P_E013').val()    									// 이자일수계산방법  이자일수계산방법코드
		  , "lastPrnaRdmpDt" 		: replaceAll($('#TB06015P_lastPrnaRdmpDt').val(), '-', '')   	// 최종원금상환일자  최종원금상환일자
		  , "tfdLyAplyDcd" 			: $('#TB06015P_E024').val()    									// 초일말일적용구분  초일말일적용구분코드
		  , "intrSnnoPrcsDcd" 		: $('#TB06015P_I019').val()    									// 이자단수법구분  이자단수처리구분코드
		  , "nxtIntrPymDt" 			: replaceAll($('#TB06015P_nxtIntrPymDt').val(), '-', '')   		// 다음이자납입일자  다음이자납입일자
		  , "intrClcEndDeDcd" 		: $('#TB06015P_I016').val()    									// 이자계산종료일구분  이자계산종료일구분코드
		  , "ovduIntrRtDcd" 		: $('#TB06015P_E019').val()    									// 연체이자율구분  연체이자율구분코드
		  , "lastIntrClcDt" 		: replaceAll($('#TB06015P_lastIntrClcDt').val(), '-', '')     	// 최종이자계산일자  최종이자계산일자
		  , "fxnIntrt" 				: $('#TB06015P_fxnIntrt').val()   	 							// 고정/기준금리(%)
		  , "addIntrt" 				: $('#TB06015P_addIntrt').val()   	 							// 가산금리(%)
		  , "stdrDt" 				: replaceAll($('#TB06015P_stdrDt').val(), '-', '')				// 기준일자
		  , "prdtCd" 				: $('#TB06015P_prdtCd').val()									// 상품코드
		  , "mdwyRdmpFeeRto"		: $('#TB06015P_mdwyRdmpFeeRto').val()							// 중도상환수수료율
		  , "dealMrdpPrca"			: dealMrdpPrca													// 중도상환원금
		  , "ovduIntrRt"			: $('#TB06015P_ovduIntrRt').val()								// 연체금리
		  , "intrtInfoList"			: intrtInfoList													// 금리정보 리스트
		  , "rdmpPlanList"			: rdmpScdlList													// 원금상환계획정보 리스트
		  , "intrtPlanList"			: intrScdlList													// 이자상환계획정보 리스트
		}
	

	$.ajax({
		//type: "GET",
		type: "POST",
		url: "/TB06015P/setIntrCalcSimulation",
		//data: paramData,
		data: JSON.stringify(paramData),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		beforeSend: function(){
			$("#TB06015P_IntrCalc").pqGrid("option", "strNoRows", "계산 중입니다...");
		},
		success: function(data) {

			//console.log(data.totalDTO);

			var totalItm = data.totalDTO;

			if(totalItm != null){
				$('#TB06015P_nrmlIntrAmt').val(commaStr(totalItm.totalIntr));				//정상이자
				$('#TB06015P_ovduIntrIntr').val(commaStr(totalItm.totalIntrOvduIntr));		//이자연체이자
				$('#TB06015P_prarPrna').val(commaStr(totalItm.totalPrna));					//상환대상원금
				$('#TB06015P_ovduPrnaIntr').val(commaStr(totalItm.totalPrnaOvduIntr));		//원금연체이자
				$('#TB06015P_earlyRpFee').val(commaStr(totalItm.totalMdwyRdmpFee));			//중도상환수수료
				$('#TB06015P_earlyRpPrna').val(commaStr(totalItm.totlaMrdpPrca));			//중도상환원금
				$('#TB06015P_totalAmt').val(commaStr(totalItm.totalTrgtAmt));				//총수납대상금액
				$('#TB06015P_accrdIntr').val(commaStr(0));
				$('#TB06015P_fnlIntrCalcDt').val(formatDate(totalItm.lastPrarIntrDt));		//최종이자계산일

				$('#TB06015P_nxtIntrRpDt').val(formatDate(totalItm.nextPrarIntrDt));		//다음이자납입일
				$('#TB06015P_nxtPrnaRpDt').val(formatDate(totalItm.nextPrarPrnaDt));		//다음원금상환일
			}

			

			$("#TB06015P_IntrCalc").pqGrid("option", "strNoRows", "데이터가 없습니다.");

			dataSetGrid(data.scdhList);

		}
	});/* end of ajax*/

}

/**
	문서로드시 세팅
 */
function docRdySettings() {
	modalShowFunction();
	keyDownEnter_TB06015P();
}

/*
 *	업로드 버튼 클릭 시 이벤트
 */
// $("#TB06015P_upload_btn").click(function() {
	
// 	$('#upload-file-input-TB06015P').click();
	
// });

/**
 * 엑셀 업로드 후 event
 */
$("#upload-file-input-TB06015P01").change(function() {
	//alert("1");
	var mode = "multi";
	readExcel("01");
	resetFileInput($('#upload-file-input-TB06015P01'));

});

$("#upload-file-input-TB06015P02").change(function() {
	//alert("1");
	var mode = "multi";
	readExcel("02");
	resetFileInput($('#upload-file-input-TB06015P02'));

});

/*
 *	엑셀 파일 읽기 
 */
function readExcel(mode) {

	//var scheduleList = [];

	let input = event.target;
	let reader = new FileReader();
	reader.onload = function() {
		let data = reader.result;
		let workBook = XLSX.read(data, { type: 'binary' });
		workBook.SheetNames.forEach(function(sheetName) {
			let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName], { 
                raw: false,
                dateNF: 'yyyy-mm-dd' 
            } );

			// scheduleList.push(rows);

			if(mode == "01"){
				addRows_rdmpPlanGrid(rows);
			}else{
				addRows_intrPlanGrid(rows);
			}
				

		})

	};

	
	reader.readAsBinaryString(input.files[0]);
	//workbook = '';
}

//엑셀 업로드 후 입력값 초기화 (같은 파일 여러번 읽어오기 위해)
function resetFileInput($element) {
	$element.wrap('<form>').closest('form').get(0).reset();
	$element.unwrap();
}

//원금상환계획정보 엑셀 업로드
function addRows_rdmpPlanGrid(rows){

	rows.forEach(function(row){

		// var strtDt = row["시작일"];
		// var endDt = row["종료일"];
		var prarDt = row["상환예정일자"];
		var prarPrna = row["상환예정원금"];

		var date = new Date(prarDt);
		var formattedDate = getDateFormat(date);

		// alert(prarDt);

		var newRow = {
			prarPrna	: prarPrna,
			prarDt		: formattedDate,
			prcsCpltYn	: "0"
		};

		$("#rdmpPlanGrid").pqGrid("addRow", { rowData: newRow, checkEditable: false });
	});

	$("#rdmpPlanGrid").pqGrid("refreshDataAndView");

}

//이자상환계획정보 엑셀 업로드
function addRows_intrPlanGrid(rows){

	var i = 0;

	rows.forEach(function(row){

		i++;

		var strtDt = row["시작일"];
		var endDt = row["종료일"];
		var aplyIrt = row["이자율(%)"];
		var prarPrna = row["대상금액"];
		var rdmpPrarIntr = row["이자액수"];

		var strtDate = new Date(strtDt);
		var endDate = new Date(endDt);

		var formattedStrtDt = getDateFormat(strtDate);
		var formattedEndDt = getDateFormat(endDate);

		if(i == 1){
			$('#TB06015P_dealExcBlce').val(prarPrna);
		}

		var newRow = {
			strtDt		: formattedStrtDt,
			endDt		: formattedEndDt,
			aplyIrt		: aplyIrt,
			prarPrna	: prarPrna,
			rdmpPrarIntr: rdmpPrarIntr,
			prcsCpltYn	: "0"
		}

		$("#intrPlanGrid").pqGrid("addRow", { rowData: newRow, checkEditable: false });

	});

	$("#intrPlanGrid").pqGrid("refreshDataAndView");
}

//기본정보 및 금리정보 조회
function getDetailInfo(){

	var prdtCd = $("#TB06015P_prdtCd").val();
	var excSn = $("#TB06015P_seq").val();

	if(prdtCd == null || prdtCd == ""){
		option.text = "종목코드를 입력하고 다시 시도해주세요.";
		openPopup(option);
		return false;
	}

	if(excSn == null || excSn == ""){
		option.text = "실행순번을 입력하고 다시 시도해주세요.";
		openPopup(option);
		return false;
	}

	// alert(prdtCd);
	// alert(excSn);

	var paramData = {
		"prdtCd": prdtCd,
		"excSn": excSn
	}

	$("#rdmpPlanGrid").pqGrid("option", "dataModel.data", []);
	$("#intrPlanGrid").pqGrid("option", "dataModel.data", []);
	$("#intrtInfoTable").pqGrid("option", "dataModel.data", []);

	$.ajax({
		type: "GET",
		//type: "POST",
		url: "/TB06015P/getDetailInfo",
		data: paramData,
		//data: JSON.stringify(paramData),
		dataType: "json",
		contentType: "application/json; charset=utf-8",
		success: function(data) {

			data.forEach(function(item) {
				//변수 포맷(기본정보)

				var formattedMtrtDt = formatDate(item.mtrtDt);						//만기일자 포맷
				var formattedExcDt = formatDate(item.excDt);						//신규일자 포맷
				var formattedNxtIntrPymDt = formatDate(item.nxtIntrPymDt);			//다음이자 납입일자 포맷
				var formattedLastIntrClcDt = formatDate(item.lastIntrClcDt);		//최종이자 계산일자 포맷
				var formattedLastPrnaRdmpDt = formatDate(item.lastPrnaRdmpDt);		//최종원금 상환일자 포맷
				var formattedPrnaOvduDt = formatDate(item.prnaOvduDt);				//연체시작일 포맷
				var formattedIntrOvduDt = formatDate(item.intrOvduDt);				//이자연체 시작일 포맷
				var formattedTlmtPrfLoseDt = formatDate(item.tlmtPrfLoseDt);		//기한이익 상실잊라 포멧
				var formattedMdwyRdmpFeeRto = item.mdwyRdmpFeeRto;

				var formattedDealExcBlce = commaStr(handleNullData(item.dealExcBlce));				//대출잔액 포맷
				var formattedEqlRdmpAmt =  commaStr(handleNullData(item.eqlRdmpAmt));				//균등상환금액 포맷
				var formattedRcvbIntrAmt = commaStr(handleNullData(item.rcvbIntrAmt));				//미수이자금액 포맷


				//기본정보 set
				$("#TB06015P_E020").val(item.paiRdmpDcd);							//원금상환방법
				$("#TB06015P_excDt").val(formattedExcDt);							//신규일자
				$("#TB06015P_dealExcBlce").val(formattedDealExcBlce);				//대출잔액
				$("#TB06015P_E011").val(item.intrBnaoDcd);							//이자선후취구분
				$("#TB06015P_expDt").val(formattedMtrtDt);							//만기일자
				$("#TB06015P_eqlRdmpAmt").val(formattedEqlRdmpAmt);					//균등상환금액
				$("#TB06015P_I017").val(item.intrPymDtCd);							//이자납입일
				$("#TB06015P_intrRdmpFrqcMnum").val(item.intrRdmpFrqcMnum);			//이자상환주기
				$("#TB06015P_rcvbIntrAmt").val(formattedRcvbIntrAmt);				//미수이자금액
				$("#TB06015P_H001").val(item.hldyPrcsDcd);							//휴일처리구분
				$("#TB06015P_prnaRdmpFrqcMnum").val(item.prnaRdmpFrqcMnum);			//원금상환주기
				$("#TB06015P_dfrExpDt").val(item.dfrExpDt);							//거치기간
				$("#TB06015P_E013").val(item.intrDnumClcMthCd);						//이자일수 계산방법
				$("#TB06015P_lastPrnaRdmpDt").val(formattedLastPrnaRdmpDt);			//최종원금 상환일자
				$("#TB06015P_E024").val(item.tfdLyAplyDcd);							//초일말일
				$("#TB06015P_I019").val(item.intrSnnoPrcsDcd);						//이자단수법
				$("#TB06015P_nxtIntrPymDt").val(formattedNxtIntrPymDt);				//다음이자 납입일자
				$("#TB06015P_I016").val(item.intrClcEndDeDcd);						//이자계산 종료일구분
				$("#TB06015P_E019").val(item.ovduIntrRtDcd);						//연체이자율 구분
				$("#TB06015P_lastIntrClcDt").val(formattedLastIntrClcDt);			//최종이자 계산일자
				$("#TB06015P_prnaOvduDt").val(formattedPrnaOvduDt);					//원금연체 시작일자
				$("#TB06015P_intrOvduDt").val(formattedIntrOvduDt);					//이자연체 시작일자
				$("#TB06015P_tlmtPrfLoseDt").val(formattedTlmtPrfLoseDt);			//기한이익 상실일자
				$("#TB06015P_ovduIntrRt").val(item.ovduIntrRt);						//연체금리
				$("#TB06015P_mdwyRdmpFeeRto").val(formattedMdwyRdmpFeeRto);			//중도상환 수수료율
				$("#TB06015P_dealMrdpPrca").val(item.dealMrdpPrca);					//중도상환 금액

				if(item.mrdpYn == "Y"){
					$('#TB06015P_mrdpYnY').click();
				}else{
					$('#TB06015P_mrdpYnN').click();
				}

				dataSetGrid_rdmpPlanGrid(item.rdmpPlanList);
				dataSetGrid_intrPlanGrid(item.intrtPlanList);
				dataSetGrid_intrtInfo(item.intrtInfoList);

			});
			
			
		}
	});/* end of ajax*/

}

function dataSetGrid_rdmpPlanGrid(rdmpPlanList){

	rdmpPlanList.forEach(function(item){

		// var formattedStrtDt = formatDate(item.strtDt);							//적용시작일자 포맷
		// var formattedEndDt = formatDate(item.endDt);							//적용종료일자 포맷
		var formattedPrarDt = formatDate(item.prarDt);							//상환예정일자 포맷
		var formattedPrarPrna = commaStr(handleNullData(item.prarPrna));		//상환예정원금 포맷


		var newRow = {
			"prarDt"		: formattedPrarDt,
			"prarPrna"		: formattedPrarPrna,
			"prcsCpltYn"	: item.prcsCpltYn,
			"prcsDt"		: item.prcsDt
		}

		$("#rdmpPlanGrid").pqGrid("addRow", {rowData: newRow,  checkEditable: false });
		$("#rdmpPlanGrid").pqGrid("refreshDataAndView");

		$(".pq-ui-button.ui-widget-header.pq-page-first").attr("title", "첫 페이지");
		$(".pq-ui-button.ui-widget-header.pq-page-prev").attr("title", "이전 페이지");
		$(".pq-ui-button.ui-widget-header.pq-page-next").attr("title", "다음 페이지");
		$(".pq-ui-button.ui-widget-header.pq-page-last").attr("title", "마지막 페이지");

	}); 

}

function dataSetGrid_intrPlanGrid(intrtPlanList){

	intrtPlanList.forEach(function(item){
		//console.log(item.prarDt);

		var formattedStrtDt = formatDate(item.strtDt);							//적용시작일자 포맷
		var formattedEndDt = formatDate(item.endDt);							//적용종료일자 포맷

		var formattedPrarPrna = commaStr(handleNullData(item.prarPrna));		//상환예정원금 포맷
		var formattedRdmpPrarIntr = commaStr(handleNullData(item.rdmpPrarIntr));//상환예정이자액수 포맷

		var newRow = {
			"strtDt"		: formattedStrtDt,
			"endDt"			: formattedEndDt,
			"aplyIrt"		: item.aplyIrt,
			"prarPrna"		: formattedPrarPrna,
			"rdmpPrarIntr"	: formattedRdmpPrarIntr,
			"prcsCpltYn"	: item.prcsCpltYn,
			"prarDt"		: item.prarDt,
			"prcsDt"		: item.prcsDt
		}

		//console.log(JSON.stringify(newRow));

		$("#intrPlanGrid").pqGrid("addRow", {rowData: newRow,  checkEditable: false });
		$("#intrPlanGrid").pqGrid("refreshDataAndView");

		$(".pq-ui-button.ui-widget-header.pq-page-first").attr("title", "첫 페이지");
		$(".pq-ui-button.ui-widget-header.pq-page-prev").attr("title", "이전 페이지");
		$(".pq-ui-button.ui-widget-header.pq-page-next").attr("title", "다음 페이지");
		$(".pq-ui-button.ui-widget-header.pq-page-last").attr("title", "마지막 페이지");
	});
}

function dataSetGrid_intrtInfo(intrtInfoList){

	intrtInfoList.forEach(function(item){
		
		//변수 포맷(금리정보)
		var formattedAplyStrtDt = formatDate(item.aplyStrtDt);              //적용시작일자 포맷
		var formattedAplyEndDt = formatDate(item.aplyEndDt);                //적용종료일자 포맷

		//alert("stdrIntrtKndCd: "+item.stdrIntrtKndCd);
		
		var newRow = {
			"aplyStrtDt"        	: formattedAplyStrtDt,
			"aplyEndDt"             : formattedAplyEndDt,
			"stdrIntrtKndCd"    	: item.stdrIntrtKndCd, 
			"fxnIntrt"              : item.fxnIntrt,
			"addIntrt"              : item.addIntrt,
			"aplyDnumDcd"           : item.aplyDnumDcd,
			"stdrIntrtAplyDnum"     : item.stdrIntrtAplyDnum,
			"intrtCngeFrqcCd"       : item.intrtCngeFrqcCd,
			"intrtCngeFrqcMnum"     : item.intrtCngeFrqcMnum,
			"stdrIntrtKnd"          : item.stdrIntrtKndCd,
			"aplyDnumD"             : item.aplyDnumDcd,
			"intrtCngeFrqc"         : item.intrtCngeFrqcCd,
			"aplyIntrt"             : item.aplyIntrt
		}

		$("#intrtInfoTable").pqGrid("addRow", {rowData: newRow,  checkEditable: false });
		$("#intrtInfoTable").pqGrid("refreshDataAndView");

		$(".pq-ui-button.ui-widget-header.pq-page-first").attr("title", "첫 페이지");
		$(".pq-ui-button.ui-widget-header.pq-page-prev").attr("title", "이전 페이지");
		$(".pq-ui-button.ui-widget-header.pq-page-next").attr("title", "다음 페이지");
		$(".pq-ui-button.ui-widget-header.pq-page-last").attr("title", "마지막 페이지");
	});

}

function dataSet_intrCalcInfo(){

	var intrCalcInfoLgth = $("#TB06015P_IntrCalc").pqGrid('option', 'dataModel.data').length;		//원리금계산정보 길이
	var rdmpScdlLgth = $("#rdmpPlanGrid").pqGrid('option', 'dataModel.data').length;				//원금상환계획정보 길이
	var intrScdlLgth = $("#intrPlanGrid").pqGrid('option', 'dataModel.data').length;				//이자상환계획정보 길이

	//alert(intrCalcInfoLgth);

	var earlyRpFee = 0;				//중도상환수수료
	var prarPrna = 0;				//상환대상원금
	var fnlIntrCalcDt = "";			//최종이자계산일
	var nxtIntrRpDt = "";			//다음이자납입일
	var nxtPrnaRpDt = "";			//다음원금상환일
	var nrmlIntrAmt = 0;			//정상이자
	var ovduPrnaIntr = 0;			//원금연체이자
	var ovduIntrIntr = 0;			//이자연체이자
	var earlyRpPrna = 0;			//중도상환원금
	var accrdIntr = 0;				//미수이자금액
	var totalAmt = 0;				//총수납대상금액

	var lstPrnaRpDt;		//최종원금납입일

	for(var i=0; i < intrCalcInfoLgth; i++){
		
		
		
		var rowData = $("#TB06015P_IntrCalc").pqGrid("getRowData", {rowIndx: i});

		var paiRdmpDcd = rowData.paiRdmpDcd;						//원리금유형
		var monthlyPayment = rowData.monthlyPayment;				//대상금액
		var strtDt = rowData.strtDt;								//n회차 시작일자
		var endDt = rowData.endDt;									//n회차 종료일자
		var ddCnt = rowData.ddCnt;									//n회차 총 일수
		var aplyIntrtContent = rowData.aplyIntrtContent;			//적용이율
		var monthlyBalancPayTotal = rowData.monthlyBalancPayTotal;	//n회차 원리금

		if(paiRdmpDcd == "정상이자(2)"){

			nrmlIntrAmt = nrmlIntrAmt + monthlyBalancPayTotal;
			totalAmt = totalAmt + monthlyBalancPayTotal;

			var dateString = formatDate(endDt);
			var date = new Date(dateString);

			date.setDate(date.getDate() + 1);

			fnlIntrCalcDt = getDateFormat(date);

		}else if(paiRdmpDcd == "납부이자연체금액(4)"){

			ovduIntrIntr = ovduIntrIntr + monthlyBalancPayTotal;
			totalAmt = totalAmt + monthlyBalancPayTotal;

		}else if(paiRdmpDcd == "중도상환 수수료(9)"){

			earlyRpFee = earlyRpFee + monthlyBalancPayTotal;
			totalAmt = totalAmt + monthlyBalancPayTotal;
			
		}else if(paiRdmpDcd == "원금(1)"){

			prarPrna = prarPrna + monthlyBalancPayTotal;
			totalAmt = totalAmt + monthlyBalancPayTotal;

			var dateString = formatDate(endDt);
			var date = new Date(dateString);

			date.setDate(date.getDate() + 1);

			lstPrnaRpDt = getDateFormat(date);

			
		}else if(paiRdmpDcd == "원금연체금액(5)"){

			ovduPrnaIntr = ovduPrnaIntr + monthlyBalancPayTotal;
			totalAmt = totalAmt + monthlyBalancPayTotal;
			
		}else if(paiRdmpDcd == "중도상환원금(8)"){
			earlyRpPrna = earlyRpPrna + monthlyBalancPayTotal;
		}
	}//end of for

	//다음이자납입일 찾기
	for(var i = 0; i < intrScdlLgth; i++){

		var rowData = $("#intrPlanGrid").pqGrid("getRowData", {rowIndx: i});

		if(rowData.strtDt == fnlIntrCalcDt){

			var dateString = rowData.endDt;
			var date = new Date(dateString);

			date.setDate(date.getDate() + 1);

			nxtIntrRpDt = getDateFormat(date);
		}

	}

	//alert(lstPrnaRpDt);
	//다음원금상환일 찾기
	for(var i = 0; i < rdmpScdlLgth; i++){

		var rowData = $("#rdmpPlanGrid").pqGrid("getRowData", {rowIndx: i});

		if(lstPrnaRpDt == rowData.prarDt){
			
			if(i != rdmpScdlLgth-1){
				var rowData2 = $("#rdmpPlanGrid").pqGrid("getRowData", {rowIndx: i+1});

				nxtPrnaRpDt = rowData2.prarDt;
			}
			
		}

	}

	// $('#TB06015P_nrmlIntrAmt').val(commaStr(nrmlIntrAmt));			//정상이자
	// $('#TB06015P_ovduIntrIntr').val(commaStr(ovduIntrIntr));		//이자연체이자
	// $('#TB06015P_prarPrna').val(commaStr(prarPrna));				//상환대상원금
	$('#TB06015P_fnlIntrCalcDt').val(fnlIntrCalcDt);				//최종이자계산일
	$('#TB06015P_nxtIntrRpDt').val(nxtIntrRpDt);					//다음이자납입일
	$('#TB06015P_nxtPrnaRpDt').val(nxtPrnaRpDt);					//다음원금상환일
	// $('#TB06015P_ovduPrnaIntr').val(commaStr(ovduPrnaIntr));		//원금연체이자
	// $('#TB06015P_earlyRpFee').val(commaStr(earlyRpFee));			//중도상환수수료
	// $('#TB06015P_earlyRpPrna').val(commaStr(earlyRpPrna));			//중도상환원금
	// $('#TB06015P_accrdIntr').val(commaStr(accrdIntr));				//미수이자금액
	// $('#TB06015P_totalAmt').val(commaStr(totalAmt));				//총수납대상금액

}


/**
 * 모달 오픈 애니메이션 후 포커스 주도록 설정
 */
function modalShowFunction() {
	$('#modal-TB06015P').on('shown.bs.modal', function() {
		$('#modal-TB06015P input[id=TB06015P_prdtCd]').focus();
	});
}

/**
 * 키다운엔터이벤트
 */
function keyDownEnter_TB06015P() {
	$("input[id=TB06015P_prdtCd]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			
		}
	});

	$("input[id=TB06015P_prdtNm]").keydown(function(key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			
		}
	});
}


/**
 * show modal 
 */
function callTB06015P(prefix) {
	$('#TB06015P_prefix').val(prefix);
	$('#modal-TB06015P').modal('show');
	indexChangeHandler("TB06015P");

	sltBoxSet_pqGrid();

	let promise1 = new Promise((resolve) => setTimeout(() => resolve(showGrid()), 300));
	let promise2 = new Promise((resolve) => setTimeout(() => resolve(showGrid_rdmp()), 300));
	let promise3 = new Promise((resolve) => setTimeout(() => resolve(showGrid_intr()), 300));

	Promise.all([promise1, promise2, promise3]).then((results) => {
		//console.log(results);

		//alert("그리드 생성 완료");
	});

}

/**
 * hide modal
 */
function modalClose_TB06015P() {
	$('#modal-TB06015P').modal('hide');

	resetGrid();
	//resetGrid_grpCdLstTb();
	//resetGrid_intrtInfo();
	clearTB06015P();
};

function reSet_TB06015P(){
	//resetGrid();
	//resetGrid_grpCdLstTb();
	//resetGrid_intrtInfo();
	clearTB06015P();
}

/**
 * clear modal
 */
function clearTB06015P() {
	$('#TB06015P_prdtCd').val("");
	$('#TB06015P_prdtNm').val("");
	$('#TB06015P_seq').val("");

	$('#TB06015P_E020 option:first').prop('selected', true);
	$('#TB06015P_excDt').val("");
	$('#TB06015P_dealExcBlce').val("");
	$('#TB06015P_E011 option:first').prop('selected', true);
	$('#TB06015P_expDt').val("");
	$('#TB06015P_eqlRdmpAmt').val("");
	$('#TB06015P_I017 option:first').prop('selected', true);
	$('#TB06015P_intrRdmpFrqcMnum').val("");
	$('#TB06015P_rcvbIntrAmt').val("");
	$('#TB06015P_H001 option:first').prop('selected', true);
	$('#TB06015P_prnaRdmpFrqcMnum').val("");
	$('#TB06015P_dfrExpDt').val("");
	$('#TB06015P_E013 option:first').prop('selected', true);
	$('#TB06015P_lastPrnaRdmpDt').val("");
	$('#TB06015P_E024 option:first').prop('selected', true);
	$('#TB06015P_I019 option:first').prop('selected', true);
	$('#TB06015P_nxtIntrPymDt').val("");
	$('#TB06015P_I016 option:first').prop('selected', true);
	$('#TB06015P_E019 option:first').prop('selected', true);
	$('#TB06015P_lastIntrClcDt').val("");

	//$("#intrtInfoTable").pqGrid("setData", []);
	//$("#rdmpPlanGrid").pqGrid("setData", []);
	//$("#intrPlanGrid").pqGrid("setData", []);
	//$("#TB06015P_IntrCalc").pqGrid("setData", []);

}

function getDateFormat(date){
	const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

/**
 * dblclick event function
 */
function setStockInfo(e) {
	var tr = $(e);
	var td = $(tr).children();

	// 종목정보
	var prdtCd = td.eq(0).text();
	var prdtNm = td.eq(1).text();

	// 페이지 항목
	var pagePrdtCd = '#' + $('#TB06015P_prefix').val() + '_prdtCd';
	var pagePrdtNm = '#' + $('#TB06015P_prefix').val() + '_prdtNm';

	// 값 전달
	$(pagePrdtCd).val(prdtCd);
	$(pagePrdtNm).val(prdtNm);

	modalClose_TB06015P();
}