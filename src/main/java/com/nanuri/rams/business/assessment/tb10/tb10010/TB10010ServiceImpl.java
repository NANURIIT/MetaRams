package com.nanuri.rams.business.assessment.tb10.tb10010;

import com.nanuri.rams.business.common.dto.IBIMS001BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS001BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS002BMapper;
import com.nanuri.rams.business.common.vo.IBIMS001BVO;
import com.nanuri.rams.business.common.vo.IBIMS002BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class TB10010ServiceImpl implements TB10010Service {
	
	private final AuthenticationFacade facade;
	
	private final IBIMS001BMapper ibims001BMapper;
	private final IBIMS002BMapper ibims002BMapper;
	
    // 공통코드 조회하는 페이지가 로딩되면서 데이터베이스에 있는 데이터 중 해당 값을 조회목록에 넣어준다.
    @Override
    public List<IBIMS001BVO> getCommonCodeName() {
        return ibims001BMapper.getCommonCodeName();
    }
	
    @Override
    public List<IBIMS001BVO> getGroupCodeInfoList(String cmnsCdGrp) throws ParseException {
    	List<IBIMS001BVO> dtoList = ibims001BMapper.getGroupCodeInfoList(cmnsCdGrp);
    	return dtoList;
    }
    
    @Override
    public List<IBIMS002BVO> getCodeInfoList(String cmnsCdGrp) throws ParseException {
        List<IBIMS002BVO> dtoList = ibims002BMapper.getCodeInfoList(cmnsCdGrp);
        return dtoList;
    }

    /**
     * 그룹코드 그리드 저장
     */
    @Override
    public boolean registGroupCodeInfo(IBIMS001BVO paramData) {

        int cnt = 0;

        List<IBIMS001BDTO> insertList = paramData.getInsertList();
        List<IBIMS001BDTO> updateList = paramData.getUpdateList();

        for(int i = 0; i < insertList.size(); i++){
            String cmnsCdNm = ibims001BMapper.makeCmnsCdGrp(insertList.get(i));
            insertList.get(i).setCmnsCdNm(cmnsCdNm);
            insertList.get(i).setHndEmpno(facade.getDetails().getEno());
            ibims001BMapper.insertGroupCodeInfo(insertList.get(i));
            cnt += 1;
        }

        for(int i = 0; i < updateList.size(); i++){
            updateList.get(i).setHndEmpno(facade.getDetails().getEno());
            ibims001BMapper.registGroupCodeInfo(updateList.get(i));
            cnt += 1;
        }

        return cnt > 0;
    }

    @Override
    public boolean deleteGroupCodeInfo(List<String> cmnsCdGrp) {

        
        int count = ibims001BMapper.deleteGroupCodeInfo(cmnsCdGrp, facade.getDetails().getEno());
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
