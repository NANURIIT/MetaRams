$(document).ready(function() {
	
})


// Deal번호 초기화
function removeDealNo() {
    $('#TB08020S_ibDealNo').val('');
}

// 안건별 모니터링 관리 목록 호출
function getDealMnrtList() {
    let mntrMngCcd   = $('#mntrMngCcd').val();
    let dprtCd       = $('#TB08020S_dprtCd').val();
    let ibDealNo     = $('#TB08020S_ibDealNo').val();
    let mngSttsDvdCd = $('#mngSttsDvdCd').val();

    var paramData = {
         "mntrMngCcd" : mntrMngCcd
       , "dprtCd" : dprtCd
       , "ibDealNo" : ibDealNo
       , "mngSttsDvdCd" : mngSttsDvdCd
    };

    $.ajax({
        type: "GET",
        url: "/TB08020S/getDealMnrtList",
        data: paramData,
        dataType: "json",
        success: function(data) {
            if(data.length > 0){
                var html = '';

                $('#dealList').html(html);

                $(data).each(function(key, value) {
                    html += '<tr>';
                    html += '<td class="text-center">' + value.IB_DEAL_NO + '</td>';
                    html += '<td class="text-center">' + value.IB_DEAL_NM + '</td>';
                    html += '<td class="text-center">' + value.DPRT_NM + '</td>';
                    html += '<td class="text-center">' + value.EMP_NM + '</td>';
                    html += '<td class="text-center">' + value.FNC_GDS_DVD_CD + '</td>';
                    html += '<td class="text-center">' + value.INSPCT_DPRT_CCD + '</td>';
                    html += '<td class="text-center">' + value.OWN_EMP_NM + '</td>';
                    html += '<td class="text-center">' + value.RISK_INSPCT_RSLTN_CCD + '</td>';
                    html += '<td class="text-center">' + value.INVST_ASTS_NM + '</td>';
                    html += '<td class="text-center">' + value.ASTS_QTY_DVD_CD + '</td>';
                    html += '<td class="text-center">' + value.RISK_INSPCT_MNG_STTS_CD + '</td>';
                    html += '</tr>';
                })

                $('#dealList').html(html);

            }else {
                Swal.fire({
                    icon: 'error'
                    , title: "Error!"
                    , text: "모니터링 정보가 없습니다."
                    , confirmButtonText: "확인"
                });
            }
        },error: function () {
            Swal.fire({
                icon: 'error'
                , title: "Error!"
                , text: "모니터링 정보 조회에 실패하였습니다."
                , confirmButtonText: "확인"
            });
        }
    });



}