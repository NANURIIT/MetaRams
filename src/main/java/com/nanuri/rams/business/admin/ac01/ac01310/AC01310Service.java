package com.nanuri.rams.business.admin.ac01.ac01310;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.dto.RAA95BDTO;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.MenuListVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO.selectUseMenuVO;

@Service
public interface AC01310Service {
	
	/**
	 * 메뉴별권한관리
	 * @param menuNm
	 * @return
	 */
	public List<MenuListVO> getMenuList(String menuNm);
	
	/**
	 * 권한별 메뉴화면 사용권한 조회
	 * @return
	 */
	public List<IBIMS006BVO> getMenuByAuth(MenuListVO paramData);
	
	/**
	 * RAA95B 수정 조회 가능 여부 조회
	 * @param menuId
	 * @return
	 */
	public List<selectUseMenuVO> getAvailableMenu(Map<String, String> menuId);
	
	/**
	 * RAA95B 수정 조회 가능 여부 저장
	 * @param dtoList
	 * @return
	 */
	public boolean registUseMenu(ArrayList<selectUseMenuVO> dtoList);

}
