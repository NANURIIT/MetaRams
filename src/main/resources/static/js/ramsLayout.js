$(function () {
    const userEno = $('#userEno').val();
    createNav(userEno);
});

/**
 * 왼쪽 네비게이션 메뉴 생성
 * @param {String} empNo
 */
function createNav(empNo) {

    let param = empNo

    // console.log("네비게이션 만들기");
    // console.log("empNo: " + empNo);

    $.ajax({
        type: "POST",
        url: "/createRamsNav",
        contentType: "application/json; charset=UTF-8", // 수정된 contentType
        data: param,
        success: function (data) {
            let navHtml;
            if (data.length > 0) {
                for (let i = 0; i < data.length; i++) {

                    /**
                     * @param {String} menuId 메뉴ID
                     * @param {String} menuNm 메뉴명
                     * @param {String} hgrkMenuId 상위메뉴ID
                     * @param {String} scrnAplyShpCd 화면적용형태코드
                     * @param {String} menuLvl 메뉴레벨
                     */

                    /**
                     * 최상위 메뉴일 경우
                     */
                    if (data[i].menuLvl === 1 && !data[i].hgrkMenuId) {
                        const menuHtmlLv1 = `
							<li>
								<a href="#" aria-expanded="false">
									<i class="fa fa-folder-open-o"></i>
									<span class="nav-label">${data[i].menuNm}</span>
									<span class="fa arrow"></span>
								</a>
								<ul class="nav nav-second-level collapse" aria-expanded="false" data-hgrk="${data[i].menuId}">
								</ul>
							</li>
						`
                        $(`#side-menu`).append(menuHtmlLv1);
                    }
                    /**
                     * 메뉴레벨 2인 경우
                     */
                    else if (data[i].menuLvl === 2) {
                        let menuHtmlLv2;
                        /**
                         * 형태가 메뉴일 경우
                         */
                        if (data[i].scrnAplyShpCd === 'M') {
                            menuHtmlLv2 = `
								<li>
									<a class="left-ex" aria-expanded="false">${data[i].menuNm}<span class="fa arrow"></span></a>
									<ul class="nav nav-third-level collapse" aria-expanded="false" style="height: 0px;" data-hgrk="${data[i].menuId}">
									</ul>
								</li>
							`;
                        }
                        /**
                         * 형태가 화면일 경우
                         */
                        else if (data[i].scrnAplyShpCd === 'S') {
                            menuHtmlLv2 = `
								<li data-sidetabid="${data[i].menuId}">
									<a onclick="callPage('${data[i].menuId}', '${data[i].menuNm}')">${data[i].menuNm}</a>
								</li>
							`;
                        }
                        $(`#side-menu ul[data-hgrk="${data[i].hgrkMenuId}"]`).append(menuHtmlLv2);
                    }
                    /**
                     * 메뉴 3레벨일 경우
                     */
                    else if (data[i].menuLvl === 3) {
                        const menuHtmlLv3 = `
							<li data-sidetabid="${data[i].menuId}">
								<a onclick="callPage('${data[i].menuId}', '${data[i].menuNm}')">&nbsp;&nbsp;${data[i].menuNm}</a>
							</li>
						`;
                        $(`#side-menu ul ul[data-hgrk="${data[i].hgrkMenuId}"]`).append(menuHtmlLv3);
                    }
                }
                /**
                 * 사이드 메뉴에 이벤트부여
                 */
                $('#side-menu').metisMenu();

                /**
                 * 이전 페이지 체크
                 */
                chkPrevPage();
            } else {
                Swal.fire({
                    icon: 'warning'
                    , title: '권한이 없습니다!'
                }).then(function () {
                    window.location.href = "/login"
                })
            }
        }, error: function () {

        }
    });
}


/**
 * 이전 페이지 체크 함수
 */
function chkPrevPage() {

    const url = window.location.pathname;
    const chk_menu = $(`div[data-menuid="/TB02010S"`).attr('data-menuid')
    
    let url_ref = document.referrer
    let result_id = url_ref.split("/");

    if (chk_menu === undefined) {
        window.location.href = "/TB02010S"
    } else if (chk_menu != undefined && url_ref.indexOf("/TB") != -1 && url_ref.indexOf("TB02010S") === -1 && url === "/TB02010S") {
        const titleNm = $(`li[data-sidetabid="${result_id[result_id.length - 1]}"] a`).html();
        callPage(result_id[result_id.length - 1], titleNm);
    }
}

/**
 * 탭에 화면 추가하기
 * @param {String} menuId 
 * @param {String} pageName 
 */
