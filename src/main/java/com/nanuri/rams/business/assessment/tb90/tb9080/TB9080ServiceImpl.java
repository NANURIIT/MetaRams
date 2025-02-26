package com.nanuri.rams.business.assessment.tb90.tb9080;

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
public class TB9080ServiceImpl implements TB9080Service {

    @Autowired
    private final IBIMS981BMapper ibims981bMapper;
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
            ibims981bMapper.batchDeleteIBIMS981B(stdrDt);

            String hndEmpno = param.getHndEmpno();

            // if (param.getBatchCmdDcd() != "1") {
            //     hndEmpno = facade.getDetails().getEno();
            // }

            // 입력
            ibims981bMapper.batchInsertIBIMS981B(hndEmpno);

            ibims997bMapper.batchUpdate(param);
            ibims997bMapper.subPreJobCount(param);

            result = "4";
        }

        catch (Exception e) {
            if (e instanceof InterruptedException) {
                log.info("스레드 중단 오류 발생!!");
                result = "7";
            }
            else {
                log.info("배치중 오류 발생!!");
                result = "5";
            }
        }

        return result;
    }

}