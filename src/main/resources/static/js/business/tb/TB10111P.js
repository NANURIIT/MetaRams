
$(document).ready(function () {
    
});


/**
 * 모달 팝업 show
 */
function callTB10111P() {
    $('#modal-TB10111P').modal('show');
}

/**
 * 오늘의 날짜
 */
var today = new Date();
var year = today.getFullYear();
var month = today.getMonth() + 1;
var day = today.getDate();
var hour = today.getHours();
var minutes = today.getMinutes();
var seconds = today.getSeconds();
var recallDay = year + "-" + month + "-" + day;


/**
 * TB10111P 팝업 페이지 초기화
 */
var resetTable = function () {
    $('#TB10111P_empNo').val("");
    $('#TB10111P_empNm').val("");
    $('#TB10111P_rghtCd').val("").prop('selected, true');
    $('#TB10111P_datepicker1').val("");
    $('#TB10111P_datepicker2').val("");
    $('#TB10111P_rgstRsn').val("");
    $('#TB10111P_rgstPEno').text("");
    $('#TB10111P_rgstDt').text("");
    $('#TB10111P_hndlPEno').text("");
    $('#TB10111P_hndlDyTm').text("");

    $('#TB10111P_datepicker1').attr("disabled", false);
    $('#TB10111P_datepicker2').attr("disabled", false);
};

function openModalAC01120P() {
    $('#open_modal_AC01120P').click(function () {
        resetTable();
    });
}

/**
 * 사용자 추가 및 수정시 유효성 검사
 */
function validationAddUser(param) {
    if (isEmpty(param.eno) || isEmpty(param.empNm) || isEmpty(param.rghtCd)) {
        
        if(isEmpty(param.empno)) {
            Swal.fire({
                icon: 'error'
                , title: "사원번호를 입력해주세요"
                , text: ""
                , confirmButtonText: "확인"
            }, function(){
                $('#TB10111P_empNo').focus();
                return false;
            });
        } else if (isEmpty(param.empNm)) {
            Swal.fire({
                icon: 'error'
                , title: "필수값을 입력하세요!"
                , text: "직원명을 확인해주세요"
                , confirmButtonText: "확인"
            }, function(){
                $('#TB10111P_empNm').focus();
                return false;
            });
        } else if (isEmpty(param.athCd)) {
            Swal.fire({
                icon: 'error'
                , title: "필수값을 입력하세요!"
                , text: "권한구분을 확인해주세요"
                , confirmButtonText: "확인"
            }, function(){
                $('#TB10111P_empNo').focus();
                return false;
            });
        } else if (param.eno < 7){
            Swal.fire({
                icon: 'error'
                , title: "사원번호는 7자리를 입력해주세요"
                , text: ""
                , confirmButtonText: "확인"
            }, function(){
                $('#TB10111P_empNo').focus();
                return false;
            });
        } else {
            return true;
        }
        
    }
}


/**
 * 사용자 추가 및 삭제시 유효성 검사
 */
function validationDelUser(param) {
    var dltF = $("#TB10111P_dltF").val();           // 사용자 삭제여부
    var sq = $("#TB10111P_rgstPEno").text();        // 등록자명
    var dltPEno = $("#TB10111P_dltPEno").val();     // 삭제자

    if(isEmpty(sq)) {
        Swal.fire({
            icon: 'error'
            , title: "사용자 추가중에는 삭제할수 없습니다."
            , text: ""
            , confirmButtonText: "확인"
        }, function(){
            return false;
        });
    } else if (dltF == "Y" && !isEmpty(dltPEno)) {
        Swal.fire({
            icon: 'error'
            , title: "이미 삭제된 사용자 입니다."
            , text: ""
            , confirmButtonText: "확인"
        }, function(){
            return false;
        });
    } else {
        // TODO 삭제 기능이 없었네??
    }
}