async function callPage(menuId, pageName) {

    const url = window.location.pathname;

    if (url === "/" + menuId) {
        // 현재탭과 클릭한 탭이 같을시 아무런 작동안함
        return;
    }
    // 이미 생성되었다가 지워진 탭이면 탭을 재생성
    else if ($(`div[data-titleId="/${menuId}"]`).length != 0 && $(`li[data-tabId="/${menuId}"]`).length === 0) {
        $('#myTab').append(`
                    <li class="nav-item main-tab" role="presentation" data-tabId="/${menuId}">
                        <button class="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target=""
                            type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" onclick="moveTab('${menuId}');">
                            ${pageName}
                        </button>
                        <span class="fa fa-close" role="presentation" style="cursor: pointer;" onclick="removeTab('${menuId}')"></span>
                    </li>
                `);
        // 무브탭 실행
        moveTab(menuId);
        return;
    }
    // 화면에 띄워져있는 탭일경우 무브탭 실행
    else if ($(`div[data-titleId="/${menuId}"]`).length != 0) {
        // 무브탭 실행
        moveTab(menuId);
        return;
    }
    else if ($('#myTab li').length >= 10) {
        Swal.fire({
            icon: 'warning'
            , title: "10개 이상의 페이지를 여실 수 없습니다!"
        })
        return;
    }

    history.pushState(null, '', '/' + menuId);

    // AJAX 요청으로 해당 콘텐츠를 가져옴
    $.ajax({
        url: '/' + menuId, // 서버에서 해당 페이지에 맞는 콘텐츠를 가져올 URL
        method: 'GET',
        success: function (response) {

            // $(response).find('div[data-menuId*="TB"]').remove();

            const customContent = $(response).find(`div[data-menuId="/${menuId}"]`).html();

            let $this = $(response);

            let $title = $(response).find(`div[data-titleId="/${menuId}"]`)

            // 타이틀 숨기기
            $('#title-top div[data-titleId*="TB"], #title-top div[data-titleId*="GD"]').hide()
            // 컨텐츠 숨기기
            $('#page-wrapper div[data-menuId*="TB"], #page-wrapper div[data-menuId*="GD"]').hide()

            // 새로운 타이틀 생성
            $(`#title-top`).append($title);

            //기존 탭들 active 클래스 삭제
            $(".main-tab").removeClass("active");

            // 새로운 탭 생성
            $('#myTab').append(`
                    <li class="nav-item main-tab active" role="presentation" data-tabId="/${menuId}">
                            <button class="nav-link" id="home-tab" data-bs-toggle="tab" data-bs-target=""
                                type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true" onclick="moveTab('${menuId}');">${pageName}
                            </button>
                            <span class="fa fa-close" role="presentation" style="cursor: pointer;" onclick="removeTab('${menuId}')"></span>
                    </li>
                `);

            // 새로운 컨텐츠 div 생성
            $(`div[data-menuId*="/TB"], div[data-menuId*="/GD"]`).last().after(`<div data-menuId="/${menuId}"></div>`);

            // 컨텐츠 내용 생성
            $(`div[data-menuId="/${menuId}"]`).html(customContent);

            // 필요한 모달과 스크립트 전체선택
            const $modals = $('.modal.fade');
            const $script = $('script');

            // $('.tab-content div[role="tabpanel"]').addClass('active');

            // html요소, script요소 중복제거 for문
            for (let i = 0; i < $this.length; i++) {
                if ($($this[i]).attr('class') === 'modal fade') {
                    let isDuplicateModal = false;
                    for (let j = 0; j < $modals.length; j++) {
                        if ($($this[i]).attr('id') === $($modals[j]).attr('id')) {
                            isDuplicateModal = true;
                            break;
                        }
                    }
                    if (!isDuplicateModal) {
                        $('#wrapper').after($this[i]); // 중복된 스크립트가 아니면 body에 추가
                    }
                    // modalContents.push($this[i])
                }
                else if ($($this[i]).attr('src') != "" && $($this[i]).attr('src') != undefined) {
                    let isDuplicateScript = false;
                    for (let j = 0; j < $script.length; j++) {
                        if ($($this[i]).attr('src') === $($script[j]).attr('src')) {
                            // 공통 플러그인 중 중복실행되면 안되는것들 체크
                            if (
                                false

                                || $($script[j]).attr('src') === "js/jquery-3.1.1.min.js"
                                || $($script[j]).attr('src') === "js/plugins/popper/popper.min.js"
                                || $($script[j]).attr('src') === "js/bootstrap.js"
                                || $($script[j]).attr('src') === "js/plugins/metisMenu/jquery.metisMenu.js"

                                || $($script[j]).attr('src') === "js/plugins/jqueryMask/jquery.mask.js"
                                || $($script[j]).attr('src') === "js/plugins/jqueryMask/jquery.mask.min.js"

                                || $($script[j]).attr('src') === "js/plugins/sweetalert/sweetalert.min.js"
                                || $($script[j]).attr('src') === "js/plugins/sweetalert/sweetalert2.all.min.js"

                                || $($script[j]).attr('src') === "css/plugins/jquery-ui-1.13.2/custum/jquery-ui.js"
                                || $($script[j]).attr('src') === "css/plugins/paramquery-pro/jsZip-2.5.0/jszip.min.js"
                                || $($script[j]).attr('src') === "css/plugins/paramquery-pro/pqgrid.min.js"

                                || $($script[j]).attr('src') === "js/plugins/datepicker/bootstrap-datepicker.js"
                                || $($script[j]).attr('src') === "js/plugins/datepicker/bootstrap-datepicker.ko.js"
                                || $($script[j]).attr('src') === "js/plugins/footable/footable.all.js"
                                || $($script[j]).attr('src') === "js/plugins/clockpicker/clockpicker.js"
                                || $($script[j]).attr('src') === "js/chart.js"

                                || $($script[j]).attr('src') === "js/plugins/excelexport/xlsx.full.min.js"
                                || $($script[j]).attr('src') === "js/plugins/excelexport/FileSaver.min.js"

                                || $($script[j]).attr('src') === "js/ramsLayout.js"

                                || $($script[j]).attr('src') === "js/callPage.js"
                                || $($script[j]).attr('src') === "js/plugins/slimscroll/jquery.slimscroll.min.js"
                                || $($script[j]).attr('src') === "js/plugins/pace/pace.min.js"

                            ) {
                                isDuplicateScript = true;
                            } else
                                // 나머지 공통 플러그인은 재실행
                                if (($($script[j]).attr('src')).split('/')[1] != "business") {
                                    // console.log("가져왔어요?");
                                    // console.log($($this[i]).attr('src'));
                                    isDuplicateScript = false;
                                }
                                /**
                                 * 나머지 스크립트
                                 */
                                else {
                                    // 나머지 팝업함수 등등은 한번만 나오게 거름
                                    isDuplicateScript = true;
                                }
                        }
                    }
                    if (!isDuplicateScript) {
                        // console.log("무엇을 뿌렸는가");
                        // console.log($this[i]);
                        $('body').append($this[i]); // 중복된 스크립트가 아니면 body에 추가
                    }
                }
            }

            ramsTabHandler(menuId);

        },
        error: function () {
            console.error('페이지 로드 중 오류가 발생했습니다.');
        }
    });
}


