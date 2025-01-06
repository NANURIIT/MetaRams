/**
 * GD10010S.js
 */
const GD10010Sjs = (function(){
	let grdTemp; //임시테이블
	
	$(document).ready(function () {
		pqGrid_GD10010S();
		addRow_GD10010S();
	});	
	
	
	function pqGrid_GD10010S() {
		var dateEditor_grdTemp= function(ui){
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
			       $inp
			       .on("input", function (evt) {
			           validate(this);
			       })
			       .datepicker({
			           changeMonth: true,
			           changeYear: true,
			           showAnim: '',
			           onSelect: function () {
			               this.firstOpen = true;
			               validate(this);
			           },
			           beforeShow: function (input, inst) {
			               return !this.firstOpen;
			           },
			           onClose: function () {
			               this.focus();
			           }
					});   
		 }
		 
		let col_grdTemp =[
			{
			  title: "일자",
			  dataType: "date",
			  dataIndx: "tempDt",
			  format: "yy-mm-dd",
			  halign: "center",
			  align: "center",
			  width: "10%",
			  editor: {
				type: "textbox",
			  	init: dateEditor_grdTemp,
			  	},
			  validations:[  { type: 'regexp', value: '^[0-9]{2}/[0-9]{2}/[0-9]{4}$', msg: 'Not in mm/dd/yyyy format' }
		  				 ],
			  editable: true,
			},
		];
		
		let pqGridObjs = [];
		pqGridObjs = [
		   {
		    height: 80,
		    maxHeight: 200,
		    id: "grd_temp",
		    colModel: col_grdTemp,
		    scrollModel: { autoFit: false },
			selectionModel: { type: 'cell' },
            create: function (evt, ui) {
                this.widget().pqTooltip();
            },
			editModel: {
			    saveKey: $.ui.keyCode.ENTER,
			    //filterKeys: false,
			    keyUpDown: false,
			    cellBorderWidth: 0
			},
			numberCell: { show: false },
} 
		];	
		setPqGrid(pqGridObjs);
		// Grid instance
		grdTemp = $("#grd_temp").pqGrid("instance");
	}
	
	//add row
	function addRow_GD10010S(){
		let grdLen=0;
		grdLen = grdTemp.getData().length;	
		let newRow = {
	        tempDt: "",
	      };
		grdTemp.addRow({
			rowIndx: grdLen + 1,
			rowData: newRow,
			checkEditable: false,
		});  
	}
	
	return{
		pqGrid_GD10010S : pqGrid_GD10010S,
		addRow_GD10010S : addRow_GD10010S,
	};
})();