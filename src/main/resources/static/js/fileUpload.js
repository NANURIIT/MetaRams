function setFileUploadEvent (menuId) {

  let fileTarget = $(`div[data-menuid="/${menuId}"]` + " .filebox .upload-hidden");

  fileTarget.on("change", function () {
    // 값이 변경되면
    if (window.FileReader) {
      // modern browser
      let filename = $(this)[0].files[0].name;

    } else {
      // old IE
      let filename = $(this).val().split("/").pop().split("\\").pop(); // 파일명만 추출
    }

    // 추출한 파일명 삽입
    $(this).siblings(".upload-name").val(filename);
  });

  /**
   * 파일추가 버튼 클릭
   */
  $(`div[data-menuid="/${menuId}"]` + " #UPLOAD_AddFile").click(function () {
    let mode = "s";
    $(`div[data-menuid="/${menuId}"]` + " #deal-upload-input").click();
  });

  /**
   * 파일 추가 후 event
   */
  $(`div[data-menuid="/${menuId}"]` + " #deal-upload-input").change(function () {
    if($(this).val() === ""){
      // 아무것도 안하기
    }else {
      let mode = "m";
      callCmFileUpload(mode);
    }
  });

  /**
   * 파일업로드 비동기 통신함수
   */
  let callCmFileUpload = function (mode) {
    let action = "upload";

    if ($(`div[data-menuid="/${menuId}"]` + " #deal-upload-input").length < 1) {
      return false;
    }

    if (isEmpty($(`div[data-menuid="/${menuId}"]` + " #fileKey1").val())) {
      if ($(`div[data-menuid="/${menuId}"]` + " #selectedMngDealNo").length > 5) {
        $(`div[data-menuid="/${menuId}"]` + " #fileKey1").val($(`div[data-menuid="/${menuId}"]` + " #selectedMngDealNo").val());
      } else {
        $(`div[data-menuid="/${menuId}"]` + " #fileKey1").val($(`div[data-menuid="/${menuId}"]` + " #key1").val());
      }

      if ($(`div[data-menuid="/${menuId}"]` + " #key2").length > 0) {
        $(`div[data-menuid="/${menuId}"]` + " #fileKey2").val($(`div[data-menuid="/${menuId}"]` + " #key2").val());
      }
    }

    $.ajax({
      url: "/FileUpload/uploadCmFile",
      type: "POST",
      data: new FormData($(`div[data-menuid="/${menuId}"]` + " #upload-file-form")[0]),
      enctype: "multipart/form-data",
      processData: false,
      contentType: false,
      cache: false,
      //beforeSend : function(xhr, opt) {
      //openPopup({type:"loding",show:true});
      //},
      success: function (result) {
        $(`div[data-menuid="/${menuId}"]` + " #fileKey1").val(result.fileKey1);
        $(`div[data-menuid="/${menuId}"]` + " #fileKey2").val(result.fileKey2);
        $(`div[data-menuid="/${menuId}"]` + " #atchFleSn").val(result.atchFleSn);

        openPopup({
          type: "success",
          title: "Success",
          text: "파일을 upload 하였습니다.",
        });

        if (mode == "single") {
          let encUri = downloadURI(
            result.svFilePathNm,
            result.svFileNm,
            result.orgFileNm
          );
          $(`div[data-menuid="/${menuId}"]` + " #atchFleSn").val(result.atchFleSn);
          $(`div[data-menuid="/${menuId}"]` + " #upload-file-single").attr("disabled", true);
          $(`div[data-menuid="/${menuId}"]` + " .filebox").addClass("bs-disable");
          $(`div[data-menuid="/${menuId}"]` + " #openFile").attr("disabled", false);
          $(`div[data-menuid="/${menuId}"]` + " #delFile").attr("disabled", false);
          $(`div[data-menuid="/${menuId}"]` + " #filePath").attr("href", encUri);
        } else {
          callbackFile(action, result);
        }
      },
      error: function (request, status, error) {
        //openPopup({type:"loding",show:false});
        let res = JSON.parse(request.responseText);
        openPopup({ type: "error", title: status, text: res.error });
        //failCallbackFileUpload();
        //},
        //complete:function () {
        //openPopup({type:"loding",show:false});
      },
    });
  };

  /**
   * 파일삭제 버튼 클릭
   */
  $(`div[data-menuid="/${menuId}"]` + " #UPLOAD_DelFiles").click(function () {
    let mode = "d";

    let _arr = new Array();
    let _tr = $(`div[data-menuid="/${menuId}"]` + " #UPLOAD_FileList").children();

    for (let i = 0; i < _tr.length; i++) {
      let delCheck = $(_tr[i]).find("td:eq(0)").find("input");
      if (delCheck.is(":checked")) {
        _arr.push(delCheck.attr("id"));
      }
    }

    if (_arr.length != 0) {
      deleteCmFiles(mode, _arr);
    }
  });

  /**
   * 파일삭제 삭제 처리
   * @param {list} request 삭제대상 리스트
   */
  let deleteCmFiles = function (mode, arratchFleSn) {
    let action = "delete";

    let fileKey1 = $(`div[data-menuid="/${menuId}"]` + " #fileKey1").val();
    let fileKey2 = $(`div[data-menuid="/${menuId}"]` + " #fileKey2").val();

    let paramData = {
      fileKey1: fileKey1,
      fileKey2: fileKey2,
      arratchFleSn: arratchFleSn,
    };

    $.ajax({
      url: "/FileUpload/deleteCmFile",
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
          $(`div[data-menuid="/${menuId}"]` + " #atchFleSn").val("");
          fileTarget.siblings(".upload-name").val("");
          $(`div[data-menuid="/${menuId}"]` + " #filePath").attr("href", "");
          $(`div[data-menuid="/${menuId}"]` + " #openFile").attr("disabled", true);
          $(`div[data-menuid="/${menuId}"]` + " #delFile").attr("disabled", true);
          $(`div[data-menuid="/${menuId}"]` + " #upload-file-single").attr("disabled", false);
          $(`div[data-menuid="/${menuId}"]` + " .filebox").removeClass("bs-disable");
        } else {
          callbackFile(action, result);
        }
      },
      error: function (request, status, error) {
        let res = JSON.parse(request.responseText);
        openPopup({ type: "error", title: status, text: res.error });
      },
    });
  };

  /**
   * 파일ajax 성공시 custom callback 함수
   */
  function callbackFile(action, result) {
    var html = "";
    if (action == "upload") {
      html = makeFilList(html, result);
      $(`div[data-menuid="/${menuId}"]` + " #UPLOAD_FileList").append(html);
    } //else {
    if (action == "delete" || action == "select") {
      for (let i = 0; i < result.length; i++) {
        let fileInfo = result[i];
        html += makeFilList(html, fileInfo);
      }
      $(`div[data-menuid="/${menuId}"]` + " #UPLOAD_FileList").empty();
      $(`div[data-menuid="/${menuId}"]` + " #UPLOAD_FileList").append(html);
    }
  }
}