/**
 * 탭 이동
 * @param {String} menuId 
 */
function moveTab(menuId) {

    const url = window.location.pathname;

    if (url === "/" + menuId) {
        // 현재탭과 클릭한 탭이 같을시 아무런 작동안함
        return;
    }

    $(".main-tab").removeClass("active");

    $("#myTab li button").removeClass('active');
    $(`#myTab li button[data-tabid="/${menuId}"]`).addClass('active');
    $(`#myTab li[data-tabid="/${menuId}"]`).addClass('active');

    // 상단 타이틀요소 이동
    $(`div[data-titleId*="TB"], div[data-titleId*="GD"]`).hide()
    $(`div[data-titleId="/${menuId}"]`).show()

    // 메인Content요소 이동
    $(`div[data-menuId*="TB"], div[data-menuId*="GD"]`).hide()
    $(`div[data-menuId="/${menuId}"]`).show()

    history.pushState(null, '', '/' + menuId);

}

/**
 * 탭 제거
 * @param {String} menuId 
 */
function removeTab(menuId) {

    const url = window.location.pathname;
    // let selectedMenuId = $(`div[data-titleId*="TB"]`).first().attr('data-titleId');   // 미정

    if (url === "/" + menuId) {
        history.pushState(null, '', '/' + menuId);
        // 탭 지우기
        $(`li[data-tabId="/${menuId}"]`).remove()
        // 현재화면의 탭을 삭제시 무브탭 발생
        moveTab("TB02010S");
    } else {
        // 현재탭이 아닌 탭을 삭제시 탭만 지우고 컨텐츠는 숨기기
        $(`li[data-tabId="/${menuId}"]`).remove()
        $(`div[data-titleId="/${menuId}"]`).hide()
        $(`div[data-menuId="/${menuId}"]`).hide()
    }

    if ($("#myTab li").length === 1) {
        location.href = "/TB02010S"
    }

}