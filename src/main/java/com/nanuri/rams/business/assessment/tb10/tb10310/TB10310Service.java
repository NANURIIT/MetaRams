package com.nanuri.rams.business.assessment.tb10.tb10310;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.MenuListVO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO.selectUseMenuVO;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public interface TB10310Service {
	


	/**
     * 2024-11-07 김건우
     */

	/*
	 * 메뉴별권한관리 메뉴조회
	 */
	public List<IBIMS005BDTO> selectMenuListFromTB10310S(String param);

	/*
	 * 메뉴별권한관리 권한조회
	 */
	public List<IBIMS007BVO> selectAthCdListFromMenu(String param);

	/*
	 * 메뉴별권한관리 권한수정
	 */
	public int updateAth(List<IBIMS007BDTO> param);


    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

	// /**
	//  * 메뉴별권한관리
	//  * @param menuNm
	//  * @return
	//  */
	// public List<MenuListVO> getMenuList(String menuNm);
	
	/**
	 * 권한별 메뉴화면 사용권한 조회
	 * @return
	 */
	public List<IBIMS006BVO> getMenuByAuth(MenuListVO paramData);
	
	// /**
	//  * RAA95B 수정 조회 가능 여부 조회
	//  * @param menuId
	//  * @return
	//  */
	// public List<selectUseMenuVO> getAvailableMenu(Map<String, String> menuId);
	
	// /**
	//  * RAA95B 수정 조회 가능 여부 저장
	//  * @param dtoList
	//  * @return
	//  */
	// public boolean registUseMenu(ArrayList<selectUseMenuVO> dtoList);

}
