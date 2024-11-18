$(document).ready(function() {
    // selectbox 공통코드 바인딩
    selectBoxDataBinding();
});

function selectBoxDataBinding() {
    loadBusiDcd();          // 사업구분코드
    loadBusiDtlsDcd();      // 사업구분상세코드
    loadInvbnkPrfnBzDcd();  // PF사업구분코드
    loadInspctPrgrsStCd();  // 진행상태코드
    loadBsnsStmCd();        // 사업방식코드
    loadInvstCrncyCd();     // 투자통화코드
    loadBitrKindCd();       // 기준금리코드
    loadTrgtAstsCcd();      // 대상자산구분코드
    loadBsnsAreaCd();       // 사업지역코드
    loadInvstTypCd();       // 투자유형코드
    loadInvstAstsDvdCd();   // 투자자산분류코드
}

/**
 * 사업구분코드 로드
 */
function loadBusiDcd() {
    $.ajax({
        type: "GET",
        url: "/getSelectBoxCode/I029",
        dataType: "json",
        success: function(data) {
            ldvdCd = data;

            var html = "";
            $('#bsnsCcd').html(html);

            html += '<option value="">' + '전체' + '</option>';

            if (ldvdCd.length > 0) {
                $.each(ldvdCd, function(key, value) {
                    html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
                });
            }
            $('#bsnsCcd').html(html);

        }
    });
}

/**
 * 사업구분상세코드 로드
 */
function loadBusiDtlsDcd() {
    $.ajax({
        type: "GET",
        url: "/getSelectBoxCode/I033",
        dataType: "json",
        success: function(data) {
            ldvdCd = data;

            var html = "";
            $('#bsnsCcdDtls').html(html);

            html += '<option value="">' + '전체' + '</option>';

            if (ldvdCd.length > 0) {
                $.each(ldvdCd, function(key, value) {
                    html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
                });
            }
            $('#bsnsCcdDtls').html(html);

        }
    });
}

/**
 * PF사업구분코드 로드
 */
function loadInvbnkPrfnBzDcd() {
    $.ajax({
        type: "GET",
        url: "/getSelectBoxCode/I034",
        dataType: "json",
        success: function(data) {
            ldvdCd = data;

            var html = "";
            $('#pfBsnsCcd').html(html);

            html += '<option value="">' + '전체' + '</option>';

            if (ldvdCd.length > 0) {
                $.each(ldvdCd, function(key, value) {
                    html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
                });
            }
            $('#pfBsnsCcd').html(html);

        }
    });
}

/**
 * 심사진행상태코드 로드
 */
function loadInspctPrgrsStCd() {
    $.ajax({
        type: "GET",
        url: "/getSelectBoxCode/I004",
        dataType: "json",
        success: function(data) {
            ldvdCd = data;

            var html = "";
            $('#prgrsSt').html(html);

            if (ldvdCd.length > 0) {
                $.each(ldvdCd, function(key, value) {
                    html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
                });
            }
            $('#prgrsSt').html(html);

        }
    });
}

/**
 * 사업방식코드 로드
 */
function loadBsnsStmCd() {
    $.ajax({
        type: "GET",
        url: "/getSelectBoxCode/B008",
        dataType: "json",
        success: function(data) {
            ldvdCd = data;

            var html = "";

            html += '<option value="">' + '전체' + '</option>';
            
            $('#bsnsStts').html(html);

            if (ldvdCd.length > 0) {
                $.each(ldvdCd, function(key, value) {
                    html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
                });
            }
            $('#bsnsStts').html(html);

        }
    });
}

/**
 * 투자통화코드 로드
 */
function loadInvstCrncyCd() {
    $.ajax({
        type: "GET",
        url: "/getSelectBoxCode/I016",
        dataType: "json",
        success: function(data) {
            ldvdCd = data;

            var html = "";

            html += '<option value="">' + '전체' + '</option>';

            $('#crncyCd').html(html);

            if (ldvdCd.length > 0) {
                $.each(ldvdCd, function(key, value) {
                    html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_ID + ', ' + value.CD_VL_NM + '</option>';
                });
            }
            $('#crncyCd').html(html);

        }
    });
}

/**
 * 기준금리종류코드 로드
 */
function loadBitrKindCd() {
    $.ajax({
        type: "GET",
        url: "/getSelectBoxCode/I020",
        dataType: "json",
        success: function(data) {
            ldvdCd = data;

            var html = "";

            html += '<option value="">' + '전체' + '</option>';

            $('#aplyIntrt').html(html);

            if (ldvdCd.length > 0) {
                $.each(ldvdCd, function(key, value) {
                    html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
                });
            }
            $('#aplyIntrt').html(html);

        }
    });
}

/**
 * 대상자산구분코드 로드
 */
function loadTrgtAstsCcd() {
    $.ajax({
        type: "GET",
        url: "/getSelectBoxCode/T006",
        dataType: "json",
        success: function(data) {
            ldvdCd = data;

            var html = "";

            html += '<option value="">' + '전체' + '</option>';

            $('#trgtAsstDvsn').html(html);

            if (ldvdCd.length > 0) {
                $.each(ldvdCd, function(key, value) {
                    html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
                });
            }
            $('#trgtAsstDvsn').html(html);

        }
    });
}

