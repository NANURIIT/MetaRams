package com.nanuri.rams.business.assessment.tb07.tb07200;


import java.util.List;
import java.util.ArrayList;
import java.math.BigDecimal;

import java.util.Comparator;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS900BDTO;
import com.nanuri.rams.business.common.dto.IBIMS901BDTO;
import com.nanuri.rams.business.common.dto.IBIMS902BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS900BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS901BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS902BMapper;
import com.nanuri.rams.business.common.vo.IBIMS900BVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class TB07200ServiceImpl implements TB07200Service {

    private final AuthenticationFacade facade;

    private final IBIMS900BMapper ibims900bMapper;
    private final IBIMS901BMapper ibims901bMapper;
    private final IBIMS902BMapper ibims902bMapper;

    @Override
    public List<IBIMS900BVO> selectSpcList(IBIMS900BVO param){
        return ibims900bMapper.selectSpcList(param);
    };

    @Override
    public IBIMS900BVO spcDetail (IBIMS900BDTO param){

        log.debug("!!!!![spcDetail] parameter check!!!!!");
        log.debug("[spcDetail] ardyBzepNo::: " + param.getArdyBzepNo());
        log.debug("[spcDetail] fincExcuRqsDt::: " + param.getFincExcuRqsSn());

        IBIMS900BVO vo = new IBIMS900BVO();

        vo.setPblHisList(ibims901bMapper.pblHisList(param.getArdyBzepNo()));               // 유동화증권발행내역

        IBIMS900BVO srchParam = new IBIMS900BVO();
        srchParam.setArdyBzepNo(param.getArdyBzepNo());
        srchParam.setFincExcuRqsSn(param.getFincExcuRqsSn());

        vo.setDpstRqstList(ibims902bMapper.getDpstRqstList(srchParam));           // 입금요청내역
        vo.setWthdrwlRqstList(ibims902bMapper.getWthdrwlRqstList(srchParam));     // 출금요청내역

        return vo;
    }

    @Override
    public int spcSave(IBIMS900BVO param){
        int rslt = 0;//반환값 (0:: 에러 1:: 성공)

        List<IBIMS901BDTO> pblHisList = param.getPblHisList();              // 유동화증권방행내역
        List<IBIMS902BDTO> dpstRqstList = param.getDpstRqstList();          // 입금요청내역
        List<IBIMS902BDTO> wthdrwlRqstList = param.getWthdrwlRqstList();    // 출금요청내역

        String ardyBzepNo = param.getArdyBzepNo();       //기업체번호
        long fincExcuRqsSn = 0;                          //자금집행신청일련번호

        /*디버깅용 로그 */
        log.debug("!!!!![spcSave] parameter check!!!!!");
        log.debug("[spcSave] ardyBzepNo::: " + param.getArdyBzepNo());
        log.debug("[spcSave] fincExcuRqsDt::: " + param.getFincExcuRqsDt());
        log.debug("[spcSave] fincExcuRqsSn::: " + param.getFincExcuRqsSn());
        log.debug("[spcSave] ibCtrtNm::: " + param.getIbCtrtNm());
        log.debug("[spcSave] asstMngmAcno::: " + param.getAsstMngmAcno());
        log.debug("[spcSave] dprtCd::: " + param.getDprtCd());
        log.debug("[spcSave] rmCtns::: " + param.getRmCtns());

        log.debug("[spcSave] pblHisList.length::: " + pblHisList.size());
        log.debug("[spcSave] dpstRqstList.length::: " + dpstRqstList.size());
        log.debug("[spcSave] wthdrwlRqstList.length::: " + wthdrwlRqstList.size());
        
        /* 자금집행업무지시요청 목록 START */
        if(param.getFincExcuRqsSn() == 0){//자금집행신청일련번호 없음 === 신규
            log.debug("[spcSave] IBIMS900B INSERT!!!!!!");

            //유동화증권발행여부 세팅
            if(pblHisList.size() < 1){
                param.setLqdzSctyIsuYn("N");
            }else{
                param.setLqdzSctyIsuYn("Y");
            }

            param.setHndEmpno(facade.getDetails().getEno());        //조작사원번호

            fincExcuRqsSn = ibims900bMapper.getNxtFincExcuRqsSn();
            log.debug("[spcSave] nxtFincExcuRqsSn ::: " + fincExcuRqsSn);

            param.setFincExcuRqsSn(fincExcuRqsSn);

            int wrkRqstSaveRslt = ibims900bMapper.spcWrkRqstSave(param);

            if(wrkRqstSaveRslt < 1){
                log.debug("[spcSave] SQL Error>>>>spcWrkRqstSave<<<<");
                rslt = 0;
            }else{
                log.debug("[spcSave] SQL Success>>>>spcWrkRqstSave<<<<");
                rslt = 1;
            }

        }else{//자금집행신청일련번호 존재 === 수정
            log.debug("[spcSave] IBIMS900B UPDATE!!!!!!");
            //todo: update문 들어가야함...
            fincExcuRqsSn = param.getFincExcuRqsSn();
            param.setHndEmpno(facade.getDetails().getEno());        //조작사원번호

            int wrkRqstUpdateRslt = ibims900bMapper.spcWrkRqstUpdate(param);

            if(wrkRqstUpdateRslt < 1){
                log.debug("[spcSave] SQL Error>>>>spcWrkRqstUpdate<<<<");
                rslt = 0;
            }else{
                log.debug("[spcSave] SQL Success>>>>spcWrkRqstUpdate<<<<");
                rslt = 1;
            }

            //유동화증권발행여부 세팅       <<< 얘도 다시 세팅해줘야하는지 아닌지 확실하지 않음
            // if(pblHisList.size() < 1){
            //     param.setLqdzSctyIsuYn("N");
            // }else{
            //     param.setLqdzSctyIsuYn("Y");
            // }

            

        }

        /**
         * 자금집행내역확인 삭제
         * 
         * 1. 리스트로 받아야함
         * 2. 삭제
         */
        

        /* 자금집행업무지시요청 목록 END */


        /* 유동화증권 발행내역 START */
        if(pblHisList.size() > 0){              //유동화증권 발행내역
            log.debug("[spcSave] 유동화증권 발행내역 존재");

            for(IBIMS901BDTO pblHisDTO: pblHisList){

                pblHisDTO.setArdyBzepNo(param.getArdyBzepNo());         //기업체번호
                pblHisDTO.setHndEmpno(facade.getDetails().getEno());    //조작사원번호
                
                if(pblHisDTO.getLqdzSctyIsuTmrd() == 0){//유동화증권발행회차 없음 === 신규
                    log.debug("[spcSave] IBIMS901B INSERT!!!!!!");
                    //INSERT문 들어가야함
                    int pblHisSaveRslt = ibims901bMapper.pblHisSave(pblHisDTO);

                    if(pblHisSaveRslt < 1){
                        log.debug("[spcSave] SQL Error>>>>pblHisSave<<<<");
                        rslt = 0;
                    }else{
                        log.debug("[spcSave] SQL Success>>>>pblHisSave<<<<");
                        rslt = 1;
                    }
                    
                }else{//유동화증권발행회차 있음 === 수정
                    log.debug("[spcSave] IBIMS901B UPDATE!!!!!!");
                    //UPDATE문 들어가야함
                    int pblHisUpdateRslt = ibims901bMapper.pblHisUpdate(pblHisDTO);

                    if(pblHisUpdateRslt < 1){
                        log.debug("[spcSave] SQL Error>>>>pblHisUpdate<<<<");
                        rslt = 0;
                    }else{
                        log.debug("[spcSave] SQL Success>>>>pblHisUpdate<<<<");
                        rslt = 1;
                    }
                }
            }

        }else{
            log.debug("[spcSave] 유동화증권 발행내역 없음");
        }
        /**
         * 유동화증권 발행내역 삭제
         * 
         * 1. 현재 신규,수정내용 포함된 그리드리스트 셋
         * 2. PK + 그리드리스트에 포함된 내역은 제외 후 조회
         * 3. 삭제
         */

        // 리스트가 존재할 경우 삭제내역 조회
        if (pblHisList.size() != 0) {
            List<IBIMS901BDTO> deletedPblHisList = ibims901bMapper.deletedPblHisList(pblHisList);
            for (int i = 0; i < deletedPblHisList.size(); i++) {
                ibims901bMapper.deletePblHis(deletedPblHisList.get(i));
            }
        }
        /* 유동화증권 발행내역 END */

        /* 입금요청/출금요청 START  */
        if(dpstRqstList.size() > 0 || wthdrwlRqstList.size() > 0){
            log.debug("[spcSave] 입금/출금요청 내역 존재");

            List<IBIMS902BDTO> ibims902List = new ArrayList<IBIMS902BDTO>();
            BigDecimal rndrBlce = BigDecimal.ZERO;  //입출금잔액

            if(dpstRqstList.size() > 0){            //입금요청 내역
                log.debug("[spcSave] 입금요청 내역 존재");
    
                for(IBIMS902BDTO dpstRqstDTO: dpstRqstList){
                    dpstRqstDTO.setArdyBzepNo(param.getArdyBzepNo());       //기업체번호
                    dpstRqstDTO.setFincExcuRqsSn(fincExcuRqsSn);            //자금집행신청일련번호
                    dpstRqstDTO.setRndrDcd("1");                    //입출금구분코드 (1: 입금   2: 출금)
                    dpstRqstDTO.setHndEmpno(facade.getDetails().getEno());
                    ibims902List.add(dpstRqstDTO);
                }
            }else{
                log.debug("[spcSave] 입금요청 내역 없음");
            }
    
            if(wthdrwlRqstList.size() > 0){         //출금요청 내역
                log.debug("[spcSave] 출금요청 내역 존재");
                
                for(IBIMS902BDTO wthdrwlRqstDTO: wthdrwlRqstList){
                    wthdrwlRqstDTO.setArdyBzepNo(param.getArdyBzepNo());    // 기업체번호
                    wthdrwlRqstDTO.setFincExcuRqsSn(fincExcuRqsSn);         //자금집행신청일련번호
                    wthdrwlRqstDTO.setRndrDcd("2");                 //입출금구분코드 (1: 입금   2: 출금)
                    wthdrwlRqstDTO.setHndEmpno(facade.getDetails().getEno());
                    ibims902List.add(wthdrwlRqstDTO);
                }
            }else{
                log.debug("[spcSave] 출금요청 내역 없음");
            }

            ibims902List.sort(Comparator
                        .comparing(IBIMS902BDTO::getTrDt)         // 거래일자 기준 정렬
                        .thenComparing(IBIMS902BDTO::getRndrDcd)  // 입출금구분코드 기준 정렬
            );

            // log.debug("ibims902List ::: {}", ibims902List);
            for(IBIMS902BDTO dpstRqstDTO: dpstRqstList){

                if(dpstRqstDTO.getTrSn() == 0){         //거래일련번호 == 0 : 신규

                    int rndrRqstSaveRslt = ibims902bMapper.rndrRqstSave(dpstRqstDTO);

                    if(rndrRqstSaveRslt < 1){
                        log.debug("[spcSave] SQL Error>>>>rndrRqstSave<<<<");
                        rslt = 0;
                    }else{
                        log.debug("[spcSave] SQL Success>>>>rndrRqstSave<<<<");
                        rslt = 1;
                    }

                }else{//거래일련번호 != 0 : 수정

                    int rndrRqstUpdateRslt = ibims902bMapper.rndrRqstUpdate(dpstRqstDTO);

                    if(rndrRqstUpdateRslt < 1){
                        log.debug("[spcSave] SQL Error>>>>rndrRqstUpdate<<<<");
                        rslt = 0;
                    }else{
                        log.debug("[spcSave] SQL Success>>>>rndrRqstUpdate<<<<");
                        rslt = 1;
                    }
                }
                
            }


        }else{
            log.debug("[spcSave] 입금/출금요청 내역 없음");
        }
        /**
         * 입출금내역 삭제
         * 
         * 1. 현재 신규,수정내용 포함된 그리드리스트 셋
         * 2. PK + 그리드리스트에 포함된 내역은 제외 후 조회
         * 3. 삭제
         */
        List<IBIMS902BDTO> notInRndrList = new ArrayList<IBIMS902BDTO>();
        notInRndrList.addAll(dpstRqstList);
        notInRndrList.addAll(wthdrwlRqstList);

        // 리스트가 존재할 경우 삭제내역 조회
        if (notInRndrList.size() != 0) {
            List<IBIMS902BDTO> deletedRndrList = ibims902bMapper.deletedRndrList(notInRndrList);
            for (int i = 0; i < deletedRndrList.size(); i++) {
                ibims902bMapper.deleteRndr(deletedRndrList.get(i));
            }
        }
        /* 입금요청/출금요청 END */

        return rslt;
    }
    
}
