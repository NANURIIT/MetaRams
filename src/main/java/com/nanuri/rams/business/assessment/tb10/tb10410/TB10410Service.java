package com.nanuri.rams.business.assessment.tb10.tb10410;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.vo.IBIMS005BVO;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.MainMenuVo;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.SubMenuVo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TB10410Service {

	// 2024-11-06	김건우

	public List<IBIMS005BDTO> hgrkMenuInq(String param);

	public List<IBIMS005BDTO> hgrkGroupMenuInq(String param);

	public int insertMenu (List<IBIMS005BDTO> param);

	public int updateMenu (List<IBIMS005BDTO> param);

	////////////////////////////////////////////////////
	////////////////////////////////////////////////////
	////////////////////////////////////////////////////
	////////////////////////////////////////////////////
	
	public List<MainMenuVo> selectMainMenuList(String menuNm);

	public List<MainMenuVo> selectSubMenuList(String menuId);

	public boolean deleteMainMenuInfo(List<String> menuId);

	public boolean deleteSubMenuInfo(List<String> menuId);

	public boolean registMainMenuInfo(List<MainMenuVo> requestDtos);

	public boolean registSubMenuInfo(List<SubMenuVo> requestDtos);

}