/**
 * 사업지역코드 로드
 */
function loadBsnsAreaCd() {
    $.ajax({
        type: "GET",
        url: "/getSelectBoxCode/U004",
        dataType: "json",
        success: function(data) {
            ldvdCd = data;

            var html = "";

            html += '<option value="">' + '전체' + '</option>';

            $('#slBusiArea').html(html);

            if (ldvdCd.length > 0) {
                $.each(ldvdCd, function(key, value) {
                    html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
                });
            }
            $('#slBusiArea').html(html);

        }
    });
}

/**
 * 투자유형코드 로드
 */
function loadInvstTypCd() {
    $.ajax({
        type: "GET",
        url: "/getSelectBoxCode/I032",
        dataType: "json",
        success: function(data) {
            ldvdCd = data;

            var html = "";

            html += '<option value="">' + '전체' + '</option>';

            $('#invstTp').html(html);

            if (ldvdCd.length > 0) {
                $.each(ldvdCd, function(key, value) {
                    html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
                });
            }
            $('#invstTp').html(html);

        }
    });
}

/**
 * 투자자산분류코드 로드
 */
function loadInvstAstsDvdCd() {
    $.ajax({
        type: "GET",
        url: "/getSelectBoxCode/I024",
        dataType: "json",
        success: function(data) {
            ldvdCd = data;

            var html = "";

            html += '<option value="">' + '전체' + '</option>';

            $('#invstAsstClsf').html(html);

            if (ldvdCd.length > 0) {
                $.each(ldvdCd, function(key, value) {
                    html += '<option value="' + value.CD_VL_ID + '">' + value.CD_VL_NM + '</option>';
                });
            }
            $('#invstAsstClsf').html(html);

        }
    });
}

// 조회
function srch() {
    /* 사업기본정보 */
    $('#bsnsCcd').val('01');
    $('#bsnsCcdDtls').val('02');
    $('#pfBsnsCcd').val('0102');
    $('#prgrsSt').val('330');
    $('#dprtNm').val('01');   // 공통코드 적용없이 일단 하드코딩으로 해놓음.
    $('#bsnsStts').val('02');
    $('#rpsBsnsMngNo').val('RPR034120');
    $('#corpRgstNo').val('110114-0040911');
    $('#bsnsPRgstNo').val('104-81-77227');
    // esgYN $('#').val('');
    // bdYN $('#').val('');
    // lqdzYN $('#').val('');
    $('#crncyCd').val('KRW');
    $('#totPrcrAmt').val('135,000,000');
    $('#thcoPtcpAmt').val('9,200,000');
    $('#aplyIntrt').val('01');
    $('#goaltErnRt').val('25.05');
    $('#intrAlotFrqc').val('3');
    $('#syndiBlce').val('2,500,000');
    $('#ltv').val('19.02');
    $('#valtMrtgRto').val('16.5');
    $('#trgtAsstDvsn').val('99');
    $('#mainBondMtnc').val('주요채권보전 테스트 데이터001');
    $('#dmsOvrs').val('01');   // 공통코드 적용없이 일단 하드코딩으로 해놓음.
    $('#ivtgShdnRsn').val('검토중단사유 테스트 데이터001');
    $('#slBusiArea').val('SEL');
    // thcoMdtnYN $('#').val('');
    $('#thcoMdtnAmt').val('5,000,000');
    $('#chrr').val('김현준');
    $('#loanMdtnIstt').val('나누리캐피탈');
    $('#chrgRm').val('백승호');
    $('#setInvstTrdr').val('대한투자신탁증권');
    $('#busiCtns').val('사업내용 테스트 데이터001');

    /* 투자기본정보 */
    $('#invstTp').val('1');
    $('#invstStruc').val('');
    $('#invstWy').val('');
    $('#areaLcls').val('');
    $('#areaMdcl').val('');
    $('#areaScls').val('');
    $('#expsrDvsn').val('');
    $('#oprtShp').val('');
    $('#invstAsstClsf').val('01');

}

// 상태변경
function chgSt() {
    Swal.fire({
        icon: 'success'
        , title: "Success!"
        , text: "상태변경이 완료되었습니다."
        , confirmButtonText: "확인"
    });
}

// 삭제
function del() {
    Swal.fire({
        icon: 'success'
        , title: "Success!"
        , text: "삭제가 완료되었습니다."
        , confirmButtonText: "확인"
    });
}

// 사업검토중단
function bsnsBreak() {
    Swal.fire({
        icon: 'success'
        , title: "Success!"
        , text: "사업검토중단이 완료되었습니다."
        , confirmButtonText: "확인"
    });
}

// 저장
function save() {
    Swal.fire({
        icon: 'success'
        , title: "Success!"
        , text: "저장이 완료되었습니다."
        , confirmButtonText: "확인"
    });
}