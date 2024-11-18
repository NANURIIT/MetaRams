package com.nanuri.rams.business.assessment.tb09.tb09070;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.mapper.IBIMS403BMapper;
import com.nanuri.rams.business.common.vo.TB09070SVO;

import java.util.List;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TB09070ServiceImpl implements TB09070Service {

    private final IBIMS403BMapper ibims403bMapper;
    
    @Override
    public List<TB09070SVO.RdmpTrgtDtlsVO> rdmpTrgtDtlsInq(TB09070SVO param){
        log.debug("!!!!paramCheck!!!TB09070Service.rdmpTrgtDtlsInq");
        log.debug("mngmBdcd::: " + param.getMngmBdcd());
        log.debug("actsCd::: " + param.getActsCd());
        log.debug("dealNo::: " + param.getDealNo());
        log.debug("trObjtBsnNo::: " + param.getTrObjtBsnNo());
        log.debug("fromDt::: " + param.getFromDt());
        log.debug("toDt::: " + param.getToDt());

        List<TB09070SVO.RdmpTrgtDtlsVO> rdmpTrgtDtls = ibims403bMapper.rdmpTrgtDtlsInq(param);

        return rdmpTrgtDtls;
    }
}
