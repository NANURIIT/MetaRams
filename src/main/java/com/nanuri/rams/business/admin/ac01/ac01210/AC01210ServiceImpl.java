package com.nanuri.rams.business.admin.ac01.ac01210;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.mapper.*;
import com.nanuri.rams.business.common.vo.IBIMS005BVO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO.menuUpdateRequestVO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AC01210ServiceImpl implements AC01210Service {
	
	private final AuthenticationFacade facade;

    private final IBIMS005BMapper ibims005BMapper;
    private final IBIMS006BMapper ibims006BMapper;
    private final IBIMS007BMapper ibims007BMapper;

    // @Override
    // public List<IBIMS006BVO> getAuthCode(String rghtCdNm) {
    //     return ibims006BMapper.selectAuthCode(rghtCdNm);
    // }

    // @Override
    // public List<IBIMS007BVO> getAuthCodeMenu(String rghtCd) {
    //     return ibims007BMapper.selectAuthCodeMenu(rghtCd);
    // }

    // @Override
    // public boolean registerAuthCode(List<IBIMS006BVO> requestDtos) {
    //     int count = 0;

    //     for (IBIMS006BVO requestDto : requestDtos) {
    //         if (ibims006BMapper.getAuthCode(requestDto.getAthCd()).isPresent()) {
    //             throw new IllegalArgumentException("해당 권한코드가 존재합니다 : " + requestDto.getAthCd());
    //         }
    //         // 수정시 처리자 부점 추가
    //         if (ibims006BMapper.getAuthCode(requestDto.getOldAthCd()).isPresent()) {
    //             requestDto.setHndEmpno(facade.getDetails().getEno());
    //             count += ibims006BMapper.updateAuthCode(requestDto);
    //         } else {
    //         	// 등록시 처리자 부점 추가
    //             requestDto.setRgstEmpno(facade.getDetails().getEno());
    //             requestDto.setHndEmpno(facade.getDetails().getEno());
    //             count += ibims006BMapper.insertAuthCode(requestDto);
    //         }
    //     }
    //     return count > 0;
    // }

    // @Override
    // public boolean deleteAuthCode(List<String> rghtCd) {
    //     int count = ibims006BMapper.deleteAuthCode(rghtCd, facade.getDetails().getEno(), facade.getDetails().getEno());
    //     return count > 0;
    // }

    // @Override
    // public boolean registerAuthCodeMenu(List<menuUpdateRequestVO> voList) {
    //     int count = 0;
    //     log.debug("voList : {}", voList);
    //     for (menuUpdateRequestVO vo : voList) {
    //         IBIMS007BDTO dto = new IBIMS007BDTO();
    //         dto.setMenuId(vo.getMenuId());
    //         dto.setAthCd(vo.getAthCd());
    //         dto.setHndEmpno(facade.getDetails().getEno());

    //         if (ibims007BMapper.selectAuthCodeMenu(dto).isPresent()) { // 신규등록이 아닐때
    //             if (!vo.isChkModifyYn() && !vo.isChkUseYn()) {   // 사용가능여부 수정가능여부 모두 체크 해제
    //                 count += ibims007BMapper.deleteAuthCodeMenu(dto);
    //             } else if (vo.isChkUseYn() && vo.isChkModifyYn()) {  // 사용가능여부, 수정가능여부 모두 체크
    //                 dto.setMdfyRghtCcd("2");
    //                 count += ibims007BMapper.updateAuthCodeMenu(dto);
    //             } else if (vo.isChkUseYn() && !vo.isChkModifyYn()) {  // 사용가능여부만 체크
    //                 dto.setMdfyRghtCcd("1");
    //                 count += ibims007BMapper.updateAuthCodeMenu(dto);
    //             }
    //         } else {   // 신규 등록일때
    //             if (vo.isChkUseYn() && !vo.isChkModifyYn()) {    // 사용가능여부만 체크
    //                 dto.setMdfyRghtCcd("1");
    //                 count += ibims007BMapper.insertAuthCodeMenu(dto);
    //             } else if (vo.isChkUseYn() && vo.isChkModifyYn()) {  // 사용가능, 수정가능여부 체크
    //                 dto.setMdfyRghtCcd("2");
    //                 count += ibims007BMapper.insertAuthCodeMenu(dto);
    //             }
    //         }
    //     }
    //     return count > 0;
    // }

}
