package com.nanuri.rams.business.assessment.tb10.tb10210;

import com.nanuri.rams.business.common.dto.IBIMS006BDTO;
import com.nanuri.rams.business.common.dto.IBIMS007BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS005BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS006BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS007BMapper;
import com.nanuri.rams.business.common.vo.IBIMS005BVO;
import com.nanuri.rams.business.common.vo.IBIMS006BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO;
import com.nanuri.rams.business.common.vo.IBIMS007BVO.menuUpdateRequestVO;
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
public class TB10210ServiceImpl implements TB10210Service {
	
	private final AuthenticationFacade facade;

    private final IBIMS005BMapper ibims005BMapper;
    private final IBIMS006BMapper ibims006BMapper;
    private final IBIMS007BMapper ibims007BMapper;

    @Override
    public List<IBIMS006BVO> getAuthCode(String rghtCdNm) {
        return ibims006BMapper.selectAuthCode(rghtCdNm);
    }

    @Override
    public List<IBIMS005BVO> getAuthCodeMenu(String rghtCd) {
        return ibims005BMapper.selectAuthCodeMenu(rghtCd);
    }

    @Override
    public boolean registerAuthCode(List<IBIMS006BVO> requestDtos) {
        int count = 0;

        for (IBIMS006BVO requestDto : requestDtos) {
            if (ibims006BMapper.getAuthCode(requestDto.getAthCd()).isPresent()) {
                throw new IllegalArgumentException("해당 권한코드가 존재합니다 : " + requestDto.getAthCd());
            }
            // 수정시 처리자 부점 추가
            if (ibims006BMapper.getAuthCode(requestDto.getOldAthCd()).isPresent()) {
                requestDto.setHndEmpno(facade.getDetails().getEno());
                count += ibims006BMapper.updateAuthCode(requestDto);
            } else {
            	// 등록시 처리자 부점 추가
                requestDto.setRgstEmpno(facade.getDetails().getEno());
                requestDto.setHndEmpno(facade.getDetails().getEno());
                count += ibims006BMapper.insertAuthCode(requestDto);
            }
        }
        return count > 0;
    }

    @Override
    public boolean deleteAuthCode(List<String> rghtCd) {
        int count = ibims006BMapper.deleteAuthCode(rghtCd, facade.getDetails().getEno(), facade.getDetails().getEno());
        return count > 0;
    }

    @Override
    public boolean registerAuthCodeMenu(List<menuUpdateRequestVO> voList) {
        int count = 0;
        log.debug("voList : {}", voList);
        for (menuUpdateRequestVO vo : voList) {
            IBIMS007BDTO dto = new IBIMS007BDTO();
            dto.setMenuId(vo.getMenuId());
            dto.setAthCd(vo.getAthCd());
            dto.setHndEmpno(facade.getDetails().getEno());

            if (ibims007BMapper.selectAuthCodeMenu(dto).isPresent()) { // 신규등록이 아닐때
                if (!vo.isChkModifyYn() && !vo.isChkUseYn()) {   // 사용가능여부 수정가능여부 모두 체크 해제
                    count += ibims007BMapper.deleteAuthCodeMenu(dto);
                } else if (vo.isChkUseYn() && vo.isChkModifyYn()) {  // 사용가능여부, 수정가능여부 모두 체크
                    dto.setMdfyRghtCcd("2");
                    count += ibims007BMapper.updateAuthCodeMenu(dto);
                } else if (vo.isChkUseYn() && !vo.isChkModifyYn()) {  // 사용가능여부만 체크
                    dto.setMdfyRghtCcd("1");
                    count += ibims007BMapper.updateAuthCodeMenu(dto);
                }
            } else {   // 신규 등록일때
                if (vo.isChkUseYn() && !vo.isChkModifyYn()) {    // 사용가능여부만 체크
                    dto.setMdfyRghtCcd("1");
                    count += ibims007BMapper.insertAuthCodeMenu(dto);
                } else if (vo.isChkUseYn() && vo.isChkModifyYn()) {  // 사용가능, 수정가능여부 체크
                    dto.setMdfyRghtCcd("2");
                    count += ibims007BMapper.insertAuthCodeMenu(dto);
                }
            }
        }
        return count > 0;
    }

    @Override
    public int mergeAthCd(List<IBIMS006BDTO> param){

        int result = 0;
        // 권한코드 중복체크
        for(int i = 0; i < param.size(); i++){
            if (param.get(i).getHndEmpno() == null || param.get(i).getHndEmpno().isEmpty()) {
                if( ibims006BMapper.athCdvldChk(param.get(i).getAthCd()) > 0){
                    result = -7574;
                    break;
                }
            }
            // 현재 작성자
            param.get(i).setHndEmpno(facade.getDetails().getEno());

            ibims006BMapper.mergeAthCd(param.get(i));

            result = result + 1;
        }

        return result;
    };

    @Override
    public int updateMdfyRghtCcd(List<IBIMS007BDTO> param) {

        int result = 0;
        
        for(int i = 0; i < param.size(); i++){
            if (param.get(i).getHndEmpno() == null || param.get(i).getHndEmpno().isEmpty()) {
                int sq = ibims007BMapper.ibims007bCreateSq();
                param.get(i).setSq(sq);
            } else {

            }
            // 현재 작성자
            param.get(i).setHndEmpno(facade.getDetails().getEno());

            ibims007BMapper.updateMdfyRghtCcd(param.get(i));

            result = result + 1;
        }

        return result;

    }

}
