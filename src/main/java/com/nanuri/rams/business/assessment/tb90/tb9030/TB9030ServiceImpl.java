package com.nanuri.rams.business.assessment.tb90.tb9030;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS820BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB9030ServiceImpl implements TB9030Service {

    private final IBIMS820BMapper ibims820bMapper;
    private final IBIMS997BMapper ibims997bMapper;

    @Autowired
    private AuthenticationFacade facade;

    @Override
    public int insert(IBIMS997BDTO param) {

        int result = 0;

        try {
            // 업무시작시간 업데이트
            param.setHndEmpno("BATCH");
            ibims997bMapper.updateIBIMS997B(param);
            
            String stdrDt = param.getCurDate();
    
            // 삭제
            ibims820bMapper.deleteTB9030B(stdrDt);
            // 입력
            ibims820bMapper.insertTB9030B(stdrDt);
    
            // 체크
            param.setJobStatus("4"); // complete
            ibims997bMapper.subPreJobCount(param);
    
            // 배치업데이트
            ibims997bMapper.batchUpdate(param);
        }

        catch (Exception e) {
            param.setJobStatus("5"); // error
            result = ibims997bMapper.batchUpdate(param);
        }

        return result;
    };

}