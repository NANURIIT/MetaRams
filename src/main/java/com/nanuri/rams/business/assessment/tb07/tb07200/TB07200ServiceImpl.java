package com.nanuri.rams.business.assessment.tb07.tb07200;


import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nanuri.rams.business.common.dto.IBIMS900BDTO;
import com.nanuri.rams.business.common.mapper.IBIMS900BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS901BMapper;
import com.nanuri.rams.business.common.mapper.IBIMS902BMapper;
import com.nanuri.rams.business.common.vo.IBIMS900BVO;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RequiredArgsConstructor
@Service
@Transactional
@Slf4j
public class TB07200ServiceImpl implements TB07200Service {

    private final IBIMS900BMapper ibims900bMapper;
    private final IBIMS901BMapper ibims901bMapper;
    private final IBIMS902BMapper ibims902bMapper;

    @Override
    public List<IBIMS900BVO> selectSpcList(IBIMS900BVO param){
        return ibims900bMapper.selectSpcList(param);
    };

    @Override
    public IBIMS900BVO spcDetail (IBIMS900BDTO param){

        IBIMS900BVO vo = new IBIMS900BVO();

        vo.setPblHisList(ibims901bMapper.pblHisList(param.getArdyBzepNo()));               // 유동화증권발행내역
        vo.setDpstRqstList(null);           // 입금요청내역
        vo.setWthdrwlRqstList(null);     // 출금요청내역

        return vo;
    }
    
}
