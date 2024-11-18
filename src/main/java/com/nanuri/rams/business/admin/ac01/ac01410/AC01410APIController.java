package com.nanuri.rams.business.admin.ac01.ac01410;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nanuri.rams.business.common.vo.IBIMS005BVO.MainMenuVo;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.SubMenuVo;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AC01410APIController {
	
	private final AC01410Service service;

//	// 그룹코드정보 리스트 가져오기
//	@GetMapping(value = "/mainMenuList")
//	public List<MainMenuVo> selectMainMenuList(@RequestParam String menuNm){
//		return service.selectMainMenuList(menuNm);
//	}
//
//	@GetMapping(value = "/mainMenuInfo")
//	public List<MainMenuVo> selectSubMenuList(@RequestParam String menuId){
//		return service.selectSubMenuList(menuId);
//	}
//
//	@PatchMapping(value = "/deleteMainMenuInfo")
//	public boolean deleteMainMenuInfo(@RequestBody List<String> menuId) {
//		return service.deleteMainMenuInfo(menuId);
//	}
//
//	@PatchMapping(value = "/deleteSubMenuInfo")
//	public boolean deleteSubMenuInfo(@RequestBody List<String> menuId) {
//		return service.deleteSubMenuInfo(menuId);
//	}
//
//	// 상위메뉴 정보 등록하기
//	@PostMapping(value = "/registMainMenuInfo")
//	public boolean registMainMenuInfo(@RequestBody List<MainMenuVo> requestDtos) {
//		return service.registMainMenuInfo(requestDtos);
//	}
//
//	@PostMapping(value = "/registSubMenuInfo")
//	public boolean registSubMenuInfo(@RequestBody List<SubMenuVo> requestDtos) {
//		return service.registSubMenuInfo(requestDtos);
//	}

}
