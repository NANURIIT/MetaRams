package com.nanuri.rams.business.admin.ac01.ac01010;

import java.text.ParseException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS001BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS002BMapper;
import com.nanuri.rams.business.common.vo.IBIMS001BVO;
import com.nanuri.rams.business.common.vo.IBIMS002BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AC01010ServiceImpl implements AC01010Service {
	
	private final AuthenticationFacade facade;
	
	private final IBIMS001BMapper ibims001BMapper;
	private final IBIMS002BMapper ibims002BMapper;
	
    // 공통코드 조회하는 페이지가 로딩되면서 데이터베이스에 있는 데이터 중 해당 값을 조회목록에 넣어준다.
    @Override
    public List<IBIMS001BVO> getCommonCodeName() {
        return ibims001BMapper.getCommonCodeName();
    }
	
    // @Override
    // public List<IBIMS001BVO> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException {
    // 	List<IBIMS001BVO> dtoList = ibims001BMapper.getGroupCodeInfoList(cmnsCdGrp);
    // 	return dtoList;
    // }
    
    @Override
    public List<IBIMS002BVO> getCodeInfoList(String cmnsCdGrp) throws ParseException {
        List<IBIMS002BVO> dtoList = ibims002BMapper.getCodeInfoList(cmnsCdGrp);
        return dtoList;
    }

    @Override
    public boolean registGroupCodeInfo(List<IBIMS001BVO> requestDtos) {
        int count = 0;
        for (IBIMS001BVO requestDto : requestDtos) {
            if (ibims001BMapper.getGroupCodeInfo(requestDto.getCmnsCdGrp()).isPresent()) {
                throw new IllegalArgumentException("해당 그룹코드가 존재합니다. " + requestDto.getCmnsCdGrp());
            }
            // 새로운 그룹코드 등록시에도 처리자 사번을 추가해야한다.
            if (ibims001BMapper.getGroupCodeInfo(requestDto.getOldCmnsCdGrp()).isEmpty()) {
            	requestDto.setRgstEmpno(facade.getDetails().getEno());
            	requestDto.setHndEmpno(facade.getDetails().getEno());
            	//requestDto.setHndlDprtCd(facade.getDetails().getDprtCd());
                count += ibims001BMapper.insertGroupCodeInfo(requestDto);
            } else {
            	requestDto.setHndEmpno(facade.getDetails().getEno());
            	//requestDto.setHndlDprtCd(facade.getDetails().getDprtCd());
                count += ibims001BMapper.registGroupCodeInfo(requestDto);
            }
        }
        return count > 0;
    }

    @Override
    public boolean deleteGroupCodeInfo(List<String> cmnsCdGrp) {
    	log.debug("eno ====> " + facade.getDetails().getEno());
        int count = ibims001BMapper.deleteGroupCodeInfo(cmnsCdGrp, facade.getDetails().getEno());
        log.debug("count ====> " + count);
        return count > 0;
    }

    @Override
    public boolean registCodeInfo(List<IBIMS002BVO> vo) {
        int count = 0;
        for (IBIMS002BVO requestVO : vo) {
            if (ibims002BMapper.getCodeInfo(requestVO.getCmnsCdGrp(), requestVO.getCdVlId()).isPresent()) {
                throw new IllegalArgumentException("해당 코드가 존재합니다." + requestVO.getCmnsCdGrp() + " : " + requestVO.getCdVlId());
            }

            if (ibims002BMapper.getCodeInfo(requestVO.getCmnsCdGrp(), requestVO.getOldCdVlId()).isEmpty()) {
                // 신규등록
                requestVO.setRgstEmpno(facade.getDetails().getEno());
                requestVO.setHndEmpno(facade.getDetails().getEno());
                count += ibims002BMapper.insertCodeInfo(requestVO);
            } else {
                // 수정
            	requestVO.setHndEmpno(facade.getDetails().getEno());
                count += ibims002BMapper.registCodeInfo(requestVO);
            }
        }
        return count > 0;
    }

    @Override
    public boolean deleteCodeInfo(IBIMS002BVO requestDto) {
    	return ibims002BMapper.deleteCodeInfo(requestDto.getCmnsCdGrp(), facade.getDetails().getEno(), requestDto.getCdVlIds()) > 0;
    }
    
}
