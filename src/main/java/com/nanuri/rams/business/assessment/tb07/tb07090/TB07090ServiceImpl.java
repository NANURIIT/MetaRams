package com.nanuri.rams.business.assessment.tb07.tb07090;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import com.nanuri.rams.business.common.dto.IBIMS430BDTO;
import com.nanuri.rams.business.common.dto.IBIMS992BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS430BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS992BMapper;
import com.nanuri.rams.business.common.vo.IBIMS403BVO;
import com.nanuri.rams.business.common.vo.IBIMS430BVO;
import com.nanuri.rams.business.common.vo.TB07090SVO;
import com.nanuri.rams.com.security.AuthenticationFacade;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB07090ServiceImpl implements TB07090Service {
    
	private final AuthenticationFacade facade;

    /*상환예정내역*/
    private final IBIMS403BMapper ibims403bMapper;

    /*부서별입금내역*/
    private final IBIMS430BMapper ibims430bMapper;

    /*금융기관정보*/
    private final IBIMS992BMapper ibims992bMapper;

    @Override
    public TB07090SVO getDprtDtlsInfo(IBIMS430BVO param){

        log.debug("param check <TB07090ServiceImpl>");
        log.debug("param.rctmDt::: "       + param.getRctmDt());
        //log.debug("param.paiRdmpDcd::: "   + param.getPaiRdmpDcd());
        log.debug("param.dealNo::: "       + param.getDealNo());
        log.debug("param.dprtCd::: "       + param.getDprtCd());
        log.debug("param.fromDt::: "       + param.getFromDt());
        log.debug("param.toDt::: "         + param.getToDt());

        TB07090SVO rsltVO = new TB07090SVO();

        List<IBIMS403BVO> rdmpPrarDtlsList = ibims403bMapper.getRdmpPrarDtls(param);
        // List<IBIMS430BVO> rctmDtlsList = ibims430bMapper.getRctmDtls(param);
        // List<IBIMS430BVO> dprtDtlsList = ibims430bMapper.dptrDtlsInq(param);

        List<IBIMS430BVO> rctmDtlsList = ibims430bMapper.getNoDealList(param);
        List<IBIMS430BVO> dprtDtlsList = ibims430bMapper.getYesDealList(param);

        rsltVO.setRdmpPrarDtlsList(rdmpPrarDtlsList);
        rsltVO.setDprtDtlsList(dprtDtlsList);
        rsltVO.setRctmDtlsList(rctmDtlsList);

        return rsltVO;
    }

    //입금내역등록
    @Override
    public int rctmDtlsRgst(List<IBIMS430BDTO> paramList){

        log.debug("paramList(Before Sequence Setting):::{}", paramList);

        int returnVal = 0;

        for(int i=0; i < paramList.size(); i++){
            IBIMS430BDTO param = paramList.get(i);
            // IBIMS430BDTO keySrchParam = new IBIMS430BDTO();

            String rctmDt = param.getRctmDt();
            String rgstDtm = param.getRgstDtm();

            //입금순번 구하기
            int rctmSeq = ibims430bMapper.getNxtRctmSeq(rctmDt);
            param.setRctmSeq(rctmSeq);

            //등록순번 구하기
            int rgstSeq = ibims430bMapper.getNxtRgstSeq(rgstDtm);
            param.setRgstSeq(rgstSeq);

            param.setHndEmpno(facade.getDetails().getEno());
            
            returnVal = rgstSeq;
        }

        log.debug("paramList(After Sequence Setting):::{}", paramList);

        int result = ibims430bMapper.rctmDtlsRgst(paramList);

        return returnVal;
    }

    // 입금내역매핑
    @Override
    public int rctmDtlsMapping(List<IBIMS430BDTO> paramList){
        log.debug("paramList(Before Sequence Setting):::{}", paramList);

        int returnVal = ibims430bMapper.rctmDtlsMapping(paramList);

        return returnVal;
    }

    /**
     * 대충만든 뉴버전
     */
    @Override
    public int ibims430bInsert (List<IBIMS430BDTO> paramList) {
        int returnVal = ibims430bMapper.rctmDtlsRgst(paramList);
        return returnVal;
    }
}
