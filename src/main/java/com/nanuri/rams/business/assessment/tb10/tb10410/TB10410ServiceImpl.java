package com.nanuri.rams.business.assessment.tb10.tb10410;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS005BMapper;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.MainMenuVo;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.SubMenuVo;
import com.nanuri.rams.business.common.vo.IBIMS005BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB10410ServiceImpl implements TB10410Service {
	
	private final AuthenticationFacade facade;

	private final IBIMS005BMapper ibims005BMapper;
	
	// 2024-11-06	김건우

	@Override
	public List<IBIMS005BDTO> hgrkMenuInq(String param){
		return ibims005BMapper.hgrkMenuInq(param);
	};

	@Override
	public List<IBIMS005BDTO> hgrkGroupMenuInq(String param){
		return ibims005BMapper.hgrkGroupMenuInq(param);
	};

	@Override
	public int insertMenu (List<IBIMS005BDTO> param){

		List<IBIMS005BDTO> list = param;

		// 작성자 세팅
		for(int i = 0; i < list.size(); i++){
			list.get(i).setHndEmpno(facade.getDetails().getEno());
		}

		return ibims005BMapper.insertMenu(list);
	};

	@Override
	public int updateMenu (List<IBIMS005BDTO> param){

		List<IBIMS005BDTO> list = param;
		int result = 0;

		// 작성자 세팅
		for(int i = 0; i < list.size(); i++){
			list.get(i).setHndEmpno(facade.getDetails().getEno());
			ibims005BMapper.updateMenu(list.get(i));
			result++;
		}

		return result;
	};

	//////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////
	//////////////////////////////////////////////////////////////

	@Override
	public List<MainMenuVo> selectMainMenuList(String menuNm) {
		
		List<MainMenuVo> dtoList = ibims005BMapper.selectMainMenuList(menuNm);
		return dtoList;
	}

	@Override
	public List<MainMenuVo> selectSubMenuList(String menuId) {
		List<MainMenuVo> dtoList = ibims005BMapper.selectSubMenuList(menuId);
		return dtoList;
	}

	@Override
	public boolean deleteMainMenuInfo(List<String> menuId) {
		int count = ibims005BMapper.deleteMainMenuInfo(menuId, facade.getDetails().getEno());
		return count > 0;
	}

	@Override
	public boolean deleteSubMenuInfo(List<String> menuId) {
		int count = ibims005BMapper.deleteSubMenuInfo(menuId);
		return count > 0;
	}

	@Override
	public boolean registMainMenuInfo(List<MainMenuVo> requestDtos) {
		int count = 0;
		
		String hndlPEno = facade.getDetails().getEno();
		
        for (MainMenuVo requestDto : requestDtos) {
        	
        	String menuId = requestDto.getMenuId();
        	
            if (ibims005BMapper.getMainMenuInfo(menuId).isPresent()) {
                throw new IllegalArgumentException("해당 그룹코드가 존재합니다. " + requestDto.getMenuId());
            }

            if (ibims005BMapper.getMainMenuInfo(requestDto.getOldMenuId()).isEmpty()) {
            	requestDto.setHndEmpno(hndlPEno);
                count += ibims005BMapper.insertMainMenuInfo(requestDto);
            } else {
            	requestDto.setHndEmpno(hndlPEno);
            	count += ibims005BMapper.updateMainMenuInfo(requestDto);
            	if ( null != menuId
				&&   !"".equals(menuId) ) {
                	count += ibims005BMapper.updateSubHgRnkMenuId(requestDto);
            	}

            }

        }
        return count > 0;
	}

	@Override
	public boolean registSubMenuInfo(List<SubMenuVo> requestDtos) {
		int count = 0;

		String hndlPEno = facade.getDetails().getEno();
		
		for (SubMenuVo requestDto : requestDtos) {
			if (!com.nanuri.rams.com.utils.StringUtil.isAllWhitespace(requestDto.getMenuId())) {
				
				if (ibims005BMapper.getSubMenuInfo(requestDto.getMenuId()).isPresent()) {
					throw new IllegalArgumentException("해당 그룹코드가 존재합니다. " + requestDto.getMenuId());
				}
				
				if (ibims005BMapper.getSubMenuInfo(requestDto.getOldSubMenuId()).isEmpty()) {
					requestDto.setHndEmpno(hndlPEno);
					count += ibims005BMapper.insertSubMenuInfo(requestDto);
				} else {
					requestDto.setHndEmpno(hndlPEno);
					count += ibims005BMapper.updateSubMenuInfo(requestDto);
				}
				
			} else {
				requestDto.setHndEmpno(hndlPEno);
				count += ibims005BMapper.updateSubMenuInfo(requestDto);
			}
		}
        return count > 0;
	}	

}
