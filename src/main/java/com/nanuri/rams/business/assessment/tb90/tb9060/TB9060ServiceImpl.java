package com.nanuri.rams.business.assessment.tb90.tb9060;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS999BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS981BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS436BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS437BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;
import com.nanuri.rams.business.common.vo.IBIMS410BVO;
import com.nanuri.rams.business.common.vo.IBIMS436BVO;
import com.nanuri.rams.business.common.dto.IBIMS437BDTO;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB9060ServiceImpl implements TB9060Service {

    @Autowired
    private final IBIMS981BMapper ibims981bMapper;
    private final IBIMS997BMapper ibims997bMapper;

    @Autowired
    private AuthenticationFacade facade;

    @Override
    public int insert(IBIMS997BDTO param) {

        int result = 0;

        IBIMS997BDTO data = ibims997bMapper.daemonCheckData("TB9060B");

        try {
            data.setJobStatus("3");
            ibims997bMapper.updateIBIMS997B(data);

            // 삭제
            int delete = ibims981bMapper.batchDeleteIBIMS981B();

            // 입력
            int insert = ibims981bMapper.batchInsertIBIMS981B();

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
            data.setJobStatus("5"); // error
            result = ibims997bMapper.batchUpdate(data);
        }

        return result;
    }

}