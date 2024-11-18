package com.nanuri.rams.business.admin.ac01.ac01310;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.dto.RAA95BDTO;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.MenuListVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO.selectUseMenuVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AC01310APIController {
	
	private final AC01310Service service;

//	/* 메뉴명 조회 */
//	@GetMapping(value = "/findMenu")
//	public List<MenuListVO> getMethodName(String menuNm) {
//		return service.getMenuList(menuNm);
//	}
//
	/* 권한별 메뉴화면 사용권한 조회 */
	@GetMapping(value="/menuByAuth")
	public List<IBIMS006BVO> menuByAuth(MenuListVO paramData) {
		return service.getMenuByAuth(paramData);
	}
//
//	/* RAA95B 수정 조회 가능 여부 조회 */
//	@GetMapping(value="/checkAvailableMenu")
//	public List<selectUseMenuVO> getAvailableMenu(@RequestParam Map<String, String> menuId) {
//		return service.getAvailableMenu(menuId);
//	}
//
//	/* RAA95B 조회, 수정 가능 여부 저장 */
//	@PatchMapping(value="/saveUseMenu")
//	public boolean registUseMenu(@RequestBody ArrayList<selectUseMenuVO> dtoList) {
//		return service.registUseMenu(dtoList);
//	}

}