/**
   * 파일조회(단건)
   */
function getFileInfo(key1, key2) {
  let action = "select";

  const url = window.location.pathname

  let menuId = url.split("/")[1];

  $(`div[data-menuid="/${menuId}"]` + " #fileKey1").val(key1);
  $(`div[data-menuid="/${menuId}"]` + " #fileKey2").val(key2);

  let fileKey1 = key1;
  let fileKey2 = key2;

  let paramData = {
    fileKey1: fileKey1,
    fileKey2: fileKey2,
  };

  $.ajax({
    type: "GET",
    url: "/FileUpload/getCmFiles",
    data: paramData,
    dataType: "json",
    success: function (data) {
      if (data.length > 0) {
        $.each(data, function (key, value) {
          $(`div[data-menuid="/${menuId}"]` + " .upload-name").val(value.orgFileNm);
          let encUri = downloadURI(
            value.svFilePathNm,
            value.svFileNm,
            value.orgFileNm
          );
          $(`div[data-menuid="/${menuId}"]` + " #atchFleSn").val(value.atchFleSn);
          $(`div[data-menuid="/${menuId}"]` + " #upload-file-single").attr("disabled", true);
          $(`div[data-menuid="/${menuId}"]` + " .filebox").addClass("bs-disable");
          $(`div[data-menuid="/${menuId}"]` + " #openFile").attr("disabled", false);
          $(`div[data-menuid="/${menuId}"]` + " #delFile").attr("disabled", false);
          $(`div[data-menuid="/${menuId}"]` + " #filePath").attr("href", encUri);
        });
      }
      selectFile(action, data, menuId);
    },
  });
}

/**
   * 파일다운로드 encodeURI
   */
let downloadURI = function (svFilePathNm, svFileNm, orgFileNm) {
  let encUri = encodeURI(
    "/downloadFile?svFilePathNm=" +
    svFilePathNm +
    "&svFileNm=" +
    svFileNm +
    "&orgFileNm=" +
    orgFileNm
  );
  return encUri;
};

function selectFile(action, result, paramMenuid) {
  var html = "";
  for (let i = 0; i < result.length; i++) {
    let fileInfo = result[i];
    html += makeFilList(html, fileInfo);
  }

  $(`div[data-menuid="/${paramMenuid}"]` + " #UPLOAD_FileList").empty();
  $(`div[data-menuid="/${paramMenuid}"]` + " #UPLOAD_FileList").html("");

  $(`div[data-menuid="/${paramMenuid}"]` + " #UPLOAD_FileList").append(html);
}

/**
   * 파일목록 Table 생성
   */
function makeFilList(html, result) {
  var html = "";
  let encUri = downloadURI(
    result.svFilePathNm,
    result.svFileNm,
    result.orgFileNm
  );
  html += "<tr>";
  html += '    <td><input type="checkbox" id="' + result.atchFleSn + '">';
  html += "    </td>";
  html += "    <td>" + result.fileKey1 + "</td>";
  html += "    <td>" + result.fileKey2 + "</td>";
  html += "    <td>" + result.atchFleSn + "</td>";
  html += '    <td><a href="' + encUri + '">' + result.orgFileNm + "</a></td>";
  html += "    <td>" + result.rgstDt + "</td>";
  html += "</tr>";

  return html;
}