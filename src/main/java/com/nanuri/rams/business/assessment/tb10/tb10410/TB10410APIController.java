package com.nanuri.rams.business.assessment.tb10.tb10410;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.vo.IBIMS005BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/TB10410S")
public class TB10410APIController {
	
	private final TB10410Service tb10410Service;

	/**
	 * 상위메뉴조회
	 * @param param 화면의 검색조건 input데이터
	 * @return 
	 */
	@PostMapping(value = "/hgrkMenuInq")
	public List<IBIMS005BDTO> hgrkMenuInq(@RequestBody String param) {
		return tb10410Service.hgrkMenuInq(param);
	}

	/**
	 * 하위메뉴조회
	 * @param param 상위메뉴의 menuId
	 * @return 
	 */
	@PostMapping(value = "/hgrkGroupMenuInq")
	public List<IBIMS005BDTO> hgrkGroupMenuInq(@RequestBody String param) {
		return tb10410Service.hgrkGroupMenuInq(param);
	}

	/**
	 * 메뉴저장
	 * @param param
	 * @return
	 */
	@PostMapping(value = "/insertMenu")
	public int insertMenu (@RequestBody List<IBIMS005BDTO> param) {
		return tb10410Service.insertMenu(param);
	}

	/**
	 * 메뉴업데이트
	 * @param param
	 * @return
	 */
	@PostMapping(value = "/updateMenu")
	public int updateMenu (@RequestBody List<IBIMS005BDTO> param) {
		return tb10410Service.updateMenu(param);
	}

	// // 그룹코드정보 리스트 가져오기
	// @GetMapping(value = "/mainMenuList")
	// public List<MainMenuVo> selectMainMenuList(@RequestParam String menuNm){ 
	// 	return service.selectMainMenuList(menuNm);
	// }
	
	// @GetMapping(value = "/mainMenuInfo")
	// public List<MainMenuVo> selectSubMenuList(@RequestParam String menuId){
	// 	return service.selectSubMenuList(menuId);
	// }
	
	// @PostMapping(value = "/deleteMainMenuInfo")
	// public boolean deleteMainMenuInfo(@RequestBody List<String> menuId) {
	// 	return service.deleteMainMenuInfo(menuId);
	// }
	
	// @PatchMapping(value = "/deleteSubMenuInfo")
	// public boolean deleteSubMenuInfo(@RequestBody List<String> menuId) {
	// 	return service.deleteSubMenuInfo(menuId);
	// }
	
	// // 상위메뉴 정보 등록하기
	// @PostMapping(value = "/registMainMenuInfo")
	// public boolean registMainMenuInfo(@RequestBody List<MainMenuVo> requestDtos) {
	// 	return service.registMainMenuInfo(requestDtos);
	// }
	
	// @PostMapping(value = "/registSubMenuInfo")
	// public boolean registSubMenuInfo(@RequestBody List<SubMenuVo> requestDtos) {
	// 	return service.registSubMenuInfo(requestDtos);
	// }

}
