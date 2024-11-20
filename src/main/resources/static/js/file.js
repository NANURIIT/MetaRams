var fileTarget = $(".filebox .upload-hidden");

fileTarget.on("change", function () {
  // 값이 변경되면
  if (window.FileReader) {
    // modern browser
    var filename = $(this)[0].files[0].name;
  } else {
    // old IE
    var filename = $(this).val().split("/").pop().split("\\").pop(); // 파일명만 추출
  }

  // 추출한 파일명 삽입
  $(this).siblings(".upload-name").val(filename);
});

/**
 * 파일추가 버튼 클릭
 */
$("#addFile").click(function () {
  $("#upload-file-input").click();
});

/**
 * 파일 추가 후 event
 */
$("#upload-file-input").change(function () {
  var mode = "multi";
  callFileUpload(mode);
});

/**
 * 파일 추가 후 event
 */
$("#upload-file-single").change(function () {
  var mode = "single";
  callFileUpload(mode);
});

/**
 * 파일업로드 비동기 통신함수
 */
var callFileUpload = function (mode) {
  var action = "upload";

  if (mode == "single") {
    if ($("#upload-file-single").length < 1) {
      return false;
    }
  } else {
    if ($("#upload-file-input").length < 1) {
      return false;
    }
  }

  if (isEmpty($("#fileIbDealNo").val())) {
    if ($("input[id*='ibDealNo']").length > 0) {
      var ibDealNo = $("#fileIbDealNo").val($("input[id*='ibDealNo']").val());
    }
    if ($("input[id*='riskInspctCcd']").length > 0) {
      var riskInspctCcd = $("#fileRiskInspctCcd").val(
        $("input[id*='riskInspctCcd']").val()
      );
    }
    if ($("input[id*='lstCCaseCcd']").length > 0) {
      var lstCCaseCcd = $("#fileLstCCaseCcd").val(
        $("input[id*='lstCCaseCcd']").val()
      );
    }
  }
  var msg = "";
  var nullCount = 0;

  if (!isEmpty(ibDealNo)) {
    nullCount += 1;
    msg += "IBDEAL번호";
  }

  if (!isEmpty(riskInspctCcd)) {
    nullCount += 1;
    if (nullCount == 0) {
      msg += "리스크심사구분코드";
    } else if (nullCount > 0) {
      msg += ", 리스크심사구분코드";
    }
  }

  if (!isEmpty(lstCCaseCcd)) {
    nullCount += 1;
    if (nullCount == 0) {
      msg += "부수안건구분코드";
    } else if (nullCount > 0) {
      msg += ", 부수안건구분코드";
    }
  }

  if (nullCount > 0) {
    msg += "가 입력되지 않았습니다.";

    Swal.fire({
      icon: "error",
      title: "Error!",
      text: msg,
      confirmButtonText: "확인",
    });
    return false;
  }

  $.ajax({
    url: "/uploadFile",
    type: "POST",
    data: new FormData($("#upload-file-form")[0]),
    enctype: "multipart/form-data",
    processData: false,
    contentType: false,
    cache: false,
    //beforeSend : function(xhr, opt) {
    //openPopup({type:"loding",show:true});
    //},
    success: function (result) {
      //openPopup({type:"loding",show:false});
      $("#fileIbDealNo").val(result.ibDealNo);
      $("#fileRiskInspctCcd").val(result.riskInspctCcd);
      $("#fileLstCCaseCcd").val(result.lstCCaseCcd);

      openPopup({
        type: "success",
        title: "Success",
        text: "파일을 upload 하였습니다.",
      });

      if (mode == "single") {
        var encUri = downloadURI(
          result.svFilePathNm,
          result.svFileNm,
          result.orgFileNm
        );
        $("#fileatchFleSn").val(result.atchFleSn);
        $("#upload-file-single").attr("disabled", true);
        $(".filebox").addClass("bs-disable");
        $("#openFile").attr("disabled", false);
        $("#delFile").attr("disabled", false);
        $("#filePath").attr("href", encUri);
      } else {
        callbackFile(action, result);
      }
    },
    error: function (request, status, error) {
      //openPopup({type:"loding",show:false});
      var res = JSON.parse(request.responseText);
      openPopup({ type: "error", title: status, text: res.error });
      //failCallbackFileUpload();
      //},
      //complete:function () {
      //openPopup({type:"loding",show:false});
    },
  });
};