/**
 * 사번 중복체크
 * ajax 호출 하여 파라미터의 id가 0이상이면 히든값에 N전달 else Y 이후 권한저장 ajax 호출하여 사용자 등록 및 수정
 */
let fn_chkYn = function() {
    var eno = $('#TB10111P_empNo').val();
    if(!isEmpty(eno)) { 
        $.ajax({
            method: 'POST',
            url: "/checkEno",
            data: eno,
            contentType: "application/json; charset=UTF-8",
            success: (data, status, xhr) => {
                if (Number(data) > 0) {
                    Swal.fire({
                    icon: 'error'
                  , title: "사번이 중복 되었습니다"
                  , text: ""
                  , confirmButtonText: "확인"
                    }, () => {
                        $("#TB10111P_chkYn").val("N");
                        return false;
                    }); 
                } else {
                    $("#TB10111P_chkYn").val("Y");
                }
            },
            error: (request) => {
            }, complete : () =>{
                fn_chkUserYn();
            }
        });
    } else {
        Swal.fire({
            icon: 'error'
            , title: "사번을 입력해주세요"
            , text: ""
            , confirmButtonText: "확인"
        }, () => {
            $("#TB10111P_chkYn").val("N");
            return false;
        }); 
    }
    $('#TB10111P_chkYn').val("");
}

let fn_chkUserYn = function() {
    var eno = $('#TB10111P_empNo').val();
    if(!isEmpty(eno)) { 
        $.ajax({
            method: 'POST',
            url: "/checkUserEno",
            data: eno,
            contentType: "application/json; charset=UTF-8",
            success: (data, status, xhr) => {
                if (Number(data) > 0) {
                    Swal.fire({
                        icon: 'error'
                        , title: "사번이 중복 되었습니다"
                        , text: ""
                        , confirmButtonText: "확인"
                    }, () => {
                        $("#TB10111P_chkYn").val("N");
                        return false;
                    }); 
                } else {
                    $("#TB10111P_chkYn").val("Y");  
                }
            },
            error: (request) => {
            }, complete : () => {
                saveUserData();
            }
        });
    } else {
        Swal.fire({
            icon: 'error'
            , title: "사번을 입력해주세요"
            , text: ""
            , confirmButtonText: "확인"
        }, () => {
            $("#TB10111P_chkYn").val("N");
            return false;
        }); 
    }
    $('#TB10111P_chkYn').val("");
}

/**
 * 권한 저장 ajax
 * ajax 통신 전 input값 검증
 */
