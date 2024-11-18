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

        IBIMS997BDTO data = ibims997bMapper.daemonCheckData("TB9990B");

        if (data == null) {
            return result;
        }

        data.setJobStatus("1");
        ibims997bMapper.updateIBIMS997B(data);

        int confirmJobCount = data.getConfirmJobCount();
        if (confirmJobCount >= 1) {
            result = 0;
            return result;
        }

        String selectResult;
        String select = ibims999bMapper.selectDD1AF();
        selectResult = select;

        if (selectResult == null || selectResult.equals("")) {
            result = -1;
            return result;
        }

        // 삭제
        int delete = ibims999bMapper.delete();

        // 입력
        int insert = ibims999bMapper.insert(selectResult);

        // 체크
        if (delete >= 0 && insert >= 0) {
            data.setJobStatus("2"); // complete
        } else {
            data.setJobStatus("3"); // error
        }
        ibims997bMapper.subPreJobCount(data);
        // 배치업데이트
        result = ibims997bMapper.batchUpdate(data);

        return result;
    }

}