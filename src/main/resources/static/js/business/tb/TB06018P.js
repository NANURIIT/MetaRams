var ldvdCd;
var mdvdCd;
var sdvdCd;

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callTB06018P(prefix) {
	const selectedFile =  loadFile(prefix);
	({ ldvdCd, mdvdCd, sdvdCd } = selectedFile);

	$('#TB06018P_prefix').val(prefix);
	$('#modal-TB06018P').modal('show');
	indexChangeHandler("TB06018P");
	makeTable();
	
}

/* js파일 동적으로 로드 */
function loadFile(prefix){
	const files = {
		TB06010S: () => TB06010Sjs, //prefix가 TB06010S이면 TB06010Sjs로드
		TB06020S: () => TB06020Sjs,
		TB06030S: () => TB06030Sjs
	}

	return files[prefix]?files[prefix](): null
}

/**
 * modal hide
 */
function modalClose_TB06018P() {
	$('#modal-TB06018P').modal('hide');
}

function makeTable(){
	var html = "";
	
	$.each(sdvdCd, function(key, value) {
		var sdvdCdPre1 = value.cdValue.slice(0,4);
		var sdvdCdPre2 = value.cdValue.slice(0,2);
		

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
		html += "<td ondblclick='setDvdCdId_TB06018P(this)'><a>";
		html += value.cdName;
		html += "</a></td>";
		html += "</tr>";
	});
	
	$("#TB06018P_tbody").html(html);
	
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

function setDvdCdId_TB06018P(e){
	var tr = $(e).parent();									// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;						// event가 deprecated된 같은 기능
	var td = $(tr).children();
	var ldvdCdVl = td.eq(0).text();
	var mdvdCdVl = td.eq(1).text();
	var sdvdCdVl = td.eq(2).text();
	
	var option = {}
	option.title = "Error";
	option.type = "error";
	
	var vPrefix = $('#TB06018P_prefix').val();
	if (vPrefix == "TB06010S") {
		if((ldvdCdVl != "90")&&(ldvdCdVl != "91")&&(ldvdCdVl != "92")) 
		{
			option.text = "대출채권 또는 채무보증 분류가 아닙니다.";
			openPopup(option);
			return false;
		}
	} else if (vPrefix == "TB06020S") {
		if(ldvdCdVl != "30") 
		{
			option.text = "집합투자증권 분류가 아닙니다.";
			openPopup(option);
			return false;
		}
	} else if (vPrefix == "TB06030S") {
		if((ldvdCdVl != "10")&&(ldvdCdVl != "11")&&(ldvdCdVl != "16")) 
		{
			option.text = "주식,채권,단기금융상품 분류가 아닙니다.";
			openPopup(option);
			return false;
		}
	}
	
	var ldvdCdId = '#' + $('#TB06018P_prefix').val() + '_E022';
	var mdvdCdId = '#' + $('#TB06018P_prefix').val() + '_E023';
	var sdvdCdId = '#' + $('#TB06018P_prefix').val() + '_P004';
	
	
	$(ldvdCdId).val(ldvdCdVl).prop("selected", true).change();	// 투자상품대분류
	$(mdvdCdId).val(mdvdCdVl).prop("selected", true).change();	// 투자상품중분류
	$(sdvdCdId).val(sdvdCdVl).prop("selected", true).change();	// 투자상품소분류

	modalClose_TB06018P();
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