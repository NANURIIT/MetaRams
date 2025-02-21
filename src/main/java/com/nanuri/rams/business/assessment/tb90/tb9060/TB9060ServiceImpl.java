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

        try {
            // 업무시작시간 업데이트
            param.setHndEmpno("BATCH");
            ibims997bMapper.updateIBIMS997B(param);

            String stdrDt = param.getCurDate();

            // 삭제
            ibims981bMapper.batchDeleteIBIMS981B(stdrDt);

            String hndEmpno = param.getHndEmpno();

            // if (param.getBatchCmdDcd() != "1") {
            //     hndEmpno = facade.getDetails().getEno();
            // }

            // 입력
            ibims981bMapper.batchInsertIBIMS981B(hndEmpno);

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