var saveUserData = function() {
    var TB10111P_datepicker1 = $('#TB10111P_datepicker1').val().replaceAll(" ","");
    var TB10111P_datepicker2 = $('#TB10111P_datepicker2').val().replaceAll(" ","");
    var datepicker1 = new Date(TB10111P_datepicker1);
    var datepicker2 = new Date(TB10111P_datepicker2);
    var RegExp = /[^\w\sㄱ-힣()0-9 ]/g;   // 특수문자 정규식
    
    if (RegExp.test($('#TB10111P_empNo').val())) {
        Swal.fire({
            icon: 'error'
            , title: "사번은 특수문자로 입력할수 없습니다."
            , text: ""
            , confirmButtonText: "확인"
        }, () => {
            $('#TB10111P_empNo').focus();
            return false;
        });
    } else if (RegExp.test($('#TB10111P_empNm').val())){
        Swal.fire({
            icon: 'error'
            , title: "이름은 특수문자로 입력할수 없습니다."
            , text: ""
            , confirmButtonText: "확인"
        }, () => {
            $('#TB10111P_empNm').focus();
            return false;
        });
    } else if (!isEmptyDatePicker(TB10111P_datepicker1) || !isEmptyDatePicker(TB10111P_datepicker2)){
        Swal.fire({
            icon: 'error'
            , title: "부여기간을 확인해주세요"
            , text: ""
            , confirmButtonText: "확인"
        }, () => {
            return false;
        }); 
    } else if ((datepicker2 - datepicker1) < 0) {
        Swal.fire({
            icon: 'error'
            , title: "시작일이 종료일보다 과거일수 없습니다."
            , text: ""
            , confirmButtonText: "확인"
        }, () => {
            return false;
        });
    } else {
        businessFunction();
    }

    function businessFunction() {
        
        let eno = $('#TB10111P_empNo').val();
        let empNm = $('#TB10111P_empNm').val();
        let rghtCd = $('#TB10111P_rghtCd option:selected').val();
        let aplcStrtDt = $('#TB10111P_datepicker1').val();
        let aplcEndDt = $('#TB10111P_datepicker2').val();
        let rgstRsn = $('#TB10111P_rgstRsn').val();
        let rgstPEno = $('#TB10111P_rgstPEno').val();               /* 등록자는 로그인 한 사원의 세션 */
        let rgstDt = year + "" + month + "" + day;          /* 8자리의 날짜 */
        let hndlPEno = $('#TB10111P_hndlPEno').val();               /* 수정자의 세션 */
        let hndlDyTm = today;                               /* 수정한 시간(Date타입) */
        let dltF = 'N';

        
        
        let dtoParam = {
              "empno": eno
            , "empNm": empNm
            , "athCd": rghtCd
            , "rgstRsn": rgstRsn
            , "aplyStrtDt": aplcStrtDt
            , "aplyEndDt": aplcEndDt
            , "rgstEmpno": rgstPEno
            , "rgstDt": rgstDt
            , "hndEmpno": hndlPEno
            , "hndDetlDtm": hndlDyTm
            , "delYn": dltF
        }

        // 사원번호 7자리 검증
        if(eno.isLength < 7) {
            validationAddUser(dtoParam);
        }

        // 사번, 직원명이 not null이어야 한다
        if (!isEmpty(dtoParam.empno) && !isEmpty(dtoParam.empNm)) {
            
            // 등록자, 등록일자, 처리자, 처리일자가 null일 경우 insert, else update
            if (   !isEmpty($("#TB10111P_rgstPEno").text())
                && !isEmpty($("#TB10111P_rgstDt").text())
                && !isEmpty($("#TB10111P_hndlPEno").text())
                && !isEmpty($("#TB10111P_hndlDyTm").text())) {
                    
                    $.ajax({
                        method: 'POST',
                        url: "/updateUser",
                        data: JSON.stringify(dtoParam),
                        contentType: "application/json; charset=UTF-8",
                        // dataType: 'json',
                        success: function() {
                            modalClose_TB10111P();
                                Swal.fire({
                                    icon: 'success'
                                    , title: "사용자 수정이 완료되었습니다"
                                    , text: ""
                                    , confirmButtonText: "확인"
                                }); 
                        },
                        error: function(request) {
                            Swal.fire({
                                icon: 'error'
                                , title: "DATA ERROR!!"
                                , text: "관리자에게 문의하세요"
                                , confirmButtonText: "확인"
                            });
                        }
                    });

            } else if (    isEmpty($("#TB10111P_rgstPEno").text())
                        && isEmpty($("#TB10111P_rgstDt").text())
                        && isEmpty($("#TB10111P_hndlPEno").text())
                        && isEmpty($("#TB10111P_hndlDyTm").text()))  {
                            if ($("#TB10111P_chkYn").val() == "Y"){
                                $.ajax({
                                    method: 'POST',
                                    url: "/insertUser",
                                    data: JSON.stringify(dtoParam),
                                    contentType: "application/json; charset=UTF-8",
                                    // dataType: 'json',
                                    success: function() {
                                        modalClose_TB10111P();
                                            Swal.fire({
                                                icon: 'success'
                                                , title: "사용자 등록이 완료되었습니다"
                                                , text: ""
                                                , confirmButtonText: "확인"
                                            }); 
                                    },
                                    error: function(request) {
                                        Swal.fire({
                                            icon: 'error'
                                            , title: "INSERT ERROR!!"
                                            , text: "관리자에게 문의하세요"
                                            , confirmButtonText: "확인"
                                        });
                                    }
                                });
                            }
                            
            }
            
        } else {
            validationAddUser(dtoParam);
        }
    }
}