/**
 * 파일다운로드 encodeURI
 */
var downloadURI = function (svFilePathNm, svFileNm, orgFileNm) {
  var encUri = encodeURI(
    "/downloadFile?svFilePathNm=" +
      svFilePathNm +
      "&svFileNm=" +
      svFileNm +
      "&orgFileNm=" +
      orgFileNm
  );
  return encUri;
};

/**
 * 파일삭제 버튼 클릭
 */
$("#delFiles").click(function () {
  var mode = "multi";

  let _arr = new Array();
  let _tr = $("tbody[id*='fileList']").children();

  for (let i = 0; i < _tr.length; i++) {
    let delCheck = $(_tr[i]).find("td:eq(0)").find("input");
    if (delCheck.is(":checked")) {
      _arr.push(delCheck.attr("id"));
    }
  }

  if (_arr.length != 0) {
    deleteFiles(mode, _arr);
  }
});

$("#delFile").click(function () {
  var mode = "single";

  let _arr = new Array();
  _arr.push($("#fileatchFleSn").val());
  deleteFiles(mode, _arr);
});

/**
 * 파일삭제 삭제 처리
 * @param {list} request 삭제대상 리스트
 */
var deleteFiles = function (mode, arratchFleSn) {
  var action = "delete";

  var fileIbDealNo = $("#fileIbDealNo").val();
  var fileRiskInspctCcd = $("#fileRiskInspctCcd").val();
  var fileLstCCaseCcd = $("#fileLstCCaseCcd").val();

  if (isEmpty(fileIbDealNo)) {
    if ($("input[id*='ibDealNo']").length > 0) {
      fileIbDealNo = $("input[id*='ibDealNo']").val();
    }
    if ($("input[id*='riskInspctCcd']").length > 0) {
      fileRiskInspctCcd = $("input[id*='riskInspctCcd']").val();
    }
    if ($("input[id*='lstCCaseCcd']").length > 0) {
      fileLstCCaseCcd = $("input[id*='lstCCaseCcd']").val();
    }
  }

  var paramData = {
    fileIbDealNo: fileIbDealNo,
    fileRiskInspctCcd: fileRiskInspctCcd,
    fileLstCCaseCcd: fileLstCCaseCcd,
    arratchFleSn: arratchFleSn,
  };

  $.ajax({
    url: "/deleteFile",
    type: "GET",
    data: paramData,
    dataType: "json",
    success: function (result) {
      openPopup({
        type: "warning",
        title: "Success",
        text: "파일을 삭제 하였습니다.",
      });

      if (mode == "single") {
        $("#fileatchFleSn").val("");
        fileTarget.siblings(".upload-name").val("");
        $("#filePath").attr("href", "");
        $("#openFile").attr("disabled", true);
        $("#delFile").attr("disabled", true);
        $("#upload-file-single").attr("disabled", false);
        $(".filebox").removeClass("bs-disable");
      } else {
        callbackFile(action, result);
      }
    },
    error: function (request, status, error) {
      var res = JSON.parse(request.responseText);
      openPopup({ type: "error", title: status, text: res.error });
    },
  });
};

/**
 * 파일조회(단건)
 */
function getFileInfo() {
  var fileIbDealNo = $("#fileIbDealNo").val();
  var fileRiskInspctCcd = $("#fileRiskInspctCcd").val();
  var fileLstCCaseCcd = $("#fileLstCCaseCcd").val();

  paramData = {
    fileIbDealNo: fileIbDealNo,
    fileRiskInspctCcd: fileRiskInspctCcd,
    fileLstCCaseCcd: fileLstCCaseCcd,
  };

  $.ajax({
    type: "GET",
    url: "/getFiles",
    data: paramData,
    dataType: "json",
    success: function (data) {
      if (data.length > 0) {
        $.each(data, function (key, value) {
          $(".upload-name").val(value.orgFileNm);

          var encUri = downloadURI(
            value.svFilePathNm,
            value.svFileNm,
            value.orgFileNm
          );
          $("#fileatchFleSn").val(value.atchFleSn);
          $("#upload-file-single").attr("disabled", true);
          $(".filebox").addClass("bs-disable");
          $("#openFile").attr("disabled", false);
          $("#delFile").attr("disabled", false);
          $("#filePath").attr("href", encUri);
        });
      }
    },
  });
}
