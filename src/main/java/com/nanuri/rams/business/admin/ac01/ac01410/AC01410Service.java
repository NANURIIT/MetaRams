package com.nanuri.rams.business.admin.ac01.ac01410;

import java.util.List;

import org.springframework.stereotype.Service;

import com.nanuri.rams.business.common.vo.IBIMS005BVO.MainMenuVo;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.SubMenuVo;

@Service
public interface AC01410Service {
	
	public List<MainMenuVo> selectMainMenuList(String menuNm);

	public List<MainMenuVo> selectSubMenuList(String menuId);

	public boolean deleteMainMenuInfo(List<String> menuId);

	public boolean deleteSubMenuInfo(List<String> menuId);

	public boolean registMainMenuInfo(List<MainMenuVo> requestDtos);

	public boolean registSubMenuInfo(List<SubMenuVo> requestDtos);

}
