package com.nanuri.rams.business.assessment.tb10.tb10010;

import com.nanuri.rams.business.common.dto.IBIMS001BDTO;
import com.nanuri.rams.business.common.dto.IBIMS002BDTO;
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
     * 그룹코드 그리드 저장 2025-01-07 김건우 새로만듬니ㅏㅡㅜ;ㄹㅇㄴ미;ㅏ뭫ㅇㄹㄴㅍㅇㅁㄴㄹ; ㅏㅣㅓㅜㅎㄻㅇㄴ ㅍ;ㅓㅏㅣㅜㅗㅊㅌ
     */
    @Override
    public boolean registGroupCodeInfo(IBIMS001BVO paramData) {

        int cnt = 0;

        List<IBIMS001BDTO> insertList = paramData.getInsertList();
        List<IBIMS001BDTO> updateList = paramData.getUpdateList();

        for(int i = 0; i < insertList.size(); i++){
            String cmnsCdGrp = ibims001BMapper.makeCmnsCdGrp(insertList.get(i));
            insertList.get(i).setCmnsCdGrp(cmnsCdGrp);
            insertList.get(i).setRgstEmpno(facade.getDetails().getEno());
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

    /**
     * 코드 저장,수정  2025-01-07 김건우
     */
    @Override
    public boolean registCodeInfo(IBIMS002BVO paramData) {
        int cnt = 0;

        List<IBIMS002BDTO> insertList = paramData.getInsertList();
        List<IBIMS002BDTO> updateList = paramData.getUpdateList();

        for(int i = 0; i < insertList.size(); i++){
            int cdSq = ibims002BMapper.getMaxSeq(
                insertList.get(i).getCmnsCdGrp()
            );
            insertList.get(i).setCdSq(cdSq);
            insertList.get(i).setRgstEmpno(facade.getDetails().getEno());
            insertList.get(i).setHndEmpno(facade.getDetails().getEno());
            ibims002BMapper.insertCodeInfo(insertList.get(i));
            cnt += 1;
        }

        for(int i = 0; i < updateList.size(); i++){
            updateList.get(i).setHndEmpno(facade.getDetails().getEno());
            ibims002BMapper.registCodeInfo(updateList.get(i));
            cnt += 1;
        }

        return cnt > 0;
    }

    @Override
    public boolean deleteCodeInfo(IBIMS002BVO requestDto) {
    	return ibims002BMapper.deleteCodeInfo(requestDto.getCmnsCdGrp(), facade.getDetails().getEno(), requestDto.getCdVlIds()) > 0;
    }
    
}
