package com.nanuri.rams.business.assessment.tb09.tb09060;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;


import com.nanuri.rams.business.common.mapper.IBIMS436BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS437BMapper;
import com.nanuri.rams.com.security.AuthenticationFacade;

import com.nanuri.rams.business.common.vo.IBIMS436BVO;
import com.nanuri.rams.business.common.dto.IBIMS437BDTO;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB09060ServiceImpl implements TB09060Service {

    @Autowired
    private final IBIMS436BMapper ibims436bMapper;
    private final IBIMS437BMapper ibims437bMapper;

    @Autowired
    private AuthenticationFacade facade;
    
    @Override
    public List<IBIMS436BVO> getOvduDtls(IBIMS436BVO param){
        
        return ibims436bMapper.getOvduDtls(param);
    }

    @Override
    public List<IBIMS437BDTO> getOvduDailyDtls(IBIMS437BDTO param){

        return ibims437bMapper.getOvduDailyDtls(param);
    }

    @Override
    public int saveDcsn(IBIMS436BVO param){

         // 1. IBIMS436B의 DCSN_YN 업데이트
         int result = ibims436bMapper.saveDcsn(param);

         if (result > 0) {
            // 2. IBIMS437B에 연체 내역 추가
            IBIMS437BDTO ovduParam = new IBIMS437BDTO();
            ovduParam.setAfctMngmNo(param.getAfctMngmNo()); //사후관리번호
            ovduParam.setPrdtCd(param.getPrdtCd()); //종목코드
            ovduParam.setExcSn(param.getExcSn()); // 실행순번
            ovduParam.setDealNo(param.getDealNo()); //딜번호
            ovduParam.setOvduOcrncDt( param.getOvduOcrncDt()); // 연체발생일자
            ovduParam.setCrdlBlceAmt(param.getCrdlBlceAmt()); // 여신잔액금액
            ovduParam.setOvduPrnaAmt(param.getOvduPrnaAmt());   // 연체원금금액 
            ovduParam.setOvduIntrAmt(param.getOvduIntrAmt()); // 연체이자금액
            ovduParam.setDelYn("N");  // 삭제 여부 (기본값 'N')         
            ovduParam.setHndEmpno(facade.getDetails().getEno());  

            ibims437bMapper.insertOvduDailyDtls(ovduParam);
        }

        return result;
    }
}