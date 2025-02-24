package com.nanuri.rams.business.assessment.tb90.tb9050;

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
public class TB9050ServiceImpl implements TB9050Service {

    private final IBIMS820BMapper ibims820bMapper;
    private final IBIMS997BMapper ibims997bMapper;

    @Autowired
    private AuthenticationFacade facade;

    @Override
    public String insert(IBIMS997BDTO param) {

        String result = "5";

        try {
            // 업무시작시간 업데이트
            param.setHndEmpno("BATCH");
            ibims997bMapper.updateIBIMS997B(param);

            String stdrDt = param.getCurDate();

            // 삭제
            ibims820bMapper.deleteTB9050B(stdrDt);
            // 입력
            ibims820bMapper.insertTB9050B(stdrDt);

            ibims997bMapper.batchUpdate(param);
            ibims997bMapper.subPreJobCount(param);

            result = "4";
        }

        catch (Exception e) {
            result = "5";
        }

        return result;
    };

}