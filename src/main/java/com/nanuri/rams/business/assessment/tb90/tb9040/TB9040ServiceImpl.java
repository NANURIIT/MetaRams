package com.nanuri.rams.business.assessment.tb90.tb9040;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.nanuri.rams.business.common.dto.IBIMS820BDTO;
import com.nanuri.rams.business.common.dto.IBIMS981BDTO;
import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS820BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS997BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB9040ServiceImpl implements TB9040Service {

    private final IBIMS820BMapper ibims8202bMapper;
    private final IBIMS997BMapper ibims997bMapper;

    @Autowired
    private AuthenticationFacade facade;

    @Override
    public String insert(IBIMS997BDTO param) {

        log.info("############################################");
        log.info(" TB9040ServiceImpl(선수수수료결산내역생성) START >>>");
        log.info("############################################");
        String result = "5";

        try {
            // 업무시작시간 업데이트
            param.setHndEmpno("BATCH");
            ibims997bMapper.updateIBIMS997B(param);

            String stdrDt = param.getCurDate();

            // 삭제
            ibims8202bMapper.deleteTB9040B(stdrDt);

            // 입력
            // ibims8202bMapper.insertTB9040B(stdrDt);
            IBIMS820BDTO inparam = new IBIMS820BDTO();

            String stdrYm = stdrDt.substring(0, 6); // 기준년월
            String hndEmpno = param.getHndEmpno();
            String hndTrId = param.getJobId();
            String hndTmnlNo = param.getHndTrId();
            String guId = param.getGuid();

            inparam.setStdrYm(stdrYm);
            inparam.setHndEmpno(hndEmpno);
            inparam.setHndTrId(hndTrId);
            inparam.setHndTmnlNo(hndTmnlNo);
            inparam.setGuid(guId);

            // 선수수수료결산내역생성
            ibims8202bMapper.insertTB9040B(inparam);

            ibims997bMapper.batchUpdate(param);
            ibims997bMapper.subPreJobCount(param);

            result = "4";
        }

        catch (Exception e) {
            if (e instanceof InterruptedException) {
                log.info("스레드 중단 오류 발생!!");
                result = "7";
            } else {
                log.info("배치중 오류 발생!!");
                result = "5";
            }
        }
        log.info("############################################");
        log.info(" TB9040ServiceImpl(선수수수료결산내역생성) END >>>");
        log.info("############################################");
        return result;
    };

}