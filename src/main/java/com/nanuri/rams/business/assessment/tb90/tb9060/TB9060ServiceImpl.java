package com.nanuri.rams.business.assessment.tb90.tb9060;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import com.nanuri.rams.business.common.dto.IBIMS997BDTO;
import com.nanuri.rams.business.common.dto.IBIMS981BDTO;

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
    public String insert(IBIMS997BDTO param) {

        log.info("############################################");
        log.info(" TB9060ServiceImpl(기일관리내역생성) START >>>");
        log.info("############################################");

        /*
         * TB90060B 실행후 IBIMS981B(기일관리내역) 미생성시 확인
         * 
         * 1. IBIMS980B(기일관리기본) 테이블생성여부 확인필요(테이블정보 참조)
         * -----------------------------------------------------------------------------
         * DUDT_MNGM_NO|DUDT_MNGM_DTLD_JOB_KND_CD |DUDT_MNGM_NM |CHRR_STFNO |MNGM_BDCD
         * 0501| 1| 상환예정일(초과) |9910001 |AG3
         * 0502| 2| 상환예정일1일전 |9910001 |AG3
         * 0503| 3| 상환예정일3일이전 |9910001 |AG3
         * 0504| 4| 상환예정일3일이상 |9910001 |AG3
         */

        String result = "5";

        try {
            // 업무시작시간 업데이트
            param.setHndEmpno("BATCH");
            ibims997bMapper.updateIBIMS997B(param);

            String stdrDt = param.getCurDate();

            // 삭제
            ibims981bMapper.batchDeleteIBIMS981B(stdrDt);

            // if (param.getBatchCmdDcd() != "1") {
            // hndEmpno = facade.getDetails().getEno();
            // }

            // IBIMS981B 입력
            // ibims981bMapper.batchInsertIBIMS981B(hndEmpno);

            IBIMS981BDTO inparam = new IBIMS981BDTO();

            String hndEmpno = param.getHndEmpno();
            String hndTrId = param.getJobId();
            String hndTmnlNo = param.getHndTrId();
            String guId = param.getGuid();

            inparam.setHndEmpno(hndEmpno);
            inparam.setHndTrId(hndTrId);
            inparam.setHndTmnlNo(hndTmnlNo);
            inparam.setGuid(guId);

            ibims981bMapper.batchInsertIBIMS981B(inparam);

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
        log.info(" TB9060ServiceImpl(기일관리내역생성) END >>>");
        log.info("############################################");
        return result;
    }

}