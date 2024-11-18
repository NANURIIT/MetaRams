var ldvdCd;
var mdvdCd;
var sdvdCd;


$(document).ready(function () {
	
});

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callAC01140P(prefix) {
	$('#prefix').val(prefix);
	$('#modal-AC01140P').modal('show');
	
	makeTable();
	

	
}

/**
 * modal hide
 */
function modalClose_AC01140P() {
	$('#modal-AC01140P').modal('hide');
}

function makeTable(){
	
	if($('#prefix').val() == "TB04010S") {
		ldvdCd = TB04010Sjs.ldvdCd;
		mdvdCd = TB04010Sjs.mdvdCd;
		sdvdCd = TB04010Sjs.sdvdCd;
	}
	var html = "";
	
	$.each(sdvdCd, function(key, value) {
		var sdvdCdPre1 = value.CD_VL_ID.slice(0,-1);
		var sdvdCdPre2 = value.CD_VL_ID.slice(0,-2) + "0";
		

		html += "<tr>";
		html += "<td style='display:none;'>";
		html += sdvdCdPre2;
		html += "</td>";
		html += "<td style='display:none;'>";
		html += sdvdCdPre1;
		html += "</td>";
		html += "<td style='display:none;'>";
		html += value.CD_VL_ID;
		html += "</td>";
		html += "<td class='lDvdCdNm'>";
		html += getLdvdCdNm(sdvdCdPre2);
		html += "</td>";
		html += "<td class='mDvdCdNm'>";
		html += getMdvdCdNm(sdvdCdPre1);
		html += "</td>";
		html += "<td ondblclick='setDvdCdId(this)'><a>";
		html += value.CD_VL_NM;
		html += "</a></td>";
		html += "</tr>";
	});
	
	$("#AC01140P_tbody").html(html);
	
	$(".lDvdCdNm").each(function(){
		var tempString = $(this).text();
		var c1_rows = $(".lDvdCdNm").filter(function(){
			return $(this).text() == tempString;
		});
		if(c1_rows.length > 1){
			c1_rows.eq(0).attr("rowspan", c1_rows.length);
			c1_rows.not(":eq(0)").remove();
		}
	});
	
	$(".mDvdCdNm").each(function(){
		var tempString = $(this).text();
		var c2_rows = $(".mDvdCdNm").filter(function(){
			return $(this).text() == tempString;
		});
		if(c2_rows.length > 1){
			c2_rows.eq(0).attr("rowspan", c2_rows.length);
			c2_rows.not(":eq(0)").remove();
		}
	});
}

function setDvdCdId(e){
	var tr = $(e).parent();									// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;						// event가 deprecated된 같은 기능
	var td = $(tr).children();
	var ldvdCdVl = td.eq(0).text();
	var mdvdCdVl = td.eq(1).text();
	var sdvdCdVl = td.eq(2).text();
	

	$('#AS03210S_invstGdsLdvdCd').val(ldvdCdVl).prop("selected", true).change();	// 투자상품대분류

	$('#AS03210S_invstGdsMdvdCd').val(mdvdCdVl).prop("selected", true).change();	// 투자상품중분류

	$('#AS03210S_invstGdsSdvdCd').val(sdvdCdVl).prop("selected", true).change();	// 투자상품소분류

	if($('#prefix').val() == "TB03020S") {

		$('#TB03020S_invstGdsLdvdCd').val(ldvdCdVl).prop("selected", true).change();	// 투자상품대분류

		$('#TB03020S_invstGdsMdvdCd').val(mdvdCdVl).prop("selected", true).change();	// 투자상품중분류

		$('#TB03020S_invstGdsSdvdCd').val(sdvdCdVl).prop("selected", true).change();	// 투자상품소분류

	}

	if($('#prefix').val() == "TB04010S") {
		
		$('#TB04010S_I029').val(ldvdCdVl).prop("selected", true).change();	// 투자상품대분류

		$('#TB04010S_I030').val(mdvdCdVl).prop("selected", true).change();	// 투자상품중분류

		$('#TB04010S_I031').val(sdvdCdVl).prop("selected", true).change();	// 투자상품소분류

	}

	modalClose_AC01140P();
}

function getLdvdCdNm(sdvdCdPre2){
	var cdVlNm;
	$.each(ldvdCd, function(key, value) {
		if(sdvdCdPre2 == value.CD_VL_ID){
			cdVlNm = value.CD_VL_NM;
			return false;
		}
	});
	return cdVlNm;
}

function getMdvdCdNm(sdvdCdPre1){
	var cdVlNm;
	$.each(mdvdCd, function(key, value) {
		if(sdvdCdPre1 == value.CD_VL_ID){
			cdVlNm = value.CD_VL_NM;
			return false;
		}
	});
	return cdVlNm;
}