/**
 * close TB10111P modal
 */
function modalClose_TB10111P() {
    resetTable();
    $('#modal-TB10111P').modal('hide');
}

/**
 * 사용자 삭제(사원 퇴사) ajax
 */
var deleteUser = function () {

    let eno = $('#TB10111P_empNo').val();
    let sq = $('#TB10111P_sq').val();
    let dltEno = $('#TB10111P_hndlPEno').val();
    let dltDt = year + "" + month + "" + day;
    let dltTm = hour + "" + minutes + "" + seconds;
    var param = {
          "empno": eno
        , "dltF": "Y"
        , "dltPEno": dltEno
        , "dltDt": dltDt
        , "dltTm": dltTm
    }
    
    if($("#TB10111P_dltF").val() != "Y" && isEmpty($("#TB10111P_dltPEno").val())) {
        
        $.ajax({
            url: '/deleteUser',
            data: param,
            method: 'PATCH',
            data: JSON.stringify(param),
            contentType: 'application/json; charset=UTF-8',
            // dataType: 'json',
            success: function () {
                modalClose_TB10111P();
                Swal.fire({
                    icon: 'success'
                    , title: "사용자 삭제가 완료되었습니다"
                    , text: ""
                    , confirmButtonText: "확인"
                }); 
            }, error: function(request) {
                Swal.fire({
                    icon: 'error'
                    , title: "DELETE ERROR!!"
                    , text: "관리자에게 문의하세요"
                    , confirmButtonText: "확인"
                });
            }

        });
    } else {
        validationDelUser(param);
    }
    $("#TB10111P_dltPEno").val("");
    $("#TB10111P_dltF").val("");
};

/**
 * 쿼리 실행 시 페이지 리로드 
 */
var reload = function (empNm) {
    // let emp = $('#TB10111P_empNm').val();
    let rghtCd = $("#TB10111P_rghtCd option:selected").val();
    let dltY = "0";
    findUser(empNm, rghtCd, dltY);
}

/**
 * 즉시회수 버튼 클릭 이벤트
 */
var recallCnt = 0;
var recall = function () {

    recallCnt++;
    var rgstPEno = $("#TB10111P_rgstPEno").text();      // 등록자
    var rgstDt = $("#TB10111P_rgstDt").text();          // 등록일
    var hndlPEno = $("#TB10111P_hndlPEno").text();      // 최종처리자
    var hndlDyTm = $("#TB10111P_hndlDyTm").text();      // 최종처리일
    
    
    
    if (month < 10) {
        recallDay = year + "-0" + month + "-" + day;
    } 
    if (day < 10) {
        recallDay = year + "-" + month + "-0" + day;
    }
    if (month < 10 && day < 10) {
        recallDay = year + "-0" + month + "-0" + day;
    }
    
    

    // 사용자 수정의 경우 부여기간중 endDt만 오늘 날짜로 세팅해줘야 한다.
    if(    isEmpty(rgstPEno) 
        && isEmpty(rgstDt) 
        && isEmpty(hndlPEno) 
        && isEmpty(hndlDyTm)) {
        $('#TB10111P_datepicker1').val(recallDay);
        $('#TB10111P_datepicker2').val(recallDay);
    } else {
        $('#TB10111P_datepicker2').val(recallDay);  
    }

    if(recallCnt % 2 == 0) {
        $('#TB10111P_datepicker1').attr("disabled", false);
        $('#TB10111P_datepicker2').attr("disabled", false);
    } else {
        $('#TB10111P_datepicker1').attr("disabled", true);
        $('#TB10111P_datepicker2').attr("disabled", true);
    }
    
};