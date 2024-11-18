package com.nanuri.rams.business.assessment.tb10.tb10310;

import com.nanuri.rams.business.common.vo.IBIMS005BVO.MenuListVO;
import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO.selectUseMenuVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/TB10310S")
public class TB10310APIController {
	
	private final TB10310Service tb10310Service;

	/**
     * 2024-11-07 김건우
     */
	/*
	 * 메뉴별권한관리 메뉴조회
	 */
	@PostMapping(value = "/selectMenuListFromTB10310S")
	public List<IBIMS005BDTO> selectMenuListFromTB10310S(@RequestBody String param) {
		return tb10310Service.selectMenuListFromTB10310S(param);
	}
	
	/*
	 * 메뉴별권한관리 권한조회
	 */
	@PostMapping(value = "/selectAthCdListFromMenu")
	public List<IBIMS007BVO> selectAthCdListFromMenu(@RequestBody String param) {
		return tb10310Service.selectAthCdListFromMenu(param);
	}

	/*
	 * 메뉴별권한관리 권한수정
	 */
	@PostMapping(value = "/updateAth")
	public int updateAth(@RequestBody List<IBIMS007BDTO> param) {
		return tb10310Service.updateAth(param);
	}


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

	// /* 메뉴명 조회 */
	// @GetMapping(value = "/findMenu")
	// public List<MenuListVO> getMethodName(String menuNm) {
	// 	return service.getMenuList(menuNm);
	// }

	/* 권한별 메뉴화면 사용권한 조회 */
	@GetMapping(value="/menuByAuth")
	public List<IBIMS006BVO> menuByAuth(MenuListVO paramData) {
		return tb10310Service.getMenuByAuth(paramData);
	}

	// /* RAA95B 수정 조회 가능 여부 조회 */
	// @GetMapping(value="/checkAvailableMenu")
	// public List<selectUseMenuVO> getAvailableMenu(@RequestParam Map<String, String> menuId) {
	// 	return service.getAvailableMenu(menuId);
	// }

	// /* RAA95B 조회, 수정 가능 여부 저장 */
	// @PatchMapping(value="/saveUseMenu")
	// public boolean registUseMenu(@RequestBody ArrayList<selectUseMenuVO> dtoList) {
	// 	return service.registUseMenu(dtoList);
	// }

}
