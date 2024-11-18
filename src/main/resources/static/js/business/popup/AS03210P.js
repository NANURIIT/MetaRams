$(document).ready(function () {
	keyDownEnter_AS03210P();
	modalShowFunction_AS03210P();
	modalCloseFunction_AS03210P();
});

/**
 * 모달 팝업 show
 * @param {string} prefix 결과전달 ID의 prefix
 */
function callAS03210P(prefix) {
	reset_AS03210P();
	$('#prefix').val(prefix);
	$('#modal-AS03210P').modal('show');
}

/**
 * 모달 초기화
 */
function reset_AS03210P() {
	$('#AS03210P_tbodyEntList').html("");
	$('#prefix').val("");
	$('#AS03210P_entpCd').val("");
	$('#AS03210P_entpHnglNm').val("");
	$('#AS03210P_rprsNm').val("");
	$('#AS03210P_corpRgstNo').val("");
}

function modalShowFunction_AS03210P() {
	//모달 오픈 애니메이션 후 포커스 주도록 설정
	$('#modal-AS03210P').on('shown.bs.modal', function(){
		$('#modal-AS03210P input[name=AS03210P_entpHnglNm]').focus();
	});
}

function modalCloseFunction_AS03210P() {
	//모달 클로즈 애니메이션 후 포커스 주도록 설정
	$('#modal-AS03210P').on('hidden.bs.modal', function(){
		
		if($('#prefix').val() == 'TB03031P_rm'){
			$('#TB03031P_rm_entpRnm').focus();
		}else if($('#prefix').val() == 'TB03030S'){
			$('#TB03030S_entpRnm').focus();
		}
			
	});
}

/**
 * Enter key Event
 */
function keyDownEnter_AS03210P() {
	$("input[name=AS03210P_entpCd]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEntList();
		}
	});

	$("input[name=AS03210P_entpHnglNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEntList();
		}
	});

	$("input[id=AS03210P_rprsNm]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEntList();
		}
	});

	$("input[id=AS03210P_corpRgstNo]").keydown(function (key) {
		if (key.keyCode == 13) {//키가 13이면 실행 (엔터는 13)
			getEntList();
		}
	});
}

/**
 * ajax 통신(조회)
 */
function getEntList() {

	var entpCd = $("#AS03210P_entpCd").val();
	var entpHnglNm = $("#AS03210P_entpHnglNm").val();
	var rprsNm = $("#AS03210P_rprsNm").val();
	var corpRgstNo = $("#AS03210P_corpRgstNo").val();

	var dtoParam = {
		  "entpCd": entpCd
		, "entpHnglNm": entpHnglNm
		, "rprsNm": rprsNm
		, "corpRgstNo": corpRgstNo
	}
	

	$.ajax({
		type: "GET",
		url: "/findEntList",
		data: dtoParam,
		dataType: "json",
		success: function (data) {
			$('#AS03210P_tbodyEntList').html('');
			rebuildEntTable(data);
		}
	});

}

/**
 * 결과값 table 생성
 */
function rebuildEntTable(data) {
	var html = '';
	var entList = data;

	if (entList.length <= 0) {
		html += '<tr>';
		html += '<td colspan="6" style="text-align: center">데이터가 없습니다.</td>';
		html += '</tr>';
	} else if (entList.length > 0) {
		$.each(entList, function (key, value) {
			html += '<tr ondblclick="setEntpCd(this);">';
			html += '<td>' + value.entpCd + '</td>';
			html += '<td>' + value.entpHnglNm + '</td>';
			html += '<td>' + value.rprsNm + '</td>';
			html += '<td>' + value.corpRgstNo + '</td>';
			html += '<td style="display: none">' + value.bsnsRgstNo + '</td>;'
			html += '</tr>';
		})
	}
	$('#AS03210P_tbodyEntList').html(html);

};

/**
 * modal hide
 */
function modalClose_AS03210P() {
	$('#modal-AS03210P').modal('hide');
}

/**
 * 부모창에 결과값 전달
 */
function setEntpCd(e) {
	var tr = $(e);						// function을 호출한 곳의 값을 가져온다. (this)
	// var tr = event.currentTarget;	// event가 deprecated된 같은 기능
	var td = $(tr).children();

	var entpCd = td.eq(0).text();		// 업체코드
	var entpHnglNm = td.eq(1).text();	// 업체한글명
	var rprsNm = td.eq(2).text();		// 대표자명
	var corpRgstNo = td.eq(3).text();	// 법인등록번호
	var bsnsRgstNo = td.eq(4).text();   // 사업자등록번호

	var prefix = $("#prefix").val();	// id 값에 일관성을 주고, 다른 변수와 겹치는 것을 방지하기 위해 prefix된 페이지 name을 각 id에 붙여준다.
	var pageEntpCd = '#' + prefix + '_entpCd';
	var pageEntpHnglNm = '#' + prefix + '_entpRnm';
	var pageRprsNm = '#' + prefix + '_rprsNm'; 
	var pageCorpRgstNo = '#' + prefix + '_corpRgstNo';
	var pageBsnsRgstNo = '#' + prefix + '_bsnsRgstNo';
	
	$(pageEntpCd).val(entpCd);
	$(pageEntpHnglNm).val(entpHnglNm);
	if( prefix == 'TB03020S' ){
		$(pageCorpRgstNo).val(formatCorpNo(corpRgstNo));
		$(pageBsnsRgstNo).val(checkBrnAcno(bsnsRgstNo));
	}else{
		$(pageCorpRgstNo).val(corpRgstNo);
		$(pageBsnsRgstNo).val(bsnsRgstNo);
	}
	$(pageRprsNm).val(rprsNm);
	
	
	if( prefix == 'TB06010S' ){
		$('#TB06010S_corpNo').val(corpRgstNo);			// 법인번호
		$('#TB06010S_optrRgstNo').val(bsnsRgstNo);		// 사업자등록번호
		$('#TB06010S_cfmtEntpNm').val(entpHnglNm);		// 거래상대방(업체한글명)
	}

	reset_AS03210P();
	modalClose_AS03210P();
}

function formatCorpNo(corpNo) {
	var formattedCorpNo = corpNo.replace(/(\d{6})(\d{7})/, "$1-$2");
	return formattedCorpNo;
}