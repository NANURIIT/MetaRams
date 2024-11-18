var ldvdCd;
var mdvdCd;
var sdvdCd;

ldvdCd = TB04010Sjs.ldvdCd;
mdvdCd = TB04010Sjs.mdvdCd;
sdvdCd = TB04010Sjs.sdvdCd;

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callTB04014P(prefix) {
	$('#TB04014P_prefix').val(prefix);
	$('#modal-TB04014P').modal('show');
	indexChangeHandler("TB04014P");
	makeTable();
}

/**
 * modal hide
 */
function modalClose_TB04014P() {
	$('#modal-TB04014P').modal('hide');
}

function makeTable(){
	var html = "";

	$.each(sdvdCd, function(key, value) {
		var sdvdCdPre1 = value.cdValue.slice(0,-1);
		var sdvdCdPre2 = value.cdValue.slice(0,-2) + "0";

		html += "<tr>";
		html += "<td style='display:none;'>";
		html += sdvdCdPre2;
		html += "</td>";
		html += "<td style='display:none;'>";
		html += sdvdCdPre1;
		html += "</td>";
		html += "<td style='display:none;'>";
		html += value.cdValue;
		html += "</td>";
		html += "<td class='lDvdCdNm'>";
		html += getLdvdCdNm(sdvdCdPre2);
		html += "</td>";
		html += "<td class='mDvdCdNm'>";
		html += getMdvdCdNm(sdvdCdPre1);
		html += "</td>";
		html += "<td ondblclick='setDvdCdId(this)'><a>";
		html += value.cdName;
		html += "</a></td>";
		html += "</tr>";
	});
	
	$("#TB04014P_tbody").html(html);
	
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
	
	var ldvdCdId = '#' + $('#TB04014P_prefix').val() + '_I029';
	var mdvdCdId = '#' + $('#TB04014P_prefix').val() + '_I030';
	var sdvdCdId = '#' + $('#TB04014P_prefix').val() + '_I031';
	

	$(ldvdCdId).val(ldvdCdVl).prop("selected", true).change();	// 투자상품대분류
	$(mdvdCdId).val(mdvdCdVl).prop("selected", true).change();	// 투자상품중분류
	$(sdvdCdId).val(sdvdCdVl).prop("selected", true).change();	// 투자상품소분류

	modalClose_TB04014P();
}

function getLdvdCdNm(sdvdCdPre2){
	var cdVlNm;
	$.each(ldvdCd, function(key, value) {
		if(sdvdCdPre2 == value.cdValue){
			cdVlNm = value.cdName;
			return false;
		}
	});
	return cdVlNm;
}

function getMdvdCdNm(sdvdCdPre1){
	var cdVlNm;
	$.each(mdvdCd, function(key, value) {
		if(sdvdCdPre1 == value.cdValue){
			cdVlNm = value.cdName;
			return false;
		}
	});
	return cdVlNm;
}