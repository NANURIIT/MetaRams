$(document).ready(function() {
	$("#CASEChk").change(function(){
        if($("#CASEChk").is(":checked")){
            $('.CASEChk').prop('checked', true);
        }else{
            $('.CASEChk').prop('checked', false);
        }
    });
});

// 조회
$('#btnSearch').on("click",function(){
	
	var paramData = {
		"dprtCd": $('#AS05110S_dprtCd').val(),
		"chrgPEno": $('#chrgP_eno').val(),
		"inspctDprtCcd": $('#inspctDprtCcd').val(),
		"ownPEno": $('#ownP_eno').val()
	}
	
	$.ajax({
		type: "GET",
		url: "/AS05110S/getDealDetails",
		data: paramData,
		dataType: "json",
		success: function(result) {
			if (result.length > 0) {
				var html = '';
				$.each(result, function(key, data) {
					html += '<tr>';
					// chkbox
					html += '<td>';
					html += '<input type="checkbox" class="CASEChk">';
					html += '</td>';
	
					// ibDealNo
					html += '<td>' + data.ibDealNo;
					html += '</td>';
					
					// ibDealNm
					html += '<td>' + data.ibDealNm;
					html += '</td>';
	
					// riskInspctCcd
					html += '<td style="display:none">' + data.riskInspctCcd;
					html += '</td>';
					html += '<td>' + data.riskInspctCcdNm;
					html += '</td>';
	
					// lstCCaseCcd
					html += '<td style="display:none">' + data.lstCCaseCcd;
					html += '</td>';
					html += '<td>' + data.lstCCaseCcdNm;
					html += '</td>';
	
					// dprtNm
					html += '<td style="display:none">' + data.dprtCd;
					html += '</td>';
					html += '<td>' + data.dprtNm;
					html += '</td>';
	
					// chrgPEno
					html += '<td style="display:none">' + data.chrgPEno;
					html += '</td>';
					html += '<td>' + data.chrgPNm;
					html += '</td>';
					
					// inspctDprtNm
					html += '<td style="display:none">' + data.inspctDprtCcd;
					html += '</td>';
					html += '<td>' + data.inspctDprtNm;
					html += '</td>';
	
					// ownPEno
					html += '<td style="display:none">' + data.ownPEno;
					html += '</td>';
					html += '<td>' + data.ownPNm;
					html += '</td>';
	
					// inspctPrgsStCd
					html += '<td style="display:none">' + data.inspctPrgsStCd;
					html += '</td>';
					html += '<td>' + data.inspctPrgrsStNm;
					html += '</td>';
	
					html += '</tr>';
				})
				$('#AS05110S_List').html(html);
			}else {
				var html = '';
				
				html += '<tr>';
				html += '<td colspan="10" style="text-align: center">데이터가 없습니다.</td>';
				html += '</tr>';
				
				$('#AS05110S_List').html(html);
			}
			
		}
	});
});

$('#btnSave').on("click",function(){
	
	var checkboxes = $('#AS05110S_List input:checkbox:checked');
	if (checkboxes.length > 0) {
		businessFunction();
	} else {
		Swal.fire({
			icon: 'error'
			, title: "Error!"
			, text: "변경대상 안건의 체크박스를 확인해주세요."
			, confirmButtonText: "확인"
		});
	}
	
	function businessFunction() {
		var CASEList = new Array();
		
		let groupCodeList = new Array();
		let tr = $('#AS05110S_List').children();
		
		for (let i = 0; i < tr.length; i++) {
			let  checkBox = $(tr[i]).find("td:eq(0)").find("input");
			if (checkBox.is(":checked")) {
				var object = {};
				object.inptCcd = $('#inptCcd').val();
				object.hdqtCd = $('#change_hdqtCd').val();
				object.dprtCd = $('#change_dprtCd').val();
				if($('#inptCcd').val() == 1){
					object.chrgPEno = $('#change_eno').val();	
				}else{
					object.ownPEno = $('#change_eno').val();
				}
				
				object.ibDealNo = $(tr[i]).find("td:eq(1)").text();
				object.riskInspctCcd = $(tr[i]).find("td:eq(3)").text();
				object.lstCCaseCcd = $(tr[i]).find("td:eq(5)").text();
				
				CASEList.push(object);
			}
		}
		$.ajax({
			type: "POST",
			url: "/AS05110S/savePEno",
			contentType: 'application/json',
			data: JSON.stringify(CASEList),
			success: function(data) {
				$('#btnSearch').click();
			}
		});
	}
	
});
