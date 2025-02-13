package com.nanuri.rams.business.assessment.tb90.tb9020;

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
public class TB9020ServiceImpl implements TB9020Service {

    private final IBIMS820BMapper ibims820bMapper;
    private final IBIMS997BMapper ibims997bMapper;

    @Autowired
    private AuthenticationFacade facade;

    @Override
    public int insert(IBIMS997BDTO param) {

        int result = 0;

        IBIMS997BDTO data = ibims997bMapper.daemonCheckData("TB9020B");

        try {
            data.setJobStatus("3");
            ibims997bMapper.updateIBIMS997B(data);

            int delete;
            int insert;
            String stdrDt = data.getCurDate();

            // 삭제
            delete = ibims820bMapper.deleteTB9020B(stdrDt);
            // 입력
            insert = ibims820bMapper.insertTB9020B(stdrDt);

            // 체크
            if (delete >= 0 && insert >= 0) {
                data.setJobStatus("4"); // complete
                ibims997bMapper.subPreJobCount(data);
            } else {
                data.setJobStatus("5"); // error
            }
            // 배치업데이트
            result = ibims997bMapper.batchUpdate(data);
        }

        catch (Exception e) {
            data.setJobStatus("5");
            result = ibims997bMapper.batchUpdate(data);
        }

        return result;
    };

}