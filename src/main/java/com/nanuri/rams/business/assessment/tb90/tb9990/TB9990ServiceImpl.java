package com.nanuri.rams.business.assessment.tb90.tb9990;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS999BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB9990ServiceImpl implements TB9990Service {

    @Autowired
    private final IBIMS999BMapper ibims999bMapper;
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
            String dd1AfBzDd = ibims999bMapper.selectDD1AF(stdrDt);

            // 삭제
            ibims999bMapper.delete(dd1AfBzDd);

            // 입력
            ibims999bMapper.insert(dd1AfBzDd);

            // 체크
            param.setJobStatus("4"); // complete
            ibims997bMapper.subPreJobCount(param);
            
            // 배치업데이트
            result = ibims997bMapper.batchUpdate(param);
        }

        catch (Exception e) {
            param.setJobStatus("5"); // error
            result = ibims997bMapper.batchUpdate(param);
        }

        return result;
    }

}