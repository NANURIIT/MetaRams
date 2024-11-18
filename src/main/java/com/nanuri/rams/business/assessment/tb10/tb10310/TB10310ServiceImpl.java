package com.nanuri.rams.business.assessment.tb10.tb10310;

import com.nanuri.rams.business.common.dto.IBIMS005BDTO;
import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS005BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS006BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS007BMapper;
import com.nanuri.rams.business.common.vo.IBIMS005BVO.MenuListVO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO.selectUseMenuVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB10310ServiceImpl implements TB10310Service {
	
	private final AuthenticationFacade facade;

	private final IBIMS005BMapper ibims005BMapper;
    private final IBIMS006BMapper ibims006BMapper;
    private final IBIMS007BMapper ibims007BMapper;

    /**
     * 2024-11-07 김건우
     */

    /*
	 * 메뉴별권한관리 메뉴조회
	 */
    @Override
    public List<IBIMS005BDTO> selectMenuListFromTB10310S(String param){
        return ibims005BMapper.selectMenuListFromTB10310S(param);
    };

    /*
	 * 메뉴별권한관리 권한조회
	 */
    @Override
    public List<IBIMS007BVO> selectAthCdListFromMenu(String param){
        return ibims007BMapper.selectAthCdListFromMenu(param);
    };

    /*
	 * 메뉴별권한관리 권한수정
	 */
    @Override
    public int updateAth(List<IBIMS007BDTO> param){
        
        int result = 0;

        List<IBIMS007BDTO> list = param;

        // 작성자 세팅
		for(int i = 0; i < list.size(); i++){
			list.get(i).setHndEmpno(facade.getDetails().getEno());

            ibims007BMapper.updateAth(list.get(i));

            result = result + 1;
		}

        return result;
    };

    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////////////////////////////////////////

    // /* 메뉴명 조회 */
    // @Override
    // public List<MenuListVO> getMenuList(String menuNm) {

    //     List<MenuListVO> menuList = ibims005BMapper.selectMenuList(menuNm);

    //     String lvName = "";
    //     int rowNum = 0;

    //     for (MenuListVO menu : menuList) {
    //         lvName = "";
    //         if (menu.getLv2Id() != null && menu.getLv2Id() != "") {
    //             rowNum++;
    //             lvName = menu.getLv2Id();
    //         }
    //         if (menu.getLv3Id() != null && menu.getLv3Id() != "") {
    //             rowNum++;
    //             lvName = menu.getLv3Id();
    //         }
    //         menu.setMenuId(lvName);
    //         menu.setRowNum(rowNum);
    //     }

    //     return menuList;
    // }

    /* 권한별 메뉴화면 사용권한 조회 */
    @Override
    public List<IBIMS006BVO> getMenuByAuth (MenuListVO paramData) {
        List<IBIMS006BVO> menuAuthList = ibims006BMapper.selectRghtCd();
        for (IBIMS006BVO menu : menuAuthList) {
            String hndlPEno = Optional.ofNullable(menu.getHndEmpno()).orElse("");
            menu.setHndEmpno(hndlPEno);
        }

        return menuAuthList;
    }

    // /* RAA95B 수정 조회 가능 여부 조회 */
    // @Override
    // public List<selectUseMenuVO> getAvailableMenu(Map<String, String> menuId) {
    //     return ibims007BMapper.selectAvailableMenu(menuId);
    // }

    /**
	 * RAA95B 조회 및 수정 여부 INSERT and DELETE
	 * 
	 * 메뉴의 상위메뉴가 존재하여 lvId로 화면ID를 받아온다.
	 * 화면의 depth(LV)에 따라 순차(하위메뉴 > 상위메뉴 [> 최상위메뉴 ...])적으로 SQ를 할당하여 insert
	 * SELECT NEXTVAL(SQ)를 이용하여 유니크한 int value를 받아오고 (NEXTVAL(SQ)을 매번 실행하지 않는다)
	 * 다음 insert를 위해 rollNum(실행횟수)만큼 NEXTVAL(SQ)를 DB에 실행 요청한다.
	 * 
	 * 화면 권한 삭제의 경우 menuId : 'rghtCdCancel'(default parameter)란 값이 요청되면
	 * SQ와 권한코드로 delete 쿼리를 depth만큼 실행한다.
	 */
    // @Override
    // public boolean registUseMenu(ArrayList<selectUseMenuVO> dtoList) {
    //     int count = 0;
    //     String hndlPEno = facade.getDetails().getEno();
    //     int nextVal = ibims007BMapper.nextVal();

    //     for (selectUseMenuVO dto : dtoList) {
    //         dto.setHndEmpno(hndlPEno);
    //         int sq = dto.getSq();
    //         int totalDepth = 3;		// 화면메뉴의 최대값
	// 		int rollNum = 1;		// sq value로 쓰인 NEXTVAL()의 값을 매칭시키기 위한 변수

    //         /* lv3Id가 없는 경우 */
    //         if ((sq == 0) && (!dto.getMenuId().equals("rghtCdCancel")) && dto.getLv3Id().equals("")) {			// 중복된 데이터가 없는 경우
    //             count += ibims007BMapper.insertUseMenu(dto);
    //             dto.setMenuId(dto.getLv1Id());
    //             dto.setSq(nextVal + 1);
    //             dto.setMdfyRghtCcd("1");		// 상위메뉴의 경우 조회 권한만
    //             count += ibims007BMapper.insertUseMenu(dto);
	// 			if(rollNum < totalDepth-1){
    //                 ibims007BMapper.nextVal();		// nextVal + 1을 채우기 위해
	// 			}
    //         } else if (sq != 0 && (!dto.getMenuId().equals("rghtCdCancel")) && dto.getLv3Id().equals("")) {		// 중복된 데이터가 있는 경우
    //             if (!ibims007BMapper.isExist(dto)) {
    //                 count += ibims007BMapper.insertUseMenu(dto);
    //             } else if (ibims007BMapper.isExist(dto)) {
    //                 count += ibims007BMapper.updateAuthCodeMenu(dto);
    //             }
    //         } else if (sq != 0 && dto.getMenuId().equals("rghtCdCancel") && dto.getLv3Id().equals("")) {		// 모든 권한을 취소하는 경우
    //             for (int i = 0; i < totalDepth-1; i++) {
    //                 //dto.setSq(sq + i);
    //                 count += ibims007BMapper.deleteUseMenu(dto);
    //             }
    //         }

    //         /* lv3Id가 있는 경우 */
    //         if (sq == 0 && (!dto.getMenuId().equals("rghtCdCancel")) && (!dto.getLv3Id().equals(""))) {			// 중복된 데이터가 없는 경우

    //             dto.setMenuId(dto.getLv3Id());
    //             count += ibims007BMapper.insertUseMenu(dto);
    //             dto.setMdfyRghtCcd("1");		// 상위메뉴의 경우 조회 권한만
    //             dto.setMenuId(dto.getLv2Id());
    //             dto.setSq(nextVal + 1);
    //             count += ibims007BMapper.insertUseMenu(dto);
    //             dto.setMenuId(dto.getLv1Id());
    //             dto.setSq(nextVal + 2);
    //             count += ibims007BMapper.insertUseMenu(dto);
	// 			if(rollNum < totalDepth){
    //                 ibims007BMapper.nextVal();		// nextVal + 1을 채우기 위해
	// 			}
    //         } else if (sq != 0 && (!dto.getMenuId().equals("rghtCdCancel")) && (!dto.getLv3Id().equals(""))) {	// 중복된 데이터가 있는 경우
	// 			if (!ibims007BMapper.isExist(dto)) {
	// 				count += ibims007BMapper.insertUseMenu(dto);
    //             } else if (ibims007BMapper.isExist(dto)) {
	// 				count += ibims007BMapper.updateAuthCodeMenu(dto);
    //             }
    //         } else if (sq != 0 && dto.getMenuId().equals("rghtCdCancel") && (!dto.getLv3Id().equals(""))) {		// 모든 권한을 취소하는 경우
    //             for (int i = 0; i < totalDepth; i++) {
    //                 //dto.setSq(sq + i);
    //                 count += ibims007BMapper.deleteUseMenu(dto);
    //             }
    //         }
	// 		rollNum++;
    //     }
    //     return count > 0;
    // }	

}
